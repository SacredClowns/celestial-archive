"use client";

import { CandlelightCard } from "@/components/motion/candlelight-card";
import { Inscribe } from "@/components/motion/inscribe";
import { pickCounsel, type HostIntelligence } from "@/lib/grimoire/host-intelligences";

export function HostPanel({ host, seed }: { host: HostIntelligence; seed: number }) {
  const counsel = pickCounsel(host, seed);

  return (
    <Inscribe>
      <CandlelightCard className="rounded-sm border border-gold/25 bg-ink/25 p-6 sm:p-8">
        <p className="font-display text-[10px] uppercase tracking-[0.24em] text-gold-dim">
          Host of intelligences · {host.title}
        </p>
        <h2 className="mt-2 font-display text-2xl text-gold">{host.name}</h2>
        <p className="mt-1 text-sm italic text-gold-dim">{host.domain}</p>
        <p className="mt-6 leading-[1.95] text-gold-pale">{host.greeting}</p>
        <blockquote className="mt-6 border-l-2 border-gold/30 pl-4 text-gold-pale/90 italic">
          {counsel}
        </blockquote>
        <p className="mt-6 text-xs text-gold-dim/70">
          These hosts are pedagogical personae — professors of method, not endorsements of contact. They
          rotate as your Grimoire deepens.
        </p>
      </CandlelightCard>
    </Inscribe>
  );
}
