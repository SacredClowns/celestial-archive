"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";
import { useAuth } from "@/lib/auth/auth-context";
import type { JournalEntry, JournalEntryType } from "@/lib/journal/journal-types";
import { createClientIfConfigured } from "@/lib/supabase/client";
import {
  deleteJournalEntry as deleteJournalRemote,
  fetchJournalEntries,
  replaceJournalEntries,
  upsertJournalEntry
} from "@/lib/supabase/celestial-db";

const STORAGE_KEY = "celestial-archive-journal";

type JournalContextValue = {
  entries: JournalEntry[];
  addEntry: (partial: Omit<JournalEntry, "id" | "createdAt" | "updatedAt">) => JournalEntry;
  updateEntry: (id: string, patch: Partial<JournalEntry>) => void;
  deleteEntry: (id: string) => void;
  getEntry: (id: string) => JournalEntry | undefined;
  getEntriesByLesson: (slug: string) => JournalEntry[];
  getEntriesByTag: (tag: string) => JournalEntry[];
  syncing: boolean;
};

const JournalContext = createContext<JournalContextValue | null>(null);

function loadStore(): JournalEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { entries?: JournalEntry[] };
    return parsed.entries ?? [];
  } catch {
    return [];
  }
}

function saveStore(entries: JournalEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ entries }));
}

export function JournalProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const cloudReady = useRef(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const supabase = createClientIfConfigured();
    if (!user || !supabase) {
      cloudReady.current = false;
      setEntries(loadStore());
      return;
    }

    let cancelled = false;
    cloudReady.current = false;
    setSyncing(true);

    (async () => {
      try {
        const remote = await fetchJournalEntries(supabase, user.id);
        const local = loadStore();
        if (cancelled) return;

        if (remote.length === 0 && local.length > 0) {
          const migrated = local.map((e) => ({ ...e, id: crypto.randomUUID() }));
          await replaceJournalEntries(supabase, user.id, migrated);
          setEntries(migrated);
          saveStore(migrated);
        } else if (remote.length > 0) {
          setEntries(remote);
          saveStore(remote);
        } else {
          setEntries([]);
          saveStore([]);
        }
        cloudReady.current = true;
      } catch {
        setEntries(loadStore());
      } finally {
        if (!cancelled) setSyncing(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (user && !cloudReady.current) return;
    saveStore(entries);
  }, [entries, hydrated, user]);

  const persistEntry = useCallback(
    (entry: JournalEntry) => {
      const supabase = createClientIfConfigured();
      if (!user || !supabase || !cloudReady.current) return;
      void upsertJournalEntry(supabase, user.id, entry).catch(() => {});
    },
    [user]
  );

  const addEntry = useCallback(
    (partial: Omit<JournalEntry, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();
      const entry: JournalEntry = {
        ...partial,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now
      };
      setEntries((prev) => [entry, ...prev]);
      persistEntry(entry);
      return entry;
    },
    [persistEntry]
  );

  const updateEntry = useCallback(
    (id: string, patch: Partial<JournalEntry>) => {
      setEntries((prev) => {
        const next = prev.map((e) =>
          e.id === id ? { ...e, ...patch, updatedAt: new Date().toISOString() } : e
        );
        const updated = next.find((e) => e.id === id);
        if (updated) persistEntry(updated);
        return next;
      });
    },
    [persistEntry]
  );

  const deleteEntry = useCallback(
    (id: string) => {
      setEntries((prev) => prev.filter((e) => e.id !== id));
      const supabase = createClientIfConfigured();
      if (user && supabase && cloudReady.current) {
        void deleteJournalRemote(supabase, user.id, id).catch(() => {});
      }
    },
    [user]
  );

  const getEntry = useCallback((id: string) => entries.find((e) => e.id === id), [entries]);

  const getEntriesByLesson = useCallback(
    (slug: string) => entries.filter((e) => e.linkedLesson === slug),
    [entries]
  );

  const getEntriesByTag = useCallback(
    (tag: string) => entries.filter((e) => e.tags.includes(tag)),
    [entries]
  );

  const value = useMemo(
    () => ({
      entries,
      addEntry,
      updateEntry,
      deleteEntry,
      getEntry,
      getEntriesByLesson,
      getEntriesByTag,
      syncing
    }),
    [entries, addEntry, updateEntry, deleteEntry, getEntry, getEntriesByLesson, getEntriesByTag, syncing]
  );

  return <JournalContext.Provider value={value}>{children}</JournalContext.Provider>;
}

export function useJournal(): JournalContextValue {
  const ctx = useContext(JournalContext);
  if (!ctx) throw new Error("useJournal must be used within JournalProvider");
  return ctx;
}

export const JOURNAL_TYPE_LABELS: Record<JournalEntryType, string> = {
  reflection: "Reflection",
  observation: "Observation",
  freeform: "Freeform",
  practice: "Practice",
  question: "Question",
  discovery: "Discovery"
};
