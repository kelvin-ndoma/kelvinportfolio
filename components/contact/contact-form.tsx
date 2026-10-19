"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, Check } from "lucide-react";
import { submitContact } from "@/app/contact/actions";
import { contactTopics, type ContactField, type ContactState } from "@/lib/contact";
import { cn } from "@/lib/cn";

const initialState: ContactState = { status: "idle" };

export function ContactForm({ email }: { email: string }) {
  const [state, formAction] = useActionState(submitContact, initialState);
  const startedAt = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const formId = useId();

  useEffect(() => {
    if (startedAt.current && !startedAt.current.value) startedAt.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
    if (state.status === "success") successRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="rounded-sm border border-line-soft bg-surface p-8 sm:p-10" role="status">
        <span className="inline-flex size-10 items-center justify-center rounded-sm border border-success/50 text-success">
          <Check className="size-5" aria-hidden />
        </span>
        <h2 ref={successRef} tabIndex={-1} className="mt-6 font-display text-title font-light outline-none">
          Thank you. Your message has been sent.
        </h2>
        <p className="mt-3 max-w-md leading-relaxed text-muted">
          I will reply to the email address you provided. If it is urgent, you can also reach me at{" "}
          <a href={`mailto:${email}`} className="text-paper underline decoration-accent underline-offset-4">
            {email}
          </a>
          .
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : {};
  const fieldProps = (name: ContactField) => {
    const errorId = `${formId}-${name}-error`;
    return {
      id: `${formId}-${name}`,
      name,
      defaultValue: values[name] ?? "",
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? errorId : undefined,
      className: cn(
        "mt-2 block w-full border bg-surface-raised px-4 py-3 font-light text-paper placeholder:text-subtle transition-colors",
        "focus:border-accent focus:outline-none focus-visible:outline-none focus:ring-1 focus:ring-accent/40",
        errors[name] ? "border-danger" : "border-line-soft",
      ),
    };
  };
  const errorFor = (name: ContactField) =>
    errors[name] ? (
      <p id={`${formId}-${name}-error`} className="mt-2 text-sm text-danger">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form action={formAction} noValidate className="space-y-6" aria-describedby={`${formId}-required`}>
      {state.status === "error" && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-lg border border-danger/50 bg-danger/5 px-4 py-3 text-sm text-danger outline-none"
        >
          <p>{state.message}</p>
          {Object.keys(errors).length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {(Object.keys(errors) as ContactField[]).map((field) => (
                <li key={field}>
                  <a href={`#${formId}-${field}`} className="underline underline-offset-2">
                    {errors[field]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <p id={`${formId}-required`} className="text-sm text-subtle">
        All fields are required unless marked optional.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className="text-sm font-medium text-paper">
            Name
          </label>
          <input type="text" autoComplete="name" required maxLength={100} {...fieldProps("name")} />
          {errorFor("name")}
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="text-sm font-medium text-paper">
            Email
          </label>
          <input type="email" autoComplete="email" required maxLength={200} {...fieldProps("email")} />
          {errorFor("email")}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-organization`} className="text-sm font-medium text-paper">
            Organization <span className="font-normal text-subtle">(optional)</span>
          </label>
          <input type="text" autoComplete="organization" maxLength={120} {...fieldProps("organization")} />
          {errorFor("organization")}
        </div>
        <div>
          <label htmlFor={`${formId}-topic`} className="text-sm font-medium text-paper">
            What is it about?
          </label>
          <select required {...fieldProps("topic")} defaultValue={values.topic || ""}>
            <option value="" disabled>
              Choose a topic
            </option>
            {contactTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          {errorFor("topic")}
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="text-sm font-medium text-paper">
          Message
        </label>
        <textarea
          rows={7}
          required
          minLength={20}
          maxLength={5000}
          placeholder="What does the process look like today, and what should change?"
          {...fieldProps("message")}
        />
        {errorFor("message")}
      </div>

      {/* Spam protection: hidden from people and assistive technology. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-website`}>Leave this field empty</label>
        <input id={`${formId}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAt} type="hidden" name="startedAt" />

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex h-11 items-center gap-3 bg-dark px-6 text-sm font-light tracking-wide text-ink transition-colors hover:bg-accent disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? "Sending…" : "Send message"}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </button>
  );
}
