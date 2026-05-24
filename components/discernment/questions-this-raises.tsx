import { CandlelightCard } from "@/components/motion/candlelight-card";

const DEFAULT_QUESTIONS = [
  "What would change in your reading if the primary record were incomplete or mistranscribed?",
  "Which tradition's framing feels most honest to you here — and which feels like it is asking you to believe too much?",
  "What do you still not know after reading this page, and is that absence informative?"
];

export function QuestionsThisRaises({
  questions = DEFAULT_QUESTIONS,
  title = "Questions this raises"
}: {
  questions?: string[];
  title?: string;
}) {
  if (!questions.length) return null;

  return (
    <CandlelightCard className="mt-12 rounded-sm border border-gold-dim/25 bg-ink/15 p-6 sm:p-8">
      <h2 className="font-display text-sm uppercase tracking-[0.22em] text-gold-dim">{title}</h2>
      <p className="mt-3 text-sm italic text-gold-dim">
        The Archive does not resolve these. They are mirrors for your own discernment.
      </p>
      <ul className="mt-6 list-none space-y-4">
        {questions.map((q) => (
          <li
            key={q}
            className="border-l-2 border-gold-dim/35 pl-4 leading-[1.85] text-gold-pale"
          >
            {q}
          </li>
        ))}
      </ul>
    </CandlelightCard>
  );
}
