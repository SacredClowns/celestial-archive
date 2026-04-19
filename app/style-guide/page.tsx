import { MultipleInterpretationsBlock, NoticeBlock, DiscernmentPracticeBlock } from "@/components/discernment/blocks";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import { ProgressionPanel } from "@/components/progression/progression-panel";
import { SurfaceCard } from "@/components/ui/surface-card";

export default function StyleGuidePage() {
  return (
    <div className="space-y-24">
      <section className="reading-column">
        <h1 className="font-display text-4xl tracking-[0.08em] text-gold">Style Guide Approval</h1>
        <p className="mt-4 leading-[1.9] text-gold-pale">
          This route exists for visual and interaction approval before deeper implementation in Build Pass 3.
        </p>
      </section>

      <section className="reading-column space-y-6">
        <h2 className="font-display text-3xl text-gold-light">Typography</h2>
        <p className="font-display text-2xl tracking-[0.08em] text-gold">Cinzel heading sample</p>
        <p className="text-gold-pale">Cormorant Garamond body sample at 1.86 line-height for contemplative reading rhythm.</p>
      </section>

      <section className="reading-column space-y-4">
        <h2 className="font-display text-3xl text-gold-light">Color Tokens</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["Ink", "#080604"],
            ["Deep", "#0d0a05"],
            ["Parchment", "#140f07"],
            ["Gold", "#c9a84c"],
            ["Gold Light", "#e8cc7d"],
            ["Gold Pale", "#f5e8c0"],
            ["Gold Dim", "#7a6230"],
            ["Ash", "#3a3020"]
          ].map(([name, color]) => (
            <div key={name} className="border border-gold-dim/55 p-3">
              <div className="h-8 border border-gold-dim/45" style={{ backgroundColor: color }} />
              <p className="mt-2 text-sm text-gold-light">{name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reading-column space-y-3">
        <h2 className="font-display text-3xl text-gold-light">Epistemic Badges</h2>
        <div className="flex flex-wrap gap-2">
          <EpistemicBadge tone="historical" />
          <EpistemicBadge tone="consensus" />
          <EpistemicBadge tone="occult" />
          <EpistemicBadge tone="later" />
          <EpistemicBadge tone="speculative" />
          <EpistemicBadge tone="parallel" />
          <EpistemicBadge tone="disputed" />
          <EpistemicBadge tone="caution" />
        </div>
      </section>

      <section className="reading-column space-y-6">
        <NoticeBlock>Notice block sample for self-observation prompts.</NoticeBlock>
        <DiscernmentPracticeBlock>Discernment block sample for evidence-versus-interpretation practice.</DiscernmentPracticeBlock>
        <MultipleInterpretationsBlock
          items={[
            { lens: "Historical", tone: "historical", text: "The manuscript states this directly." },
            { lens: "Traditional", tone: "occult", text: "Later ritual systems interpret this operationally." }
          ]}
        />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <SurfaceCard title="Locked Pillar" locked>
          <p>Visible but inaccessible. No padlock icon. No paywall framing.</p>
          <p className="mt-3 text-sm italic">This section becomes available after progression criteria are met.</p>
        </SurfaceCard>
        <ProgressionPanel />
      </section>
    </div>
  );
}

