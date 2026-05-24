"use client";

import { useState } from "react";
import { CandlelightCard } from "@/components/motion/candlelight-card";

export function CallFootnotes({ footnotes }: { footnotes: string[] }) {
  const [open, setOpen] = useState(false);
  if (footnotes.length === 0) return null;

  return (
    <section className="space-y-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="font-display text-sm uppercase tracking-[0.16em] text-gold-dim transition-colors hover:text-gold"
      >
        Textual notes ({footnotes.length}) {open ? "−" : "+"}
      </button>
      {open ? (
        <CandlelightCard className="space-y-3 rounded-sm border border-gold-dim/25 bg-ink/20 p-5">
          <ul className="space-y-3">
            {footnotes.map((note) => (
              <li key={note} className="border-l-2 border-amber/40 pl-3 text-sm leading-relaxed text-gold-dim">
                {note}
              </li>
            ))}
          </ul>
        </CandlelightCard>
      ) : null}
    </section>
  );
}
