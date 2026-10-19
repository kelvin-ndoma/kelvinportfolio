import Link from "next/link";
import { navigation, site } from "@/content/site";

export function SiteFooter() {
  const external = [
    site.linkedin && { href: site.linkedin, label: "LinkedIn" },
    site.github && { href: site.github, label: "GitHub" },
  ].filter((l): l is { href: string; label: string } => Boolean(l));

  return (
    <footer className="border-t border-line-soft">
      <div className="container-page flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between md:py-16">
        <div>
          <p className="label text-accent">{site.wordmark}</p>
          <p className="mt-3 text-sm font-light text-muted">{site.location}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
          {[...navigation, { href: "/resume", label: "Resume" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-light text-muted transition-colors hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
          {external.map((l) => (
            <a
              key={l.href}
              href={l.href}
              rel="me noopener noreferrer"
              target="_blank"
              className="text-sm font-light text-muted transition-colors hover:text-paper"
            >
              {l.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="container-page border-t border-line-soft py-5">
        <p className="text-xs font-light text-subtle">© {site.name}</p>
      </div>
    </footer>
  );
}
