import { getProject, projects } from "@/content/projects";
import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Project case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    eyebrow: project?.category ?? "Work",
    title: project?.name ?? "Project",
    footer: project?.summary.slice(0, 90).replace(/\s\S*$/, "…"),
  });
}
