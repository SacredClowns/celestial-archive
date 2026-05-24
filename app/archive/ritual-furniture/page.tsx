import Link from "next/link";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import { QuestionsThisRaises } from "@/components/discernment/questions-this-raises";
import { RITUAL_FURNITURE_ITEMS } from "@/lib/archive/ritual-furniture";

export const metadata = {
  title: "Ritual Furniture · Archive",
  description: "Sigillum Dei, Holy Table, ring, and lamen — stub entries with manuscript framing."
};

export default function RitualFurnitureIndexPage() {
  return (
    <section className="page-enter mx-auto max-w-[820px] space-y-12">
      <header className="space-y-4 border-b border-gold-dim/35 pb-10">
        <p className="font-display text-xs uppercase tracking-[0.32em] text-gold-dim">Archive</p>
        <h1 className="font-display text-4xl text-gold">Ritual Furniture</h1>
        <p className="leading-[1.9] text-gold-pale">
          Physical instruments from Dee&apos;s practice — documented where manuscripts and artifacts allow.
          These pages are structural stubs; fuller entries follow in a later content pass.
        </p>
        <Link href="/archive" className="text-xs uppercase tracking-wider text-gold-dim hover:text-gold">
          ← Archive hub
        </Link>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {RITUAL_FURNITURE_ITEMS.map((item) => (
          <li key={item.slug}>
            <Link href={`/archive/ritual-furniture/${item.slug}`}>
              <CandlelightCard className="h-full rounded-sm border border-gold-dim/25 bg-ink/20 p-5 hover:border-gold/40">
                <EpistemicBadge tone={item.badge} compact />
                <h2 className="mt-3 font-display text-xl text-gold">{item.title}</h2>
                <p className="mt-1 text-sm text-gold-dim">{item.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-gold-pale/90">{item.summary}</p>
              </CandlelightCard>
            </Link>
          </li>
        ))}
      </ul>

      <QuestionsThisRaises
        questions={[
          "Why did Dee treat furniture as part of the same system as language and tablets?",
          "Which modern reconstructions are exhibition pieces versus working ritual copies?",
          "What care is needed before treating any object as an instruction to practice?"
        ]}
      />
    </section>
  );
}
