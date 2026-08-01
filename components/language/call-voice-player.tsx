"use client";

import { useEffect, useRef, useState } from "react";

type CallWord = {
  pos: string;
  enochian: string;
  pronunciation: string;
  english: string;
};

/**
 * The Voice of the Call — word-by-word synthesized recitation with live
 * highlight and interlinear English. Explicitly labeled experimental:
 * the voice is a machine reconstruction from the pronunciation column,
 * not a claim about how the Calls ever sounded.
 */
export function CallVoicePlayer({
  words,
  title,
  callNumber
}: {
  words: CallWord[];
  title: string;
  callNumber: number;
}) {
  const [playing, setPlaying] = useState(false);
  const [idx, setIdx] = useState<number | null>(null);
  const [rate, setRate] = useState(0.75);
  const [interlinear, setInterlinear] = useState(true);
  const [supported, setSupported] = useState(true);
  const stopFlag = useRef(false);
  const rateRef = useRef(rate);
  rateRef.current = rate;

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      stopFlag.current = true;
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    // changing call stops playback
    stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callNumber]);

  function stop() {
    stopFlag.current = true;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setPlaying(false);
    setIdx(null);
  }

  function speakFrom(start: number) {
    if (!("speechSynthesis" in window)) return;
    stopFlag.current = false;
    setPlaying(true);

    const next = (i: number) => {
      if (stopFlag.current || i >= words.length) {
        setPlaying(false);
        setIdx(null);
        return;
      }
      setIdx(i);
      const u = new SpeechSynthesisUtterance(words[i].pronunciation.replace(/-/g, " "));
      u.rate = rateRef.current;
      u.pitch = 0.8;
      u.onend = () => next(i + 1);
      u.onerror = () => next(i + 1);
      window.speechSynthesis.speak(u);
    };
    window.speechSynthesis.cancel();
    next(start);
  }

  if (!words?.length) return null;

  return (
    <section className="inscribed-frame bg-deep/50 p-5" aria-label={`Recite ${title}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display text-[9px] uppercase tracking-[0.24em] text-gold-dim">The Voice of the Call</p>
          <p className="mt-1 text-xs italic text-gold-dim/70">
            Experimental machine recitation from the pronunciation column — a study aid, not a historical claim.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 font-display text-[9px] uppercase tracking-[0.16em] text-gold-dim">
            Pace
            <input
              type="range"
              min={0.5}
              max={1.1}
              step={0.05}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="accent-[#c9a84c]"
            />
          </label>
          <button
            type="button"
            onClick={() => setInterlinear((s) => !s)}
            aria-pressed={interlinear}
            className={`border px-3 py-1.5 font-display text-[9px] uppercase tracking-[0.16em] transition-colors ${
              interlinear
                ? "border-gold/60 bg-gold/10 text-gold-light"
                : "border-gold-dim/40 text-gold-dim hover:text-gold-light"
            }`}
          >
            English gloss
          </button>
          {supported ? (
            playing ? (
              <button
                type="button"
                onClick={stop}
                className="border border-amber/70 bg-amber/15 px-5 py-1.5 font-display text-[10px] uppercase tracking-[0.2em] text-gold-pale"
              >
                ■ Still the voice
              </button>
            ) : (
              <button
                type="button"
                onClick={() => speakFrom(idx ?? 0)}
                className="border border-gold/70 bg-gold/10 px-5 py-1.5 font-display text-[10px] uppercase tracking-[0.2em] text-gold-pale shadow-gold transition-colors hover:bg-gold/20"
              >
                ▶ Recite
              </button>
            )
          ) : (
            <p className="text-xs text-gold-dim">Voice synthesis unavailable in this browser.</p>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-x-2 gap-y-3 leading-none">
        {words.map((w, i) => {
          const lit = idx === i;
          return (
            <button
              key={w.pos}
              type="button"
              onClick={() => {
                stopFlag.current = true;
                if ("speechSynthesis" in window) window.speechSynthesis.cancel();
                speakFrom(i);
              }}
              title={`${w.pronunciation} — “${w.english}”`}
              className={`group flex flex-col items-center rounded-sm px-1.5 py-1 text-left transition-all duration-200 ${
                lit ? "bg-gold/20 shadow-gold" : "hover:bg-ink/50"
              }`}
            >
              <span
                className={`font-display text-sm tracking-[0.08em] transition-colors ${
                  lit ? "text-white" : "text-gold-pale group-hover:text-gold-light"
                }`}
              >
                {w.enochian}
              </span>
              {interlinear ? (
                <span className={`mt-1 text-[10px] italic ${lit ? "text-gold-light" : "text-gold-dim/70"}`}>
                  {w.english}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
