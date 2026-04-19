"use client";

export default function StudentPathError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="reading-column mx-auto space-y-6 px-1 py-14 sm:px-0">
      <header className="space-y-2 border-b border-gold-dim/30 pb-6">
        <p className="font-display text-xs uppercase tracking-[0.18em] text-gold-dim">Student path</p>
        <h1 className="font-display text-2xl tracking-[0.06em] text-gold-light">This room did not open cleanly</h1>
      </header>
      <p className="leading-[1.9] text-gold-pale">
        Something in the Student path failed to render. The manuscripts are still on the shelf; this is a display fault,
        not a verdict about the material.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="border border-gold-dim/50 bg-ink/40 px-4 py-2 font-display text-xs uppercase tracking-[0.16em] text-gold-light transition-colors duration-slow ease-gravity hover:border-gold/60 hover:text-gold"
      >
        Try opening the room again
      </button>
    </div>
  );
}
