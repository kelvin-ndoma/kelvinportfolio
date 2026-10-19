"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import type { Project } from "@/content/projects";

export function CapabilityList({ items }: { items: readonly string[] }) {
  return (
    <>
      <h2>System capabilities</h2>
      <ul className="!mt-6 grid gap-0 sm:grid-cols-2 sm:gap-x-8">
        {items.map((item, i) => (
          <li key={item} className="!m-0 border-t border-line-soft !py-4 before:!hidden">
            <span className="label mb-2 block text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[0.95rem] font-light leading-relaxed text-paper">{item}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export function ArchitectureTable({ layers }: { layers: readonly { name: string; detail: string }[] }) {
  return (
    <dl className="!mt-6 divide-y divide-line-soft border-y border-line-soft">
      {layers.map((layer) => (
        <div key={layer.name} className="grid gap-2 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
          <dt className="label pt-1 text-accent">{layer.name}</dt>
          <dd className="text-[0.95rem] font-light leading-relaxed">{layer.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ScreenshotGallery({ project }: { project: Project }) {
  const shots = project.screenshots ?? [];
  if (shots.length === 0) return null;
  return (
    <section aria-labelledby="gallery-title" className="mt-16 border-t border-line-soft pt-8">
      <h2 id="gallery-title" className="font-display text-title font-light">
        Screenshots
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {shots.map((shot, i) => (
          <figure key={shot.src} className={i === 0 ? "md:col-span-2" : undefined}>
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes={i === 0 ? "(min-width: 1024px) 75vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
              className="border border-line-soft"
            />
            {shot.caption && <figcaption className="mt-3 text-sm text-subtle">{shot.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}

export function ProcessShift({ before, after }: { before: string; after: string }) {
  return (
    <div className="grid gap-8 border-y border-line-soft py-8 sm:grid-cols-2 sm:gap-12">
      <div>
        <p className="label text-muted">Before</p>
        <p className="mt-3 font-display text-lg font-light leading-snug tracking-tight text-paper">{before}</p>
      </div>
      <div>
        <p className="label text-accent">After</p>
        <p className="mt-3 font-display text-lg font-light leading-snug tracking-tight text-paper">{after}</p>
      </div>
    </div>
  );
}

/** Progressive disclosure for long MDX case studies. */
export function DeepDive({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-16 border-t border-line-soft pt-8">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="label text-accent transition-opacity hover:opacity-70"
      >
        {open ? "Hide technical detail ↑" : "Read technical detail ↓"}
      </button>
      {open && <div className="prose-case mt-10">{children}</div>}
    </div>
  );
}
