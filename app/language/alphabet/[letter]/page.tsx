import { notFound } from "next/navigation";
import { LetterDetail } from "@/components/language/letter-detail";
import { ChamberSourceNote } from "@/components/language/chamber-page-header";
import { getAdjacentLetters } from "@/lib/language/language-data";
import { loadLanguageChamberContent } from "@/lib/language/language-content";

type PageProps = {
  params: Promise<{ letter: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { letter } = await params;
  try {
    const { letter: data } = getAdjacentLetters(letter);
    return {
      title: `${data.name} · Enochian Alphabet`,
      description: `Letter ${data.name} — maps to English ${data.englishEquivalent}.`
    };
  } catch {
    return { title: "Letter · Language Chamber" };
  }
}

export default async function LetterPage({ params }: PageProps) {
  const { letter: slug } = await params;
  const content = loadLanguageChamberContent();

  let adjacent;
  try {
    adjacent = getAdjacentLetters(slug);
  } catch {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-[980px] space-y-12">
      <LetterDetail letter={adjacent.letter} prev={adjacent.prev} next={adjacent.next} />
      <ChamberSourceNote>
        <p>{content.sourceNote}</p>
      </ChamberSourceNote>
    </section>
  );
}
