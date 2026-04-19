export default function StudentPathLoading() {
  return (
    <div
      className="reading-column mx-auto animate-archival-fade-in px-1 py-12 opacity-0 sm:px-0"
      aria-busy="true"
      aria-live="polite"
    >
      <p className="font-display text-xs uppercase tracking-[0.2em] text-gold-dim">Retrieving shelf…</p>
      <p className="mt-3 max-w-reading text-sm leading-relaxed text-gold-pale/90">
        The Archive is opening the next room. This is not a stall — only a brief hand on the folio edge.
      </p>
    </div>
  );
}
