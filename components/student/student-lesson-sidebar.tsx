"use client";

import Link from "next/link";
import { getGlossaryEntryByTerm } from "@/lib/glossary";
import { StudentSourcePackReference } from "@/components/student/student-source-pack-reference";
import { comparisonRequirementLabels } from "@/lib/student/student-registry-helpers";
import type { StudentLessonViewModel } from "@/lib/student/student-lesson-view";

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-l border-gold-dim/25 bg-ink/20 px-4 py-4 sm:px-5">
      <h3 className="font-display text-[10px] uppercase tracking-[0.14em] text-gold-light/80">{title}</h3>
      <div className="mt-3 space-y-3 text-[13px] leading-[1.75] text-gold-pale/90">{children}</div>
    </section>
  );
}

function nodeLabel(nodes: StudentLessonViewModel["relationshipNodes"], id: string): string {
  return nodes.find((n) => n.id === id)?.label ?? id;
}

export function StudentLessonSidebar({
  viewModel,
  onOpenGlossary
}: {
  viewModel: StudentLessonViewModel;
  onOpenGlossary: (term: string) => void;
}) {
  const { record, relationshipNodes, relationshipEdges } = viewModel;
  const terms = viewModel.displayGlossaryTerms;
  const comparisonLines = comparisonRequirementLabels(record);
  const showRelationship = record.comparisonRequirements.requiresRelationshipWeb;
  const relationshipSparse =
    showRelationship && relationshipNodes.length === 0 && record.relationshipNodeIds.length > 0;
  const relationshipNoEdges = showRelationship && relationshipNodes.length > 0 && relationshipEdges.length === 0;
  const marginLight =
    terms.length === 0 &&
    viewModel.displayTimelineAnchors.length === 0 &&
    comparisonLines.length === 0 &&
    !showRelationship;

  return (
    <nav className="space-y-5" aria-label="Folio context">
      {marginLight ? (
        <p className="border-l border-gold-dim/20 bg-ink/15 px-4 py-3 text-[12px] leading-relaxed text-gold-dim/80">
          This folio keeps the margin light — only the verification strip below is filed here.
        </p>
      ) : null}

      {terms.length > 0 ? (
        <SidebarSection title="Key terms">
          {terms.map((term) => {
            const entry = getGlossaryEntryByTerm(term);
            const preview =
              entry?.oneLine ?? "Named in the folio; glossary entry still being filed.";
            return (
              <div key={term}>
                <button
                  type="button"
                  onClick={() => onOpenGlossary(term)}
                  className="text-left font-display text-[13px] text-gold-light underline decoration-gold-dim/40 underline-offset-4 transition-colors duration-slow ease-gravity hover:text-gold"
                >
                  {term}
                </button>
                <p className="mt-0.5 text-[12px] text-gold-dim/80">{preview}</p>
              </div>
            );
          })}
        </SidebarSection>
      ) : null}

      {viewModel.displayTimelineAnchors.length > 0 ? (
        <SidebarSection title="Timeline anchors">
          {viewModel.displayTimelineAnchors.map((a) => (
            <div key={`${a.date}-${a.event}`} className="border-l border-gold/30 pl-3 py-1">
              <p className="font-display text-[12px] text-gold-light">{a.date}</p>
              <p className="text-[12px] text-gold-pale/80">{a.event}</p>
            </div>
          ))}
          <p className="mt-1 text-[11px] text-gold-dim/70">
            <Link href="/timeline" className="text-gold-light/70 underline decoration-gold-dim/30 underline-offset-4 transition-colors duration-slow ease-gravity hover:text-gold-light">
              Full timeline
            </Link>
          </p>
        </SidebarSection>
      ) : null}

      {comparisonLines.length > 0 ? (
        <SidebarSection title="Demonstrations">
          <ul className="list-none space-y-2 text-[12px] leading-relaxed text-gold-dim/90">
            {comparisonLines.map((line) => (
              <li key={line} className="border-l border-gold-dim/25 pl-3">
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] italic text-gold-dim/70">
            These fragments compare arrangement — not truth.
          </p>
        </SidebarSection>
      ) : null}

      {showRelationship ? (
        <details className="border-l border-gold-dim/25 bg-ink/20 px-4 py-3 sm:px-5">
          <summary className="cursor-pointer font-display text-[10px] uppercase tracking-[0.14em] text-gold-light/80 marker:text-gold-dim/50">
            Relationship map
          </summary>
          <div className="mt-4 border-t border-gold-dim/20 pt-3">
            <p className="text-pretty text-[11px] leading-relaxed text-gold-dim/80">
              Same node set as the Transmission Map in the reader column — margin view only.
            </p>
            {relationshipSparse ? (
              <p className="mt-3 text-pretty text-[11px] italic leading-relaxed text-gold-dim/70">
                Nodes named but not yet wired — edges will appear when the map is extended.
              </p>
            ) : null}
            {!relationshipSparse && relationshipNodes.length === 0 ? (
              <p className="mt-3 text-[11px] italic text-gold-dim/70">No nodes declared for this folio.</p>
            ) : null}
            {relationshipNodes.length > 0 ? (
              <>
                <p className="mt-3 font-display text-[9px] uppercase tracking-[0.12em] text-gold-dim/60">Nodes</p>
                <ul className="mt-2 list-none space-y-1.5 font-display text-[12px] tracking-[0.04em] text-gold-pale/80">
                  {relationshipNodes.map((node) => (
                    <li key={node.id} className="border-l border-gold-dim/30 pl-3">
                      {node.label}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            {relationshipNoEdges ? (
              <p className="mt-3 text-pretty text-[11px] text-gold-dim/70">
                No edges cross this slice.
              </p>
            ) : null}
            {relationshipEdges.length > 0 ? (
              <>
                <p className="mt-4 font-display text-[9px] uppercase tracking-[0.12em] text-gold-dim/60">Edges</p>
                <ul className="mt-2 list-none space-y-2 text-[11px] leading-relaxed text-gold-pale/80">
                  {relationshipEdges.map((edge) => (
                    <li key={edge.id} className="border-l border-gold-dim/25 pl-2">
                      <span className="text-gold-light/80">{nodeLabel(relationshipNodes, edge.fromNodeId)}</span>
                      <span className="text-gold-dim/60"> — {edge.label} — </span>
                      <span className="text-gold-light/80">{nodeLabel(relationshipNodes, edge.toNodeId)}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </details>
      ) : null}

      <StudentSourcePackReference
        compact
        sourcePackId={viewModel.displaySourcePackId}
        descriptor={viewModel.displaySourcePackDescriptor}
        documentAvailable={viewModel.sourcePackDocumentAvailable}
      />
    </nav>
  );
}
