import { NextResponse } from "next/server";
import { getCallByNumber, getCallTextData } from "@/lib/language/language-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const n = Number(searchParams.get("call"));
  if (!Number.isFinite(n) || n < 1 || n > 19) {
    return NextResponse.json({ error: "Invalid call number" }, { status: 400 });
  }

  const call = getCallByNumber(n);
  const callText = getCallTextData(n);

  return NextResponse.json({
    call: {
      number: call.number,
      title: call.title,
      receptionOrder: call.receptionOrder,
      association: call.association,
      historicalNotes: call.historicalNotes,
      scholarlyNotes: call.scholarlyNotes,
      aethyrVariable: call.aethyrVariable
    },
    callText: callText ?? null
  });
}
