"use client";

import { memo } from "react";
import { GreatTableVersionDemo } from "@/components/student/great-table-version-demo";
import { InteractiveGrid } from "@/components/student/interactive-grid";
import { TransmissionSchematic } from "@/components/student/transmission-schematic";
import { LOAGAETH_PROTOTYPE_GRID } from "@/lib/lessons/student-prototype-placeholders";
import type { StudentLessonRecord } from "@/lib/student/student-lesson-registry";

const TRANSMISSION_CAPTION =
  "Transmission and structural dependency only — not causality, proof, or completeness.";

function ComparisonSurfaceFrame({
  title,
  children,
  footnote,
  first
}: {
  title: string;
  children: React.ReactNode;
  footnote: string;
  first: boolean;
}) {
  return (
    <section
      className={`border border-gold-dim/20 bg-ink/15 px-5 py-7 sm:px-7 ${first ? "mt-8" : "mt-10"}`}
    >
      <h2 className="font-display text-base tracking-[0.06em] text-gold-light">{title}</h2>
      <p className="mt-2 text-pretty text-[10px] uppercase tracking-[0.1em] text-gold-dim/60">{footnote}</p>
      <div className="mt-7 min-w-0 max-w-full">{children}</div>
    </section>
  );
}

/**
 * Registry-driven comparison / demonstration slots for Student rank.
 * Order: Great Table (if declared) → Loagaeth-class grid (if declared) → Transmission Map (if declared).
 */
export const StudentComparisonSlots = memo(function StudentComparisonSlots({
  record
}: {
  record: StudentLessonRecord;
}) {
  const req = record.comparisonRequirements;
  const showGreatTable = req.requiresSourceComparisonLayout || req.requiresVersionToggle;
  if (!showGreatTable && !req.requiresInteractiveGrid && !req.requiresRelationshipWeb) {
    return null;
  }

  let seen = 0;
  const isFirst = () => {
    if (seen === 0) {
      seen += 1;
      return true;
    }
    seen += 1;
    return false;
  };

  return (
    <div
      className="student-comparison-slots min-w-0 max-w-full space-y-8"
      role="region"
      aria-label="Demonstration surfaces for this folio"
    >
      {showGreatTable ? (
        <ComparisonSurfaceFrame
          first={isFirst()}
          title="Historical witness vs later arrangement"
          footnote="Schematic fragment for layout comparison — not a diplomatic transcription. Differences are structural, not scored."
        >
          <div className="min-w-0 overflow-x-auto">
            <GreatTableVersionDemo />
          </div>
        </ComparisonSurfaceFrame>
      ) : null}

      {req.requiresInteractiveGrid ? (
        <ComparisonSurfaceFrame
          first={isFirst()}
          title="Letter grid (fragment)"
          footnote="Gaps and missing boundaries mark lacunae and editorial uncertainty — the Archive does not resolve the matrix here."
        >
          <div className="min-w-0 overflow-x-auto">
            <InteractiveGrid
              variant="loagaeth"
              rows={8}
              columns={8}
              cells={LOAGAETH_PROTOTYPE_GRID}
              loagaethAmbientHover
              aria-label="Letter grid fragment for manuscript comparison"
              caption="Loagaeth-class structural fragment — not a diplomatic transcription."
            />
          </div>
        </ComparisonSurfaceFrame>
      ) : null}

      {req.requiresRelationshipWeb ? (
        <ComparisonSurfaceFrame first={isFirst()} title="Transmission Map (local)" footnote={TRANSMISSION_CAPTION}>
          <TransmissionSchematic caption={TRANSMISSION_CAPTION} />
        </ComparisonSurfaceFrame>
      ) : null}
    </div>
  );
});
