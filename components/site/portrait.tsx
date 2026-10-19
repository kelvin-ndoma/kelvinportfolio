import Image from "next/image";
import { cn } from "@/lib/cn";

const PORTRAITS = {
  studio: {
    src: "/portraits/kelvin-studio-v3.jpg",
    width: 768,
    height: 1024,
    alt: "Kelvin Ndoma Mutua in a corduroy jacket",
  },
  casual: {
    src: "/portraits/kelvin-portrait-v3.jpg",
    width: 768,
    height: 1024,
    alt: "Portrait of Kelvin Ndoma Mutua",
  },
} as const;

type PortraitVariant = keyof typeof PORTRAITS;
type PortraitLayout = "plain" | "editorial" | "float";

export function Portrait({
  variant = "studio",
  layout = "plain",
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 420px",
  caption,
}: {
  variant?: PortraitVariant;
  layout?: PortraitLayout;
  className?: string;
  priority?: boolean;
  sizes?: string;
  caption?: string;
}) {
  const portrait = PORTRAITS[variant];

  if (layout === "editorial") {
    return (
      <figure className={cn("group relative", className)}>
        {/* Offset copper plate behind the photo */}
        <div
          aria-hidden
          className="absolute -inset-x-3 top-6 bottom-0 translate-x-3 translate-y-4 bg-accent/15 transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:translate-x-4 group-hover:translate-y-5 md:-inset-x-4 md:translate-x-5"
        />

        {/* Thin copper L-frame */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-3 -top-3 z-20 h-16 w-16 border-l border-t border-accent/70 md:-left-4 md:-top-4 md:h-20 md:w-20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-3 -right-3 z-20 h-16 w-16 border-b border-r border-accent/70 md:-bottom-4 md:-right-4 md:h-20 md:w-20"
        />

        <div className="relative aspect-[3/4] overflow-hidden bg-dark">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            priority={priority}
            quality={90}
            sizes={sizes}
            className="h-full w-full scale-[1.02] object-cover object-[50%_18%] transition-transform duration-1000 ease-[var(--ease-editorial)] group-hover:scale-105"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_48%_28%,transparent_32%,color-mix(in_srgb,var(--color-ink)_40%,transparent)_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-dark/30"
          />
          {/* Soft copper wash along the edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
            style={{
              background:
                "linear-gradient(135deg, transparent 40%, color-mix(in srgb, var(--color-accent) 55%, transparent) 100%)",
            }}
          />
        </div>

        {caption ? (
          <figcaption className="mt-5 flex items-baseline justify-between gap-4">
            <span className="font-signature text-3xl text-accent/90 md:text-4xl">{caption}</span>
            <span className="label text-subtle">Nairobi</span>
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (layout === "float") {
    return (
      <figure className={cn("group relative mx-auto max-w-[18rem] md:mx-0 md:max-w-none", className)}>
        {/* Vertical wordmark behind / beside */}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-3 top-1/2 z-0 -translate-y-1/2 -rotate-90 select-none font-display text-[0.65rem] font-light tracking-[0.45em] text-accent/35 uppercase md:-left-5"
        >
          Kelvin
        </span>

        <div className="relative z-10 rotate-[-1.5deg] transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:rotate-0">
          <div className="relative aspect-[3/4] overflow-hidden bg-dark shadow-[12px_18px_0_0] shadow-accent/10">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              priority={priority}
              quality={90}
              sizes={sizes}
              className="h-full w-full object-cover object-[50%_20%] transition-transform duration-1000 ease-[var(--ease-editorial)] group-hover:scale-[1.04]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_32%,transparent_40%,color-mix(in_srgb,var(--color-ink)_50%,transparent)_100%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent"
            />
          </div>
        </div>

        {/* Accent tick under the frame */}
        <div
          aria-hidden
          className="absolute -bottom-3 left-1/2 h-px w-12 -translate-x-1/2 bg-accent/60 transition-all duration-500 group-hover:w-20"
        />
      </figure>
    );
  }

  return (
    <figure className={cn("relative overflow-hidden bg-dark", className)}>
      <Image
        src={portrait.src}
        alt={portrait.alt}
        width={portrait.width}
        height={portrait.height}
        priority={priority}
        quality={90}
        sizes={sizes}
        className="h-full w-full object-cover object-[50%_22%]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_48%_34%,transparent_38%,color-mix(in_srgb,var(--color-ink)_55%,transparent)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-dark/25"
      />
    </figure>
  );
}
