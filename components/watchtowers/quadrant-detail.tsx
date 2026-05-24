"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AngelHierarchy } from "@/components/watchtowers/angel-hierarchy";
import { GridLegend } from "@/components/watchtowers/grid-legend";
import { TabletGrid } from "@/components/watchtowers/tablet-grid";
import { WatchtowerVersionPicker } from "@/components/watchtowers/watchtower-version-picker";
import { compareQuadrantGrids, getTabletByQuadrant } from "@/lib/watchtowers/watchtower-data";
import { getHierarchyForQuadrant } from "@/lib/watchtowers/hierarchy-data";
import type { GreatTableVersionId, WatchtowerQuadrant } from "@/lib/watchtowers/watchtower-types";

const TITLES: Record<WatchtowerQuadrant, string> = {
  air: "Tablet of Air",
  water: "Tablet of Water",
  earth: "Tablet of Earth",
  fire: "Tablet of Fire"
};

export function QuadrantDetail({ quadrant }: { quadrant: WatchtowerQuadrant }) {
  const [version, setVersion] = useState<GreatTableVersionId>("golden-dawn");
  const tablet = getTabletByQuadrant(quadrant, version);
  const comparisons = compareQuadrantGrids(quadrant);
  const hierarchy = getHierarchyForQuadrant(quadrant);

  const tabletMeta = useMemo(
    () => ({
      seniors: tablet.seniors,
      angelicKing: tablet.angelicKing,
      divineName: tablet.divineName
    }),
    [tablet]
  );

  return (
    <div className="space-y-10">
      <WatchtowerVersionPicker value={version} onChange={setVersion} />

      <section className="space-y-4">
        <h2 className="font-display text-xl text-gold">{TITLES[quadrant]}</h2>
        <p className="text-sm text-gold-dim">
          {tablet.grid[0]?.length ?? 0}×{tablet.grid.length} grid · King{" "}
          <span className="font-mono text-gold-pale">{tablet.angelicKing}</span> · Six Seniors on the
          horizontal cross (rows 3–5 in Golden Dawn layout)
        </p>
        <div className="overflow-x-auto rounded-sm border border-gold-dim/20 bg-ink/20 p-4">
          <TabletGrid quadrant={quadrant} grid={tablet.grid} tablet={tabletMeta} />
        </div>
        <GridLegend />
      </section>

      {hierarchy ? <AngelHierarchy tablet={tablet} hierarchy={hierarchy} /> : null}

      <section className="space-y-3">
        <h3 className="font-display text-sm uppercase tracking-[0.16em] text-gold-dim">Associated Calls</h3>
        <div className="flex flex-wrap gap-2">
          {tablet.calls.map((n) => (
            <Link
              key={n}
              href={`/language/calls`}
              className="rounded-sm border border-gold-dim/25 bg-ink/20 px-3 py-1 font-display text-xs text-gold-dim hover:border-gold/40 hover:text-gold"
            >
              Call {n}
            </Link>
          ))}
        </div>
        <p className="text-xs text-gold-dim/70">Calls 1–18 invoke the Watchtower system; Call 19 opens the Aethyrs.</p>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-sm uppercase tracking-[0.16em] text-gold-dim">Version comparison</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          {comparisons.map((c) => (
            <div key={c.versionId} className="rounded-sm border border-gold-dim/15 bg-ink/15 p-3">
              <p className="mb-2 font-display text-xs uppercase text-gold-dim">{c.versionId}</p>
              <p className="font-mono text-[10px] leading-relaxed text-gold-pale/80">
                {c.grid.flat().join(" ").slice(0, 120)}…
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
