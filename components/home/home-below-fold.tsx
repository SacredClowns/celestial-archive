"use client";

import Link from "next/link";
import { AethyrRing } from "@/components/home/aethyr-ring";
import { ProgressionPanel } from "@/components/progression/progression-panel";
import { Inscribe } from "@/components/motion/inscribe";
import { SurfaceCard } from "@/components/ui/surface-card";
import { pillarCards } from "@/lib/content";

const PILLAR_GLYPHS: Record<string, string> = {
  "Initiation Path": "⧉",
  "Aethyr Journey": "☉",
  "Language Chamber": "✒",
  "Celestial Map": "▦",
  Archive: "▤",
  Timeline: "⧗",
  "Intelligence Observatory": "◉"
};

export function HomeBelowFold() {
  const open = pillarCards.filter((p) => p.state === "open");
  const sealed = pillarCards.filter((p) => p.state === "locked");

  return (
    <>
      <Inscribe as="section" className="section-depth">
        <AethyrRing />
      </Inscribe>

      <Inscribe as="section" className="section-depth grid gap-8 lg:grid-cols-2" delay={100}>
        <ProgressionPanel />
        <SurfaceCard title="Your Path">
          <p className="text-gold-pale">Stage 1: Seeker</p>
          <p className="mt-1 text-sm text-gold-light/80">Next folio: The Lost Language</p>
          <Link
            href="/path/seeker/the-lost-language"
            className="mt-5 inline-block border border-gold/40 bg-deep/40 px-5 py-2.5 font-display text-[10px] uppercase tracking-[0.14em] text-gold-light transition-colors duration-slow ease-gravity hover:border-gold/70 hover:bg-deep/60 hover:text-gold-pale"
          >
            Enter Lesson 1.1
          </Link>
          <p className="mt-4 text-sm">
            <Link
              href="/path/seeker"
              className="text-gold-dim underline decoration-gold-dim/50 underline-offset-4 transition-colors duration-slow ease-gravity hover:text-gold-light"
            >
              Open the Seeker path
            </Link>
          </p>
        </SurfaceCard>
      </Inscribe>

      <Inscribe as="section" className="section-depth" delay={200}>
        <p className="mb-6 font-display text-[9px] uppercase tracking-[0.2em] text-gold-dim">Archive pillars</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {open.map((pillar) => (
            <Link key={pillar.name} href={pillar.href} className="group block">
              <div className="pillar-card inscribed-frame h-full bg-deep/40 p-6 transition-all duration-slow ease-gravity group-hover:-translate-y-1.5 group-hover:bg-deep/60">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-sm uppercase tracking-[0.16em] text-gold transition-colors group-hover:text-gold-pale">
                    {pillar.name}
                  </h3>
                  <span
                    aria-hidden
                    className="text-lg text-gold-dim/70 transition-all duration-slow group-hover:scale-125 group-hover:text-gold-light"
                  >
                    {PILLAR_GLYPHS[pillar.name] ?? "✦"}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gold-light/70">{pillar.detail}</p>
                <p className="mt-4 font-display text-[9px] uppercase tracking-[0.2em] text-gold-dim transition-colors group-hover:text-gold-light">
                  Enter ▸
                </p>
              </div>
            </Link>
          ))}
        </div>

        {sealed.length > 0 ? (
          <div className="sealed-frame mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-4">
            <span className="font-display text-[8px] uppercase tracking-[0.26em] text-gold-dim/60">
              Chambers still sealed
            </span>
            {sealed.map((p) => (
              <span key={p.name} className="font-display text-[9px] uppercase tracking-[0.18em] text-gold-dim/40">
                {p.name}
              </span>
            ))}
          </div>
        ) : null}
      </Inscribe>
    </>
  );
}
