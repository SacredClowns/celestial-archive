import { BadgeProse } from "@/components/language/badge-prose";
import { ChamberPageHeader, ChamberSourceNote } from "@/components/language/chamber-page-header";
import { DictionaryPageClient } from "@/components/language/dictionary-page-client";
import {
  getAllDictionaryEntries,
  getCorpusStatistics,
  getDictionaryMeta
} from "@/lib/language/language-data";
import { loadLanguageChamberContent } from "@/lib/language/language-content";

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata = {
  title: "Dictionary · Language Chamber",
  description: "Attested Enochian vocabulary from the Calls and Dee's manuscripts."
};

export default async function DictionaryPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const entries = getAllDictionaryEntries();
  const meta = getDictionaryMeta();
  const corpusStats = getCorpusStatistics();
  const content = loadLanguageChamberContent();

  return (
    <section className="mx-auto w-full max-w-[980px] space-y-12">
      <ChamberPageHeader kicker="Language Chamber · Dictionary" title="Dictionary">
        <BadgeProse text={content.dictionaryHeader} className="max-w-[720px] leading-[1.9] text-gold-pale" />
      </ChamberPageHeader>

      <DictionaryPageClient
        entries={entries}
        corpusStats={corpusStats}
        totalWords={meta.totalUniqueWords}
        totalTokens={meta.totalWordTokens}
        initialQuery={q ?? ""}
      />

      <ChamberSourceNote>
        <p>{content.sourceNote}</p>
      </ChamberSourceNote>
    </section>
  );
}
