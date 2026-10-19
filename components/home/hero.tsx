import Link from "next/link";
import { site } from "@/content/site";
import { OrganicLine } from "@/components/motion/organic-line";
import { Reveal } from "@/components/motion/reveal";
import { BurnsPreview } from "./burns-preview";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-6 md:pb-24 md:pt-10">
      <OrganicLine
        variant="hero"
        interactive
        className="pointer-events-none absolute inset-x-0 top-[38%] -z-0 h-[6rem] opacity-50 md:top-[42%] md:h-[8rem]"
      />

      <div className="container-page relative z-10 grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal reveal="fade">
            <h1
              id="hero-title"
              className="max-w-[10ch] font-display text-display font-light tracking-[-0.045em] text-paper"
            >
              Kelvin
              <br />
              Ndoma.
            </h1>

            <p className="label mt-8 text-accent">{site.intro}</p>
            <div aria-hidden className="mt-5 h-px w-16 bg-line" />

            <p className="mt-6 max-w-sm text-base font-light tracking-wide text-muted md:text-lg">
              {site.headline}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <Link
                href="#selected-work"
                className="group inline-flex items-center gap-3 text-sm font-light tracking-wide text-paper transition-colors hover:text-accent"
              >
                <span
                  aria-hidden
                  className="size-2.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-110"
                />
                Explore Selected Work
                <span aria-hidden className="text-accent">
                  →
                </span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-light tracking-wide text-muted transition-colors hover:text-accent"
              >
                About My Approach
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-6" reveal="fade">
          <BurnsPreview />
        </Reveal>
      </div>
    </section>
  );
}
