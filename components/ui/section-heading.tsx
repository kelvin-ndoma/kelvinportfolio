import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  className,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("grid gap-5 md:grid-cols-12 md:gap-10", className)}>
      <p className="label text-accent md:col-span-3 md:pt-3">{eyebrow}</p>
      <div className="md:col-span-9">
        <Tag
          id={id}
          className={cn(
            "max-w-3xl font-display font-light text-balance text-paper",
            Tag === "h1" ? "text-display" : "text-headline",
          )}
        >
          {title}
        </Tag>
        {intro && (
          <div className="mt-5 max-w-xl text-base font-light leading-relaxed text-pretty text-muted">
            {intro}
          </div>
        )}
      </div>
    </div>
  );
}
