export default function StudentLessonLoading() {
  return (
    <div
      className="mx-auto max-w-[1100px] animate-archival-fade-in px-4 py-12 opacity-0"
      aria-busy="true"
      aria-live="polite"
    >
      <p className="font-display text-xs uppercase tracking-[0.2em] text-gold-dim">Opening folio…</p>
      <p className="mt-3 max-w-[820px] text-sm leading-relaxed text-gold-pale/90">
        Reader column and demonstrations load together. If this lingers, the route may still be compiling in preview.
      </p>
    </div>
  );
}
