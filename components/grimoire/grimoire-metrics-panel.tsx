"use client";

import { CandlelightCard } from "@/components/motion/candlelight-card";
import type { GrimoireMetrics } from "@/lib/grimoire/grimoire-metrics";
import { MEDITATION_DEPTH_LABELS } from "@/lib/grimoire/formula-types";

function MetricBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-gold-dim">{label}</span>
        <span className="font-mono text-gold-light">
          {value}/{max}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-deep/80">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-dim/60 to-gold/80 transition-all duration-slow"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function GrimoireMetricsPanel({ metrics }: { metrics: GrimoireMetrics }) {
  return (
    <CandlelightCard className="rounded-sm border border-gold-dim/25 bg-ink/20 p-6">
      <p className="font-display text-[10px] uppercase tracking-[0.2em] text-gold-dim">
        Your measures · learning dashboards
      </p>
      <p className="mt-2 text-sm text-gold-pale/80">
        This is your private vertical — progress, reflection, and channel clarity. Not shown on the public
        halls of the Archive.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-sm border border-gold-dim/20 bg-deep/30 p-4 text-center">
          <p className="font-display text-[10px] uppercase tracking-wider text-gold-dim">Clear channel</p>
          <p className="mt-2 font-display text-4xl text-gold">{metrics.clearChannelScore}</p>
          <p className="mt-1 text-xs text-gold-dim">composite engagement index</p>
        </div>
        <div className="rounded-sm border border-gold-dim/20 bg-deep/30 p-4 text-center">
          <p className="font-display text-[10px] uppercase tracking-wider text-gold-dim">Rank</p>
          <p className="mt-2 font-display text-2xl capitalize text-gold">{metrics.rank}</p>
          <p className="mt-1 text-xs text-gold-dim">
            {metrics.lessonsCompleted} of {metrics.lessonsTotal} folios
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <MetricBar label="Seeker folios" value={metrics.seekerProgress.done} max={metrics.seekerProgress.total} />
        <MetricBar
          label="Student folios"
          value={metrics.studentProgress.done}
          max={metrics.studentProgress.total}
        />
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-gold-dim">Journal</dt>
          <dd className="font-display text-xl text-gold">{metrics.journalEntries}</dd>
        </div>
        <div>
          <dt className="text-gold-dim">Discoveries</dt>
          <dd className="font-display text-xl text-gold">{metrics.discoveries}</dd>
        </div>
        <div>
          <dt className="text-gold-dim">Formulae</dt>
          <dd className="font-display text-xl text-gold">{metrics.formulae}</dd>
        </div>
        <div>
          <dt className="text-gold-dim">Shares</dt>
          <dd className="font-display text-xl text-gold">{metrics.formulaShares}</dd>
        </div>
      </dl>

      {metrics.meditationDepthAvg !== null ? (
        <p className="mt-6 text-xs text-gold-dim">
          Average meditation depth: {metrics.meditationDepthAvg.toFixed(1)} —{" "}
          {MEDITATION_DEPTH_LABELS[Math.round(metrics.meditationDepthAvg) as 1 | 2 | 3 | 4 | 5]}
        </p>
      ) : null}
    </CandlelightCard>
  );
}
