"use client";

import { useMemo, useState } from "react";
import type { LoagaethLeaf } from "@/lib/observatory/loagaeth-types";

type SortMode = "manuscript" | "dictation" | "density";

export function LoagaethCrossLeafView({
  leaves,
  onSelect
}: {
  leaves: LoagaethLeaf[];
  onSelect: (leafNumber: number) => void;
}) {
  const [sortMode, setSortMode] = useState<SortMode>("manuscript");
  const ordered = useMemo(() => {
    if (sortMode === "dictation") return [...leaves].sort((a, b) => a.dictationOrder - b.dictationOrder);
    if (sortMode === "density") {
      return [...leaves].sort((a, b) => densityScore(b) - densityScore(a));
    }
    return [...leaves].sort((a, b) => a.leafNumber - b.leafNumber);
  }, [leaves, sortMode]);

  return (
    <section className="space-y-3">
      <p className="text-sm text-gold-dim">
        All 49 leaves at a glance. Each thumbnail shows the grid structure at small scale — shape, not content.
      </p>
      <div className="flex flex-wrap gap-2">
        <SortButton active={sortMode === "manuscript"} onClick={() => setSortMode("manuscript")} label="Manuscript order" />
        <SortButton active={sortMode === "dictation"} onClick={() => setSortMode("dictation")} label="Dictation order" />
        <SortButton active={sortMode === "density"} onClick={() => setSortMode("density")} label="Grid density" />
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {ordered.map((leaf, idx) => (
          <button
            key={leaf.leafNumber}
            type="button"
            className={`inscribe-visible inscribe-stagger-${Math.min((idx % 4) + 1, 4)} inscribed-frame relative aspect-square bg-ink/40 p-1 text-left`}
            onClick={() => onSelect(leaf.leafNumber)}
            title={`Leaf ${leaf.leafNumber} (${leaf.recto.transcriptionStatus})`}
          >
            <span className="absolute left-1 top-1 text-[9px] text-gold-dim">{leaf.leafNumber}</span>
            <Thumbnail leaf={leaf} />
          </button>
        ))}
      </div>
    </section>
  );
}

function Thumbnail({ leaf }: { leaf: LoagaethLeaf }) {
  if (leaf.leafNumber === 49) {
    return (
      <div className="flex h-full flex-col justify-center gap-1 px-2">
        {Array.from({ length: 5 }, (_, idx) => (
          <div key={idx} className="h-px bg-gold-dim/50" />
        ))}
      </div>
    );
  }
  if (leaf.recto.transcriptionStatus === "unverified") return <div className="h-full w-full bg-deep" />;
  if (leaf.recto.transcriptionStatus === "catalogued") return <div className="h-full w-full border border-gold-dim/35" />;
  return (
    <div className="grid h-full w-full grid-cols-7 gap-[1px]">
      {Array.from({ length: 49 }, (_, idx) => (
        <span key={idx} className="bg-gold-dim/30" />
      ))}
    </div>
  );
}

function densityScore(leaf: LoagaethLeaf): number {
  if (leaf.recto.cells === "PENDING_TRANSCRIPTION" || leaf.recto.cells === null) return 0;
  return leaf.recto.cells.flat().filter((cell) => cell.character.trim().length > 0).length;
}

function SortButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-3 py-1 font-display text-[10px] uppercase tracking-[0.12em] ${active ? "border-gold text-gold-light" : "border-gold-dim/45 text-gold-dim"}`}
    >
      {label}
    </button>
  );
}
