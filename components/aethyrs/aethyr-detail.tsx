import Link from "next/link";
import { CallViewer } from "@/components/language/call-viewer";
import { AethyrGovernorCard } from "@/components/aethyrs/aethyr-governor-card";
import { loadLanguageChamberContent } from "@/lib/language/language-content";
import { getCallByNumber, getCallTextData, getCallsData } from "@/lib/language/language-data";
import type { AethyrData } from "@/lib/aethyrs/aethyr-types";

export function AethyrDetail({
  aethyr,
  prev,
  next
}: {
  aethyr: AethyrData;
  prev: AethyrData | null;
  next: AethyrData | null;
}) {
  const call = getCallByNumber(19);
  const callText = getCallTextData(19);
  const { aethyrNames } = getCallsData();
  const chamber = loadLanguageChamberContent();

  return (
    <article className="space-y-12">
      <header className="space-y-3 border-b border-gold-dim/30 pb-8">
        <Link href="/aethyrs" className="font-display text-xs uppercase tracking-[0.2em] text-gold-dim hover:text-gold">
          ← The 30 Aethyrs
        </Link>
        <p className="font-display text-xs uppercase tracking-[0.24em] text-gold-dim">
          Aethyr {aethyr.number} · {aethyr.order}
        </p>
        <h1 className="font-display text-4xl tracking-[0.08em] text-gold">{aethyr.name}</h1>
        <p className="text-gold-dim">
          Inserted into the Nineteenth Call at position 30.4 as{" "}
          <span className="font-mono text-amber">{aethyr.callVariant}</span>
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="font-display text-xl text-gold-light">The Nineteenth Call — this Aethyr</h2>
        <CallViewer
          call={call}
          callText={callText}
          aethyrs={aethyrNames}
          initialAethyr={aethyr.name}
          showAethyrSelector
          copy={{
            callSectionLabels: chamber.callSectionLabels,
            pronunciationTraditions: chamber.pronunciationTraditions,
            call19SpecialNote: chamber.call19SpecialNote,
            call19AethyrPrompt: chamber.call19AethyrPrompt,
            call19AethyrFootnote: chamber.call19AethyrFootnote,
            callTextLoading: chamber.callTextLoading,
            wordNotFound: chamber.wordNotFound,
            noScholarlyNotes: chamber.noScholarlyNotes
          }}
        />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg text-gold-dim">Governors</h2>
        {aethyr.governors.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {aethyr.governors.map((g) => (
              <AethyrGovernorCard key={`${g.number}-${g.name}`} governor={g} />
            ))}
          </div>
        ) : (
          <p className="rounded-sm border border-gold-dim/20 bg-ink/20 px-4 py-6 text-gold-dim">
            Governor data pending for this Aethyr.
          </p>
        )}
        {aethyr.totalMinisters ? (
          <p className="text-xs text-gold-dim">
            Total ministers in this Aethyr (as recorded): {aethyr.totalMinisters.toLocaleString()}
          </p>
        ) : null}
      </section>

      <nav className="flex items-center justify-between border-t border-gold-dim/30 pt-8">
        {prev ? (
          <Link href={`/aethyrs/${prev.name}`} className="font-display text-sm text-gold-dim hover:text-gold">
            ← {prev.name} ({prev.number})
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/aethyrs/${next.name}`} className="font-display text-sm text-gold-dim hover:text-gold">
            {next.name} ({next.number}) →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
