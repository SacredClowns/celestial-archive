"use client";

import Link from "next/link";
import { useState } from "react";
import { TabletCell } from "@/components/watchtowers/tablet-cell";
import { GreatTablePanZoom } from "@/components/watchtowers/great-table-pan-zoom";
import { WatchtowerVersionPicker } from "@/components/watchtowers/watchtower-version-picker";
import { getQuadrantTint, getWatchtowerSystem } from "@/lib/watchtowers/watchtower-data";
import type { GreatTableVersionId, WatchtowerQuadrant } from "@/lib/watchtowers/watchtower-types";

const QUADRANT_LABELS: Record<WatchtowerQuadrant, string> = {
  air: "Air · East",
  water: "Water · West",
  earth: "Earth · North",
  fire: "Fire · South"
};

function MiniTablet({
  quadrant,
  onHover
}: {
  quadrant: WatchtowerQuadrant;
  onHover: (letter: string | null) => void;
}) {
  const tint = getQuadrantTint(quadrant);
  return (
    <Link
      href={`/watchtowers/${quadrant}`}
      className={`block rounded-sm border p-3 transition-[border-color,box-shadow] hover:shadow-gold ${tint}`}
    >
      <p className="mb-2 font-display text-xs uppercase tracking-wider text-gold">{QUADRANT_LABELS[quadrant]}</p>
      <p className="text-[10px] text-gold-dim">Open tablet →</p>
    </Link>
  );
}

export function GreatTableGrid() {
  const [version, setVersion] = useState<GreatTableVersionId>("golden-dawn");
  const [hoverLetter, setHoverLetter] = useState<string | null>(null);
  const system = getWatchtowerSystem(version);

  return (
    <div className="space-y-6">
      <WatchtowerVersionPicker value={version} onChange={setVersion} />
      {hoverLetter ? (
        <p className="text-center font-mono text-sm text-gold-dim">
          Letter: <span className="text-gold">{hoverLetter}</span>
        </p>
      ) : null}

      <div className="mx-auto grid max-w-lg grid-cols-3 grid-rows-3 gap-3">
        <div />
        <MiniTablet quadrant="air" onHover={setHoverLetter} />
        <div />
        <MiniTablet quadrant="water" onHover={setHoverLetter} />
        <div className="flex flex-col items-center justify-center rounded-sm border border-gold/40 bg-ink/30 p-3">
          <p className="font-display text-[10px] uppercase tracking-wider text-gold-dim">Tablet of Union</p>
          {system.tabletOfUnion ? (
            <div className="mt-2 grid gap-0.5">
              {system.tabletOfUnion.grid.map((row, ri) => (
                <div key={ri} className="flex gap-0.5">
                  {row.map((ch, ci) => (
                    <TabletCell
                      key={`${ri}-${ci}`}
                      letter={ch}
                      onClick={() => setHoverLetter(ch)}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-center text-xs text-gold-dim">Not in this witness</p>
          )}
        </div>
        <MiniTablet quadrant="fire" onHover={setHoverLetter} />
        <div />
        <MiniTablet quadrant="earth" onHover={setHoverLetter} />
        <div />
      </div>

      <div className="border-t border-gold-dim/25 pt-8">
        <h3 className="mb-4 font-display text-sm uppercase tracking-[0.2em] text-gold-dim">
          Full Great Table
        </h3>
        <GreatTablePanZoom />
      </div>
    </div>
  );
}
