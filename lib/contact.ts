import { z } from "zod";

export const contactTopics = [
  "Business process or workflow",
  "Technology project",
  "Professional opportunity",
  "Something else",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Please keep your name under 100 characters."),
  email: z.string().trim().max(200, "That email address is too long.").pipe(z.email("Please enter a valid email address.")),
  organization: z.string().trim().max(120, "Please keep this under 120 characters.").optional().default(""),
  topic: z.enum(contactTopics, { error: "Please choose what your message is about." }),
  message: z
    .string()
    .trim()
    .min(20, "Please share a little more detail (at least 20 characters).")
    .max(5000, "Please keep your message under 5,000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors: Partial<Record<ContactField, string>>;
      values: Partial<Record<ContactField, string>>;
    };

/** Validates raw form fields, returning either clean data or the first error per field. */
export function parseContact(raw: Record<string, unknown>) {
  const result = contactSchema.safeParse(raw);
  if (result.success) return { ok: true as const, data: result.data };
  const fieldErrors: Partial<Record<ContactField, string>> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as ContactField | undefined;
    if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
  }
  return { ok: false as const, fieldErrors };
}

/** Minimum time a person plausibly needs to fill in the form. */
export const MIN_FILL_MS = 2500;

export function isSubmittedTooFast(startedAt: unknown, now: number): boolean {
  const started = Number(startedAt);
  if (!startedAt || !Number.isFinite(started) || started <= 0) return false;
  return now - started < MIN_FILL_MS;
}
