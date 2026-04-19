"use client";

import { CandlelightCard } from "@/components/motion/candlelight-card";

export function SurfaceCard({ title, children, locked }: { title: string; children: React.ReactNode; locked?: boolean }) {
  return (
    <CandlelightCard
      locked={locked}
      className={`relative px-6 py-6 transition-opacity duration-slow ease-gravity ${
        locked ? "sealed-frame bg-ink/30 text-gold-dim" : "inscribed-frame bg-parchment/30"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className={`font-display text-base tracking-[0.06em] ${locked ? "text-gold-dim" : "text-gold-light"}`}>
          {title}
        </h3>
        {locked ? (
          <span className="font-display text-[8px] uppercase tracking-[0.2em] text-gold-dim/60">Sealed</span>
        ) : null}
      </div>
      <div className={`mt-3 text-[15px] leading-[1.85] ${locked ? "text-gold-dim" : "text-gold-pale"}`}>
        {children}
      </div>
    </CandlelightCard>
  );
}