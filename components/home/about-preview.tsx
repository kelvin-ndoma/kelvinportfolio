import Link from "next/link";
import { aboutNarrative } from "@/content/profile";
import { Reveal } from "@/components/motion/reveal";

export function AboutPreview() {
  return (
    <section aria-labelledby="about-preview-title" className="border-t border-line-soft">
      <div className="container-page grid gap-10 py-20 md:grid-cols-12 md:gap-12 md:py-28">
        <Reveal className="md:col-span-3">
          <h2 id="about-preview-title" className="label text-accent">
            About
          </h2>
        </Reveal>
        <Reveal delay={0.06} className="md:col-span-7 md:col-start-5">
          <p className="font-display text-[clamp(1.35rem,1.05rem+1.2vw,1.85rem)] font-light leading-snug tracking-tight text-pretty text-paper">
            {aboutNarrative[0]}
          </p>
          <Link
            href="/about"
            className="label mt-10 inline-block text-accent transition-opacity hover:opacity-70"
          >
            More about me →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
