import type { SupabaseClient } from "@supabase/supabase-js";

/** Any schema — callers use `enochia` via client db options. */
export type CelestialSupabaseClient = SupabaseClient<any, any, any>;
import type { DiscoveryEntry, DiscoveryKind } from "@/lib/discovery/discovery-types";
import type { JournalEntry, JournalEntryType } from "@/lib/journal/journal-types";

type JournalRow = {
  id: string;
  user_id: string;
  entry_type: string;
  title: string;
  body: string;
  tags: string[] | null;
  linked_lesson: string | null;
  linked_aethyr: string | null;
  linked_call: number | null;
  mood: string | null;
  created_at: string;
  updated_at: string;
};

type ProgressRow = {
  lesson_id: string;
  completed_at: string;
};

type BookmarkRow = {
  id: string;
  title: string;
  href: string;
  saved_at: string;
};

function rowToJournalEntry(row: JournalRow): JournalEntry {
  return {
    id: row.id,
    type: row.entry_type as JournalEntryType,
    title: row.title,
    body: row.body,
    tags: row.tags ?? [],
    linkedLesson: row.linked_lesson ?? undefined,
    linkedAethyr: row.linked_aethyr ?? undefined,
    linkedCall: row.linked_call ?? undefined,
    mood: row.mood ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function entryToRow(userId: string, entry: JournalEntry) {
  return {
    id: entry.id,
    user_id: userId,
    entry_type: entry.type,
    title: entry.title,
    body: entry.body,
    tags: entry.tags,
    linked_lesson: entry.linkedLesson ?? null,
    linked_aethyr: entry.linkedAethyr ?? null,
    linked_call: entry.linkedCall ?? null,
    mood: entry.mood ?? null,
    created_at: entry.createdAt,
    updated_at: entry.updatedAt
  };
}

export async function ensureCelestialProfile(
  supabase: CelestialSupabaseClient,
  userId: string,
  email?: string
) {
  const { data: existing } = await supabase
    .from("celestial_profiles")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) return;

  await supabase.from("celestial_profiles").insert({
    user_id: userId,
    display_name: email?.split("@")[0] ?? null
  });
}

export async function fetchJournalEntries(
  supabase: CelestialSupabaseClient,
  userId: string
): Promise<JournalEntry[]> {
  const { data, error } = await supabase
    .from("celestial_journal_entries")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return ((data ?? []) as JournalRow[]).map(rowToJournalEntry);
}

export async function upsertJournalEntry(
  supabase: CelestialSupabaseClient,
  userId: string,
  entry: JournalEntry
) {
  const { error } = await supabase
    .from("celestial_journal_entries")
    .upsert(entryToRow(userId, entry), { onConflict: "id" });
  if (error) throw error;
}

export async function deleteJournalEntry(
  supabase: CelestialSupabaseClient,
  userId: string,
  id: string
) {
  const { error } = await supabase
    .from("celestial_journal_entries")
    .delete()
    .eq("user_id", userId)
    .eq("id", id);
  if (error) throw error;
}

/** Upsert all entries, then remove remote rows not in the set (avoids wipe-on-insert-failure). */
export async function replaceJournalEntries(
  supabase: CelestialSupabaseClient,
  userId: string,
  entries: JournalEntry[]
) {
  for (const entry of entries) {
    await upsertJournalEntry(supabase, userId, entry);
  }

  const { data: remote, error: listError } = await supabase
    .from("celestial_journal_entries")
    .select("id")
    .eq("user_id", userId);
  if (listError) throw listError;

  const keep = new Set(entries.map((e) => e.id));
  for (const row of remote ?? []) {
    if (!keep.has(row.id)) {
      await deleteJournalEntry(supabase, userId, row.id);
    }
  }
}

export async function fetchLessonProgress(
  supabase: CelestialSupabaseClient,
  userId: string
): Promise<string[]> {
  const { data, error } = await supabase
    .from("celestial_user_progress")
    .select("lesson_id")
    .eq("user_id", userId);
  if (error) throw error;
  return ((data ?? []) as ProgressRow[]).map((r) => r.lesson_id);
}

export async function markLessonComplete(
  supabase: CelestialSupabaseClient,
  userId: string,
  lessonId: string
) {
  const { error } = await supabase.from("celestial_user_progress").upsert(
    { user_id: userId, lesson_id: lessonId },
    { onConflict: "user_id,lesson_id" }
  );
  if (error) throw error;
}

export async function replaceLessonProgress(
  supabase: CelestialSupabaseClient,
  userId: string,
  lessonIds: string[]
) {
  const { error: delError } = await supabase
    .from("celestial_user_progress")
    .delete()
    .eq("user_id", userId);
  if (delError) throw delError;
  if (lessonIds.length === 0) return;
  const { error } = await supabase.from("celestial_user_progress").insert(
    lessonIds.map((lesson_id) => ({ user_id: userId, lesson_id }))
  );
  if (error) throw error;
}

export type CelestialBookmark = {
  id: string;
  title: string;
  href: string;
  savedAt: string;
};

export async function fetchBookmarks(
  supabase: CelestialSupabaseClient,
  userId: string
): Promise<CelestialBookmark[]> {
  const { data, error } = await supabase
    .from("celestial_bookmarks")
    .select("id, title, href, saved_at")
    .eq("user_id", userId)
    .order("saved_at", { ascending: false });
  if (error) throw error;
  return ((data ?? []) as BookmarkRow[]).map((r) => ({
    id: r.id,
    title: r.title,
    href: r.href,
    savedAt: r.saved_at
  }));
}

export async function addBookmark(
  supabase: CelestialSupabaseClient,
  userId: string,
  bookmark: Omit<CelestialBookmark, "id" | "savedAt">
) {
  const { data, error } = await supabase
    .from("celestial_bookmarks")
    .upsert(
      { user_id: userId, title: bookmark.title, href: bookmark.href },
      { onConflict: "user_id,href" }
    )
    .select("id, title, href, saved_at")
    .single();
  if (error) throw error;
  const row = data as BookmarkRow;
  return {
    id: row.id,
    title: row.title,
    href: row.href,
    savedAt: row.saved_at
  };
}

export async function removeBookmark(
  supabase: CelestialSupabaseClient,
  userId: string,
  href: string
) {
  const { error } = await supabase
    .from("celestial_bookmarks")
    .delete()
    .eq("user_id", userId)
    .eq("href", href);
  if (error) throw error;
}

type DiscoveryRow = {
  id: string;
  user_id: string;
  kind: string;
  title: string;
  note: string;
  href: string | null;
  created_at: string;
};

function rowToDiscovery(row: DiscoveryRow): DiscoveryEntry {
  return {
    id: row.id,
    kind: row.kind as DiscoveryKind,
    title: row.title,
    note: row.note,
    href: row.href ?? undefined,
    createdAt: row.created_at
  };
}

function discoveryToRow(userId: string, entry: DiscoveryEntry) {
  return {
    id: entry.id,
    user_id: userId,
    kind: entry.kind,
    title: entry.title,
    note: entry.note,
    href: entry.href ?? null,
    created_at: entry.createdAt
  };
}

export async function fetchDiscoveries(
  supabase: CelestialSupabaseClient,
  userId: string
): Promise<DiscoveryEntry[]> {
  const { data, error } = await supabase
    .from("celestial_discoveries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return ((data ?? []) as DiscoveryRow[]).map(rowToDiscovery);
}

export async function upsertDiscovery(
  supabase: CelestialSupabaseClient,
  userId: string,
  entry: DiscoveryEntry
) {
  const { error } = await supabase
    .from("celestial_discoveries")
    .upsert(discoveryToRow(userId, entry), { onConflict: "id" });
  if (error) throw error;
}

export async function deleteDiscovery(
  supabase: CelestialSupabaseClient,
  userId: string,
  id: string
) {
  const { error } = await supabase
    .from("celestial_discoveries")
    .delete()
    .eq("user_id", userId)
    .eq("id", id);
  if (error) throw error;
}

export async function replaceDiscoveries(
  supabase: CelestialSupabaseClient,
  userId: string,
  entries: DiscoveryEntry[]
) {
  for (const entry of entries) {
    await upsertDiscovery(supabase, userId, entry);
  }
  const { data: remote, error: listError } = await supabase
    .from("celestial_discoveries")
    .select("id")
    .eq("user_id", userId);
  if (listError) throw listError;
  const keep = new Set(entries.map((e) => e.id));
  for (const row of remote ?? []) {
    if (!keep.has(row.id)) {
      await deleteDiscovery(supabase, userId, row.id);
    }
  }
}
