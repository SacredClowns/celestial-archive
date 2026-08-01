"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { GrimoireShell } from "@/components/grimoire/grimoire-shell";
import { useFormulae } from "@/lib/grimoire/formulae-context";
import { MEDITATION_DEPTH_LABELS, type FormulaEntry } from "@/lib/grimoire/formula-types";

export function FormulaComposer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addFormula } = useFormulae();

  const [spark, setSpark] = useState(searchParams.get("spark") ?? "");
  const [elaboration, setElaboration] = useState("");
  const [sourceLabel, setSourceLabel] = useState(searchParams.get("from") ?? "");
  const [sourceHref, setSourceHref] = useState(searchParams.get("href") ?? "");
  const [depth, setDepth] = useState<FormulaEntry["meditationDepth"]>(2);
  const [tags, setTags] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    addFormula({
      spark: spark.trim(),
      elaboration: elaboration.trim(),
      sourceLabel: sourceLabel.trim() || undefined,
      sourceHref: sourceHref.trim() || undefined,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      meditationDepth: depth
    });
    router.push("/grimoire");
  }

  return (
    <GrimoireShell
      title="Inscribe a Formula"
      subtitle="The aha arrives first. Elaboration turns it into thought. Sharing is optional — analytics stay in your Grimoire."
    >
      <CandlelightCard className="mx-auto max-w-xl rounded-sm border border-gold-dim/30 bg-ink/25 p-8">
        <form onSubmit={onSubmit} className="space-y-6">
          <label className="block">
            <span className="font-display text-[10px] uppercase tracking-[0.2em] text-gold-dim">
              Spark · the aha
            </span>
            <textarea
              required
              rows={2}
              value={spark}
              onChange={(e) => setSpark(e.target.value)}
              placeholder="One sentence — what opened?"
              className="mt-2 w-full resize-none border-b border-gold-dim/40 bg-transparent py-2 text-gold-pale focus:border-gold/50 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="font-display text-[10px] uppercase tracking-[0.2em] text-gold-dim">
              Elaboration · thought after the moment
            </span>
            <textarea
              rows={5}
              value={elaboration}
              onChange={(e) => setElaboration(e.target.value)}
              placeholder="What does this change in how you read the material?"
              className="mt-2 w-full resize-y border border-gold-dim/25 bg-deep/40 px-3 py-2 text-gold-pale focus:border-gold/40 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="font-display text-[10px] uppercase tracking-[0.2em] text-gold-dim">
              Meditation depth
            </span>
            <select
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value) as FormulaEntry["meditationDepth"])}
              className="mt-2 w-full rounded-sm border border-gold-dim/30 bg-deep/60 px-3 py-2 text-gold-pale"
            >
              {(Object.entries(MEDITATION_DEPTH_LABELS) as [string, string][]).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs text-gold-dim">Source label</span>
              <input
                value={sourceLabel}
                onChange={(e) => setSourceLabel(e.target.value)}
                className="mt-1 w-full border-b border-gold-dim/30 bg-transparent py-1 text-sm text-gold-pale"
              />
            </label>
            <label className="block">
              <span className="text-xs text-gold-dim">Source link</span>
              <input
                value={sourceHref}
                onChange={(e) => setSourceHref(e.target.value)}
                className="mt-1 w-full border-b border-gold-dim/30 bg-transparent py-1 text-sm text-gold-pale"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs text-gold-dim">Tags (comma-separated)</span>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="language, watchtower, discernment"
              className="mt-1 w-full border-b border-gold-dim/30 bg-transparent py-1 text-sm text-gold-pale"
            />
          </label>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="rounded-sm border border-gold/40 bg-gold/10 px-6 py-2 font-display text-xs uppercase tracking-[0.2em] text-gold hover:bg-gold/20"
            >
              Inscribe
            </button>
            <Link
              href="/grimoire"
              className="rounded-sm border border-gold-dim/30 px-6 py-2 font-display text-xs uppercase tracking-[0.2em] text-gold-dim hover:text-gold"
            >
              Cancel
            </Link>
          </div>
        </form>
      </CandlelightCard>
    </GrimoireShell>
  );
}
