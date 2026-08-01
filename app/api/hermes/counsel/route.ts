import { NextResponse } from "next/server";
import { generateHermesCounsel } from "@/lib/hermes/counsel";
import type { HermesMode } from "@/lib/hermes/hermes-identity";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { fetchHermesMemory, appendHermesExchange } from "@/lib/supabase/hermes-db";
import { createAdminSupabaseClient } from "@/lib/supabase/admin-server";

const MODES: HermesMode[] = ["counsel", "next_step", "formula_help", "clear_channel"];

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Sign-in not configured" }, { status: 503 });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in to speak with Hermes" }, { status: 401 });
  }

  const body = (await request.json()) as {
    message?: string;
    mode?: HermesMode;
    progress?: {
      completedLessonIds: string[];
      lastVisitedLessonId: string | null;
      rank: "seeker" | "student";
    };
    formulae?: Array<{ spark: string; meditationDepth: number }>;
    journalTitles?: string[];
  };

  const mode = MODES.includes(body.mode ?? "counsel") ? (body.mode ?? "counsel") : "counsel";
  const message = (body.message ?? "").trim().slice(0, 2000);

  const admin = createAdminSupabaseClient();
  let memory = null;
  if (admin) {
    try {
      memory = await fetchHermesMemory(admin, user.id);
    } catch {
      /* table optional */
    }
  }

  const progress = {
    completedLessonIds: body.progress?.completedLessonIds ?? [],
    lastVisitedLessonId: body.progress?.lastVisitedLessonId ?? null,
    rank: body.progress?.rank ?? "seeker"
  };

  const formulae = (body.formulae ?? []).map((f, i) => ({
    id: `client-${i}`,
    spark: f.spark,
    elaboration: "",
    tags: [],
    meditationDepth: Math.min(5, Math.max(1, f.meditationDepth)) as 1 | 2 | 3 | 4 | 5,
    share: { draftShort: "", draftLong: "" },
    analytics: {
      copied: 0,
      sharedTwitter: 0,
      sharedBluesky: 0,
      sharedLinkedIn: 0,
      sharedGeneric: 0
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));

  const journalEntries = (body.journalTitles ?? []).map((title, i) => ({
    id: `j-${i}`,
    type: "reflection" as const,
    title,
    body: "",
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));

  const result = await generateHermesCounsel({
    mode,
    message,
    progress,
    isLessonComplete: (id) => progress.completedLessonIds.includes(id),
    journalEntries,
    discoveries: [],
    formulae,
    memory
  });

  if (admin) {
    try {
      await appendHermesExchange(admin, user.id, message || `[${mode}]`, result.reply);
    } catch {
      /* memory table optional */
    }
    await admin.from("celestial_marketing_events").insert({
      event_name: "hermes_counsel",
      user_id: user.id,
      properties: { mode, source: result.source }
    });
  }

  return NextResponse.json({
    reply: result.reply,
    source: result.source,
    model: result.model,
    suggestedNext: result.context.suggestedNextLessonHref
  });
}
