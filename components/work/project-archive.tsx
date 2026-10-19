"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import type { Project, ProjectGroup } from "@/content/projects";
import { cn } from "@/lib/cn";

type ArchiveProject = Pick<Project, "slug" | "name" | "category" | "group" | "summary" | "stack" | "status">;

export function ProjectArchive({
  projects,
  groups,
  headingLevel = "h3",
}: {
  projects: readonly ArchiveProject[];
  groups: readonly ProjectGroup[];
  headingLevel?: "h2" | "h3";
}) {
  const [active, setActive] = useState<ProjectGroup | "All">("All");
  const statusId = useId();
  const Heading = headingLevel;

  const available = useMemo(() => groups.filter((g) => projects.some((p) => p.group === g)), [groups, projects]);
  const visible = active === "All" ? projects : projects.filter((p) => p.group === active);
  const filters: (ProjectGroup | "All")[] = ["All", ...available];

  return (
    <div>
      <div role="group" aria-label="Filter projects by type" aria-describedby={statusId} className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const count = filter === "All" ? projects.length : projects.filter((p) => p.group === filter).length;
          const pressed = active === filter;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActive(filter)}
              className={cn(
                "inline-flex h-9 items-center gap-2 border px-4 text-sm font-light transition-colors",
                pressed ? "border-dark bg-dark text-ink" : "border-line-soft text-muted hover:border-line hover:text-paper",
              )}
            >
              {filter}
              <span className={cn("font-mono text-[0.7rem]", pressed ? "text-ink/70" : "text-subtle")}>{count}</span>
            </button>
          );
        })}
      </div>
      <p id={statusId} role="status" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {active === "All" ? "" : ` in ${active}`}.
      </p>

      <ul className="mt-8 border-t border-line-soft">
        {visible.map((project) => (
          <li key={project.slug} className="border-b border-line-soft">
            <Link
              href={`/work/${project.slug}`}
              className="group grid gap-x-8 gap-y-2 py-6 md:grid-cols-12 md:items-baseline md:py-7"
            >
              <div className="md:col-span-4">
                <Heading className="font-display text-xl font-light text-paper transition-colors group-hover:text-accent">
                  {project.name}
                </Heading>
                <p className="label mt-2 text-subtle">
                  {project.category}
                  {project.status && <span className="text-muted"> · {project.status}</span>}
                </p>
              </div>
              <p className="text-sm font-light leading-relaxed text-muted md:col-span-6">{project.summary}</p>
              <p className="label text-accent md:col-span-2 md:text-right">View →</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
