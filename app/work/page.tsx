import Link from "next/link";
import { projectGroups, projects, toArchiveEntries, getProject } from "@/content/projects";
import { featuredStories } from "@/content/stories";
import { ProjectCover } from "@/components/work/project-cover";
import { ProjectArchive } from "@/components/work/project-archive";
import { ContactCta } from "@/components/home/contact-cta";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Case studies by Kelvin Ndoma: business workflow systems, operations platforms, multi-tenant SaaS and AI-assisted products.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <section className="container-page pt-16 pb-12 md:pt-24 md:pb-16">
        <p className="label text-accent">Work</p>
        <h1 className="mt-6 max-w-[12ch] font-display text-display font-light tracking-tight">
          Selected systems.
        </h1>
        <p className="mt-6 max-w-md text-base font-light text-muted">
          {projects.length} projects. Four featured case studies.
        </p>
      </section>

      <section aria-labelledby="case-studies-title" className="border-t border-line-soft">
        <div className="container-page py-12 md:py-16">
          <h2 id="case-studies-title" className="sr-only">
            Featured case studies
          </h2>
          <ul>
            {featuredStories.map((story, i) => {
              const project = getProject(story.slug)!;
              const flip = i % 2 === 1;
              return (
                <li key={story.slug} className="border-t border-line-soft first:border-t-0">
                  <Link
                    href={`/work/${project.slug}`}
                    className="group grid items-center gap-8 py-12 md:grid-cols-12 md:gap-10 md:py-16"
                  >
                    <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
                      <ProjectCover project={project} index={i + 1} size="lg" />
                    </div>
                    <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
                      <p className="label text-accent">{project.category}</p>
                      <h3 className="mt-4 font-display text-headline font-light transition-colors group-hover:text-accent">
                        {project.name}
                      </h3>
                      <p className="mt-4 max-w-sm font-light leading-relaxed text-muted">{story.line}</p>
                      <span className="label mt-8 inline-block text-accent">View →</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="all-projects-title" className="border-t border-line-soft">
        <div className="container-page py-16 md:py-24">
          <h2 id="all-projects-title" className="font-display text-headline font-light">
            All projects
          </h2>
          <div className="mt-10">
            <ProjectArchive projects={toArchiveEntries(projects)} groups={projectGroups} />
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
