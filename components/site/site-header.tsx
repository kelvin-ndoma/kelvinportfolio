import Link from "next/link";
import { navigation, site } from "@/content/site";
import { NavLinks } from "./nav-links";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-ink/80 backdrop-blur-sm supports-[backdrop-filter]:bg-ink/65">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-lg font-light tracking-tight text-paper transition-opacity hover:opacity-70"
          aria-label={`${site.brand}, home`}
        >
          {site.brand}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          <NavLinks items={navigation} />
          <Link
            href="/resume"
            className="label text-muted transition-colors hover:text-accent"
          >
            Resume
          </Link>
        </nav>
        <MobileNav items={navigation} />
      </div>
    </header>
  );
}
