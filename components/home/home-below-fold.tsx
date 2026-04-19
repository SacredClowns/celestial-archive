"use client";

import Link from "next/link";
import { SvgObservatory } from "@/components/observatory/svg-observatory";
import { ProgressionPanel } from "@/components/progression/progression-panel";
import { Inscribe } from "@/components/motion/inscribe";
import { SurfaceCard } from "@/components/ui/surface-card";
import { pillarCards } from "@/lib/content";

export function HomeBelowFold() {
  return (
    <>
      <Inscribe as="section" className="section-depth">
        <SvgObservatory />
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
          {pillarCards.map((pillar) => (
            <SurfaceCard key={pillar.name} title={pillar.name} locked={pillar.state === "locked"}>
              <p>{pillar.detail}</p>
              {pillar.state === "open" ? (
                <p className="mt-3 text-xs">
                  <Link
                    href={pillar.href}
                    className="text-gold-light underline decoration-gold-dim/40 underline-offset-4 transition-colors duration-slow ease-gravity hover:text-gold-pale"
                  >
                    Explore
                  </Link>
                </p>
              ) : null}
            </SurfaceCard>
          ))}
        </div>
      </Inscribe>
    </>
  );
}
