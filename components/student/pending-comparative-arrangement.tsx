/**
 * When a folio declares no comparison surfaces and has no reader column yet —
 * calm archival filler, not a product teaser.
 */
export function PendingComparativeArrangement() {
  return (
    <div
      className="my-14 border border-gold-dim/20 bg-ink/20 px-6 py-12 text-center sm:px-10"
      aria-label="Comparative arrangement not filed"
    >
      <p className="font-display text-[9px] uppercase tracking-[0.2em] text-gold-dim/60">Catalogue note</p>
      <p className="mx-auto mt-4 max-w-md text-pretty text-[14px] italic leading-relaxed text-gold-pale/85">
        This folio is catalogued. No demonstration surfaces have been prepared for this section. The shelf remains in order.
      </p>
    </div>
  );
}
