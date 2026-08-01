"use client";

import Link from "next/link";
import { EnochianSigil } from "@/components/language/enochian-sigil";
import { GLYPH_PATHS } from "@/lib/language/glyph-paths";
import type { EnochianLetter } from "@/lib/language/language-types";

/**
 * The Sigil Wall — all 21 letters as inscribed, glowing letterforms.
 * Stylized renderings; the manuscript plates remain the authority.
 */
export function SigilWall({ letters }: { letters: EnochianLetter[] }) {
  return (
    <section aria-label="The twenty-one letters as sigils">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <p className="font-display text-[9px] uppercase tracking-[0.24em] text-gold-dim">The Sigil Wall</p>
        <p className="text-xs italic text-gold-dim/70">
          Stylized renderings — hover to re-inscribe · the manuscript plates remain the authority
        </p>
      </div>
      <div className="inscribed-frame grid grid-cols-3 gap-1 bg-deep/40 p-4 sm:grid-cols-5 md:grid-cols-7">
        {letters
          .filter((l) => GLYPH_PATHS[l.name.toLowerCase()])
          .map((letter) => (
            <Link
              key={letter.name}
              href={`/language/alphabet/${letter.name.toLowerCase()}`}
              className="group flex flex-col items-center gap-1 rounded-sm px-2 py-4 transition-colors duration-slow ease-gravity hover:bg-ink/40"
            >
              <EnochianSigil name={letter.name} size={72} />
              <span className="mt-1 font-display text-[11px] uppercase tracking-[0.18em] text-gold transition-colors group-hover:text-gold-pale">
                {letter.name}
              </span>
              <span className="font-display text-[9px] uppercase tracking-[0.14em] text-gold-dim/70">
                {letter.englishEquivalent}
              </span>
            </Link>
          ))}
      </div>
    </section>
  );
}
