import { BadgeProse } from "@/components/language/badge-prose";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { ChamberPageHeader, ChamberSourceNote } from "@/components/language/chamber-page-header";
import { CallStatistics } from "@/components/language/call-statistics";
import { LanguageCallsShell } from "@/components/language/language-calls-shell";
import {
  getAllCalls,
  getCallByNumber,
  getCallCorpusStatistics,
  getCallTextData,
  getCallsData
} from "@/lib/language/language-data";
import { loadLanguageChamberContent } from "@/lib/language/language-content";

export const metadata = {
  title: "The Calls · Language Chamber",
  description: "The nineteen Angelic Keys received in Kraków, 1584."
};

type PageProps = {
  searchParams: Promise<{ call?: string }>;
};

export default async function CallsPage({ searchParams }: PageProps) {
  const { call: callParam } = await searchParams;
  const parsed = Number(callParam);
  const initialCall = parsed >= 1 && parsed <= 19 ? parsed : 1;

  const calls = getAllCalls();
  const { aethyrNames } = getCallsData();
  const stats = getCallCorpusStatistics();
  const content = loadLanguageChamberContent();
  const initialCallMeta = getCallByNumber(initialCall);
  const initialCallText = getCallTextData(initialCall);

  return (
    <section className="mx-auto w-full max-w-[980px] space-y-12">
      <ChamberPageHeader kicker="Language Chamber · The Calls" title="The 19 Calls">
        <BadgeProse text={content.callsHeader} className="max-w-[720px] leading-[1.9] text-gold-pale" />
      </ChamberPageHeader>

      <CallStatistics stats={stats} />

      <CandlelightCard className="rounded-sm border border-gold-dim/20 bg-ink/15 p-5">
        <BadgeProse text={content.callsAssociationNote} className="text-sm leading-[1.9] text-gold-dim" />
      </CandlelightCard>

      <LanguageCallsShell
        callSummaries={calls.map((c) => ({ number: c.number, title: c.title }))}
        aethyrs={aethyrNames}
        initialCall={initialCall}
        initialPayload={{
          call: initialCallMeta,
          callText: initialCallText ?? null
        }}
        copy={{
          callSectionLabels: content.callSectionLabels,
          pronunciationTraditions: content.pronunciationTraditions,
          call19SpecialNote: content.call19SpecialNote,
          call19AethyrPrompt: content.call19AethyrPrompt,
          call19AethyrFootnote: content.call19AethyrFootnote,
          callsAssociationNote: content.callsAssociationNote,
          callTextLoading: content.callTextLoading,
          wordNotFound: content.wordNotFound,
          noScholarlyNotes: content.noScholarlyNotes
        }}
      />

      <ChamberSourceNote>
        <p>{content.sourceNote}</p>
      </ChamberSourceNote>
    </section>
  );
}
