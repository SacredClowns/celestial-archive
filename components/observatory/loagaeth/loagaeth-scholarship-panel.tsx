"use client";

import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import type { EpistemicTone } from "@/lib/lesson-types";
import type { ScholarshipNote } from "@/lib/observatory/loagaeth-types";

const glyphToTone: Record<string, EpistemicTone> = {
  "◆": "historical",
  "◇": "consensus",
  "○": "occult",
  "△": "later",
  "◎": "parallel",
  "~": "speculative",
  "?": "disputed",
  "⚠": "caution"
};

export function LoagaethScholarshipPanel({ notes }: { notes: ScholarshipNote[] }) {
  if (notes.length === 0) {
    return (
      <p className="mt-4 border border-gold-dim/30 bg-ink/20 px-4 py-4 text-sm text-gold-dim">
        No published scholarship has been identified for this specific leaf. The grid structure is shown based on the
        manuscript&apos;s standard 49×49 format.
      </p>
    );
  }

  // Surface unknown badge glyphs during development so content can be corrected upstream.
  notes.forEach((note) => {
    if (!(note.badge in glyphToTone)) {
      console.warn(
        `[Loagaeth] Unknown badge glyph in scholarship note: ${JSON.stringify(note.badge)} (scholar: ${note.scholar})`
      );
    }
  });

  return (
    <div className="mt-6 grid gap-3">
      {notes.map((note, idx) => (
        <CandlelightCard key={`${note.scholar}-${idx}`} className="inscribed-frame bg-ink/40 p-4" locked>
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-gold-pale">
              <span className="font-display text-gold-light">{note.scholar}</span> — {note.observation}
            </p>
            <EpistemicBadge tone={glyphToTone[note.badge] ?? "caution"} compact />
          </div>
        </CandlelightCard>
      ))}
    </div>
  );
}
