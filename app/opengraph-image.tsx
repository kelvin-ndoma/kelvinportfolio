import { renderOgImage, ogSize } from "@/lib/og";
import { site } from "@/content/site";

export const alt = `${site.brand}: ${site.headline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ eyebrow: "Portfolio", title: site.headline });
}
