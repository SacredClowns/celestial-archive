"use client";

import Link from "next/link";
import { Inscribe } from "@/components/motion/inscribe";
import type { EnochianLetter } from "@/lib/language/language-types";

export function AlphabetGrid({ letters }: { letters: EnochianLetter[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
      {letters.map((letter, index) => (
        <Inscribe key={letter.name} delay={index * 50}>
          <Link
            href={`/language/alphabet/${letter.name.toLowerCase()}`}
            className="group flex flex-col items-center rounded-sm border border-gold-dim/20 bg-ink/20 px-2 py-4 transition-[border-color] duration-slow ease-gravity hover:border-gold/40"
          >
            <span className="font-mono text-[36px] leading-none text-gold" aria-hidden>
              {letter.englishEquivalent}
            </span>
            <span className="mt-2 font-display text-[12px] uppercase tracking-[0.12em] text-gold-dim">
              {letter.name}
            </span>
            <span className="mt-1 text-[10px] text-gold-pale">maps to {letter.englishEquivalent}</span>
          </Link>
        </Inscribe>
      ))}
    </div>
  );
}
