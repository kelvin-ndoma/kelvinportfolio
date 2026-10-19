"use server";

import { headers } from "next/headers";
import { isSubmittedTooFast, parseContact, type ContactField, type ContactInput, type ContactState } from "@/lib/contact";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/content/site";

const FIELDS: ContactField[] = ["name", "email", "organization", "topic", "message"];

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = Object.fromEntries(FIELDS.map((f) => [f, String(formData.get(f) ?? "")])) as Record<ContactField, string>;

  // Honeypot: real visitors never see or fill this field. Pretend success so bots learn nothing.
  if (String(formData.get("website") ?? "").length > 0) return { status: "success" };

  if (isSubmittedTooFast(formData.get("startedAt"), Date.now())) {
    return {
      status: "error",
      message: "That was very quick. Please check your message and send it again.",
      fieldErrors: {},
      values,
    };
  }

  const parsed = parseContact(values);
  if (!parsed.ok) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.fieldErrors,
      values,
    };
  }

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  if (!rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000)) {
    return {
      status: "error",
      message: `Too many messages in a short time. Please try again later or email ${site.email} directly.`,
      fieldErrors: {},
      values,
    };
  }

  try {
    await deliverWithEmailJs(parsed.data);
    return { status: "success" };
  } catch (error) {
    console.error("[contact] delivery failed:", error instanceof Error ? error.message : "unknown error");
    return {
      status: "error",
      message: `Your message could not be sent right now. Please email ${site.email} directly.`,
      fieldErrors: {},
      values,
    };
  }
}

/**
 * Maps the contact form onto the EmailJS template variables:
 *   Subject: New message from {{from_name}}
 *   Body:    Hello {{to_name}}, … from {{from_name}}: {{message}}
 *
 * Extra form fields (email, topic, organization) are included inside {{message}}
 * so they still arrive even though the template only defines those three vars.
 */
function buildTemplateParams(data: ContactInput) {
  const details = [
    `Email: ${data.email}`,
    `Topic: ${data.topic}`,
    data.organization ? `Organization: ${data.organization}` : null,
    "",
    data.message,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  return {
    from_name: data.name,
    to_name: process.env.EMAILJS_TO_NAME ?? "Kelvin",
    message: details,
    // Also exposed as top-level params in case the template is expanded later.
    email: data.email,
    reply_to: data.email,
    topic: data.topic,
    organization: data.organization || "Not provided",
  };
}

async function deliverWithEmailJs(data: ContactInput) {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] EmailJS is not configured; message logged instead of sent:", {
        name: data.name,
        email: data.email,
        topic: data.topic,
      });
      return;
    }
    throw new Error("Contact delivery is not configured");
  }

  const payload: Record<string, unknown> = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: buildTemplateParams(data),
  };

  // Private key keeps the send call server-only (recommended by EmailJS for backends).
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  if (privateKey) payload.accessToken = privateKey;

  const response = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`EmailJS ${response.status}${detail ? `: ${detail.slice(0, 200)}` : ""}`);
  }
}
