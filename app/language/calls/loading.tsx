export default function CallsLoading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <p
        className="font-display text-[10px] uppercase tracking-[0.2em] text-gold-dim/60"
        style={{ animation: "vignette-breathe 3s ease-in-out infinite" }}
      >
        Loading Call text…
      </p>
    </div>
  );
}
