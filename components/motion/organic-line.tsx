"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Variant = "hero" | "section" | "footer";

const paths: Record<Variant, string> = {
  hero: "M0,52 C120,48 180,18 280,28 C380,38 420,78 520,62 C620,46 680,12 780,22 C880,32 920,68 1000,54",
  section: "M0,20 C180,8 320,36 500,22 C680,8 820,34 1000,18",
  footer: "M0,28 C200,40 350,8 500,24 C650,40 800,10 1000,22",
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Recurring ultra-thin organic line motif.
 * Subtle cursor parallax on the hero; static elsewhere. Honours reduced motion.
 */
export function OrganicLine({
  variant = "section",
  className,
  interactive = false,
}: {
  variant?: Variant;
  className?: string;
  interactive?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: PointerEvent) => {
      if (prefersReducedMotion()) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setOffset({ x: nx * 18, y: ny * 8 });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive]);

  const d = paths[variant];
  const dotX = variant === "hero" ? 620 : variant === "footer" ? 720 : 540;
  const dotY = variant === "hero" ? 50 : 20;

  return (
    <svg
      ref={ref}
      viewBox="0 0 1000 90"
      preserveAspectRatio="none"
      className={cn("pointer-events-none h-[4.5rem] w-full md:h-[5.5rem]", className)}
      aria-hidden
    >
      <g
        style={{
          transform: interactive ? `translate(${offset.x}px, ${offset.y}px)` : undefined,
          transition: "transform 0.6s var(--ease-editorial)",
        }}
      >
        <path d={d} className="motif-stroke" />
        <circle cx={dotX} cy={dotY} r={3.2} fill="var(--color-accent)" opacity={0.85} />
      </g>
    </svg>
  );
}
