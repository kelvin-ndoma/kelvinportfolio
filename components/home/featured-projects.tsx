import Link from "next/link";
import { getProject } from "@/content/projects";
import { featuredStories } from "@/content/stories";
import { ProjectCover } from "@/components/work/project-cover";
import { Reveal } from "@/components/motion/reveal";
import { OrganicLine } from "@/components/motion/organic-line";
import { cn } from "@/lib/cn";

/** Editorial selected work — name, one line, category, view. No feature lists. */
export function FeaturedProjects() {
  const items = featuredStories.map((story) => ({
    story,
    project: getProject(story.slug)!,
  }));

  return (
    <section id="selected-work" aria-labelledby="selected-title" className="pb-8 pt-6 md:pb-12">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6 border-t border-line-soft pt-10">
          <h2 id="selected-title" className="label text-accent">
            Selected work
          </h2>
          <Link href="/work" className="label text-muted transition-colors hover:text-accent">
            All projects
          </Link>
        </div>
      </div>

      <ul className="mt-6 md:mt-10">
        {items.map(({ story, project }, i) => {
          const odd = i % 2 === 1;
          return (
            <li key={project.slug} className="border-t border-line-soft">
              <Reveal as="article">
                <Link
                  href={`/work/${project.slug}`}
                  className="group container-page grid gap-8 py-14 md:grid-cols-12 md:gap-10 md:py-20"
                >
                  <div
                    className={cn(
                      "md:col-span-7",
                      odd && "md:order-2",
                    )}
                  >
                    <ProjectCover
                      project={project}
                      index={i + 1}
                      size={i === 0 ? "lg" : "md"}
                      className="transition-[opacity,transform] duration-500 group-hover:opacity-95"
                    />
                  </div>
                  <div
                    className={cn(
                      "flex flex-col justify-center md:col-span-5",
                      odd && "md:order-1",
                      i === 0 && "md:pt-4",
                      i === 3 && "md:pb-8",
                    )}
                  >
                    <p className="label text-accent">
                      {project.category}
                      {project.status && <span className="text-subtle"> · {project.status}</span>}
                    </p>
                    <h3 className="mt-4 font-display text-headline font-light text-paper transition-colors group-hover:text-accent">
                      {project.name}
                    </h3>
                    <p className="mt-4 max-w-sm text-base font-light leading-relaxed text-muted">
                      {story.line}
                    </p>
                    <span className="label mt-8 text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:opacity-100">
                      View project →
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <div className="container-page py-6">
        <OrganicLine variant="section" className="opacity-50" />
      </div>
    </section>
  );
}
