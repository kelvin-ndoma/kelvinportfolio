import Link from "next/link";
import { aboutNarrative } from "@/content/profile";
import { Reveal } from "@/components/motion/reveal";
import { Portrait } from "@/components/site/portrait";

export function AboutPreview() {
  return (
    <section aria-labelledby="about-preview-title" className="relative overflow-hidden border-t border-line-soft">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 size-[28rem] -translate-y-1/2 rounded-full bg-accent/[0.06] blur-3xl md:size-[36rem]"
      />
      <div className="container-page relative grid items-center gap-12 py-20 md:grid-cols-12 md:gap-10 md:py-28">
        <Reveal className="md:col-span-2">
          <h2 id="about-preview-title" className="label text-accent">
            About
          </h2>
        </Reveal>
        <Reveal delay={0.06} className="md:col-span-5 md:col-start-3">
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
        <Reveal delay={0.12} className="md:col-span-4 md:col-start-9">
          <Portrait
            variant="casual"
            layout="float"
            sizes="(max-width: 768px) 18rem, 280px"
          />
        </Reveal>
      </div>
    </section>
  );
}
