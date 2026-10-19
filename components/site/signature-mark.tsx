import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/** Nav crop: signature + name (tagline removed for stronger header presence). */
const NAV_LOGO = {
  src: "/brand/logo-nav-v2.png",
  width: 1134,
  height: 347,
} as const;

/** Full lockup including professional tagline. */
const FULL_LOGO = {
  src: "/brand/logo-v2.png",
  width: 1255,
  height: 522,
} as const;

export function SignatureMark({
  className,
  href = "/",
  size = "sm",
  linked = true,
  variant = "nav",
}: {
  className?: string;
  href?: string;
  size?: "sm" | "md" | "lg";
  linked?: boolean;
  variant?: "nav" | "full";
}) {
  const logo = variant === "full" ? FULL_LOGO : NAV_LOGO;

  // Request a high-res intrinsic size so 2x/3x displays stay crisp.
  const intrinsicHeight = size === "lg" ? 160 : size === "md" ? 120 : 140;
  const intrinsicWidth = Math.round((logo.width / logo.height) * intrinsicHeight);

  const image = (
    <Image
      src={logo.src}
      alt={site.brand}
      width={intrinsicWidth}
      height={intrinsicHeight}
      priority={size === "sm" && variant === "nav"}
      quality={100}
      sizes={
        size === "sm"
          ? "(max-width: 640px) 172px, (max-width: 768px) 196px, 230px"
          : size === "md"
            ? "240px"
            : "320px"
      }
      className={cn(
        "w-auto max-w-none object-contain object-left",
        // Near-full header height; optical crop keeps the mark dense.
        size === "sm" && "h-[3.25rem] sm:h-14 md:h-16",
        size === "md" && "h-[4.25rem] sm:h-[4.75rem]",
        size === "lg" && "h-24",
        className,
      )}
    />
  );

  if (!linked) {
    return <span className="inline-flex items-center self-center leading-none">{image}</span>;
  }

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center self-center leading-none transition-opacity hover:opacity-90"
      aria-label={`${site.brand}, home`}
    >
      {image}
    </Link>
  );
}
