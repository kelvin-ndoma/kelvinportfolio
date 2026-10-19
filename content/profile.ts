/**
 * About and resume content. Only confirmed fields are filled in.
 */

export type PathEntry = {
  title: string;
  kind: "Education" | "Training" | "Experience" | "Practice";
  description: string;
  period?: string;
  organization?: string;
};

export const aboutNarrative = [
  "I came to software through mathematics and physics, then learned how businesses actually run — marketing, operations, the documents and hand-offs nobody owns. Now I build systems that make that work clearer: planning tools, operations platforms, SaaS products, and AI with the controls a company can trust.",
] as const;

export const aboutDetails = [
  { label: "Based in", value: "Nairobi, Kenya" },
  { label: "Focus", value: "Business systems · AI · Automation" },
  { label: "Works with", value: "International remote teams" },
] as const;

export const principles = [
  {
    title: "Process before product",
    body: "Start with how work moves, not a feature list.",
  },
  {
    title: "Rules in the system",
    body: "Approvals and permissions live in software, not memory.",
  },
  {
    title: "Honest scope",
    body: "Say what is finished, what is partial, what is next.",
  },
] as const;

/** Kept for resume page; About page no longer leads with a timeline. */
export const path: readonly PathEntry[] = [
  {
    title: "Applied Mathematics and Physics",
    kind: "Education",
    description: "Modelling and structured problem solving.",
  },
  {
    title: "Full-stack software engineering",
    kind: "Training",
    description: "Frontend, backend, data and deployment.",
  },
  {
    title: "Digital marketing and business operations",
    kind: "Experience",
    description: "Marketing technology and day-to-day operations.",
  },
  {
    title: "International remote collaboration",
    kind: "Experience",
    description: "Distributed teams coordinated through Microsoft 365.",
  },
  {
    title: "Business systems and AI-assisted software",
    kind: "Practice",
    description: "Workflow platforms, SaaS and AI-assisted applications.",
  },
];

export const availability = "Messages come straight to my inbox.";
