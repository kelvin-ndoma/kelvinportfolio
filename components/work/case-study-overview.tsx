import type { Project } from "@/content/projects";
import { getStory } from "@/content/stories";

/**
 * 30-second case study summary — problem, solution, stack highlights.
 * Full MDX detail sits behind progressive disclosure on the project page.
 */
export function CaseStudyOverview({ project }: { project: Project }) {
  const story = getStory(project.slug);

  return (
    <div className="space-y-12">
      <div>
        <h2 className="label text-accent">Problem</h2>
        <p className="mt-4 max-w-2xl font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.6rem)] font-light leading-snug text-paper">
          {story?.lead ?? project.problem}
        </p>
      </div>
      <div>
        <h2 className="label text-accent">Solution</h2>
        <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-muted">{project.system}</p>
      </div>
      <div>
        <h2 className="label text-accent">Outcome</h2>
        <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-muted">{project.value}</p>
      </div>
      {project.model && (
        <div>
          <h2 className="label text-accent">{project.model.label}</h2>
          <p className="mt-4 font-mono text-sm leading-relaxed text-muted">
            {project.model.steps.join(" → ")}
          </p>
        </div>
      )}
      <div>
        <h2 className="label text-accent">Stack</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech} className="border border-line-soft px-2.5 py-1 font-mono text-[0.7rem] text-muted">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
