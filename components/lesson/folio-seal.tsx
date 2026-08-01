"use client";

import { useState } from "react";
import { useProgress } from "@/lib/progress/progress-context";

function chime() {
  try {
    const A = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const t0 = A.currentTime;
    [523.25, 659.25, 783.99].forEach((f, i) => {
      const o = A.createOscillator();
      const g = A.createGain();
      o.type = "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t0 + i * 0.09);
      g.gain.exponentialRampToValueAtTime(0.12, t0 + i * 0.09 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + i * 0.09 + 1.4);
      o.connect(g);
      g.connect(A.destination);
      o.start(t0 + i * 0.09);
      o.stop(t0 + i * 0.09 + 1.5);
    });
  } catch {
    /* silence is acceptable in the Archive */
  }
}

/**
 * The sealing ritual. Finishing a folio should feel like something:
 * the seal stamps, the chime sounds, the record is kept (locally, and in
 * the cloud when signed in).
 */
export function FolioSeal({ lessonId, title }: { lessonId: string; title: string }) {
  const { isLessonComplete, markLessonComplete } = useProgress();
  const sealed = isLessonComplete(lessonId);
  const [justSealed, setJustSealed] = useState(false);

  function seal() {
    if (sealed) return;
    markLessonComplete(lessonId);
    setJustSealed(true);
    chime();
  }

  return (
    <div className="mt-14 border-t border-gold-dim/30 pt-10 text-center">
      <p className="font-display text-[9px] uppercase tracking-[0.28em] text-gold-dim">
        {sealed ? "This folio is sealed" : "You have reached the end of the folio"}
      </p>

      <button
        type="button"
        onClick={seal}
        disabled={sealed && !justSealed}
        aria-label={sealed ? `${title} is sealed` : `Seal the folio: ${title}`}
        className={`group relative mx-auto mt-6 block h-28 w-28 rounded-full transition-transform duration-300 ${
          sealed ? "cursor-default" : "cursor-pointer hover:scale-105"
        }`}
      >
        <span
          className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
            sealed
              ? "border-gold bg-gold/15 shadow-gold"
              : "border-dashed border-gold-dim/50 bg-ink/40 group-hover:border-gold/60"
          } ${justSealed ? "animate-seal-stamp" : ""}`}
        />
        <span className="absolute inset-3 rounded-full border border-gold-dim/40" />
        <span
          className={`absolute inset-0 flex items-center justify-center font-display text-3xl transition-colors duration-500 ${
            sealed ? "text-gold-pale" : "text-gold-dim/60 group-hover:text-gold-light"
          }`}
          aria-hidden
        >
          {sealed ? "✦" : "○"}
        </span>
      </button>

      <p className="mt-5 font-display text-[10px] uppercase tracking-[0.2em] text-gold-light/80">
        {sealed
          ? justSealed
            ? "Sealed. The Archive remembers."
            : "Sealed on a previous visit."
          : "Press the seal to close this folio"}
      </p>
      {!sealed ? (
        <p className="mx-auto mt-2 max-w-xs text-xs italic text-gold-dim/70">
          Sealing records your progress — locally always, to your account when signed in.
        </p>
      ) : null}
    </div>
  );
}
