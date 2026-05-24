import Link from "next/link";
import { notFound } from "next/navigation";
import { QuadrantDetail } from "@/components/watchtowers/quadrant-detail";
import { ChamberSourceNote } from "@/components/language/chamber-page-header";
import { QuadrantGroundSection } from "@/components/watchtowers/quadrant-ground-section";
import type { WatchtowerQuadrant } from "@/lib/watchtowers/watchtower-types";

const VALID: WatchtowerQuadrant[] = ["air", "water", "earth", "fire"];

type PageProps = { params: Promise<{ quadrant: string }> };

export function generateStaticParams() {
  return VALID.map((quadrant) => ({ quadrant }));
}

export default async function WatchtowerQuadrantPage({ params }: PageProps) {
  const { quadrant } = await params;
  if (!VALID.includes(quadrant as WatchtowerQuadrant)) notFound();

  return (
    <section className="mx-auto w-full max-w-[980px] space-y-12">
      <header className="space-y-3 border-b border-gold-dim/30 pb-8">
        <Link href="/watchtowers" className="font-display text-xs uppercase tracking-[0.2em] text-gold-dim hover:text-gold">
          ← Great Table
        </Link>
        <h1 className="font-display text-4xl capitalize tracking-[0.06em] text-gold">{quadrant}</h1>
      </header>
      <QuadrantDetail quadrant={quadrant as WatchtowerQuadrant} />
      <ChamberSourceNote>
        <p>Tablet grid from phase-3 Great Table witness JSON. Compare versions before treating any cell as settled.</p>
      </ChamberSourceNote>

      <QuadrantGroundSection />
    </section>
  );
}
