import Link from "next/link";
import { SvgObservatory } from "@/components/observatory/svg-observatory";

export default function ObservatoryPage() {
  return (
    <section className="space-y-8">
      <h1 className="font-display text-3xl tracking-[0.08em] text-gold">Observatory</h1>
      <SvgObservatory />
      <p className="reading-column text-gold-light">
        The home observatory currently uses an SVG/CSS implementation for atmosphere, stability,
        and performance.
      </p>
      <nav aria-label="Observatory tools" className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/observatory/loagaeth"
          className="inscribed-frame block bg-ink/40 p-5 transition-colors duration-slow ease-gravity hover:bg-ink/60"
        >
          <p className="font-display text-lg tracking-[0.06em] text-gold-light">
            Liber Loagaeth — Structural Viewer
          </p>
          <p className="mt-1 text-sm text-gold-dim">
            Sloane MS 3189 · 49 leaves · an unsolved manuscript
          </p>
        </Link>
      </nav>
    </section>
  );
}

