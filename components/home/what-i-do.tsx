import { whatIDo } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export function WhatIDo() {
  return (
    <section aria-labelledby="practice-title" className="container-page py-20 md:py-28">
      <h2 id="practice-title" className="label text-accent">
        What I do
      </h2>
      <ul className="mt-12 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-10">
        {whatIDo.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 0.06} className="border-t border-line-soft pt-6">
            <p className="label text-subtle">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-5 font-display text-[clamp(1.75rem,1.3rem+1.5vw,2.5rem)] font-light tracking-tight text-paper">
              {item.title}
            </h3>
            <p className="mt-4 max-w-xs text-base font-light leading-relaxed text-muted">{item.body}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
