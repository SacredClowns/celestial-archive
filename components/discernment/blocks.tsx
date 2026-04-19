import { EpistemicBadge } from "./epistemic-badge";
import { EpistemicTone } from "@/lib/lesson-types";

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="my-10 border border-gold-dim/35 bg-parchment/20 px-6 py-6 sm:px-8">
      <h4 className="font-display text-[10px] uppercase tracking-[0.16em] text-gold">{title}</h4>
      <div className="mt-4 leading-[1.9] text-gold-pale">{children}</div>
    </section>
  );
}

function FramedBlock({
  title,
  children,
  headingless,
  frameClass
}: {
  title: string;
  children: React.ReactNode;
  headingless?: boolean;
  frameClass: string;
}) {
  return (
    <section className={`my-10 border border-gold-dim/35 px-6 py-6 sm:px-8 ${frameClass}`}>
      {headingless ? null : (
        <h4 className="font-display text-[10px] uppercase tracking-[0.16em] text-gold">{title}</h4>
      )}
      <div className={headingless ? "leading-[1.9] text-gold-pale" : "mt-4 leading-[1.9] text-gold-pale"}>{children}</div>
    </section>
  );
}

export const NoticeBlock = ({
  children,
  headingless
}: {
  children: React.ReactNode;
  headingless?: boolean;
}) => (
  <section className="my-10 border-l-2 border-gold-dim/50 bg-parchment/15 px-6 py-5 sm:px-8">
    {headingless ? null : (
      <h4 className="font-display text-[10px] uppercase tracking-[0.16em] text-gold-light">Notice</h4>
    )}
    <div className={headingless ? "italic leading-[1.9] text-gold-light/90" : "mt-4 italic leading-[1.9] text-gold-light/90"}>
      {children}
    </div>
  </section>
);

export const DiscernmentPracticeBlock = ({
  children,
  headingless
}: {
  children: React.ReactNode;
  headingless?: boolean;
}) => <FramedBlock title="Discernment Practice" headingless={headingless} frameClass="bg-parchment/20" children={children} />;

export const ReflectionPromptBlock = ({
  children,
  headingless
}: {
  children: React.ReactNode;
  headingless?: boolean;
}) => <FramedBlock title="Reflection" headingless={headingless} frameClass="bg-parchment/15" children={children} />;

export const WarningBlock = ({
  children,
  headingless
}: {
  children: React.ReactNode;
  headingless?: boolean;
}) => <FramedBlock title="Caution" headingless={headingless} frameClass="border-l-2 border-l-amber/40 bg-parchment/15" children={children} />;

/** Multiple lenses as freeform markdown (semantic directive); no per-lens badge grid. */
export function MultipleInterpretationsFreeformBlock({ children }: { children: React.ReactNode }) {
  return (
    <Shell title="Multiple Interpretations">
      <div className="leading-[1.9] text-gold-pale">{children}</div>
      <p className="mt-5 text-[14px] italic text-gold-light/80">These readings do not collapse into one conclusion. The evidence remains in tension.</p>
    </Shell>
  );
}

export function KnowledgeCheckBlock({
  children,
  headingless
}: {
  children: React.ReactNode;
  headingless?: boolean;
}) {
  return (
    <section className="my-10 border border-gold-dim/30 bg-ink/25 px-6 py-6 sm:px-8">
      {headingless ? null : (
        <h4 className="font-display text-[10px] uppercase tracking-[0.16em] text-gold-light">Knowledge Check</h4>
      )}
      <div className={headingless ? "text-gold-pale" : "mt-4 text-gold-pale"}>{children}</div>
    </section>
  );
}

export function UnlocksBlock({ children, headingless }: { children: React.ReactNode; headingless?: boolean }) {
  return (
    <section className="my-10 border border-gold-dim/25 bg-ink/20 px-6 py-6 sm:px-8">
      {headingless ? null : (
        <h4 className="font-display text-[10px] uppercase tracking-[0.16em] text-gold-light/80">Unlocks</h4>
      )}
      <div className={headingless ? "text-gold-pale" : "mt-4 text-gold-pale"}>{children}</div>
    </section>
  );
}

export function SourceStripBlock({ children }: { children: React.ReactNode }) {
  return (
    <section className="mt-14 border-t border-gold-dim/35 pt-8 text-[14px] leading-relaxed text-gold-dim">
      {children}
    </section>
  );
}

export function ClosingPassageBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl space-y-6 text-center text-lg leading-[2] text-gold-pale/95">{children}</div>
  );
}

export function MultipleInterpretationsBlock({ items }: { items: Array<{ lens: string; text: string; tone: EpistemicTone }> }) {
  return (
    <Shell title="Multiple Interpretations">
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.lens} className="border border-gold-dim/30 bg-ink/25 px-5 py-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="font-display text-[12px] tracking-[0.04em] text-gold-light">{item.lens}</p>
              <EpistemicBadge tone={item.tone} compact />
            </div>
            <p className="text-[15px] leading-[1.9] text-gold-pale">{item.text}</p>
          </article>
        ))}
      </div>
      <p className="mt-5 text-[14px] italic text-gold-light/80">These readings do not collapse into one conclusion. The evidence remains in tension.</p>
    </Shell>
  );
}
