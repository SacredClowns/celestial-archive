import { AethyrRings } from "@/components/aethyrs/aethyr-rings";
import { ChamberPageHeader, ChamberSourceNote } from "@/components/language/chamber-page-header";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import Link from "next/link";
import { getAethyrExplorerData, getAethyrsForRingDisplay } from "@/lib/aethyrs/aethyr-data";

export const metadata = {
  title: "The 30 Aethyrs · Celestial Archive",
  description: "Concentric regions of the Enochian cosmos, accessed through the Nineteenth Call."
};

export default function AethyrsPage() {
  const meta = getAethyrExplorerData();
  const aethyrs = getAethyrsForRingDisplay();

  return (
    <section className="mx-auto w-full max-w-[980px] space-y-12">
      <CandlelightCard className="rounded-sm border border-gold-dim/25 bg-ink/20 p-5">
        <div className="flex items-start gap-3">
          <EpistemicBadge tone="historical" compact />
          <p className="leading-[1.9] text-gold-pale">
            The 30 Aethyrs represent concentric regions of the Enochian cosmos, received during the angelic
            sessions in Kraków, 1584. Each is accessed by inserting its three-letter name into the 19th Call.
          </p>
        </div>
      </CandlelightCard>

      <ChamberPageHeader
        kicker="Celestial Archive · Aethyr Explorer"
        title="The 30 Aethyrs"
      >
        <p className="max-w-[720px] text-gold-dim italic">
          The Concentric Heavens of the Enochian Cosmos — TEX (30th, outermost) to LIL (1st, innermost).
        </p>
      </ChamberPageHeader>

      <AethyrRings aethyrs={aethyrs} />

      <div className="overflow-x-auto rounded-sm border border-gold-dim/20">
        <table className="w-full min-w-[400px] text-sm">
          <thead>
            <tr className="border-b border-gold-dim/30 bg-ink/30 text-left text-xs uppercase tracking-wider text-gold-dim">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Governors</th>
            </tr>
          </thead>
          <tbody>
            {[...aethyrs].reverse().map((a) => (
              <tr key={a.name} className="border-b border-gold-dim/10 hover:bg-ink/25">
                <td className="px-4 py-2 text-gold-dim">{a.number}</td>
                <td className="px-4 py-2">
                  <Link href={`/aethyrs/${a.name}`} className="font-mono text-gold hover:text-gold-light">
                    {a.name}
                  </Link>
                </td>
                <td className="px-4 py-2 capitalize text-gold-dim">{a.order}</td>
                <td className="px-4 py-2 text-gold-dim">{a.governors.length || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ChamberSourceNote>
        <p>
          {meta.totalAethyrs} Aethyrs · {meta.totalGovernors} governors (when complete).{" "}
          {meta._dataStatus?.note}
        </p>
      </ChamberSourceNote>
    </section>
  );
}
