import type { Project } from "@/content/projects";
import { getStory } from "@/content/stories";
import { cn } from "@/lib/cn";

/**
 * Typography-led project visual from the project's real structural model.
 * Never presented as a product screenshot.
 */
export function ProjectCover({
  project,
  index,
  size = "md",
  className,
}: {
  project: Project;
  index?: number;
  size?: "md" | "lg";
  className?: string;
}) {
  const { model } = project;
  const lg = size === "lg";
  const story = getStory(project.slug);

  return (
    <figure
      className={cn(
        "relative isolate flex flex-col justify-between overflow-hidden border border-line-soft bg-surface-raised p-6 sm:p-8",
        lg ? "min-h-[20rem] lg:min-h-[28rem]" : "min-h-[18rem] lg:min-h-[22rem]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 50% at 85% 15%, var(--color-accent-soft), transparent 55%),
            linear-gradient(to right, var(--color-line-soft) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-line-soft) 1px, transparent 1px)
          `,
          backgroundSize: "auto, 2.75rem 2.75rem, 2.75rem 2.75rem",
          maskImage: "radial-gradient(ellipse at 80% 10%, black 20%, transparent 70%)",
        }}
      />

      <div className="flex items-start justify-between gap-4">
        <figcaption className="label text-subtle">
          {model.label}
        </figcaption>
        {index !== undefined && (
          <span className="label text-accent" aria-hidden>
            {String(index).padStart(2, "0")}
          </span>
        )}
      </div>

      {model.shape === "hierarchy" ? (
        <ol className="my-8 space-y-2" aria-label={`${model.label} for ${project.name}`}>
          {model.steps.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-3 text-sm"
              style={{ paddingLeft: `${Math.min(i, 5) * (lg ? 1.35 : 1)}rem` }}
            >
              <span aria-hidden className={cn("h-px w-4 shrink-0", i === 0 ? "bg-accent" : "bg-line-soft")} />
              <span
                className={cn(
                  "border px-2.5 py-1 font-mono text-[0.72rem]",
                  i === 0 ? "border-accent/40 text-paper" : "border-line-soft text-muted",
                )}
              >
                {step}
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <ol className="my-8 flex flex-wrap items-center gap-x-2 gap-y-3" aria-label={`${model.label} for ${project.name}`}>
          {model.steps.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span
                className={cn(
                  "border px-2.5 py-1 font-mono text-[0.72rem]",
                  i === model.steps.length - 1 ? "border-accent/40 text-paper" : "border-line-soft text-muted",
                )}
              >
                {step}
              </span>
              {i < model.steps.length - 1 && <span aria-hidden className="text-subtle">→</span>}
            </li>
          ))}
        </ol>
      )}

      <p
        aria-hidden
        className={cn(
          "font-display font-light tracking-tight text-paper/90",
          lg
            ? "text-[clamp(2rem,1.2rem+2.8vw,3.75rem)] leading-[0.95]"
            : "text-[clamp(1.65rem,1.2rem+1.4vw,2.35rem)] leading-none",
        )}
      >
        {project.name}
      </p>
      {story && <span className="sr-only">{story.headline}</span>}
    </figure>
  );
}
