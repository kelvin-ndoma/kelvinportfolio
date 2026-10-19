import type { Metadata } from "next";
import { site } from "@/content/site";

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

/** Page metadata with canonical URL and Open Graph fields filled in consistently. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${site.brand}`,
      description,
      url: path,
      type: "website",
      siteName: site.brand,
      locale: "en_KE",
    },
    twitter: { card: "summary_large_image", title: `${title} · ${site.brand}`, description },
  };
}
