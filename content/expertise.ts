import type { ProjectSlug } from "./projects";

export type ExpertiseArea = {
  id: string;
  index: string;
  title: string;
  summary: string;
  practices: readonly string[];
  tools: readonly string[];
  evidence: readonly ProjectSlug[];
};

export const expertiseAreas = [
  {
    id: "ai-intelligent-systems",
    index: "01",
    title: "AI & Intelligent Systems",
    summary:
      "Applying language models where they remove real work, with the guardrails a business needs: approved knowledge, usage limits, tenant isolation and private testing before release.",
    practices: [
      "AI-assisted features inside existing products",
      "Structured model outputs validated before use",
      "Per-tenant usage ceilings and request budgets",
      "Approved knowledge sources instead of open-ended prompts",
    ],
    tools: ["OpenAI Responses API", "Zod", "Next.js server actions"],
    evidence: ["automator", "lumdi"],
  },
  {
    id: "workflow-automation",
    index: "02",
    title: "Workflow & Business Automation",
    summary:
      "Mapping how work actually moves through a team, then replacing documents, spreadsheets and hand-offs with systems that enforce the agreed process.",
    practices: [
      "Process discovery and current-state mapping",
      "State machines for pipelines, quotes and bookings",
      "Approval thresholds and exception handling",
      "Event-driven follow-up tasks and notifications",
    ],
    tools: ["Domain modelling", "MongoDB transactions", "Scheduled jobs"],
    evidence: ["hq-operations", "burns-brothers-task-manager"],
  },
  {
    id: "full-stack-engineering",
    index: "03",
    title: "Full-Stack Engineering",
    summary:
      "Building complete applications end to end, from data model and server logic to accessible, responsive interfaces, with typed code and automated checks.",
    practices: [
      "Typed data models and validation at every boundary",
      "Server-side authorization, not hidden buttons",
      "Unit, integration and browser tests",
      "Responsive, accessible interfaces",
    ],
    tools: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "React Native"],
    evidence: ["hq-operations", "shelf-to-self", "piggery"],
  },
  {
    id: "saas-architecture",
    index: "04",
    title: "SaaS & Platform Architecture",
    summary:
      "Designing multi-tenant products where organizations, roles, billing and data boundaries are part of the architecture from the first release.",
    practices: [
      "Layered tenancy: platform, organization and workspace",
      "Role models at every tenancy level",
      "Subscriptions, payouts and plan limits",
      "Audit logging and platform administration",
    ],
    tools: ["Prisma", "Mongoose", "NextAuth", "Better Auth", "Upstash Redis"],
    evidence: ["lumdi", "automator", "moto-tickets"],
  },
  {
    id: "microsoft-365",
    index: "05",
    title: "Microsoft 365 & Business Systems",
    summary:
      "Day-to-day administration of Microsoft 365 collaboration tools, and an understanding of where document-based processes start to need a dedicated system.",
    practices: [
      "User and email account administration",
      "Collaboration across Teams, SharePoint and OneDrive",
      "Office documents as workflow inputs and outputs",
      "Learning Power Automate for workflow automation",
    ],
    tools: ["Microsoft 365 Admin Center", "SharePoint", "Teams", "Outlook", "Microsoft 365 Copilot"],
    evidence: ["burns-brothers-task-manager"],
  },
  {
    id: "digital-growth",
    index: "06",
    title: "Digital Growth Technology",
    summary:
      "Connecting product and marketing: websites that teams can manage themselves, transactional and campaign email, and payments that fit the local market.",
    practices: [
      "Content-managed company websites",
      "Email campaigns and transactional email",
      "Card and mobile-money payments",
      "SEO and structured metadata",
    ],
    tools: ["Resend", "Stripe", "M-Pesa (Daraja)", "Cloudinary"],
    evidence: ["njema-technologies", "lumdi", "agj-kenya"],
  },
] as const satisfies readonly ExpertiseArea[];

export type ProficiencyLevel = "engineering" | "administration" | "learning";

export const proficiencyLabels: Record<ProficiencyLevel, { label: string; description: string }> = {
  engineering: {
    label: "Engineering",
    description: "Used to design and build working software.",
  },
  administration: {
    label: "Administration & daily use",
    description: "Configured, administered or used routinely in professional work. Not custom development.",
  },
  learning: {
    label: "Currently learning",
    description: "Actively studying. No professional implementations claimed.",
  },
};

export const microsoftPlatform: readonly { name: string; level: ProficiencyLevel }[] = [
  { name: "Microsoft 365 Admin Center", level: "administration" },
  { name: "User and email account administration", level: "administration" },
  { name: "SharePoint", level: "administration" },
  { name: "Teams", level: "administration" },
  { name: "Outlook", level: "administration" },
  { name: "OneDrive", level: "administration" },
  { name: "Microsoft 365 Copilot", level: "administration" },
  { name: "Excel, Word, PowerPoint, OneNote", level: "administration" },
  { name: "Viva Engage", level: "administration" },
  { name: "Power Automate", level: "learning" },
];

export const engineeringStack: readonly { group: string; items: readonly string[] }[] = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Kotlin (Android client)"] },
  { group: "Frontend", items: ["Next.js App Router", "React", "React Native & Expo", "Tailwind CSS", "Radix UI"] },
  { group: "Backend", items: ["Node.js", "Next.js server actions", "Express", "REST APIs"] },
  { group: "Data", items: ["MongoDB", "Mongoose", "Prisma", "Supabase", "Redis"] },
  { group: "Identity", items: ["Auth.js / NextAuth", "Better Auth", "Custom JWT sessions"] },
  { group: "Integrations", items: ["OpenAI", "Stripe", "M-Pesa (Daraja)", "Resend", "Cloudinary", "LiveKit", "Ably", "Spotify Web API"] },
  { group: "Quality", items: ["Vitest", "Playwright", "ESLint", "Strict TypeScript"] },
];
