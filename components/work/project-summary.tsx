import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { getStory } from "@/content/stories";
import { cn } from "@/lib/cn";

/** Consistent information architecture for a project: problem, system, value, stack, link. */
export function ProjectSummary({
  project,
  headingLevel = "h3",
  className,
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const Heading = headingLevel;
  const story = getStory(project.slug);

  return (
    <div className={cn("flex flex-col", className)}>
      <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-accent">
        {project.category}
        {project.status && (
          <span className="rounded-sm border border-line px-2 py-0.5 text-subtle">{project.status}</span>
        )}
      </p>
      <Heading className="mt-4 font-display text-title font-normal text-paper">
        <Link href={`/work/${project.slug}`} className="transition-colors hover:text-accent">
          {story?.headline ?? project.name}
        </Link>
      </Heading>
      <p className="mt-4 text-pretty text-muted">{story?.lead ?? project.summary}</p>
      <dl className="mt-8 divide-y divide-line-soft border-y border-line-soft text-sm">
        {(
          [
            ["Problem", project.problem],
            ["System", project.system],
            ["Value", project.value],
          ] as const
        ).map(([term, detail]) => (
          <div key={term} className="grid gap-1.5 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
            <dt className="label pt-0.5 text-subtle">{term}</dt>
            <dd className="leading-relaxed text-pretty text-muted">{detail}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-1.5" aria-label="Technology">
          {project.stack.slice(0, 4).map((tech) => (
            <li key={tech} className="rounded-sm border border-line-soft px-2.5 py-1 font-mono text-[0.7rem] text-muted">
              {tech}
            </li>
          ))}
        </ul>
        <Link
          href={`/work/${project.slug}`}
          className="group inline-flex items-center gap-2 text-sm font-medium text-paper transition-colors hover:text-accent"
        >
          Read case study<span className="sr-only">: {project.name}</span>
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
