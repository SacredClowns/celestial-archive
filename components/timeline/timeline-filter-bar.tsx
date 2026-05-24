"use client";

import {
  TIMELINE_ERA_LABELS,
  type TimelineCategory,
  type TimelineEra
} from "@/lib/timeline/timeline-types";

const CATEGORIES: { key: TimelineCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "biographical", label: "Biographical" },
  { key: "session", label: "Sessions" },
  { key: "publication", label: "Publication" },
  { key: "comparative", label: "Comparative" },
  { key: "legacy", label: "Legacy" }
];

export function TimelineFilterBar({
  category,
  era,
  actor,
  yearMin,
  yearMax,
  actors,
  eras,
  onCategory,
  onEra,
  onActor,
  onYearMin,
  onYearMax
}: {
  category: TimelineCategory | "all";
  era: TimelineEra | "all";
  actor: string;
  yearMin: number;
  yearMax: number;
  actors: string[];
  eras: TimelineEra[];
  onCategory: (c: TimelineCategory | "all") => void;
  onEra: (e: TimelineEra | "all") => void;
  onActor: (a: string) => void;
  onYearMin: (y: number) => void;
  onYearMax: (y: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => onCategory(c.key)}
            className={`rounded-sm border px-3 py-1 text-xs uppercase tracking-wider ${
              category === c.key
                ? "border-gold bg-gold/15 text-gold"
                : "border-gold-dim/20 text-gold-dim"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onEra("all")}
          className={`rounded-sm border px-2 py-0.5 text-[10px] uppercase ${
            era === "all" ? "border-gold text-gold" : "border-gold-dim/20 text-gold-dim"
          }`}
        >
          All eras
        </button>
        {eras.map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => onEra(era === e ? "all" : e)}
            className={`rounded-sm border px-2 py-0.5 text-[10px] ${
              era === e ? "border-gold text-gold" : "border-gold-dim/20 text-gold-dim"
            }`}
          >
            {TIMELINE_ERA_LABELS[e]}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4 text-xs text-gold-dim">
        <label className="flex items-center gap-2">
          From
          <input
            type="range"
            min={-3000}
            max={2000}
            value={yearMin}
            onChange={(ev) => onYearMin(Number(ev.target.value))}
            className="accent-gold"
          />
          <span className="font-mono text-gold-pale">{yearMin}</span>
        </label>
        <label className="flex items-center gap-2">
          To
          <input
            type="range"
            min={-3000}
            max={2000}
            value={yearMax}
            onChange={(ev) => onYearMax(Number(ev.target.value))}
            className="accent-gold"
          />
          <span className="font-mono text-gold-pale">{yearMax}</span>
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onActor("")}
          className={`rounded-full border px-2 py-0.5 text-[10px] ${
            !actor ? "border-gold text-gold" : "border-gold-dim/20 text-gold-dim"
          }`}
        >
          All actors
        </button>
        {actors.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => onActor(actor === a ? "" : a)}
            className={`rounded-full border px-2 py-0.5 text-[10px] ${
              actor === a ? "border-gold text-gold" : "border-gold-dim/20 text-gold-dim"
            }`}
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}
