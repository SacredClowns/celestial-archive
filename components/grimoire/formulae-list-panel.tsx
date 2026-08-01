"use client";

import Link from "next/link";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import {
  buildBlueskyShareUrl,
  buildLinkedInShareUrl,
  buildTwitterShareUrl
} from "@/lib/grimoire/social-share";
import { useFormulae } from "@/lib/grimoire/formulae-context";
import type { FormulaEntry } from "@/lib/grimoire/formula-types";
import { MEDITATION_DEPTH_LABELS } from "@/lib/grimoire/formula-types";

function FormulaCard({ entry }: { entry: FormulaEntry }) {
  const { recordAnalytics } = useFormulae();
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://enochia.io";

  function copyDraft(text: string) {
    void navigator.clipboard?.writeText(text);
    recordAnalytics(entry.id, "copied");
  }

  return (
    <li className="rounded-sm border border-gold-dim/20 bg-deep/25 p-4">
      <p className="font-display text-gold">{entry.spark}</p>
      {entry.elaboration ? (
        <p className="mt-2 text-sm leading-relaxed text-gold-pale/85">{entry.elaboration}</p>
      ) : null}
      <p className="mt-2 text-xs text-gold-dim">
        Depth {entry.meditationDepth} — {MEDITATION_DEPTH_LABELS[entry.meditationDepth]}
      </p>
      {entry.sourceHref ? (
        <Link href={entry.sourceHref} className="mt-2 inline-block text-xs text-gold hover:underline">
          {entry.sourceLabel ?? "Source"} →
        </Link>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => copyDraft(entry.share.draftShort)}
          className="rounded-sm border border-gold-dim/30 px-2 py-1 font-display text-[9px] uppercase tracking-wider text-gold-dim hover:text-gold"
        >
          Copy short
        </button>
        <a
          href={buildTwitterShareUrl(entry.share.draftShort, siteUrl)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => recordAnalytics(entry.id, "sharedTwitter")}
          className="rounded-sm border border-gold-dim/30 px-2 py-1 font-display text-[9px] uppercase tracking-wider text-gold-dim hover:text-gold"
        >
          X / Twitter
        </a>
        <a
          href={buildBlueskyShareUrl(entry.share.draftLong, siteUrl)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => recordAnalytics(entry.id, "sharedBluesky")}
          className="rounded-sm border border-gold-dim/30 px-2 py-1 font-display text-[9px] uppercase tracking-wider text-gold-dim hover:text-gold"
        >
          Bluesky
        </a>
        <a
          href={buildLinkedInShareUrl(siteUrl, entry.share.draftShort)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => recordAnalytics(entry.id, "sharedLinkedIn")}
          className="rounded-sm border border-gold-dim/30 px-2 py-1 font-display text-[9px] uppercase tracking-wider text-gold-dim hover:text-gold"
        >
          LinkedIn
        </a>
      </div>
      <p className="mt-3 font-mono text-[10px] text-gold-dim/60">
        analytics: copy {entry.analytics.copied} · x {entry.analytics.sharedTwitter} · bsky{" "}
        {entry.analytics.sharedBluesky} · in {entry.analytics.sharedLinkedIn}
      </p>
    </li>
  );
}

export function FormulaeListPanel() {
  const { entries } = useFormulae();

  return (
    <CandlelightCard className="rounded-sm border border-gold-dim/25 bg-ink/20 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-[10px] uppercase tracking-[0.2em] text-gold-dim">Formulae</p>
          <p className="mt-1 text-sm text-gold-pale/80">
            Aha moments inscribed — elaborated, then offered to the channels you choose.
          </p>
        </div>
        <Link
          href="/grimoire/formula/new"
          className="rounded-sm border border-gold/40 bg-gold/10 px-4 py-2 font-display text-[10px] uppercase tracking-[0.16em] text-gold hover:bg-gold/20"
        >
          Inscribe formula
        </Link>
      </div>
      {entries.length === 0 ? (
        <p className="mt-6 text-sm italic text-gold-dim">
          No formulae yet. When language or history opens a clear channel in you, capture it here before it
          fades.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {entries.map((e) => (
            <FormulaCard key={e.id} entry={e} />
          ))}
        </ul>
      )}
    </CandlelightCard>
  );
}
