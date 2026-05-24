"use client";

import type { AethyrName } from "@/lib/language/language-types";

/** 30 Aethyrs, ordered 30 → 1 (TEX first). */
export function AethyrCallSelector({
  aethyrs,
  selected,
  onSelect
}: {
  aethyrs: AethyrName[];
  selected: string;
  onSelect: (name: string) => void;
}) {
  const ordered = [...aethyrs].sort((a, b) => b.number - a.number);

  return (
    <div className="space-y-3">
      <p className="text-sm text-gold-dim">
        Select the target Aethyr for the variable position in the Nineteenth Call. Default: TEX (30th,
        outermost).
      </p>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
        {ordered.map((aethyr) => {
          const active = aethyr.name === selected;
          return (
            <button
              key={aethyr.name}
              type="button"
              onClick={() => onSelect(aethyr.name)}
              className={`flex flex-col items-center rounded-sm border px-1 py-2 transition-colors ${
                active
                  ? "border-gold bg-gold/20 text-gold"
                  : "border-gold-dim/20 bg-ink/20 text-gold-dim hover:border-gold-dim/40"
              }`}
            >
              <span className="font-mono text-sm tracking-wider">{aethyr.name}</span>
              <span className="mt-0.5 text-[9px] text-gold-dim/80">{aethyr.number}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
