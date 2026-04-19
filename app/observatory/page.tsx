import { SvgObservatory } from "@/components/observatory/svg-observatory";

export default function ObservatoryPage() {
  return (
    <section className="space-y-8">
      <h1 className="font-display text-3xl tracking-[0.08em] text-gold">Observatory</h1>
      <SvgObservatory />
      <p className="reading-column text-gold-light">The home observatory currently uses an SVG/CSS implementation for atmosphere, stability, and performance.</p>
    </section>
  );
}

