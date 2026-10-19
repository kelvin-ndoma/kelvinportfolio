import Link from "next/link";
import { aboutDetails, aboutNarrative, principles } from "@/content/profile";
import { featuredProjects } from "@/content/projects";
import { getStory } from "@/content/stories";
import { ButtonLink } from "@/components/ui/button-link";
import { ContactCta } from "@/components/home/contact-cta";
import { OrganicLine } from "@/components/motion/organic-line";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Kelvin Ndoma Mutua: mathematics, operations, software engineering and AI — building systems that make work clearer.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="container-page pt-16 pb-12 md:pt-24 md:pb-16">
        <p className="label text-accent">About</p>
        <h1 className="mt-6 max-w-[10ch] font-display text-display font-light tracking-tight">
          How I got here.
        </h1>
      </section>

      <section className="container-page pb-16 md:pb-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <p className="font-display text-[clamp(1.35rem,1.1rem+1.1vw,1.85rem)] font-light leading-snug tracking-tight text-pretty text-paper lg:col-span-7 lg:col-start-5">
            {aboutNarrative[0]}
          </p>
        </div>
        <OrganicLine variant="section" className="mt-16 opacity-40" />
      </section>

      <section aria-labelledby="details-title" className="border-t border-line-soft">
        <div className="container-page grid gap-10 py-16 md:grid-cols-12 md:py-20">
          <h2 id="details-title" className="label text-accent md:col-span-3">
            Notes
          </h2>
          <dl className="grid gap-8 sm:grid-cols-3 md:col-span-9">
            {aboutDetails.map((d) => (
              <div key={d.label}>
                <dt className="label text-subtle">{d.label}</dt>
                <dd className="mt-2 text-base font-light text-paper">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="border-t border-line-soft">
        <div className="container-page py-16 md:py-20">
          <h2 id="principles-title" className="label text-accent">
            How I work
          </h2>
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="border-t border-line-soft pt-5">
                <span className="label text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-2xl font-light tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-4">
            <ButtonLink href="/work">See the work</ButtonLink>
            <ButtonLink href="/resume" variant="secondary" arrow={false}>
              Resume
            </ButtonLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="focus-title" className="border-t border-line-soft">
        <div className="container-page grid gap-10 py-16 md:grid-cols-12 md:py-20">
          <h2 id="focus-title" className="label text-accent md:col-span-3">
            Recent focus
          </h2>
          <ul className="grid gap-8 sm:grid-cols-2 md:col-span-9">
            {featuredProjects.map((p) => {
              const story = getStory(p.slug);
              return (
                <li key={p.slug} className="border-t border-line-soft pt-4">
                  <Link href={`/work/${p.slug}`} className="group">
                    <span className="label text-subtle">{p.category}</span>
                    <span className="mt-2 block font-display text-xl font-light transition-colors group-hover:text-accent">
                      {story?.headline ?? p.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
