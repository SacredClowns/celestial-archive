import { HomeBelowFold } from "@/components/home/home-below-fold";
import { OpeningExperience } from "@/components/home/opening-experience";

export default function HomePage() {
  return (
    <div>
      <section className="section-depth text-center">
        <p className="font-display text-[9px] uppercase tracking-[0.36em] text-gold-dim">A structured exploration</p>
        <h1 className="mt-4 font-display text-5xl tracking-[0.14em] text-gold sm:text-6xl">ENOCHIAN</h1>
        <p className="mt-3 font-display text-sm uppercase tracking-[0.28em] text-gold-light/80">The Celestial Archive</p>
        <div className="mx-auto mt-8 h-px w-24 bg-gold-dim/40" />
      </section>

      <OpeningExperience />

      <HomeBelowFold />
    </div>
  );
}
