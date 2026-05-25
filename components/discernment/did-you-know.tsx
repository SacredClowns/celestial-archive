"use client";

import { useEffect, useState } from "react";
import type { DidYouKnowTip } from "@/lib/content/did-you-know-tips";

const STORAGE_PREFIX = "ca-dyk-dismissed:";

export function DidYouKnow({ tip }: { tip: DidYouKnowTip }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(`${STORAGE_PREFIX}${tip.id}`);
      setVisible(!dismissed);
    } catch {
      setVisible(true);
    }
  }, [tip.id]);

  function dismiss() {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${tip.id}`, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      className="mb-6 flex gap-3 rounded-sm border border-gold-dim/25 bg-ink/25 px-4 py-3 text-sm leading-relaxed text-gold-pale"
      role="note"
      aria-label="Did you know"
    >
      <span className="shrink-0 font-display text-[10px] uppercase tracking-[0.14em] text-gold-dim">Did you know?</span>
      <p className="flex-1">{tip.text}</p>
      <button
        type="button"
        onClick={dismiss}
        className="shrink-0 font-display text-[10px] uppercase tracking-wider text-gold-dim hover:text-gold"
        aria-label="Dismiss tip"
      >
        Dismiss
      </button>
    </aside>
  );
}
