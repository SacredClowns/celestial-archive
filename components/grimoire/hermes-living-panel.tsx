"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { useDiscovery } from "@/lib/discovery/discovery-context";
import { useFormulae } from "@/lib/grimoire/formulae-context";
import { HERMES_TAGLINE, type HermesMode } from "@/lib/hermes/hermes-identity";
import { useJournal } from "@/lib/journal/journal-context";
import { useProgress } from "@/lib/progress/progress-context";

type Exchange = {
  role: "seeker" | "hermes";
  text: string;
};

const MODE_LABELS: Record<HermesMode, string> = {
  counsel: "Ask Hermes",
  next_step: "What next?",
  formula_help: "Deepen my Formula",
  clear_channel: "Clear channel"
};

export function HermesLivingPanel() {
  const { progress } = useProgress();
  const { entries: formulae } = useFormulae();
  const { entries: journalEntries } = useJournal();
  const { entries: discoveries } = useDiscovery();

  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<HermesMode>("counsel");
  const [loading, setLoading] = useState(false);
  const [suggestedNext, setSuggestedNext] = useState<string | null>(null);
  const [source, setSource] = useState<"openrouter" | "fallback" | null>(null);

  async function speak(e?: FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setSuggestedNext(null);

    const seekerLine = message.trim() || MODE_LABELS[mode];
    setExchanges((prev) => [...prev, { role: "seeker", text: seekerLine }]);
    setMessage("");

    try {
      const res = await fetch("/api/hermes/counsel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: seekerLine,
          mode,
          progress: {
            completedLessonIds: progress.completedLessonIds,
            lastVisitedLessonId: progress.lastVisitedLessonId,
            rank: progress.rank
          },
          formulae: formulae.slice(0, 5).map((f) => ({
            spark: f.spark,
            meditationDepth: f.meditationDepth
          })),
          journalTitles: journalEntries.slice(0, 5).map((j) => j.title),
          discoveryCount: discoveries.length
        })
      });

      const data = (await res.json()) as {
        reply?: string;
        error?: string;
        source?: "openrouter" | "fallback";
        suggestedNext?: string;
      };

      if (!res.ok) {
        setExchanges((prev) => [
          ...prev,
          { role: "hermes", text: data.error ?? "Hermes could not answer. Try again when signed in." }
        ]);
        return;
      }

      setExchanges((prev) => [...prev, { role: "hermes", text: data.reply ?? "" }]);
      setSource(data.source ?? null);
      setSuggestedNext(data.suggestedNext ?? null);
    } catch {
      setExchanges((prev) => [
        ...prev,
        { role: "hermes", text: "The channel flickered. Check your connection and try again." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CandlelightCard className="rounded-sm border border-gold/20 bg-ink/30 p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-[10px] uppercase tracking-[0.28em] text-gold-dim">
            Living messenger
          </p>
          <h2 className="mt-1 font-display text-2xl text-gold">Hermes</h2>
          <p className="mt-2 max-w-lg text-sm italic text-gold-pale/80">{HERMES_TAGLINE}</p>
          <p className="mt-2 text-xs text-gold-dim/70">
            A slightly wyrd archivist — not a fortune-teller. He learns you as the instrument grows.
          </p>
        </div>
        {source === "openrouter" ? (
          <span className="rounded-sm border border-gold/30 px-2 py-1 font-mono text-[9px] text-gold-dim">
            living
          </span>
        ) : source === "fallback" ? (
          <span className="rounded-sm border border-gold-dim/30 px-2 py-1 font-mono text-[9px] text-gold-dim">
            quiet mode
          </span>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(Object.keys(MODE_LABELS) as HermesMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              if (m === "next_step") void speak();
            }}
            className={`rounded-sm border px-3 py-1.5 font-display text-[9px] uppercase tracking-wider ${
              mode === m
                ? "border-gold/50 bg-gold/10 text-gold"
                : "border-gold-dim/25 text-gold-dim hover:text-gold"
            }`}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      <div className="mt-6 max-h-72 space-y-4 overflow-y-auto rounded-sm border border-gold-dim/15 bg-deep/30 p-4">
        {exchanges.length === 0 ? (
          <p className="text-sm italic text-gold-dim">
            Ask where you stand on the path, how to read a Call, or how to hold an aha without forcing a verdict.
            Hermes keeps what you say in this folio of your Grimoire.
          </p>
        ) : (
          exchanges.map((ex, i) => (
            <div
              key={`${i}-${ex.role}`}
              className={ex.role === "hermes" ? "text-gold-pale" : "text-gold-dim"}
            >
              <p className="font-display text-[9px] uppercase tracking-wider text-gold-dim/70">
                {ex.role === "hermes" ? "Hermes" : "You"}
              </p>
              <p className="mt-1 whitespace-pre-wrap leading-relaxed">{ex.text}</p>
            </div>
          ))
        )}
        {loading ? (
          <p className="animate-pulse font-display text-xs uppercase tracking-widest text-gold-dim">
            Hermes is listening…
          </p>
        ) : null}
      </div>

      {suggestedNext ? (
        <Link
          href={suggestedNext}
          className="mt-4 inline-block font-display text-xs uppercase tracking-wider text-gold hover:underline"
        >
          Continue to next folio →
        </Link>
      ) : null}

      <form onSubmit={speak} className="mt-6 flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Leave a note for the archivist…"
          disabled={loading}
          className="min-w-0 flex-1 border-b border-gold-dim/40 bg-transparent py-2 text-gold-pale placeholder:text-gold-dim/40 focus:border-gold/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="shrink-0 rounded-sm border border-gold/40 px-4 py-2 font-display text-[10px] uppercase tracking-wider text-gold hover:bg-gold/10 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </CandlelightCard>
  );
}
