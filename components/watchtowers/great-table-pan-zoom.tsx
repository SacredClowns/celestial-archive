"use client";

import { useCallback, useRef, useState } from "react";
import { TabletCell } from "@/components/watchtowers/tablet-cell";
import { WatchtowerVersionPicker } from "@/components/watchtowers/watchtower-version-picker";
import { getGreatTableFullGrid } from "@/lib/watchtowers/watchtower-data";
import type { GreatTableVersionId } from "@/lib/watchtowers/watchtower-types";

const MIN_ZOOM = 0.35;
const MAX_ZOOM = 1.4;
const ZOOM_STEP = 0.1;

export function GreatTablePanZoom() {
  const [version, setVersion] = useState<GreatTableVersionId>("golden-dawn");
  const [zoom, setZoom] = useState(0.55);
  const [active, setActive] = useState<{ r: number; c: number } | null>(null);
  const dragRef = useRef<{ x: number; y: number; scrollLeft: number; scrollTop: number } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { grid, rows, columns, quarters } = getGreatTableFullGrid(version);

  const quarterAt = useCallback(
    (r: number, c: number) => {
      for (const q of quarters) {
        const [r0, r1] = q.rowRange;
        const [c0, c1] = q.colRange;
        if (r >= r0 && r <= r1 && c >= c0 && c <= c1) return q.label ?? q.element;
      }
      return null;
    },
    [quarters]
  );

  function onPointerDown(e: React.PointerEvent) {
    if (e.button !== 0 || !scrollRef.current) return;
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: scrollRef.current.scrollLeft,
      scrollTop: scrollRef.current.scrollTop
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current || !scrollRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    scrollRef.current.scrollLeft = dragRef.current.scrollLeft - dx;
    scrollRef.current.scrollTop = dragRef.current.scrollTop - dy;
  }

  function onPointerUp() {
    dragRef.current = null;
  }

  const letter = active ? grid[active.r]?.[active.c] : null;
  const region = active ? quarterAt(active.r, active.c) : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <WatchtowerVersionPicker value={version} onChange={setVersion} />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP))}
            className="rounded-sm border border-gold-dim/40 px-2 py-1 font-display text-xs text-gold-dim hover:text-gold"
            aria-label="Zoom out"
          >
            −
          </button>
          <span className="font-mono text-xs text-gold-dim">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP))}
            className="rounded-sm border border-gold-dim/40 px-2 py-1 font-display text-xs text-gold-dim hover:text-gold"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </div>

      <p className="text-xs text-gold-dim">
        Full {rows}×{columns} grid · drag to pan · click a cell for position · open a quadrant page for named readings
      </p>

      <div
        ref={scrollRef}
        className="max-h-[min(70vh,520px)] cursor-grab overflow-auto rounded-sm border border-gold-dim/30 bg-deep/60 active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
          className="inline-block p-2"
        >
          <div className="flex flex-col gap-0.5">
            {grid.map((row, ri) => (
              <div key={ri} className="flex gap-0.5">
                {row.map((ch, ci) => (
                  <TabletCell
                    key={`${ri}-${ci}`}
                    letter={ch}
                    selected={active?.r === ri && active?.c === ci}
                    onClick={() => setActive({ r: ri, c: ci })}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {active && letter ? (
        <p className="rounded-sm border border-gold-dim/20 bg-ink/30 px-4 py-2 font-mono text-sm text-gold">
          Row {active.r + 1}, col {active.c + 1}: <span className="text-gold-light">{letter}</span>
          {region ? <span className="ml-2 text-gold-dim">· {region}</span> : null}
        </p>
      ) : null}
    </div>
  );
}
