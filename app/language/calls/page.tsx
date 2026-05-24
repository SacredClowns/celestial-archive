import { BadgeProse } from "@/components/language/badge-prose";
import { ChamberPageHeader, ChamberSourceNote } from "@/components/language/chamber-page-header";
import { CallStatistics } from "@/components/language/call-statistics";
import { LanguageCallsShell } from "@/components/language/language-calls-shell";
import { getAllCalls, getCallCorpusStatistics, getCallsData } from "@/lib/language/language-data";
import { loadLanguageChamberContent } from "@/lib/language/language-content";

export const metadata = {
  title: "The Calls · Language Chamber",
  description: "The nineteen Angelic Keys received in Kraków, 1584."
};

export default function CallsPage() {
  const calls = getAllCalls();
  const { aethyrNames } = getCallsData();
  const stats = getCallCorpusStatistics();
  const content = loadLanguageChamberContent();

  return (
    <section className="mx-auto w-full max-w-[980px] space-y-12">
      <ChamberPageHeader kicker="Language Chamber · The Calls" title="The 19 Calls">
        <BadgeProse text={content.callsHeader} className="max-w-[720px] leading-[1.9] text-gold-pale" />
      </ChamberPageHeader>

      <CallStatistics stats={stats} />
      <LanguageCallsShell calls={calls} aethyrs={aethyrNames} />

      <ChamberSourceNote>
        <p>{content.sourceNote}</p>
      </ChamberSourceNote>
    </section>
  );
}
