import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { featuredProjects } from "@/content/projects";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p className="label text-accent">404</p>
        <h1 className="mt-6 font-display text-headline font-light text-balance">
          This page does not exist.
        </h1>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/work" variant="secondary" arrow={false}>
            Work
          </ButtonLink>
        </div>
      </div>
      <nav aria-label="Case studies" className="lg:col-span-4 lg:col-start-9 lg:pt-8">
        <p className="label text-subtle">Case studies</p>
        <ul className="mt-4 divide-y divide-line-soft border-y border-line-soft">
          {featuredProjects.map((p) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`} className="block py-3 font-light text-paper transition-colors hover:text-accent">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
