import { stageProgress } from "@/lib/content";

const rankNames = ["Seeker", ...stageProgress.futureRanks];

export function ProgressionPanel() {
  return (
    <section className="inscribed-frame bg-parchment/25 px-6 py-6">
      <h3 className="font-display text-base tracking-[0.06em] text-gold">Progression</h3>
      <p className="mt-4 text-[15px] text-gold-pale">
        Current rank: <span className="font-display text-gold-light">{stageProgress.currentRank}</span>
      </p>
      <p className="text-sm text-gold-light/80">Next rank: {stageProgress.nextRank}</p>

      <div className="mt-6 flex gap-1.5" aria-label="Rank progression">
        {rankNames.map((rank, idx) => (
          <div key={rank} className="group flex flex-col items-center gap-1.5">
            <span
              className={`h-2 w-9 transition-colors ${
                idx < 1
                  ? "border border-gold-light/50 bg-gold-dim/60"
                  : "border border-gold-dim/35 bg-ink/40"
              }`}
            />
            <span className={`font-display text-[7px] uppercase tracking-[0.12em] ${
              idx < 1 ? "text-gold-light/70" : "text-gold-dim/50"
            }`}>
              {rank}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
