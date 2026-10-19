"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { isSubmittedTooFast, parseContact, type ContactField, type ContactInput, type ContactState } from "@/lib/contact";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/content/site";

const FIELDS: ContactField[] = ["name", "email", "organization", "topic", "message"];

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
    await deliver(parsed.data);
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

async function deliver(data: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY not set; message logged instead of sent:", {
        name: data.name,
        email: data.email,
        topic: data.topic,
      });
      return;
    }
    throw new Error("Contact delivery is not configured");
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio contact <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? site.email,
    replyTo: data.email,
    subject: `Portfolio enquiry: ${data.topic} (${data.name})`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Organization: ${data.organization || "Not provided"}`,
      `Topic: ${data.topic}`,
      "",
      data.message,
    ].join("\n"),
  });
  if (error) throw new Error(error.message);
}
