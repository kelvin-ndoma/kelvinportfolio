import Link from "next/link";
import {
  engineeringStack,
  expertiseAreas,
  microsoftPlatform,
  proficiencyLabels,
  type ProficiencyLevel,
} from "@/content/expertise";
import { getProject } from "@/content/projects";
import { whatIDo } from "@/content/site";
import { ContactCta } from "@/components/home/contact-cta";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Expertise",
  description:
    "Engineering, automation and improvement — shown through real projects. Microsoft 365 familiarity stated precisely.",
  path: "/expertise",
});

const levelStyles: Record<ProficiencyLevel, string> = {
  engineering: "border-accent/50 text-accent",
  administration: "border-paper/30 text-paper",
  learning: "border-dashed border-subtle text-muted",
};

const areaOrder = [
  "workflow-automation",
  "ai-intelligent-systems",
  "saas-architecture",
  "full-stack-engineering",
  "microsoft-365",
  "digital-growth",
] as const;

export default function ExpertisePage() {
  const levels = (Object.keys(proficiencyLabels) as ProficiencyLevel[]).filter((level) =>
    microsoftPlatform.some((item) => item.level === level),
  );
  const ordered = areaOrder
    .map((id) => expertiseAreas.find((a) => a.id === id))
    .filter((a): a is (typeof expertiseAreas)[number] => Boolean(a));

  return (
    <>
      <section className="container-page pt-16 pb-12 md:pt-24 md:pb-16">
        <p className="label text-accent">Expertise</p>
        <h1 className="mt-6 max-w-[14ch] font-display text-display font-light tracking-tight">
          Shown in the work.
        </h1>
        <ul className="mt-14 grid gap-10 border-t border-line-soft pt-10 md:grid-cols-3">
          {whatIDo.map((item) => (
            <li key={item.title}>
              <h2 className="font-display text-2xl font-light tracking-tight">{item.title}</h2>
              <p className="mt-3 text-sm font-light text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="border-t border-line-soft">
        {ordered.map((area) => (
          <section
            key={area.id}
            id={area.id}
            aria-labelledby={`${area.id}-title`}
            className="border-b border-line-soft"
          >
            <div className="container-page grid gap-10 py-14 md:py-16 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="label text-accent">{area.index}</p>
                <h2 id={`${area.id}-title`} className="mt-3 font-display text-headline font-light">
                  {area.title}
                </h2>
                <p className="mt-5 max-w-md text-base font-light leading-relaxed text-muted">{area.summary}</p>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <h3 className="label text-subtle">Shown in</h3>
                <ul className="mt-4 divide-y divide-line-soft border-y border-line-soft">
                  {area.evidence.map((slug) => {
                    const project = getProject(slug);
                    if (!project) return null;
                    return (
                      <li key={slug}>
                        <Link href={`/work/${slug}`} className="group flex justify-between gap-4 py-4">
                          <span className="font-display text-lg font-light transition-colors group-hover:text-accent">
                            {project.name}
                          </span>
                          <span className="label shrink-0 pt-1 text-subtle">→</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-6 font-mono text-[0.72rem] leading-relaxed text-subtle">
                  {area.tools.join(" · ")}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="microsoft-title" className="container-page py-16 md:py-24">
        <p className="label text-accent" id="microsoft-title">
          Microsoft 365
        </p>
        <h2 className="mt-4 max-w-xl font-display text-headline font-light">Stated precisely.</h2>
        <p className="mt-5 max-w-lg text-base font-light text-muted">
          Administration and daily use — not custom development. Power Automate is currently being learned.
        </p>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <dl className="space-y-4 lg:col-span-3">
            {levels.map((level) => (
              <div key={level}>
                <dt>
                  <span className={cn("label inline-flex border px-2 py-1", levelStyles[level])}>
                    {proficiencyLabels[level].label}
                  </span>
                </dt>
                <dd className="mt-2 text-xs font-light leading-relaxed text-muted">
                  {proficiencyLabels[level].description}
                </dd>
              </div>
            ))}
          </dl>
          <ul className="divide-y divide-line-soft border-y border-line-soft lg:col-span-9">
            {microsoftPlatform.map((item) => (
              <li key={item.name} className="flex items-center justify-between gap-4 py-3.5">
                <span className="font-light text-paper">{item.name}</span>
                <span className={cn("label shrink-0 border px-2 py-0.5 !text-[0.6rem]", levelStyles[item.level])}>
                  {proficiencyLabels[item.level].label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="stack-title" className="border-t border-line-soft">
        <div className="container-page py-16 md:py-24">
          <h2 id="stack-title" className="label text-accent">
            Engineering
          </h2>
          <dl className="mt-10 divide-y divide-line-soft border-y border-line-soft md:max-w-3xl md:ml-[25%]">
            {engineeringStack.map((row) => (
              <div key={row.group} className="grid gap-2 py-4 sm:grid-cols-[9rem_1fr] sm:gap-8">
                <dt className="label pt-0.5 text-accent">{row.group}</dt>
                <dd className="font-light text-muted">{row.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
