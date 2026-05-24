"use client";

import type { GreatTableVersionId } from "@/lib/watchtowers/watchtower-types";
import { GREAT_TABLE_VERSIONS } from "@/lib/watchtowers/watchtower-data";

export function WatchtowerVersionPicker({
  value,
  onChange
}: {
  value: GreatTableVersionId;
  onChange: (v: GreatTableVersionId) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Great Table version">
      {GREAT_TABLE_VERSIONS.map((v) => (
        <button
          key={v.id}
          type="button"
          role="tab"
          aria-selected={value === v.id}
          onClick={() => onChange(v.id)}
          className={`rounded-sm border px-3 py-2 font-display text-[10px] uppercase tracking-[0.1em] transition-colors ${
            value === v.id
              ? "border-gold bg-gold/15 text-gold"
              : "border-gold-dim/20 bg-ink/20 text-gold-dim hover:border-gold-dim/40"
          }`}
          title={v.description}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
