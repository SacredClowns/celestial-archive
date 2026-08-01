import Link from "next/link";
import { HomeBelowFold } from "@/components/home/home-below-fold";
import { OpeningExperience } from "@/components/home/opening-experience";

/** The 21 letter-names in canonical received order, positions 1–21. */
const LETTER_TITLES = [
  "UN", "PA", "VEH", "GAL", "GRAPH", "OR", "GED",
  "NA", "GON", "UR", "TAL", "DRUX", "MED", "MALS",
  "GER", "DON", "FAM", "GISG", "VAN", "PAL", "CEPH"
];

const COURSE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "The Celestial Archive — A Structured Exploration of Enochian Magick",
  description:
    "A source-cited course on the Enochian system of John Dee and Edward Kelley: the thirty Aethyrs, the Great Table, the twenty-one letters and nineteen Calls — with every claim graded by evidence level.",
  provider: {
    "@type": "Organization",
    name: "Creative Cathedrals",
    url: "https://creativecathedrals.com/"
  },
  url: "https://www.enochia.io/",
  isAccessibleForFree: true,
  educationalLevel: "Beginner to advanced",
  teaches: [
    "History of John Dee and Edward Kelley",
    "The Enochian alphabet and language",
    "The thirty Aethyrs and ninety-one Governors",
    "The Great Table and Watchtower structures",
    "Source criticism and epistemic discernment"
  ],
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT2H"
  }
};

export default function HomePage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(COURSE_SCHEMA) }}
      />
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
