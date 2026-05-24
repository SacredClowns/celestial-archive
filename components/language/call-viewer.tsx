"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import { AethyrCallSelector } from "@/components/language/aethyr-call-selector";
import { CallFootnotes } from "@/components/language/call-footnotes";
import {
  applyAethyrSubstitution,
  buildEnochianDisplayText,
  isInSharedClosingFormula
} from "@/lib/language/call-text-utils";
import { badgeKindToEpistemicTone } from "@/lib/language/language-badges";
import { getDictionaryEntryForCallWord } from "@/lib/language/language-data";
import type {
  AethyrName,
  AngelicCall,
  CallTextData,
  CallWordEntry,
  PronunciationTradition
} from "@/lib/language/language-types";

const TRADITIONS: { key: PronunciationTradition; label: string }[] = [
  { key: "dee", label: "Dee's Original" },
  { key: "goldenDawn", label: "Golden Dawn" },
  { key: "modern", label: "Modern" }
];

function pronunciationForWord(
  word: CallWordEntry,
  tradition: PronunciationTradition
): string {
  if (tradition === "dee") {
    return word.pronunciation?.trim() || "—";
  }
  const entry = getDictionaryEntryForCallWord(word.enochian);
  const alt = entry?.pronunciation?.[tradition];
  if (alt) return alt;
  return word.pronunciation?.trim() || "—";
}

