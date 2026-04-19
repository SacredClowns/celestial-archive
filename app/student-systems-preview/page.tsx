import type { Metadata } from "next";
import Link from "next/link";
import { GreatTableVersionDemo } from "@/components/student/great-table-version-demo";
import { InteractiveGrid } from "@/components/student/interactive-grid";
import { TransmissionSchematic } from "@/components/student/transmission-schematic";
import { LOAGAETH_PROTOTYPE_GRID } from "@/lib/lessons/student-prototype-placeholders";

export const metadata: Metadata = {
  title: "Student systems preview — Celestial Archive",
  description: "Controlled preview of Student-rank comparison surfaces for editorial review.",
  robots: { index: false, follow: false }
};

export default function StudentSystemsPreviewPage() {
  return (
    <main className="reading-column mx-auto min-w-0 space-y-20 px-4 pb-24 pt-6 sm:px-0 sm:pt-8">
      <article className="space-y-20">
      <header className="border-b border-gold-dim/40 pb-8">
        <p className="font-display text-xs uppercase tracking-[0.22em] text-gold-dim">Student rank · review room</p>
        <h1 className="mt-3 font-display text-3xl tracking-[0.06em] text-gold md:text-4xl">Structural surfaces — review room</h1>
        <p className="mt-4 max-w-reading text-gold-pale">
          This route holds Student-rank comparison fragments for editorial inspection. Grids and diagrams are pedagogical
          instruments: they organize attention, not evidence. Nothing here resolves Liber Loagaeth or ranks one tradition
          over another.
        </p>
      </header>

      <section className="space-y-4" aria-labelledby="demo-1-heading">
        <h2 id="demo-1-heading" className="font-display text-2xl text-gold-light">
          Demo 1 — Inscrutable grid
        </h2>
        <p className="max-w-reading text-gold-pale">
          A muted grid surface that deliberately withholds keys, tooltips, and solve affordances. The Archive presents
          the letter field; it does not decode it here.
        </p>
        <InteractiveGrid
          variant="loagaeth"
          rows={8}
          columns={8}
          cells={LOAGAETH_PROTOTYPE_GRID}
          aria-label="Unresolved eight-by-eight letter grid fragment"
          caption="Liber Loagaeth–style surface (demonstration only)"
        />
      </section>

      <section className="space-y-4" aria-labelledby="demo-2-heading">
        <h2 id="demo-2-heading" className="font-display text-2xl text-gold-light">
          Demo 2 — Version toggle and source comparison
        </h2>
        <p className="max-w-reading text-gold-pale">
          Hold Dee-era ordering and Golden Dawn reformed ordering in one place. The △ badge marks the later tradition on
          the toggle; panels below name the epistemic layer each column represents.
        </p>
        <GreatTableVersionDemo />
      </section>

      <section className="space-y-4" aria-labelledby="demo-3-heading">
        <h2 id="demo-3-heading" className="font-display text-2xl text-gold-light">
          Demo 3 — Transmission schematic
        </h2>
        <p className="max-w-reading text-gold-pale">
          A cartographic relationship drawing: labeled edges only, orthogonal strokes, no glow or proof-board rhetoric.
        </p>
        <TransmissionSchematic />
      </section>
      </article>

      <footer className="border-t border-gold-dim/30 pt-8 text-sm text-gold-dim">
        <p>
          <Link href="/path/student" className="border-b border-gold-dim text-gold-light hover:text-gold">
            Student path
          </Link>
          {" — "}
          folios with prose and filing marks live there; this route is surfaces only.
        </p>
      </footer>
    </main>
  );
}
