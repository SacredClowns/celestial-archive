import type { SupabaseClient } from "@supabase/supabase-js";
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
  supabase: SupabaseClient,
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
  supabase: SupabaseClient,
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
  supabase: SupabaseClient,
  userId: string,
  entry: JournalEntry
) {
  const { error } = await supabase
    .from("celestial_journal_entries")
    .upsert(entryToRow(userId, entry), { onConflict: "id" });
  if (error) throw error;
}

export async function deleteJournalEntry(
  supabase: SupabaseClient,
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

export async function replaceJournalEntries(
  supabase: SupabaseClient,
  userId: string,
  entries: JournalEntry[]
) {
  const { error: delError } = await supabase
    .from("celestial_journal_entries")
    .delete()
    .eq("user_id", userId);
  if (delError) throw delError;
  if (entries.length === 0) return;
  const { error } = await supabase
    .from("celestial_journal_entries")
    .insert(entries.map((e) => entryToRow(userId, e)));
  if (error) throw error;
}

export async function fetchLessonProgress(
  supabase: SupabaseClient,
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
  supabase: SupabaseClient,
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
  supabase: SupabaseClient,
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
  supabase: SupabaseClient,
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
  supabase: SupabaseClient,
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
  supabase: SupabaseClient,
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
