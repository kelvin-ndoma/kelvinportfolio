"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useInView } from "motion/react";

/**
 * Reveals content once as it enters the viewport. Hidden state is CSS-only when JS
 * runs and reduced motion is not preferred (see `[data-reveal]` in globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  reveal = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "ol";
  reveal?: "up" | "fade" | "scale";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const style = delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;

  return (
    <Tag
      // A union of intrinsic elements cannot narrow the ref type; all are HTMLElements.
      ref={ref as never}
      data-reveal={reveal === "up" ? "" : reveal}
      data-inview={inView ? "" : undefined}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}
