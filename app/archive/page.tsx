import { EpistemicBadge } from "@/components/discernment/epistemic-badge";

export default function ArchivePage() {
  return (
    <section className="reading-column space-y-8">
      <h1 className="font-display text-3xl tracking-[0.08em] text-gold">Archive</h1>
      <p className="leading-[1.9] text-gold-pale">
        The archive landing surface prioritizes traceable claims, lens-aware interpretation, and calm entry points for Seeker-stage orientation.
      </p>
      <div className="flex flex-wrap gap-2">
        <EpistemicBadge tone="historical" />
        <EpistemicBadge tone="consensus" />
        <EpistemicBadge tone="occult" />
      </div>
    </section>
  );
}

