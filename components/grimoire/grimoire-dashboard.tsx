"use client";

import Link from "next/link";
import { useMemo } from "react";
import { GrimoireShell } from "@/components/grimoire/grimoire-shell";
import { HostPanel } from "@/components/grimoire/host-panel";
import { GrimoireMetricsPanel } from "@/components/grimoire/grimoire-metrics-panel";
import { FormulaeListPanel } from "@/components/grimoire/formulae-list-panel";
import { HermesLivingPanel } from "@/components/grimoire/hermes-living-panel";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { Inscribe } from "@/components/motion/inscribe";
import { useDiscovery } from "@/lib/discovery/discovery-context";
import { useFormulae } from "@/lib/grimoire/formulae-context";
import { computeGrimoireMetrics } from "@/lib/grimoire/grimoire-metrics";
import { pickHostForProgress } from "@/lib/grimoire/host-intelligences";
import { getWisdomAppLabel, getWisdomAppUrl } from "@/lib/grimoire/wisdom-bridge";
import { useJournal } from "@/lib/journal/journal-context";
import { useProgress } from "@/lib/progress/progress-context";
import { useAuth } from "@/lib/auth/auth-context";

export function GrimoireDashboard() {
  const { user, loading, configured } = useAuth();
  const { progress, isLessonComplete, completedCount } = useProgress();
  const { entries: journalEntries } = useJournal();
  const { entries: discoveries } = useDiscovery();
  const { entries: formulae } = useFormulae();

  const metrics = useMemo(
    () =>
      computeGrimoireMetrics({
        progress,
        isLessonComplete,
        journalEntries,
        discoveries,
        formulae
      }),
    [progress, isLessonComplete, journalEntries, discoveries, formulae]
  );

  const host = useMemo(
    () =>
      pickHostForProgress({
        rank: progress.rank,
        completedLessons: completedCount,
        formulaCount: formulae.length,
        journalCount: journalEntries.length
      }),
    [progress.rank, completedCount, formulae.length, journalEntries.length]
  );

  const wisdomUrl = getWisdomAppUrl();
  const wisdomLabel = getWisdomAppLabel();

  if (!user && !loading) {
    return (
      <GrimoireShell
        title="Your Grimoire"
        subtitle="Private chamber — your hosts, measures, and formulae. Not on the public Archive face."
      >
        <CandlelightCard className="mx-auto max-w-lg p-8 text-center">
          <p className="text-gold-pale/85">Sign in to open your Grimoire.</p>
          <Link
            href="/auth/login?next=/grimoire"
            className="mt-6 inline-block border border-gold/40 px-6 py-2 font-display text-xs uppercase tracking-[0.2em] text-gold"
          >
            Present your seal
          </Link>
        </CandlelightCard>
      </GrimoireShell>
    );
  }

  if (loading) {
    return (
      <GrimoireShell title="Your Grimoire">
        <p className="text-gold-dim">Opening…</p>
      </GrimoireShell>
    );
  }

  return (
    <GrimoireShell
      title="Your Grimoire"
      subtitle="Your professor and hosts guide the clear channel — metrics and dashboards live here, not on the main hall."
    >
      <div className="space-y-8">
        <HostPanel host={host} seed={completedCount + formulae.length} />
        <HermesLivingPanel />
        <GrimoireMetricsPanel metrics={metrics} />
        <FormulaeListPanel />
        <Inscribe>
          <CandlelightCard className="border-amber/25 bg-amber/5 p-6">
            <p className="font-display text-[10px] uppercase tracking-wider text-amber">Wisdom bridge</p>
            <p className="mt-3 text-gold-pale/90">
              When meditation deepens into how magick works as mechanism, cross to {wisdomLabel}.
            </p>
            {wisdomUrl ? (
              <a href={wisdomUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-gold hover:underline">
                Enter {wisdomLabel} ↗
              </a>
            ) : (
              <p className="mt-2 text-xs text-gold-dim">Set NEXT_PUBLIC_WISDOM_APP_URL</p>
            )}
          </CandlelightCard>
        </Inscribe>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/path" className="text-gold hover:underline">
            Initiation Path
          </Link>
          <Link href="/journal" className="text-gold-dim hover:text-gold">
            Journal
          </Link>
        </div>
      </div>
    </GrimoireShell>
  );
}
