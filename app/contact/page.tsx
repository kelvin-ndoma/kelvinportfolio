import { ContactForm } from "@/components/contact/contact-form";
import { availability } from "@/content/profile";
import { site } from "@/content/site";
import { OrganicLine } from "@/components/motion/organic-line";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact Kelvin Ndoma about business process challenges, technology projects and opportunities.",
  path: "/contact",
});

export default function ContactPage() {
  const channels = [
    { label: "Email", href: `mailto:${site.email}`, value: site.email, external: false },
    ...(site.linkedin ? [{ label: "LinkedIn", href: site.linkedin, value: "Profile", external: true }] : []),
    ...(site.github ? [{ label: "GitHub", href: site.github, value: "Profile", external: true }] : []),
  ];

  return (
    <section className="container-page pt-16 pb-24 md:pt-24 md:pb-32">
      <p className="label text-accent">Contact</p>
      <h1 className="mt-6 max-w-[10ch] font-display text-display font-light tracking-tight">
        Write to me.
      </h1>
      <p className="mt-6 max-w-sm text-base font-light text-muted">{availability}</p>
      <OrganicLine variant="section" className="mt-12 opacity-40" />

      <div className="mt-16 grid gap-14 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <dl className="space-y-6">
            {channels.map((c) => (
              <div key={c.label}>
                <dt className="label text-accent">{c.label}</dt>
                <dd className="mt-2">
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "me noopener noreferrer" } : {})}
                    className="break-all text-sm font-light text-paper underline decoration-line-soft underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    {c.value}
                    {c.external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </dd>
              </div>
            ))}
            <div>
              <dt className="label text-accent">Based in</dt>
              <dd className="mt-2 text-sm font-light text-paper">{site.location}</dd>
            </div>
          </dl>
        </aside>
        <div className="lg:col-span-8 lg:col-start-5">
          <h2 className="sr-only">Contact form</h2>
          <ContactForm email={site.email} />
        </div>
      </div>
    </section>
  );
}
