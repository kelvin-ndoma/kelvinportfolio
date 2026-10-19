import Link from "next/link";
import { navigation } from "@/content/site";
import { NavLinks } from "./nav-links";
import { MobileNav } from "./mobile-nav";
import { SignatureMark } from "./signature-mark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur-sm supports-[backdrop-filter]:bg-ink/75">
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <SignatureMark size="sm" variant="nav" />
        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          <NavLinks items={navigation} />
          <Link href="/resume" className="label text-muted transition-colors hover:text-accent">
            Resume
          </Link>
        </nav>
        <MobileNav items={navigation} />
      </div>
    </header>
  );
}
