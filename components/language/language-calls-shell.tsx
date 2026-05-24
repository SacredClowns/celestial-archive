"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CallSelector } from "@/components/language/call-selector";
import { CallViewer } from "@/components/language/call-viewer";
import { getCallTextData } from "@/lib/language/language-data";
import type { AethyrName, AngelicCall } from "@/lib/language/language-types";

export function LanguageCallsShell({
  calls,
  aethyrs
}: {
  calls: AngelicCall[];
  aethyrs: AethyrName[];
}) {
  const searchParams = useSearchParams();
  const initialCall = Number(searchParams.get("call")) || 1;
  const [selected, setSelected] = useState(initialCall);

  useEffect(() => {
    const n = Number(searchParams.get("call"));
    if (n >= 1 && n <= 19) setSelected(n);
  }, [searchParams]);
  const call = calls.find((c) => c.number === selected) ?? calls[0];
  const callText = getCallTextData(call.number);

  return (
    <div className="space-y-8">
      <CallSelector calls={calls} selected={call.number} onSelect={setSelected} />
      <CallViewer key={call.number} call={call} callText={callText} aethyrs={aethyrs} />
    </div>
  );
}
