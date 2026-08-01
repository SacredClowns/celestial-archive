import Link from "next/link";
import { HomeBelowFold } from "@/components/home/home-below-fold";
import { OpeningExperience } from "@/components/home/opening-experience";

const LETTER_TITLES = [
  "UN", "PA", "VEH", "GED", "GAL", "OR", "GRAPH",
  "TAL", "GON", "NA", "UR", "MALS", "GER", "DRUX",
  "PAL", "MED", "DON", "CEPH", "VAU", "FAM", "GISG"
];

export default function HomePage() {
  return (
    <div>
      <section className="section-depth relative overflow-hidden text-center">
        {/* orbiting ring of the 21 letter-titles */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 opacity-70 sm:h-[680px] sm:w-[680px]">
          <div className="animate-slow-spin absolute inset-0" style={{ animationDuration: "120s" }}>
            {LETTER_TITLES.map((t, i) => (
              <span
                key={t}
                className="absolute left-1/2 top-1/2 font-display text-[10px] tracking-[0.3em] text-gold-dim/50"
                style={{
                  transform: `rotate(${(i / LETTER_TITLES.length) * 360}deg) translateY(-265px) rotate(90deg)`
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="absolute inset-[70px] rounded-full border border-gold-dim/15" />
          <div className="absolute inset-[110px] rounded-full border border-gold-dim/10" />
        </div>

        <p className="font-display text-[9px] uppercase tracking-[0.36em] text-gold-dim">A structured exploration</p>
        <h1 className="hero-shimmer mt-4 font-display text-5xl tracking-[0.14em] sm:text-7xl">ENOCHIAN</h1>
        <p className="mt-3 font-display text-sm uppercase tracking-[0.28em] text-gold-light/80">The Celestial Archive</p>

        <p className="mx-auto mt-7 max-w-md text-base italic leading-relaxed text-gold-light/70">
          Nothing here asks you to believe.
          <br />
          Everything here asks you to look carefully.
        </p>

        <div className="mx-auto mt-8 h-px w-24 bg-gold-dim/40" />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/path/seeker/the-lost-language"
            className="inline-block border border-gold/70 bg-gold/10 px-8 py-3 font-display text-[10px] uppercase tracking-[0.18em] text-gold-pale shadow-gold transition-all hover:bg-gold/20 hover:text-white"
          >
            Begin the Path
          </Link>
          <Link
            href="/archive"
            className="inline-block border border-gold/40 bg-deep/50 px-8 py-3 font-display text-[10px] uppercase tracking-[0.18em] text-gold transition-colors hover:border-gold/70 hover:bg-deep/70 hover:text-gold-pale"
          >
            Enter the Archive
          </Link>
        </div>

        <p className="mt-14 animate-bounce font-display text-[9px] uppercase tracking-[0.34em] text-gold-dim/60">
          ▾ the thirty heavens await ▾
        </p>
      </section>

      <OpeningExperience />

      <HomeBelowFold />
    </div>
  );
}
