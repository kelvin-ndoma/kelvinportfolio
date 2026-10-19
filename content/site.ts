function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Kelvin Ndoma Mutua",
  brand: "Kelvin Ndoma",
  wordmark: "Kelvin Ndoma",
  title: "AI Solutions Engineer & Full-Stack Developer",
  location: "Nairobi, Kenya",
  url: resolveSiteUrl(),
  headline: "Building better ways to work.",
  intro: "Software Engineering · AI · Automation",
  description:
    "Kelvin Ndoma Mutua is a full-stack software engineer and AI solutions builder in Nairobi, Kenya, designing business workflow systems, multi-tenant SaaS platforms and AI-assisted applications for international teams.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "kelvinndomamutua@gmail.com",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || null,
  github: process.env.NEXT_PUBLIC_GITHUB_URL || null,
} as const;

export const navigation = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/expertise", label: "Expertise" },
  { href: "/contact", label: "Contact" },
] as const;

export const whatIDo = [
  {
    title: "Engineer",
    body: "Full-stack systems shaped around how teams actually work.",
  },
  {
    title: "Automate",
    body: "Workflows and AI that remove hand-offs, not judgment.",
  },
  {
    title: "Improve",
    body: "Iterate with the people using it until the process holds.",
  },
] as const;

export const credibility = [
  "Full-stack engineering",
  "AI-assisted solutions",
  "Business workflow design",
  "Microsoft 365 ecosystem",
  "International collaboration",
] as const;
