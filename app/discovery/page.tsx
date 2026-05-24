import { DiscoveryIndex } from "@/components/discovery/discovery-index";

export const metadata = {
  title: "Discovery Log · Celestial Archive",
  description: "Your personal record of patterns, terms, and connections noticed in the Archive."
};

export default function DiscoveryPage() {
  return (
    <section className="page-enter mx-auto max-w-[720px] space-y-8">
      <header className="space-y-3 border-b border-gold-dim/30 pb-8">
        <p className="font-display text-xs uppercase tracking-[0.32em] text-gold-dim">Personal</p>
        <h1 className="font-display text-4xl text-gold">Discovery log</h1>
        <p className="leading-[1.9] text-gold-dim">
          A private list of what you noticed while reading — not achievements, not ranks. Stored on this device only.
        </p>
      </header>
      <DiscoveryIndex />
    </section>
  );
}
