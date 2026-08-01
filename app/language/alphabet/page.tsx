import { AlphabetFlashcards } from "@/components/language/alphabet-flashcards";
import { SigilWall } from "@/components/language/sigil-wall";
import { AlphabetGrid } from "@/components/language/alphabet-grid";
import { AlphabetLegend } from "@/components/language/alphabet-legend";
import { QuestionsThisRaises } from "@/components/discernment/questions-this-raises";
import { BadgeProse } from "@/components/language/badge-prose";
import { ChamberPageHeader, ChamberSourceNote } from "@/components/language/chamber-page-header";
import { getAllLetters } from "@/lib/language/language-data";
import { loadLanguageChamberContent } from "@/lib/language/language-content";

export const metadata = {
  title: "Alphabet · Language Chamber",
  description: "The 21 letters of the Enochian script as received in 1583."
};

export default function AlphabetPage() {
  const letters = getAllLetters();
  const content = loadLanguageChamberContent();

  return (
    <section className="mx-auto w-full max-w-[980px] space-y-12">
      <ChamberPageHeader kicker="Language Chamber · Alphabet" title="The Alphabet">
        <BadgeProse text={content.alphabetHeader} className="max-w-[720px] leading-[1.9] text-gold-pale" />
      </ChamberPageHeader>

      <AlphabetLegend
        alphabetLegend={content.alphabetLegend}
        writingDirectionNote={content.writingDirectionNote}
        fontNote={content.fontNote}
        mobileGridWarning={content.mobileGridWarning}
      />

      <SigilWall letters={letters} />

      <AlphabetFlashcards letters={letters} />

      <AlphabetGrid letters={letters} />

      <QuestionsThisRaises
        questions={[
          "If the script resembles Pantheus (1550), does that weaken or complicate the 'received language' claim?",
          "What changes when pronunciation is reconstructed from English orthography rather than heard from Kelley?",
          "How many letters can you recognize before meaning begins to feel certain?"
        ]}
      />

      <ChamberSourceNote>
        <p>{content.sourceNote}</p>
      </ChamberSourceNote>
    </section>
  );
}
