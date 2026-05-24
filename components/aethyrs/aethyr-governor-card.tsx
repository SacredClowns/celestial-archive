import { CandlelightCard } from "@/components/motion/candlelight-card";
import type { AethyrGovernor } from "@/lib/aethyrs/aethyr-types";

export function AethyrGovernorCard({ governor }: { governor: AethyrGovernor }) {
  return (
    <CandlelightCard className="rounded-sm border border-gold-dim/20 bg-ink/20 p-4">
      <p className="font-display text-xs uppercase tracking-wider text-gold-dim">Governor {governor.number}</p>
      <h3 className="mt-1 font-display text-lg text-gold">{governor.name}</h3>
      <p className="mt-2 text-sm text-gold-pale">{governor.region}</p>
      <dl className="mt-3 space-y-1 text-xs text-gold-dim">
        <div>
          <dt className="inline">Ministers</dt>
          <dd className="inline ml-1 text-gold-pale">{governor.ministers.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="inline">Angelic King</dt>
          <dd className="inline ml-1 font-mono text-gold-pale">{governor.angelicKing}</dd>
        </div>
        <div>
          <dt className="inline">Quarter</dt>
          <dd className="inline ml-1 text-gold-pale">{governor.quarter}</dd>
        </div>
        <div>
          <dt className="inline">Tribe</dt>
          <dd className="inline ml-1 text-gold-pale">{governor.tribe}</dd>
        </div>
      </dl>
    </CandlelightCard>
  );
}
