import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { hasCaseStudy } from "@/content/case-studies";
import { absoluteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/work", "/expertise", "/about", "/contact", "/resume"].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
  const work = projects.map((p) => ({
    url: absoluteUrl(`/work/${p.slug}`),
    changeFrequency: "monthly" as const,
    priority: hasCaseStudy(p.slug) ? 0.9 : 0.6,
  }));
  return [...pages, ...work];
}
