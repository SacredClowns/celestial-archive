"use client";

import type { LoagaethLeaf, LoagaethOrder } from "@/lib/observatory/loagaeth-types";

function statusClass(status: LoagaethLeaf["recto"]["transcriptionStatus"]): string {
  if (status === "transcribed") return "bg-gold/20 border-gold";
  if (status === "partially-transcribed") return "bg-gold-dim/10 border-gold-dim";
  if (status === "catalogued") return "bg-ink/40 border-gold-dim/30";
  return "bg-ink/60 border-ink";
}

export function LoagaethLeafNavigator({
  leaves,
  order,
  selectedLeaf,
  onOrderChange,
  onSelect
}: {
  leaves: LoagaethLeaf[];
  order: LoagaethOrder;
  selectedLeaf: number | null;
  onOrderChange: (order: LoagaethOrder) => void;
  onSelect: (leafNumber: number) => void;
}) {
  return (
    <section className="space-y-3">
      <p className="text-sm text-gold-dim">
        Select a leaf to examine its structure. Leaves are shown in manuscript order (1–49). Toggle to dictation order to
        see the sequence in which the spirits delivered them.
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gold-dim">Order</span>
        <button
          type="button"
          role="switch"
          aria-checked={order === "dictation"}
          onClick={() => onOrderChange(order === "manuscript" ? "dictation" : "manuscript")}
          className="border border-gold-dim/40 px-3 py-1 font-display text-[10px] uppercase tracking-[0.12em] text-gold-light transition-all duration-slow ease-gravity"
        >
          {order === "manuscript" ? "Manuscript Order" : "Dictation Order"}
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {leaves.map((leaf, idx) => (
          <button
            key={leaf.leafNumber}
            type="button"
            role="button"
            aria-label={`Leaf ${leaf.leafNumber}`}
            onClick={() => onSelect(leaf.leafNumber)}
            className={`inscribe-visible inscribe-stagger-${Math.min((idx % 4) + 1, 4)} min-w-10 border px-2 py-2 text-center text-xs text-gold-light transition-all duration-slow ease-gravity ${statusClass(leaf.recto.transcriptionStatus)} ${selectedLeaf === leaf.leafNumber ? "ring-1 ring-gold-light" : ""}`}
          >
            {leaf.leafNumber}
            {leaf.leafNumber === 1 || leaf.leafNumber === 49 ? <span className="ml-1 text-gold-dim">◊</span> : null}
          </button>
        ))}
      </div>
    </section>
  );
}