export function CallViewer({
  call,
  callText,
  aethyrs,
  initialAethyr = "LIL",
  showAethyrSelector = true
}: {
  call: AngelicCall;
  callText?: CallTextData;
  aethyrs: AethyrName[];
  initialAethyr?: string;
  showAethyrSelector?: boolean;
}) {
  const [tradition, setTradition] = useState<PronunciationTradition>("dee");
  const [selectedAethyr, setSelectedAethyr] = useState(initialAethyr);
  const [highlightPos, setHighlightPos] = useState<string | null>(null);
  const [tooltipWord, setTooltipWord] = useState<CallWordEntry | null>(null);

  const words = useMemo(() => {
    if (!callText) return [];
    return applyAethyrSubstitution(callText.words, call.number, selectedAethyr);
  }, [call.number, callText, selectedAethyr]);

  const displayText = useMemo(() => buildEnochianDisplayText(words), [words]);
  const hasClosingFormula = call.number >= 11 && call.number <= 18;
  const textPending = !callText;

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h2 className="font-display text-2xl text-gold">{call.title}</h2>
        {callText ? (
          <p className="font-display text-sm text-gold-dim">{callText.title}</p>
        ) : null}
        <dl className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-gold-dim">
          <div>
            <dt className="inline uppercase tracking-wider">Reception order</dt>
            <dd className="inline ml-1 text-gold-pale">{call.receptionOrder}</dd>
          </div>
          <div>
            <dt className="inline uppercase tracking-wider">Words</dt>
            <dd className="inline ml-1 text-gold-pale">{callText?.words.length ?? call.totalLines}</dd>
          </div>
          <div>
            <dt className="inline uppercase tracking-wider">Association</dt>
            <dd className="inline ml-1 text-gold-pale">{call.association.type}</dd>
          </div>
        </dl>
        <div className="flex items-start gap-2">
          <p className="flex-1 text-sm leading-relaxed text-gold-dim">{call.association.description}</p>
          <EpistemicBadge tone={badgeKindToEpistemicTone(call.association.badge)} compact />
        </div>
        {call.association.deeNote ? (
          <p className="text-sm italic text-gold-dim/90">{call.association.deeNote}</p>
        ) : null}
      </header>

      <div className="flex flex-wrap gap-2">
        {TRADITIONS.map((t) => (
          <button
            key={t.key}
            type="button"
            disabled={textPending}
            title={textPending ? "Available when Call text is transcribed." : undefined}
            onClick={() => setTradition(t.key)}
            className={`rounded-sm border px-3 py-1.5 font-display text-xs uppercase tracking-[0.1em] ${
              textPending
                ? "cursor-not-allowed border-gold-dim/15 bg-ink/10 text-gold-dim/40"
                : tradition === t.key
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-gold-dim/20 bg-ink/20 text-gold-dim hover:border-gold-dim/40"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {textPending ? (
        <CandlelightCard className="rounded-sm border border-amber/30 bg-ink/25 p-6">
          <p className="font-display text-sm uppercase tracking-[0.16em] text-amber">Text Pending</p>
          <p className="mt-3 leading-[1.9] text-gold-pale">
            The Enochian text for this Call is being transcribed from Dee&apos;s manuscripts (Sloane MS
            3191).
          </p>
        </CandlelightCard>
      ) : (
        <>
          {hasClosingFormula ? (
            <p className="border-l-2 border-amber/50 pl-3 text-sm text-gold-dim">
              This Call shares the standard closing formula with Calls 11–18 (from{" "}
              <span className="font-mono text-amber">ZACAR</span> through{" "}
              <span className="font-mono text-amber">IAIDA</span>).
            </p>
          ) : null}

          <CandlelightCard className="rounded-sm border border-gold-dim/20 bg-ink/20 p-6">
            <p className="mb-4 font-display text-xs uppercase tracking-[0.14em] text-gold-dim">
              Manuscript view
            </p>
            <p
              className="font-enochian font-mono text-lg leading-relaxed tracking-wide text-gold sm:text-xl"
              dir="rtl"
            >
              {words.map((w, i) => {
                const isClosing = isInSharedClosingFormula(call.number, i, words);
                const isVariable = call.number === 19 && w.pos === "30.4";
                const active = highlightPos === w.pos;
                return (
                  <button
                    key={w.pos}
                    type="button"
                    onMouseEnter={() => {
                      setHighlightPos(w.pos);
                      setTooltipWord(w);
                    }}
                    onMouseLeave={() => {
                      setHighlightPos(null);
                      setTooltipWord(null);
                    }}
                    onClick={() => setHighlightPos(w.pos)}
                    className={`mx-0.5 inline rounded-sm px-0.5 transition-colors ${
                      active ? "bg-gold/20 text-gold-light" : "hover:bg-gold/10"
                    } ${isClosing ? "border-l border-amber/40 pl-1" : ""} ${isVariable ? "text-amber" : ""}`}
                  >
                    {w.enochian}
                  </button>
                );
              })}
            </p>
            <p className="mt-3 text-xs text-gold-dim/70">{displayText.length} characters · James (1984) edition</p>
          </CandlelightCard>

          {tooltipWord ? (
            <div className="rounded-sm border border-gold-dim/30 bg-deep/90 px-4 py-3 text-sm shadow-gold">
              <p className="font-mono text-gold">{tooltipWord.enochian}</p>
              <p className="text-gold-dim">{tooltipWord.english}</p>
              <p className="mt-1 font-mono text-xs italic text-gold-dim">
                {pronunciationForWord(tooltipWord, tradition)}
              </p>
              {(() => {
                const dict = getDictionaryEntryForCallWord(tooltipWord.enochian);
                if (!dict) return <p className="mt-2 text-xs text-gold-dim/60">No dictionary entry yet.</p>;
                return (
                  <p className="mt-2 text-xs text-gold-pale">
                    Dictionary: {dict.meanings[0]?.english}{" "}
                    <Link
                      href={`/language/dictionary?q=${encodeURIComponent(dict.enochian)}`}
                      className="text-gold underline decoration-gold-dim/50"
                    >
                      Open →
                    </Link>
                  </p>
                );
              })()}
            </div>
          ) : null}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-gold-dim/30 text-left text-xs uppercase tracking-wider text-gold-dim">
                  <th className="py-2 pr-3">Pos</th>
                  <th className="py-2 pr-3">Enochian</th>
                  <th className="py-2 pr-3">Pronunciation</th>
                  <th className="py-2">English</th>
                </tr>
              </thead>
              <tbody>
                {words.map((w, i) => {
                  const isClosing = isInSharedClosingFormula(call.number, i, words);
                  const isVariable = call.number === 19 && w.pos === "30.4";
                  const active = highlightPos === w.pos;
                  return (
                    <tr
                      key={w.pos}
                      className={`border-b border-gold-dim/10 transition-colors ${
                        active ? "bg-gold/10" : "hover:bg-ink/30"
                      } ${isClosing ? "border-l-2 border-l-amber/50" : ""}`}
                      onMouseEnter={() => setHighlightPos(w.pos)}
                      onMouseLeave={() => setHighlightPos(null)}
                    >
                      <td className="py-2 pr-3 font-mono text-[10px] text-gold-dim/60">{w.pos}</td>
                      <td className="py-2 pr-3">
                        <button
                          type="button"
                          onClick={() => setHighlightPos(w.pos)}
                          className={`font-enochian font-mono text-base ${isVariable ? "text-amber" : "text-gold"}`}
                        >
                          {w.enochian}
                        </button>
                      </td>
                      <td className="py-2 pr-3 font-mono text-xs italic text-gold-dim">
                        {pronunciationForWord(w, tradition)}
                      </td>
                      <td className="py-2 text-gold-pale">{w.english}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <CallFootnotes footnotes={callText.footnotes} />
        </>
      )}

      {call.number === 19 && call.aethyrVariable && showAethyrSelector ? (
        <section className="space-y-4 border-t border-gold-dim/25 pt-8">
          <h3 className="font-display text-lg text-gold">Call of the Aethyrs</h3>
          <p className="text-sm leading-relaxed text-gold-dim">{call.aethyrVariable.note}</p>
          <AethyrCallSelector aethyrs={aethyrs} selected={selectedAethyr} onSelect={setSelectedAethyr} />
        </section>
      ) : null}

      {call.historicalNotes.length > 0 ? (
        <section className="space-y-3">
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-gold-dim">Historical Notes</h3>
          {call.historicalNotes.map((note) => (
            <CandlelightCard
              key={note.text.slice(0, 40)}
              className="space-y-2 rounded-sm border border-gold-dim/20 bg-ink/20 p-4"
            >
              <EpistemicBadge tone={badgeKindToEpistemicTone(note.badge)} compact />
              <p className="leading-[1.9] text-gold-pale">{note.text}</p>
              <p className="text-xs text-gold-dim">{note.source}</p>
            </CandlelightCard>
          ))}
        </section>
      ) : null}

      {call.scholarlyNotes.length > 0 ? (
        <section className="space-y-3">
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-gold-dim">Scholarship</h3>
          {call.scholarlyNotes.map((note) => (
            <CandlelightCard
              key={`${note.scholar}-${note.observation.slice(0, 24)}`}
              className="space-y-2 rounded-sm border border-gold-dim/20 bg-ink/20 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-sm text-gold">{note.scholar}</p>
                <EpistemicBadge tone={badgeKindToEpistemicTone(note.badge)} compact />
              </div>
              <p className="leading-[1.9] text-gold-pale">{note.observation}</p>
            </CandlelightCard>
          ))}
        </section>
      ) : null}
    </article>
  );
}
