"use client";

import { useMemo, useState } from "react";
import { InteractiveGrid, type InteractiveGridCell } from "@/components/student/interactive-grid";
import { SourceComparisonLayout } from "@/components/student/source-comparison-layout";
import { VersionToggle, type VersionToggleValue } from "@/components/student/version-toggle";

/** Schematic letters only — structural fragment, not a facsimile. */
const DEE_SCHEMATIC: InteractiveGridCell[][] = [
  ["O", "I", "L", "A"],
  ["E", "H", "O", "R"],
  ["G", "N", "A", "R"],
  ["D", "A", "O", "P"]
];

const REFORMED_SCHEMATIC: InteractiveGridCell[][] = [
  ["I", "O", "A", "L"],
  ["H", "E", "R", "O"],
  ["N", "G", "R", "A"],
  ["A", "D", "P", "O"]
];

export function GreatTableVersionDemo() {
  const [version, setVersion] = useState<VersionToggleValue>("historical");
  const [selected, setSelected] = useState<{ row: number; col: number } | null>({ row: 0, col: 0 });

  const activeCells = useMemo(
    () => (version === "historical" ? DEE_SCHEMATIC : REFORMED_SCHEMATIC),
    [version]
  );

  return (
    <div className="min-w-0 space-y-6">
      <div className="flex flex-col gap-4">
        <VersionToggle
          value={version}
          onChange={setVersion}
          historicalLabel="Dee arrangement"
          laterLabel="Golden Dawn reformed"
          aria-label="Great Table version"
        />
      </div>

      <InteractiveGrid
        rows={4}
        columns={4}
        cells={activeCells}
        variant="comparison"
        selected={selected}
        onSelectCell={(row, col) => setSelected({ row, col })}
        aria-label={
          version === "historical"
            ? "Schematic four-by-four grid, Dee-era ordering"
            : version === "later"
              ? "Schematic four-by-four grid, Golden Dawn reformed ordering"
              : "Schematic four-by-four grid, comparative layout"
        }
        caption="Schematic fragment for layout comparison — not a diplomatic transcription."
      />

      <SourceComparisonLayout
        historicalTitle="Primary manuscript layer"
        laterTitle="Golden Dawn reconstruction layer"
        historicalPanel={
          <p>
            This column holds the manuscript-facing posture: ◆ Historical Evidence — table geometry and attributions
            as edited in critical editions. The letters shown here are schematic only; facsimile lines live in the
            paired Source Pack when filed.
          </p>
        }
        laterPanel={
          <p>
            This column holds △ Later Interpretation: Golden Dawn and related systematizations that reorganize or
            extend the manuscript record. The toggle swaps schematic letter order only — it does not instruct which
            arrangement to prefer.
          </p>
        }
        caption="Neither panel is a verdict. The layout holds both versions in parallel so you can practice source discernment at the level of structure."
      />
    </div>
  );
}
