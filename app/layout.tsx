import type { Metadata, Viewport } from "next";
import { Great_Vibes, JetBrains_Mono, Outfit } from "next/font/google";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { JsonLd } from "@/components/site/json-ld";
import { site } from "@/content/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});

const greatVibes = Great_Vibes({
  variable: "--font-signature",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} · ${site.title}`,
    template: `%s · ${site.brand}`,
  },
  description: site.description,
  applicationName: site.brand,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.brand,
    locale: "en_KE",
    url: "/",
    title: `${site.brand} · ${site.title}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fff2df",
  colorScheme: "light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.brand,
  jobTitle: site.title,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  knowsAbout: [
    "Business process improvement",
    "Workflow automation",
    "AI-assisted applications",
    "Full-stack software development",
    "SaaS architecture",
    "Microsoft 365",
  ],
  sameAs: [site.linkedin, site.github].filter(Boolean),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-KE" className={`${outfit.variable} ${jetbrains.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="atmosphere flex min-h-dvh flex-col">
        <a
          href="#main"
          className="label sr-only z-[100] bg-dark px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={personJsonLd} />
      </body>
    </html>
  );
}
