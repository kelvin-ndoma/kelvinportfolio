import Link from "next/link";
import { Download } from "lucide-react";
import { engineeringStack, expertiseAreas, microsoftPlatform } from "@/content/expertise";
import { featuredProjects } from "@/content/projects";
import { path as careerPath } from "@/content/profile";
import { site } from "@/content/site";
import { ButtonLink, buttonClasses } from "@/components/ui/button-link";
import { getResumeFile } from "@/lib/resume";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Resume",
  description: `Resume of ${site.name}, ${site.title}, based in ${site.location}.`,
  path: "/resume",
});

export default async function ResumePage() {
  const resume = await getResumeFile();

  return (
    <div className="container-page pt-16 pb-24 md:pt-24 md:pb-32">
      <header className="grid gap-8 border-b border-line-soft pb-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="label text-accent">Resume</p>
          <h1 className="mt-5 font-display text-headline font-light">{site.name}</h1>
          <p className="mt-3 text-lg text-paper">{site.title}</p>
          <p className="mt-1 text-muted">
            {site.location} ·{" "}
            <a href={`mailto:${site.email}`} className="underline decoration-line underline-offset-4 hover:decoration-accent">
              {site.email}
            </a>
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-3 lg:col-span-4 lg:justify-end">
          {resume ? (
            <a href={resume.href} download className={buttonClasses("primary")}>
              <Download className="size-4" aria-hidden />
              Download PDF <span className="font-mono text-xs opacity-70">({resume.sizeKb} KB)</span>
            </a>
          ) : (
            <ButtonLink href="/contact" variant="secondary">
              Request the full CV
            </ButtonLink>
          )}
        </div>
      </header>

      <Section title="Profile">
        <p className="max-w-3xl text-lg leading-relaxed text-pretty text-muted">{site.description}</p>
      </Section>

      <Section title="Capabilities">
        <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {expertiseAreas.map((area) => (
            <li key={area.id}>
              <p className="font-display font-light text-paper">{area.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{area.practices.slice(0, 2).join(". ")}.</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Selected projects">
        <ul className="space-y-6">
          {featuredProjects.map((p) => (
            <li key={p.slug} className="grid gap-2 sm:grid-cols-[14rem_1fr] sm:gap-8">
              <div>
                <Link href={`/work/${p.slug}`} className="font-display font-light text-paper hover:text-accent">
                  {p.name}
                </Link>
                <p className="label mt-1 text-subtle">{p.category}</p>
              </div>
              <div className="text-sm leading-relaxed text-muted">
                <p>{p.summary}</p>
                <p className="mt-2 font-mono text-[0.72rem] text-subtle">{p.stack.slice(0, 6).join(" · ")}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Education and experience">
        <ul className="space-y-4">
          {careerPath.map((entry) => (
            <li key={entry.title} className="grid gap-1 sm:grid-cols-[14rem_1fr] sm:gap-8">
              <p className="label pt-1 text-accent">
                {entry.kind}
                {entry.period && <span className="text-subtle"> · {entry.period}</span>}
              </p>
              <p className="text-paper">
                {entry.title}
                {entry.organization && <span className="text-muted">, {entry.organization}</span>}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Technical skills">
        <dl className="space-y-3">
          {engineeringStack.map((row) => (
            <div key={row.group} className="grid gap-1 sm:grid-cols-[14rem_1fr] sm:gap-8">
              <dt className="label pt-1 text-subtle">{row.group}</dt>
              <dd className="text-sm text-muted">{row.items.join(" · ")}</dd>
            </div>
          ))}
          <div className="grid gap-1 sm:grid-cols-[14rem_1fr] sm:gap-8">
            <dt className="label pt-1 text-subtle">Microsoft 365</dt>
            <dd className="text-sm text-muted">
              {microsoftPlatform
                .filter((m) => m.level === "administration")
                .map((m) => m.name)
                .join(" · ")}
              . Currently learning Power Automate.
            </dd>
          </div>
        </dl>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-b border-line-soft py-12 lg:grid-cols-12" aria-label={title}>
      <h2 className="label text-accent lg:col-span-3 lg:pt-1">{title}</h2>
      <div className="lg:col-span-9">{children}</div>
    </section>
  );
}
