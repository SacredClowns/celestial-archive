"use client";

import type { AngelicCall } from "@/lib/language/language-types";

export function CallSelector({
  calls,
  selected,
  onSelect
}: {
  calls: AngelicCall[];
  selected: number;
  onSelect: (n: number) => void;
}) {
  return (
    <div
      className="flex flex-wrap gap-1.5"
      role="tablist"
      aria-label="Select Angelic Call"
    >
      {calls.map((call) => {
        const active = call.number === selected;
        return (
          <button
            key={call.number}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(call.number)}
            className={`min-w-[2.25rem] rounded-sm border px-2 py-2 font-display text-xs transition-colors ${
              active
                ? "border-gold bg-gold/15 text-gold"
                : "border-gold-dim/20 bg-ink/20 text-gold-dim hover:border-gold-dim/40"
            }`}
          >
            {call.number}
          </button>
        );
      })}
    </div>
  );
}
