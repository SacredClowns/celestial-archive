"use client";

import { useMemo, useState } from "react";
import { Inscribe } from "@/components/motion/inscribe";
import { getComparisonsForLeaf } from "@/lib/observatory/loagaeth-data";
import type {
  LoagaethLeaf,
  LoagaethOrder,
  LoagaethSideKey,
  LoagaethViewerData,
  OverlayMode
} from "@/lib/observatory/loagaeth-types";
import { LoagaethComparison } from "./loagaeth-comparison";
import { LoagaethCrossLeafView } from "./loagaeth-cross-leaf-view";
import { LoagaethGrid } from "./loagaeth-grid";
import { LoagaethLeafNavigator } from "./loagaeth-leaf-navigator";
import { LoagaethOverlayToolbar, overlayEnabled } from "./loagaeth-overlays";
import { LoagaethScholarshipPanel } from "./loagaeth-scholarship-panel";

export function LoagaethViewer({
  data,
  introPrimary,
  introSecondary,
  sourceNote
}: {
  data: LoagaethViewerData;
  introPrimary: string;
  introSecondary: string;
  sourceNote: string;
}) {
  const [order, setOrder] = useState<LoagaethOrder>("manuscript");
  const [selectedLeaf, setSelectedLeaf] = useState<number | null>(null);
  const [side, setSide] = useState<LoagaethSideKey>("recto");
  const [overlays, setOverlays] = useState<OverlayMode>({
    frequency: false,
    symmetry: false,
    repetition: false
  });

  const leaves = useMemo(
    () =>
      [...data.leaves].sort((a, b) =>
        order === "manuscript" ? a.leafNumber - b.leafNumber : a.dictationOrder - b.dictationOrder
      ),
    [data.leaves, order]
  );

  const leaf = useMemo<LoagaethLeaf | null>(
    () => (selectedLeaf ? data.leaves.find((item) => item.leafNumber === selectedLeaf) ?? null : null),
    [data.leaves, selectedLeaf]
  );
  const currentSide = leaf ? leaf[side] : null;
  const comparisons = leaf ? getComparisonsForLeaf(leaf.leafNumber, side) : [];
  const overlaysDisabled = !currentSide || !overlayEnabled(currentSide.cells);

  return (
    <div className="animate-room-enter space-y-10">
      <Inscribe as="section" className="inscribed-frame bg-ink/25 px-6 py-6">
        <h1 className="font-display text-3xl tracking-[0.06em] text-gold">{data.title}</h1>
        <p className="mt-2 text-sm italic text-gold-dim">{data.subtitle}</p>
        <p className="mt-5 leading-[1.9] text-gold-pale">{introPrimary}</p>
        <p className="mt-4 leading-[1.9] text-gold-pale">{introSecondary}</p>
        <p className="mt-5 text-sm text-gold-dim">
          {data.totalLeaves} leaves. {data.totalGridPages} grid-pages. {data.standardGridDimensions.rows * data.standardGridDimensions.columns} cells per standard grid. One unsolved manuscript.
        </p>
      </Inscribe>

      <Inscribe>
        <LoagaethLeafNavigator
          leaves={leaves}
          order={order}
          selectedLeaf={selectedLeaf}
          onOrderChange={setOrder}
          onSelect={setSelectedLeaf}
        />
      </Inscribe>

      {leaf ? (
        <Inscribe className="space-y-4">
          <section className="inscribed-frame bg-deep/45 px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gold-light">
                Leaf {leaf.leafNumber} · Dictated {leaf.dictationOrder} · {leaf[side].contentType}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSide("recto")}
                  className={`border px-3 py-1 text-xs ${side === "recto" ? "border-gold text-gold-light" : "border-gold-dim/40 text-gold-dim"}`}
                >
                  Recto
                </button>
                <button
                  type="button"
                  onClick={() => setSide("verso")}
                  className={`border px-3 py-1 text-xs ${side === "verso" ? "border-gold text-gold-light" : "border-gold-dim/40 text-gold-dim"}`}
                >
                  Verso
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-gold-dim">{leaf[side].description}</p>
            <p className="mt-1 text-xs text-gold-dim">
              Source: {leaf[side].transcriptionSource ?? "No published transcription is available for this leaf."}
            </p>
          </section>
          <LoagaethGrid leafNumber={leaf.leafNumber} sideKey={side} side={leaf[side]} overlays={overlays} />
          <LoagaethOverlayToolbar
            overlays={overlays}
            disabled={overlaysDisabled}
            onChange={(key) => {
              if (overlaysDisabled) return;
              setOverlays((prev) => ({ ...prev, [key]: !prev[key] }));
            }}
          />
          <LoagaethComparison sources={comparisons} />
          <LoagaethScholarshipPanel notes={leaf.scholarshipNotes} />
        </Inscribe>
      ) : null}

      <Inscribe>
        <LoagaethCrossLeafView leaves={data.leaves} onSelect={setSelectedLeaf} />
      </Inscribe>

      <Inscribe as="section" className="border-t border-gold-dim/25 pt-6 text-sm leading-relaxed text-gold-dim">
        {sourceNote}
      </Inscribe>
    </div>
  );
}
