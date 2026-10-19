import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

/** Open Graph card — cream + dark type + copper accent. */
export function renderOgImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#FFF2DF",
          color: "#241C17",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 4 }}>
          <span style={{ color: "#A85816", fontWeight: 400 }}>{site.wordmark.toUpperCase()}</span>
          <span style={{ color: "#A85816" }}>{eyebrow.toUpperCase()}</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 50 ? 56 : 72,
            fontWeight: 300,
            lineHeight: 1.02,
            letterSpacing: -2,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#805B40" }}>
          <span>{footer ?? site.title}</span>
          <span>{site.location}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
