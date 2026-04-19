/**
 * Archival source-pack reference — rigor layer beside lesson prose, not a CTA.
 */

export type StudentSourcePackReferenceProps = {
  sourcePackId: string;
  descriptor?: string;
  /** Whether the rigor-layer markdown file is present in the repo */
  documentAvailable: boolean;
  /** Sidebar / margin: minimal duplicate of header strip */
  compact?: boolean;
};

export function StudentSourcePackReference({
  sourcePackId,
  descriptor,
  documentAvailable,
  compact = false
}: StudentSourcePackReferenceProps) {
  if (compact) {
    return (
      <aside className="min-w-0 border border-gold-dim/30 bg-ink/30 px-3 py-3 text-xs text-gold-dim">
        <p className="font-display text-[10px] uppercase tracking-[0.16em] text-gold-light">Source pack</p>
        <p className="mt-1 break-words font-mono text-[11px] text-gold-pale">{sourcePackId}</p>
        {descriptor ? (
          <p className="mt-2 line-clamp-5 break-words leading-relaxed text-gold-pale/90">{descriptor}</p>
        ) : null}
        <p className="mt-2 leading-relaxed text-gold-dim/95">
          {documentAvailable
            ? "Verification folio on shelf — audits claims; not the reader column."
            : "Not on shelf yet — id reserves the filename editors will file."}
        </p>
      </aside>
    );
  }

  return (
    <aside className="min-w-0 border border-gold-dim/35 bg-parchment-dark/40 px-4 py-4 text-sm text-gold-dim">
      <p className="font-display text-[11px] uppercase tracking-[0.18em] text-gold-light">Source pack</p>
      <p className="mt-2 break-words font-mono text-[13px] leading-relaxed text-gold-pale">{sourcePackId}</p>
      {descriptor ? (
        <p className="mt-3 line-clamp-6 break-words leading-relaxed text-gold-pale/95">{descriptor}</p>
      ) : null}
      <p className="mt-4 border-t border-gold-dim/25 pt-3 text-xs leading-relaxed text-gold-dim/95">
        {documentAvailable
          ? "Support document on shelf: claim audit beside the reader column, not a second lesson."
          : "Support document not filed yet. Reader column may still open; evidence tables arrive in their own pass."}
      </p>
    </aside>
  );
}
