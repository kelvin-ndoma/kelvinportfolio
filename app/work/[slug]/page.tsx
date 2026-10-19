import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { getProject, getRelatedProjects, projects, type Project } from "@/content/projects";
import { hasCaseStudy, loadCaseStudy } from "@/content/case-studies";
import { getStory } from "@/content/stories";
import { ProjectCover } from "@/components/work/project-cover";
import {
  ArchitectureTable,
  CapabilityList,
  DeepDive,
  ProcessShift,
  ScreenshotGallery,
} from "@/components/work/case-study-blocks";
import { CaseStudyOverview } from "@/components/work/case-study-overview";
import { ContactCta } from "@/components/home/contact-cta";
import { JsonLd } from "@/components/site/json-ld";
import { absoluteUrl, pageMetadata } from "@/lib/metadata";
import { site } from "@/content/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found", robots: { index: false } };
  return pageMetadata({
    title: hasCaseStudy(slug) ? `${project.name} case study` : project.name,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

export default function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={<div className="container-page min-h-[60vh] py-24" aria-busy="true" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: Pick<PageProps<"/work/[slug]">, "params">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const CaseStudy = await loadCaseStudy(slug);
  const related = getRelatedProjects(project);
  const index = projects.findIndex((p) => p.slug === project.slug) + 1;
  const story = getStory(project.slug);

  return (
    <>
      <article>
        <header className="container-page pt-12 pb-12 md:pt-16 md:pb-16">
          <nav aria-label="Breadcrumb">
            <ol className="label flex items-center gap-2 text-subtle">
              <li>
                <Link href="/work" className="inline-flex items-center gap-2 transition-colors hover:text-accent">
                  <ArrowLeft className="size-3.5" strokeWidth={1.25} aria-hidden />
                  Work
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-muted">
                {project.name}
              </li>
            </ol>
          </nav>

          <p className="label mt-12 text-accent">
            {project.category}
            {project.status && <span className="text-subtle"> · {project.status}</span>}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-display font-light text-balance">
            {story?.headline ?? project.name}
          </h1>
          {story && <p className="mt-3 text-sm font-light text-subtle">{project.name}</p>}
          <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-muted">
            {story?.lead ?? project.summary}
          </p>

          {story && (
            <div className="mt-14 max-w-3xl">
              <ProcessShift before={project.problem} after={project.system} />
            </div>
          )}
        </header>

        <div className="container-page pb-12 md:pb-16">
          <ProjectCover project={project} index={index} size="lg" />
        </div>

        <div className="container-page grid gap-14 pb-16 md:pb-24 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <AtAGlance project={project} />
            </div>
          </aside>
          <div className="lg:col-span-8 lg:col-start-5">
            <div className="mb-12 border border-line-soft p-5 lg:hidden">
              <AtAGlance project={project} />
            </div>

            <CaseStudyOverview project={project} />
            <ScreenshotGallery project={project} />

            {CaseStudy ? (
              <DeepDive>
                <CaseStudy
                  components={{
                    Capabilities: () => <CapabilityList items={project.capabilities ?? []} />,
                    Architecture: ArchitectureTable,
                  }}
                />
              </DeepDive>
            ) : project.capabilities && project.capabilities.length > 0 ? (
              <DeepDive>
                <CapabilityList items={project.capabilities} />
              </DeepDive>
            ) : null}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line-soft">
          <div className="container-page py-16 md:py-20">
            <h2 id="related-title" className="label text-accent">
              Related
            </h2>
            <ul className="mt-10 grid gap-10 md:grid-cols-2">
              {related.map((r) => {
                const relatedStory = getStory(r.slug);
                return (
                  <li key={r.slug} className="border-t border-line-soft pt-5">
                    <Link href={`/work/${r.slug}`} className="group block">
                      <p className="label text-subtle">{r.category}</p>
                      <h3 className="mt-3 font-display text-title font-light transition-colors group-hover:text-accent">
                        {relatedStory?.headline ?? r.name}
                      </h3>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
      <ContactCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.name,
          description: project.summary,
          url: absoluteUrl(`/work/${project.slug}`),
          genre: project.category,
          keywords: project.stack.join(", "),
          creator: { "@type": "Person", name: site.name, url: site.url },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Work", item: absoluteUrl("/work") },
            { "@type": "ListItem", position: 2, name: project.name, item: absoluteUrl(`/work/${project.slug}`) },
          ],
        }}
      />
    </>
  );
}

function AtAGlance({ project }: { project: Project }) {
  return (
    <dl className="space-y-6 text-sm">
      <div>
        <dt className="label text-subtle">Category</dt>
        <dd className="mt-2 font-light text-paper">{project.category}</dd>
      </div>
      <div>
        <dt className="label text-subtle">{project.model.label}</dt>
        <dd className="mt-2 font-light text-muted">{project.model.steps.join(" → ")}</dd>
      </div>
    </dl>
  );
}
