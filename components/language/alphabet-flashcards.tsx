"use client";

import { useEffect, useMemo, useState } from "react";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import type { EnochianLetter } from "@/lib/language/language-types";

const STORAGE_KEY = "celestial-archive-alphabet-known";

function loadKnown(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export function AlphabetFlashcards({ letters }: { letters: EnochianLetter[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  const deck = useMemo(() => [...letters].sort((a, b) => a.position - b.position), [letters]);
  const current = deck[index];
  const knownCount = known.size;

  useEffect(() => {
    setKnown(loadKnown());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...known]));
  }, [known, hydrated]);

  function next() {
    setFlipped(false);
    setIndex((i) => (i + 1) % deck.length);
  }

  function markKnown() {
    if (current) setKnown((s) => new Set(s).add(current.name));
    next();
  }

  function resetProgress() {
    setKnown(new Set());
    setIndex(0);
    setFlipped(false);
  }

  if (!current) return null;

  return (
    <CandlelightCard className="rounded-sm border border-gold-dim/25 bg-ink/20 p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-display text-xs uppercase tracking-[0.16em] text-gold-dim">
          Letter recognition · {knownCount}/{deck.length} marked
        </p>
        {knownCount > 0 ? (
          <button
            type="button"
            onClick={resetProgress}
            className="font-display text-[10px] uppercase tracking-wider text-gold-dim hover:text-gold"
          >
            Reset deck
          </button>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="mt-6 flex min-h-[200px] w-full flex-col items-center justify-center rounded-sm border border-gold-dim/30 bg-deep/40 p-8 transition-colors hover:border-gold/40"
      >
        {!flipped ? (
          <>
            <span className="font-mono text-6xl text-gold">{current.fontCharacter}</span>
            <span className="mt-4 font-display text-sm text-gold-dim">{current.name}</span>
            {known.has(current.name) ? (
              <span className="mt-2 text-[10px] uppercase tracking-wider text-amber/80">Previously marked</span>
            ) : null}
          </>
        ) : (
          <>
            <p className="font-display text-xl text-gold-light">maps to {current.englishEquivalent}</p>
            <p className="mt-2 max-w-sm text-center text-sm text-gold-pale">
              {current.phonology.dee.englishApprox ?? current.phonology.dee.description}
            </p>
            <p className="mt-3 font-mono text-xs text-gold-dim">IPA: {current.phonology.dee.ipa}</p>
          </>
        )}
      </button>
      <p className="mt-2 text-center text-xs text-gold-dim">Tap card to flip</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          className="rounded-sm border border-gold-dim/30 px-4 py-2 font-display text-[10px] uppercase tracking-wider text-gold-dim hover:text-gold"
        >
          Flip
        </button>
        <button
          type="button"
          onClick={markKnown}
          className="rounded-sm border border-gold/40 bg-gold/10 px-4 py-2 font-display text-[10px] uppercase tracking-wider text-gold"
        >
          I know this · Next
        </button>
        <button
          type="button"
          onClick={next}
          className="rounded-sm border border-gold-dim/30 px-4 py-2 font-display text-[10px] uppercase tracking-wider text-gold-dim hover:text-gold"
        >
          Skip
        </button>
      </div>
    </CandlelightCard>
  );
}
