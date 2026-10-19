import type { MDXContent } from "mdx/types";
import type { ProjectSlug } from "./projects";

/** Long-form MDX case studies. Projects without an entry get a concise project page. */
const loaders: Partial<Record<ProjectSlug, () => Promise<{ default: MDXContent }>>> = {
  "burns-brothers-task-manager": () => import("./work/burns-brothers-task-manager.mdx"),
  "hq-operations": () => import("./work/hq-operations.mdx"),
  lumdi: () => import("./work/lumdi.mdx"),
  automator: () => import("./work/automator.mdx"),
};

export function hasCaseStudy(slug: string): boolean {
  return slug in loaders;
}

export async function loadCaseStudy(slug: string): Promise<MDXContent | null> {
  const load = loaders[slug as ProjectSlug];
  return load ? (await load()).default : null;
}
