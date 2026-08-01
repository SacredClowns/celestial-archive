import { BadgeProse } from "@/components/language/badge-prose";
import { ChamberPageHeader, ChamberSourceNote } from "@/components/language/chamber-page-header";
import { PronunciationGuide } from "@/components/language/pronunciation-guide";
import { getAllLetters } from "@/lib/language/language-data";
import { loadLanguageChamberContent } from "@/lib/language/language-content";

export const metadata = {
  title: "Pronunciation · Language Chamber",
  description: "Three traditions for sounding the Enochian letters and Calls."
};

export default function PronunciationPage() {
  const letters = getAllLetters();
  const content = loadLanguageChamberContent();

  return (
    <section className="mx-auto w-full max-w-[980px] space-y-12">
      <ChamberPageHeader kicker="Language Chamber · Pronunciation" title="Pronunciation Guide">
        <BadgeProse text={content.pronunciationHeader} className="max-w-[720px] leading-[1.9] text-gold-pale" />
      </ChamberPageHeader>

      <PronunciationGuide
        letters={letters}
        content={{
          traditionDee: content.traditionDee,
          traditionGd: content.traditionGd,
          traditionModern: content.traditionModern,
          pronunciationComparisonNote: content.pronunciationComparisonNote,
          digraphs: content.digraphs,
          traditionLabels: content.traditionLabels
        }}
      />

      <ChamberSourceNote>
        <p>{content.sourceNote}</p>
      </ChamberSourceNote>
    </section>
  );
}
