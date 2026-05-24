import { BadgeProse } from "@/components/language/badge-prose";
import { ChamberPageHeader, ChamberSourceNote } from "@/components/language/chamber-page-header";
import { LanguageChamberPanels } from "@/components/language/language-chamber-panels";
import { loadLanguageChamberContent } from "@/lib/language/language-content";

export const metadata = {
  title: "Language Chamber · ENOCHIAN: THE CELESTIAL ARCHIVE",
  description:
    "The Angelical language received in 1583–1584 — alphabet, dictionary, Calls, and pronunciation traditions."
};

export default function LanguageChamberPage() {
  const content = loadLanguageChamberContent();

  return (
    <section className="mx-auto w-full max-w-[980px] space-y-12">
      <ChamberPageHeader kicker="The Celestial Archive · Language Chamber" title="Language Chamber">
        <p className="font-display text-sm italic tracking-wide text-gold-dim">{content.landingSubtitle}</p>
        <div className="max-w-[720px] space-y-6 pt-2">
          {content.landingIntro.map((paragraph) => (
            <BadgeProse key={paragraph.slice(0, 40)} text={paragraph} className="leading-[1.9] text-gold-pale" />
          ))}
        </div>
        <p className="font-display text-xs uppercase tracking-[0.2em] text-gold-dim/80">
          {content.landingSummary}
        </p>
      </ChamberPageHeader>

      <LanguageChamberPanels />

      <ChamberSourceNote>
        <p>{content.sourceNote}</p>
      </ChamberSourceNote>
    </section>
  );
}
