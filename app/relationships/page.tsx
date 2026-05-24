import { WebGraph } from "@/components/relationship-web/web-graph";

export const metadata = {
  title: "Relationship Web · Celestial Archive",
  description: "How Enochian ideas flow from Dee through manuscripts to modern practice."
};

export default function RelationshipsPage() {
  return (
    <section className="mx-auto max-w-[980px] space-y-10">
      <header className="space-y-4 border-b border-gold-dim/35 pb-10">
        <p className="font-display text-xs uppercase tracking-[0.32em] text-gold-dim">Transmission</p>
        <h1 className="font-display text-4xl text-gold">Relationship Web</h1>
        <p className="max-w-[720px] leading-[1.9] text-gold-dim">
          A map of how persons, texts, and traditions connect — without ranking which connection is &quot;true.&quot;
        </p>
      </header>
      <WebGraph />
    </section>
  );
}
