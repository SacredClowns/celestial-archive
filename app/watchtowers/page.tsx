import { ChamberPageHeader, ChamberSourceNote } from "@/components/language/chamber-page-header";
import { GreatTableGrid } from "@/components/watchtowers/great-table-grid";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import { ReturnToGround } from "@/components/discernment/return-to-ground";
import { QuestionsThisRaises } from "@/components/discernment/questions-this-raises";
import { RecordDiscoveryButton } from "@/components/discovery/record-discovery-button";
import { WATCHTOWER_HUB_GROUND } from "@/lib/content/return-to-ground-copy";
import { getWatchtowerSystem } from "@/lib/watchtowers/watchtower-data";

export const metadata = {
  title: "Watchtowers · Celestial Archive",
  description: "The four Watchtower Tablets and the Great Table of the Enochian cosmos."
};

export default function WatchtowersPage() {
  const system = getWatchtowerSystem("golden-dawn");

  return (
    <section className="mx-auto w-full max-w-[980px] space-y-12">
      <ChamberPageHeader kicker="Celestial Archive · Watchtowers" title="The Great Table">
        <p className="max-w-[720px] text-gold-dim italic">
          Four elemental quarters · one master grid · hundreds of extractable angel names.
        </p>
      </ChamberPageHeader>

      <CandlelightCard className="rounded-sm border border-gold-dim/25 bg-ink/20 p-5">
        <div className="flex items-start gap-3">
          <EpistemicBadge tone="historical" compact />
          <p className="leading-[1.9] text-gold-pale">
            The four Watchtower Tablets represent the four elemental quarters of the Enochian cosmos. Together they
            form the Great Table — a master grid from which hundreds of angel names can be extracted through specific
            letter-reading rules.
          </p>
        </div>
      </CandlelightCard>

      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-sm border border-gold-dim/20 bg-ink/20 p-4">
          <dt className="text-xs uppercase text-gold-dim">Letters (GD witness)</dt>
          <dd className="font-display text-xl text-gold">{system.totalLetters}</dd>
        </div>
        <div className="rounded-sm border border-gold-dim/20 bg-ink/20 p-4">
          <dt className="text-xs uppercase text-gold-dim">Seniors</dt>
          <dd className="font-display text-xl text-gold">24</dd>
        </div>
        <div className="rounded-sm border border-gold-dim/20 bg-ink/20 p-4">
          <dt className="text-xs uppercase text-gold-dim">Watchtower Calls</dt>
          <dd className="font-display text-xl text-gold">18</dd>
        </div>
        <div className="rounded-sm border border-gold-dim/20 bg-ink/20 p-4">
          <dt className="text-xs uppercase text-gold-dim">Aethyr Call</dt>
          <dd className="font-display text-xl text-gold">19</dd>
        </div>
      </dl>

      <GreatTableGrid />

      <ChamberSourceNote>
        <p>
          Great Table witnesses: Sloane MS 3191, Golden Dawn, Regardie, and Reformed layers. Full angel hierarchies
          (Medicine, Stones, Transformation) appear on each quadrant page.
        </p>
      </ChamberSourceNote>

      <ReturnToGround title="The table as manuscript, not mandate">
        {WATCHTOWER_HUB_GROUND}
      </ReturnToGround>

      <div className="flex flex-wrap items-center gap-4 border-t border-gold-dim/20 pt-6">
        <RecordDiscoveryButton
          kind="pattern"
          title="Great Table — first visit"
          note="Noted how quarter assignments shift between witnesses."
          href="/watchtowers"
        />
      </div>

      <QuestionsThisRaises
        questions={[
          "Why might elemental assignments differ between Dee's witness and the Golden Dawn — and who benefits from one map winning?",
          "If extraction rules produce hundreds of names, what would falsify the claim that the table is 'meaningful'?",
          "What changes when you read the grid as manuscript artifact rather than as operative instrument?"
        ]}
      />
    </section>
  );
}
