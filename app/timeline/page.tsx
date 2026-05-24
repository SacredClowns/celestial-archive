import { QuestionsThisRaises } from "@/components/discernment/questions-this-raises";
import { InteractiveTimeline } from "@/components/timeline/interactive-timeline";
import { getTimelineData } from "@/lib/timeline/timeline-data";

export const metadata = {
  title: "Timeline · Celestial Archive",
  description: "A chronology of the Enochian transmissions and their reception."
};

export default function TimelinePage() {
  const data = getTimelineData();

  return (
    <section className="mx-auto max-w-[980px] space-y-12">
      <header className="space-y-4 border-b border-gold-dim/35 pb-10">
        <p className="font-display text-xs uppercase tracking-[0.32em] text-gold-dim">Chronology</p>
        <h1 className="font-display text-4xl tracking-[0.08em] text-gold">{data.title}</h1>
        <p className="max-w-[720px] leading-[1.9] text-gold-pale">{data.subtitle}</p>
      </header>
      <InteractiveTimeline />

      <QuestionsThisRaises
        questions={[
          "Which events on this timeline are single-manuscript witnesses — and how does that change your confidence?",
          "Why include ancient parallels at all — does comparison illuminate or distract?",
          "Where does the timeline end, and what does that ending imply about 'the Enochian story'?"
        ]}
      />
    </section>
  );
}
