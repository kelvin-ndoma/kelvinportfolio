export const projectGroups = [
  "Business systems",
  "SaaS platforms",
  "AI & automation",
  "Consumer products",
  "Websites",
] as const;

export type ProjectGroup = (typeof projectGroups)[number];

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type Project = {
  slug: string;
  name: string;
  /** Category label shown on the project, as written in the brief. */
  category: string;
  /** Broader grouping used by the archive filter. */
  group: ProjectGroup;
  featured: boolean;
  /** One-sentence description used in listings and metadata. */
  summary: string;
  problem: string;
  system: string;
  value: string;
  /** Confirmed technologies only. */
  stack: readonly string[];
  /**
   * A real structural model taken from the project's own domain (hierarchy, pipeline
   * or flow). Used for typography-led covers instead of invented screenshots.
   */
  model: { label: string; shape: "hierarchy" | "sequence"; steps: readonly string[] };
  capabilities?: readonly string[];
  /** Shown only when it qualifies the project, e.g. work still in progress. */
  status?: string;
  /** Real screenshots, when supplied. Galleries are hidden when empty. */
  screenshots?: readonly ProjectImage[];
  related: readonly string[];
};

export const projects = [
  {
    slug: "burns-brothers-task-manager",
    name: "The Burns Brothers Task Manager",
    category: "Business Workflow Systems",
    group: "Business systems",
    featured: true,
    summary:
      "An internal work-planning and task management application that replaces a document-based monthly planning and meeting process with one structured system.",
    problem:
      "Monthly work plans and meeting updates lived in Microsoft Word documents, so assignments, progress and blockers had to be compiled by hand and shared screen by screen.",
    system:
      "A role-based planning system where every task belongs to a deliverable, project and department, with a live meeting presentation mode and generated reports.",
    value:
      "One source of truth for team work. Reports are generated from live records instead of assembled manually, and meetings run from a single shared screen.",
    stack: [
      "Next.js 16",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "Auth.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Zod",
      "Recharts",
      "dnd-kit",
    ],
    model: {
      label: "Work hierarchy", shape: "hierarchy",
      steps: ["Company", "Department", "Project", "Deliverable", "Task", "Activity"],
    },
    capabilities: [
      "Monthly work plans per person, team and project",
      "Weighted task progress that rolls up to deliverables and projects",
      "Kanban board and calendar views",
      "Live meeting presentation with host, audience and presenter modes",
      "Support requests and blockers resolved during meetings",
      "Decisions and action items captured as records",
      "DOCX, PDF and CSV report exports",
      "Admin, manager and team-member roles enforced on the server",
    ],
    related: ["hq-operations", "automator"],
  },
  {
    slug: "hq-operations",
    name: "HQ Operations",
    category: "Business Operations Platform",
    group: "Business systems",
    featured: true,
    summary:
      "An operations platform for a private-events business that coordinates enquiries, quotations, bookings, approvals, payments, vendors and events in one place.",
    problem:
      "The journey from first enquiry to event closeout crossed sales, operations, finance and event staff, with ownership, availability and payment status tracked in separate places.",
    system:
      "A single operational record per event, with an enquiry pipeline, configurable commercial rules, approval thresholds, automated follow-up tasks and role-specific access.",
    value:
      "Every team sees who owns an enquiry, what happens next, whether a space is free, what was quoted and what was paid, with business rules applied consistently.",
    stack: [
      "Next.js 16",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "Zod",
      "React Hook Form",
      "Radix UI",
      "Tailwind CSS",
      "Recharts",
      "Vitest",
    ],
    model: {
      label: "Enquiry pipeline", shape: "sequence",
      steps: [
        "New",
        "Contacted",
        "Qualified",
        "Site visit",
        "Quote sent",
        "Negotiation",
        "Deposit pending",
        "Confirmed",
      ],
    },
    capabilities: [
      "Public enquiry form with spam protection and rate limiting",
      "Enquiry pipeline with site visits and ownership",
      "Quotations with versioning, printable output and client proposal links",
      "Bookings with space holds that release automatically",
      "Approval workflow for discounts, refunds and other exceptions",
      "Payments, event costs, vendors, procurement and inventory",
      "Automated follow-up tasks and notifications",
      "Seven operational roles with server-side permission checks",
    ],
    related: ["burns-brothers-task-manager", "lumdi"],
  },
  {
    slug: "lumdi",
    name: "Lumdi",
    category: "Multi-Tenant SaaS",
    group: "SaaS platforms",
    featured: true,
    summary:
      "A multi-tenant community platform for memberships, events, payments, live streaming, communications and AI-powered recommendations.",
    problem:
      "Membership communities typically run applications, billing, events, messaging and content on separate tools, with no shared view of a member or of the organization.",
    system:
      "A layered SaaS platform where organizations run one or more communities, each with its own plans, applications, events, portal, payments and communications.",
    value:
      "Organizations can run paid memberships, events and member communications from one platform, with card and M-Pesa payments and permissions at every level.",
    stack: [
      "Next.js 14",
      "TypeScript",
      "MongoDB",
      "Prisma",
      "NextAuth",
      "Stripe",
      "M-Pesa (Daraja)",
      "Resend",
      "Cloudinary",
      "LiveKit",
      "Ably",
      "Upstash Redis",
      "OpenAI",
    ],
    model: {
      label: "Tenancy model", shape: "hierarchy",
      steps: ["Platform", "Organization", "House", "Member portal"],
    },
    capabilities: [
      "Platform, organization and house administration surfaces",
      "Membership plans, applications, recurring billing, pauses and cancellations",
      "Member portal with directory, messaging and billing",
      "Events and tickets with QR validation",
      "Stripe cards, subscriptions and Connect payouts; M-Pesa STK Push",
      "Live streaming and real-time chat",
      "Email campaigns and templates with custom sending domains",
      "Member recommendations and audit logs at every level",
    ],
    related: ["automator", "moto-tickets"],
  },
  {
    slug: "automator",
    name: "Automator",
    category: "AI & Automation",
    group: "AI & automation",
    featured: true,
    summary:
      "An AI sales employee SaaS designed around customer enquiries, sales processes and organization-level access controls.",
    problem:
      "Businesses lose sales enquiries when responses depend on someone being available, but handing customer conversations to an AI needs strict control over what it knows and who can change it.",
    system:
      "A multi-tenant product where each business configures an AI sales employee with approved knowledge, tested privately before any customer-facing release.",
    value:
      "A foundation for automating first-line sales responses with tenant isolation, usage limits and audit trails built in from the start.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "Better Auth",
      "OpenAI Responses API",
      "Zod",
      "Vitest",
      "Playwright",
    ],
    model: {
      label: "Configuration flow", shape: "sequence",
      steps: ["Workspace", "AI employee", "Approved knowledge", "Private test chat"],
    },
    capabilities: [
      "Workspaces with currency, locale and time zone",
      "Owner, admin and read-only member roles",
      "AI employee configuration with revision-safe saves",
      "Approved plain-text business knowledge",
      "Private test chat backed by structured model outputs",
      "Per-organization daily request and token ceilings",
      "Platform control center for tenant oversight",
      "Audit events for organization and identity activity",
    ],
    status: "In active development",
    related: ["lumdi", "hq-operations"],
  },
  {
    slug: "shelf-to-self",
    name: "Shelf to Self",
    category: "Mobile Learning Platform",
    group: "Consumer products",
    featured: false,
    summary:
      "A structured learning and behavioral development platform with a 588-day curriculum, progress tracking, gamification and guided daily content.",
    problem:
      "Long personal-development programs lose people when there is no daily structure or visible progress.",
    system:
      "A mobile app and web backend sharing one progression and gamification engine, delivering a linear 588-day journey with an admin for curriculum content.",
    value:
      "Learners get one clear next step each day, and progress rules live in a single shared package used by both mobile and web.",
    stack: ["React Native", "Expo", "TypeScript", "Next.js", "MongoDB", "Zod"],
    model: { label: "Journey", shape: "sequence", steps: ["Day 1", "Daily content", "Progress", "Day 588"] },
    capabilities: [
      "iOS and Android app built with Expo",
      "Linear 588-day curriculum",
      "Shared progression and gamification engine",
      "Next.js admin and API",
    ],
    related: ["nia-sessions", "lumdi"],
  },
  {
    slug: "moto-tickets",
    name: "MOTO Tickets",
    category: "Ticketing & Commerce",
    group: "SaaS platforms",
    featured: false,
    summary:
      "An event ticketing platform with venue layouts, seat selection, inventory holds, checkout and QR ticket validation.",
    problem:
      "Reserved-seat events need accurate seat inventory while many buyers are choosing seats at the same time.",
    system:
      "A ticketing platform with a visual venue layout builder, an interactive seat map, time-limited seat locks and QR validation at the door.",
    value:
      "Organizers can model their venues and sell reserved seating without double-selling seats.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Mongoose", "NextAuth", "Redis", "PixiJS", "Konva", "Kotlin"],
    model: { label: "Ticket flow", shape: "sequence", steps: ["Venue layout", "Seat selection", "Hold", "Checkout", "QR validation"] },
    capabilities: [
      "Visual venue layout builder with sections and rows",
      "GPU-rendered customer seat map",
      "Redis seat locks with real-time updates",
      "Best-available adjacent seat selection",
      "QR ticket generation and validation, including an Android scanner app",
      "Organizer and platform admin dashboards",
    ],
    status: "In active development",
    related: ["lumdi", "nia-sessions"],
  },
  {
    slug: "nia-sessions",
    name: "NIA Sessions",
    category: "Education Technology",
    group: "Consumer products",
    featured: false,
    summary:
      "A digital masterclass platform connecting learners with educational content from African creators.",
    problem:
      "Creators need a dedicated, premium place to publish structured teaching, and learners need a simple way to discover and pay for it.",
    system:
      "A streaming learning platform with browsable sessions, a video player, memberships and checkout, and student and admin dashboards.",
    value: "Brings creator-led learning into one product with accounts, payments and content in the same place.",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Prisma", "MongoDB", "Stripe", "Resend", "Cloudinary"],
    model: { label: "Learner path", shape: "sequence", steps: ["Browse", "Session", "Membership", "Watch"] },
    capabilities: [
      "Session browsing by category",
      "Video playback",
      "Memberships and checkout",
      "Custom authentication with session and device management",
      "Student and admin dashboards",
    ],
    related: ["shelf-to-self", "lumdi"],
  },
  {
    slug: "jamszn",
    name: "JAMSZN",
    category: "Music Technology",
    group: "Consumer products",
    featured: false,
    summary: "A hip-hop music review and discovery platform with structured ratings and community features.",
    problem: "Music opinions are scattered across social feeds without structure or a record of what someone has listened to.",
    system: "A review platform with album data from Spotify, structured ratings, profiles, an activity feed and search.",
    value: "Listeners can rate, review and discover albums in one place and follow other people's listening.",
    stack: ["Next.js", "TypeScript", "Supabase", "Spotify Web API", "TanStack Query", "Tailwind CSS", "Resend"],
    model: { label: "Review loop", shape: "sequence", steps: ["Discover", "Listen", "Rate", "Review", "Share"] },
    capabilities: ["Album pages from Spotify data", "Structured ratings and reviews", "Profiles and activity feed", "Search and charts"],
    related: ["nia-sessions", "shelf-to-self"],
  },
  {
    slug: "piggery",
    name: "Piggery",
    category: "Agricultural Technology",
    group: "Business systems",
    featured: false,
    summary:
      "A pig farm management platform for tracking livestock growth, feeding, breeding, vaccinations and farm operations.",
    problem: "Farm records kept on paper make it hard to see each animal's history or the true cost of feed and treatment.",
    system:
      "A farm platform where every pig has an identity and weights, movements, treatments, breeding, feed, sales and mortality are stored as history.",
    value: "Farm owners see accurate animal histories and costs, and each role sees only what it needs.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Mongoose", "NextAuth", "Zod", "Recharts", "Vitest"],
    model: { label: "Animal record", shape: "hierarchy", steps: ["Identity", "Weights", "Feed", "Health", "Breeding", "Sale"] },
    capabilities: [
      "Individual animal records with full history",
      "Feed, vaccination, treatment and breeding tracking",
      "Sales, expenses and mortality records",
      "Owner, manager, worker, vet and viewer roles checked on the server",
    ],
    related: ["hq-operations", "burns-brothers-task-manager"],
  },
  {
    slug: "njema-technologies",
    name: "Njema Technologies",
    category: "Corporate Website",
    group: "Websites",
    featured: false,
    summary: "A technology company brand and web presence.",
    problem: "A new technology company needed a credible web presence that its team could keep up to date without a developer.",
    system: "A company website with an admin dashboard for services, projects and site settings.",
    value: "The team manages its own content, and the public site stays available with fallback content.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Auth.js", "Cloudinary"],
    model: { label: "Site structure", shape: "sequence", steps: ["Brand", "Services", "Work", "Contact"] },
    related: ["agj-kenya"],
  },
  {
    slug: "agj-kenya",
    name: "AGJ Kenya",
    category: "Web Development",
    group: "Websites",
    featured: false,
    summary: "A responsive organization website built with React and supporting web technologies.",
    problem: "The organization needed a responsive public website with content it could manage itself.",
    system: "A React website backed by an Express API and a separate admin dashboard for content.",
    value: "The organization presents its work clearly on any device and edits content without code changes.",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Express", "MongoDB", "Cloudinary"],
    model: { label: "Site structure", shape: "sequence", steps: ["Website", "API", "Admin"] },
    related: ["njema-technologies"],
  },
] as const satisfies readonly Project[];

export type ProjectSlug = (typeof projects)[number]["slug"];

export function getProject(slug: string): Project | undefined {
  return (projects as readonly Project[]).find((p) => p.slug === slug);
}

export const featuredProjects: readonly Project[] = projects.filter((p) => p.featured);
export const secondaryProjects: readonly Project[] = projects.filter((p) => !p.featured);

export function getRelatedProjects(project: Project): Project[] {
  return project.related.map((slug) => getProject(slug)).filter((p): p is Project => Boolean(p));
}

/** Serializable subset passed to the client-side archive. */
export function toArchiveEntries(list: readonly Project[]) {
  return list.map(({ slug, name, category, group, summary, stack, status }) => ({
    slug,
    name,
    category,
    group,
    summary,
    stack,
    status,
  }));
}
