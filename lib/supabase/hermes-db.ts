import type { SupabaseClient } from "@supabase/supabase-js";

type HermesDbClient = SupabaseClient<any, any, any>;

export type HermesMemoryRow = {
  user_id: string;
  relationship_summary: string;
  learning_focus: string;
  exchange_count: number;
  last_counsel_at: string | null;
  recent_exchanges: Array<{ role: "seeker" | "hermes"; text: string; at: string }>;
  updated_at: string;
};

export type HermesMemory = {
  relationshipSummary: string;
  learningFocus: string;
  exchangeCount: number;
  lastCounselAt: string | null;
  recentExchanges: HermesMemoryRow["recent_exchanges"];
};

function rowToMemory(row: HermesMemoryRow): HermesMemory {
  return {
    relationshipSummary: row.relationship_summary,
    learningFocus: row.learning_focus,
    exchangeCount: row.exchange_count,
    lastCounselAt: row.last_counsel_at,
    recentExchanges: Array.isArray(row.recent_exchanges) ? row.recent_exchanges : []
  };
}

export async function fetchHermesMemory(
  supabase: HermesDbClient,
  userId: string
): Promise<HermesMemory | null> {
  const { data, error } = await supabase
    .from("celestial_hermes_memories")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return rowToMemory(data as HermesMemoryRow);
}

export async function appendHermesExchange(
  supabase: HermesDbClient,
  userId: string,
  seekerText: string,
  hermesReply: string,
  memoryPatch?: { relationshipSummary?: string; learningFocus?: string }
): Promise<HermesMemory> {
  const existing = await fetchHermesMemory(supabase, userId);
  const now = new Date().toISOString();
  const recent = [
    ...(existing?.recentExchanges ?? []),
    { role: "seeker" as const, text: seekerText.slice(0, 500), at: now },
    { role: "hermes" as const, text: hermesReply.slice(0, 800), at: now }
  ].slice(-12);

  const row = {
    user_id: userId,
    relationship_summary:
      memoryPatch?.relationshipSummary ?? existing?.relationshipSummary ?? "",
    learning_focus: memoryPatch?.learningFocus ?? existing?.learningFocus ?? "",
    exchange_count: (existing?.exchangeCount ?? 0) + 1,
    last_counsel_at: now,
    recent_exchanges: recent,
    updated_at: now
  };

  const { data, error } = await supabase
    .from("celestial_hermes_memories")
    .upsert(row, { onConflict: "user_id" })
    .select()
    .single();

  if (error) throw error;
  return rowToMemory(data as HermesMemoryRow);
}
