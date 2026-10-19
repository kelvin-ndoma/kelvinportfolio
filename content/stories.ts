import type { ProjectSlug } from "./projects";

/**
 * Concise storytelling layer for featured work.
 * Facts stay in projects.ts; this shapes presentation voice only.
 */
export type ProjectStory = {
  slug: ProjectSlug;
  headline: string;
  /** One-line homepage description. */
  line: string;
  lead: string;
  accent: "task" | "hq" | "lumdi" | "automator";
};

export const featuredStories: readonly ProjectStory[] = [
  {
    slug: "burns-brothers-task-manager",
    headline: "The problem wasn't the people. It was the process.",
    line: "Word-based monthly planning replaced by one planning system.",
    lead: "Monthly planning lived in Word. Assignments and blockers were assembled by hand. The work needed a system.",
    accent: "task",
  },
  {
    slug: "hq-operations",
    headline: "From scattered enquiries to one operational system.",
    line: "Enquiries through events in a single operational record.",
    lead: "Enquiries, quotes, bookings and payments each had their own trail. One record now carries the journey.",
    accent: "hq",
  },
  {
    slug: "lumdi",
    headline: "One platform. Many communities.",
    line: "Multi-tenant memberships, events and payments.",
    lead: "Memberships, events and payments sat in separate tools. Lumdi connects them under one platform.",
    accent: "lumdi",
  },
  {
    slug: "automator",
    headline: "A sales workflow with AI at its core.",
    line: "AI sales employee with approved knowledge and audit trails.",
    lead: "A multi-tenant foundation for AI sales: approved knowledge, private testing, usage limits, audit trails.",
    accent: "automator",
  },
] as const;

export function getStory(slug: string): ProjectStory | undefined {
  return featuredStories.find((s) => s.slug === slug);
}

export const accentVar: Record<ProjectStory["accent"], string> = {
  task: "var(--color-project-task)",
  hq: "var(--color-project-hq)",
  lumdi: "var(--color-project-lumdi)",
  automator: "var(--color-project-automator)",
};
