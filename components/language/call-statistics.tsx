import type { CallCorpusStatistics } from "@/lib/language/language-types";

export function CallStatistics({ stats }: { stats: CallCorpusStatistics }) {
  const maxCount = Math.max(...stats.wordsPerCall.map((c) => c.count), 1);

  return (
    <section className="space-y-6 rounded-sm border border-gold-dim/20 bg-ink/20 p-5">
      <h2 className="font-display text-sm uppercase tracking-[0.18em] text-gold-dim">Corpus overview</h2>
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="text-xs uppercase tracking-wider text-gold-dim">Unique words</dt>
          <dd className="font-display text-2xl text-gold">{stats.totalUniqueWords}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-gold-dim">Average per Call</dt>
          <dd className="font-display text-2xl text-gold">{stats.averageWordsPerCall}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-gold-dim">Longest</dt>
          <dd className="text-sm text-gold-pale">
            Call {stats.longest.number} · {stats.longest.count} words
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-gold-dim">Shortest</dt>
          <dd className="text-sm text-gold-pale">
            Call {stats.shortest.number} · {stats.shortest.count} words
          </dd>
        </div>
      </dl>

      <div>
        <p className="mb-2 text-xs uppercase tracking-wider text-gold-dim">Most frequent tokens</p>
        <p className="font-mono text-sm text-gold-pale">
          {stats.topWords.map((w) => `${w.word} (${w.count})`).join(" · ")}
        </p>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-wider text-gold-dim">Words per Call</p>
        <div className="flex items-end gap-1" role="img" aria-label="Bar chart of word counts per Call">
          {stats.wordsPerCall.map((c) => (
            <div key={c.number} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full min-w-[6px] rounded-t-sm bg-gold/50 transition-[height]"
                style={{ height: `${Math.max(8, (c.count / maxCount) * 72)}px` }}
                title={`Call ${c.number}: ${c.count} words`}
              />
              <span className="text-[8px] text-gold-dim/70">{c.number}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
