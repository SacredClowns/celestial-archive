"use client";

import { useState } from "react";
import { BadgeProse } from "@/components/language/badge-prose";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import type { EnochianLetter, LanguageChamberContent } from "@/lib/language/language-types";

function TraditionCard({
  title,
  tone,
  body,
  defaultOpen = false
}: {
  title: string;
  tone: "historical" | "later" | "occult";
  body: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const paragraphs = body.split(/\n\n+/).filter(Boolean);

  return (
    <CandlelightCard className="rounded-sm border border-gold-dim/20 bg-ink/20">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 p-5 text-left"
      >
        <span className="font-display text-lg text-gold">{title}</span>
        <EpistemicBadge tone={tone} compact />
      </button>
      {open ? (
        <div className="space-y-4 border-t border-gold-dim/20 px-5 pb-5">
          {paragraphs.map((p) => (
            <BadgeProse key={p.slice(0, 32)} text={p} className="leading-[1.9] text-gold-pale" />
          ))}
        </div>
      ) : null}
    </CandlelightCard>
  );
}

export function PronunciationGuide({
  letters,
  content
}: {
  letters: EnochianLetter[];
  content: Pick<
    LanguageChamberContent,
    "traditionDee" | "traditionGd" | "traditionModern" | "pronunciationComparisonNote" | "digraphs"
  >;
}) {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <TraditionCard title="Dee's Original (Reconstructed)" tone="historical" body={content.traditionDee} />
        <TraditionCard title="Golden Dawn Syllabic" tone="later" body={content.traditionGd} />
        <TraditionCard title="Modern Phonetic (DuQuette)" tone="occult" body={content.traditionModern} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gold-dim/30 text-left">
              <th className="py-3 pr-4 font-display text-xs uppercase tracking-wider text-gold-dim">Letter</th>
              <th className="py-3 pr-4 font-display text-xs uppercase tracking-wider text-gold-dim">English</th>
              <th className="py-3 pr-4 font-display text-xs uppercase tracking-wider text-gold">Dee&apos;s IPA</th>
              <th className="py-3 pr-4 font-display text-xs uppercase tracking-wider text-gold-dim">GD IPA</th>
              <th className="py-3 font-display text-xs uppercase tracking-wider text-gold-pale">Modern IPA</th>
            </tr>
          </thead>
          <tbody>
            {letters.map((letter) => (
              <tr key={letter.name} className="border-b border-gold-dim/15">
                <td className="py-3 pr-4 font-display text-gold">{letter.name}</td>
                <td className="py-3 pr-4 text-gold-pale">{letter.englishEquivalent}</td>
                {(["dee", "goldenDawn", "modern"] as const).map((key) => {
                  const entry = letter.phonology[key];
                  return (
                    <td key={key} className="py-3 pr-4 align-top">
                      <p className="font-mono text-[13px] text-gold-pale">{entry.ipa}</p>
                      {entry.englishApprox ? (
                        <p className="mt-1 text-[11px] text-gold-dim">≈ {entry.englishApprox}</p>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CandlelightCard className="overflow-x-auto rounded-sm border border-gold-dim/20 bg-ink/20 p-5">
        <h2 className="mb-4 font-display text-sm uppercase tracking-[0.2em] text-gold-dim">Digraphs</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold-dim/25 text-left text-gold-dim">
              <th className="pb-2 pr-4">Digraph</th>
              <th className="pb-2 pr-4">Sound</th>
              <th className="pb-2 pr-4">English example</th>
              <th className="pb-2">Source</th>
            </tr>
          </thead>
          <tbody>
            {content.digraphs.map((row) => (
              <tr key={row.digraph} className="border-b border-gold-dim/10">
                <td className="py-2 pr-4 font-mono text-gold">{row.digraph}</td>
                <td className="py-2 pr-4 font-mono text-gold-pale">{row.sound}</td>
                <td className="py-2 pr-4 text-gold-dim">{row.englishExample}</td>
                <td className="py-2 text-gold-dim">{row.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CandlelightCard>

      <p className="leading-[1.9] text-gold-dim">{content.pronunciationComparisonNote}</p>
    </div>
  );
}
