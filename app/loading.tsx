export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p
        className="font-display text-[9px] uppercase tracking-[0.2em] text-gold-dim/50"
        style={{ animation: "vignette-breathe 3s ease-in-out infinite" }}
      >
        The shelf arranges itself
      </p>
    </div>
  );
}
