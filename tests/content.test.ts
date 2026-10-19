import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { featuredProjects, getProject, projectGroups, projects } from "@/content/projects";
import { expertiseAreas, microsoftPlatform } from "@/content/expertise";
import { hasCaseStudy } from "@/content/case-studies";

describe("project registry", () => {
  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("features the four agreed projects in order", () => {
    expect(featuredProjects.map((p) => p.slug)).toEqual([
      "burns-brothers-task-manager",
      "hq-operations",
      "lumdi",
      "automator",
    ]);
  });

  it("only relates to projects that exist, never to itself", () => {
    for (const p of projects) {
      for (const slug of p.related) {
        expect(getProject(slug), `${p.slug} -> ${slug}`).toBeDefined();
        expect(slug).not.toBe(p.slug);
      }
    }
  });

  it("uses known filter groups", () => {
    for (const p of projects) expect(projectGroups).toContain(p.group);
  });

  it("gives every featured project a long-form case study and capabilities", () => {
    for (const p of featuredProjects) {
      expect(hasCaseStudy(p.slug), p.slug).toBe(true);
      expect(p.capabilities?.length ?? 0, p.slug).toBeGreaterThan(0);
    }
  });

  it("only links expertise evidence to real projects", () => {
    for (const area of expertiseAreas) for (const slug of area.evidence) expect(getProject(slug)).toBeDefined();
  });

  it("never claims Power Automate beyond learning", () => {
    expect(microsoftPlatform.find((m) => m.name === "Power Automate")?.level).toBe("learning");
  });
});

describe("public copy", () => {
  const files = [
    ...readdirSync("content/work").map((f) => join("content/work", f)),
    ...readdirSync("content").filter((f) => f.endsWith(".ts")).map((f) => join("content", f)),
  ];

  it.each(files)("%s contains no editorial notes or placeholders", (file) => {
    const text = readFileSync(file, "utf8");
    expect(text).not.toMatch(/\b(TODO|TBD|FIXME|lorem ipsum)\b/i);
    expect(text).not.toMatch(/\[(placeholder|insert)[^\]]*\]/i);
  });

  it("case studies contain no credentials or seed data", () => {
    for (const file of files.filter((f) => f.endsWith(".mdx"))) {
      const text = readFileSync(file, "utf8");
      expect(text).not.toMatch(/password\s*[:=`]|[\w.+-]+@[a-z0-9-]+\.(com|local|test)|mongodb(\+srv)?:\/\//i);
    }
  });
});
