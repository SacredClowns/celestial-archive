"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { CallSelector } from "@/components/language/call-selector";
import { CallViewer } from "@/components/language/call-viewer";
import type {
  AngelicCall,
  AethyrName,
  CallTextData,
  LanguageChamberContent
} from "@/lib/language/language-types";

type CallsCopy = Pick<
  LanguageChamberContent,
  | "callSectionLabels"
  | "pronunciationTraditions"
  | "call19SpecialNote"
  | "call19AethyrPrompt"
  | "call19AethyrFootnote"
  | "callsAssociationNote"
  | "callTextLoading"
  | "wordNotFound"
  | "noScholarlyNotes"
>;

type CallPayload = {
  call: AngelicCall;
  callText: CallTextData | null;
};

export function LanguageCallsShell({
  callSummaries,
  aethyrs,
  copy,
  initialCall = 1,
  initialPayload
}: {
  callSummaries: Array<{ number: number; title: string }>;
  aethyrs: AethyrName[];
  copy: CallsCopy;
  initialCall?: number;
  initialPayload: CallPayload;
}) {
  const router = useRouter();
  const safeInitial = initialCall >= 1 && initialCall <= 19 ? initialCall : 1;
  const [selected, setSelected] = useState(safeInitial);
  const [payload, setPayload] = useState<CallPayload>(initialPayload);
  const [loading, setLoading] = useState(false);

  const loadCall = useCallback(async (n: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/language/call-text?call=${n}`);
      if (!res.ok) throw new Error("Failed to load call");
      const data = (await res.json()) as CallPayload;
      setPayload(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelect = (n: number) => {
    setSelected(n);
    router.replace(`/language/calls?call=${n}`, { scroll: false });
    void loadCall(n);
  };

  const callsForSelector: AngelicCall[] = callSummaries.map(
    ({ number, title }) =>
      ({
        number,
        title,
        totalLines: 0,
        lines: "PENDING_TRANSCRIPTION",
        association: payload.call.association,
        historicalNotes: [],
        scholarlyNotes: [],
        receptionOrder: number
      }) as AngelicCall
  );

  return (
    <div className="space-y-8">
      <CallSelector calls={callsForSelector} selected={selected} onSelect={handleSelect} />
      {loading ? (
        <p className="py-12 text-center font-display text-xs uppercase tracking-[0.16em] text-gold-dim">
          {copy.callTextLoading}
        </p>
      ) : (
        <CallViewer
          key={payload.call.number}
          call={payload.call}
          callText={payload.callText ?? undefined}
          aethyrs={aethyrs}
          copy={copy}
        />
      )}
    </div>
  );
}
