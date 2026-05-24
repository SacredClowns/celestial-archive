"use client";

import { useMemo, useState } from "react";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import type { MatchingPair } from "@/lib/lesson/knowledge-check-parser";
import { useProgress } from "@/lib/progress/progress-context";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function MatchingQuiz({
  prompt,
  pairs,
  lessonId
}: {
  prompt: string;
  pairs: MatchingPair[];
  lessonId?: string;
}) {
  const { markLessonComplete } = useProgress();
  const rights = useMemo(() => shuffle(pairs.map((p) => p.right)), [pairs]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<number, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const allMatched = Object.keys(matches).length === pairs.length;

  function onRightClick(right: string) {
    if (selectedLeft === null || finished) return;
    const expected = pairs[selectedLeft]?.right;
    if (right === expected) {
      setMatches((m) => ({ ...m, [selectedLeft]: right }));
      setSelectedLeft(null);
      setWrong(null);
    } else {
      setWrong(right);
      window.setTimeout(() => setWrong(null), 600);
    }
  }

  function markComplete() {
    if (lessonId) markLessonComplete(lessonId);
    setFinished(true);
  }

  return (
    <CandlelightCard className="rounded-sm border border-gold-dim/25 bg-ink/20 p-5 sm:p-6">
      <p className="font-display text-lg text-gold-light">{prompt}</p>
      <p className="mt-2 text-xs text-gold-dim">Select a term, then its match. Order on the right is shuffled.</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <ul className="space-y-2">
          {pairs.map((p, i) => {
            const matched = matches[i] !== undefined;
            const active = selectedLeft === i;
            return (
              <li key={p.left}>
                <button
                  type="button"
                  disabled={matched || finished}
                  onClick={() => setSelectedLeft(i)}
                  className={`w-full rounded-sm border px-3 py-2 text-left text-sm transition-colors ${
                    matched
                      ? "border-amber/40 bg-amber/10 text-gold-pale"
                      : active
                        ? "border-gold/50 bg-gold/10 text-gold"
                        : "border-gold-dim/25 text-gold-pale hover:border-gold/40"
                  }`}
                >
                  {p.left}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="space-y-2">
          {rights.map((r) => {
            const used = Object.values(matches).includes(r);
            const isWrong = wrong === r;
            return (
              <li key={r}>
                <button
                  type="button"
                  disabled={used || finished || selectedLeft === null}
                  onClick={() => onRightClick(r)}
                  className={`w-full rounded-sm border px-3 py-2 text-left text-sm transition-colors ${
                    used
                      ? "border-gold-dim/15 text-gold-dim/40 line-through"
                      : isWrong
                        ? "border-red-400/40 bg-red-950/20 text-gold-pale"
                        : "border-gold-dim/25 text-gold-pale hover:border-gold/40"
                  }`}
                >
                  {r}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {allMatched && !finished ? (
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gold-dim/30 pt-4">
          <p className="text-sm text-gold-dim">All pairs placed. Mark complete when ready.</p>
          {lessonId ? (
            <button
              type="button"
              onClick={markComplete}
              className="rounded-sm border border-gold/40 bg-gold/10 px-4 py-2 font-display text-xs uppercase tracking-[0.12em] text-gold hover:bg-gold/20"
            >
              Mark lesson complete
            </button>
          ) : null}
        </div>
      ) : null}
      {finished ? <p className="mt-4 font-display text-sm text-gold">Recorded in your path progress.</p> : null}
    </CandlelightCard>
  );
}
