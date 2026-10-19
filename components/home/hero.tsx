import { site } from "@/content/site";
import { OrganicLine } from "@/components/motion/organic-line";
import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100dvh-4.5rem)] flex-col justify-between overflow-hidden pb-10 pt-6 md:pb-14 md:pt-10"
    >
      <div className="container-page flex items-start justify-between gap-6">
        <p className="label text-accent">
          {site.wordmark}
          <span className="ml-1 opacity-60" aria-hidden>
            ®
          </span>
        </p>
        <p className="label text-accent">Portfolio / 2026</p>
      </div>

      <div className="container-page relative z-10 mt-20 flex-1 md:mt-16 lg:mt-12">
        <Reveal reveal="fade" className="relative">
          <h1
            id="hero-title"
            className="relative z-10 max-w-[9ch] font-display text-display font-light tracking-[-0.045em] text-paper"
          >
            Kelvin
            <br />
            Ndoma.
          </h1>
          <p className="label relative z-10 mt-7 text-accent md:mt-8">{site.intro}</p>
        </Reveal>

        {/* Line weaves through the name block — behind first line, across the composition */}
        <div className="pointer-events-none absolute inset-x-[-8%] top-[22%] -z-0 md:top-[28%] lg:inset-x-[-12%] lg:top-[32%]">
          <OrganicLine variant="hero" interactive className="h-[5.5rem] opacity-75 md:h-[7rem]" />
        </div>
      </div>

      <div className="container-page relative z-10 mt-auto flex flex-col gap-5 pt-16 sm:flex-row sm:items-end sm:justify-between md:pt-8">
        <a href="#selected-work" className="label text-accent transition-opacity hover:opacity-65">
          Selected work <span aria-hidden>↓</span>
        </a>
        <p className="max-w-xs text-sm font-light tracking-wide text-accent sm:text-right">
          {site.headline}
        </p>
      </div>
    </section>
  );
}
