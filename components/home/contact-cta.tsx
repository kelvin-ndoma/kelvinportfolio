import Link from "next/link";
import { site } from "@/content/site";
import { OrganicLine } from "@/components/motion/organic-line";

export function ContactCta({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <section aria-labelledby="contact-cta-title" className="border-t border-line-soft">
      <div className="container-page py-20 md:py-28">
        <p className="label text-accent">Contact</p>
        <Heading
          id="contact-cta-title"
          className="mt-8 max-w-[12ch] font-display text-display font-light tracking-tight text-paper"
        >
          Let&apos;s talk.
        </Heading>
        <p className="mt-8 max-w-sm text-base font-light text-muted">
          Have a process that needs a better system?
        </p>
        <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
          <Link
            href="/contact"
            className="label inline-flex items-center gap-2 text-accent transition-opacity hover:opacity-70"
          >
            Write to me →
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="break-all text-sm font-light text-muted transition-colors hover:text-accent"
          >
            {site.email}
          </a>
        </div>
        <OrganicLine variant="footer" className="mt-16 opacity-45" />
      </div>
    </section>
  );
}
