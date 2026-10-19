import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "text";

const variants: Record<Variant, string> = {
  primary: "bg-dark text-ink hover:bg-accent",
  secondary: "border border-line text-paper hover:border-accent hover:text-accent",
  text: "px-0 text-accent hover:opacity-70",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(
    "group inline-flex h-11 items-center gap-3 px-5 text-sm font-light tracking-wide transition-colors duration-300",
    variants[variant],
    className,
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  arrow = true,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean }) {
  return (
    <Link className={buttonClasses(variant, className)} {...props}>
      {children}
      {arrow && (
        <ArrowRight
          className="size-3.5 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
          strokeWidth={1.5}
          aria-hidden
        />
      )}
    </Link>
  );
}
