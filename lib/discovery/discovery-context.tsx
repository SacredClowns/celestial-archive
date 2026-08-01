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
import {
  DISCOVERY_STORAGE_KEY,
  type DiscoveryEntry,
  type DiscoveryKind
} from "@/lib/discovery/discovery-types";
import { createClientIfConfigured } from "@/lib/supabase/client";
import {
  deleteDiscovery as deleteDiscoveryRemote,
  fetchDiscoveries,
  replaceDiscoveries,
  upsertDiscovery
} from "@/lib/supabase/celestial-db";

export const DISCOVERY_KIND_LABELS: Record<DiscoveryKind, string> = {
  manuscript: "Manuscript",
  term: "Term",
  pattern: "Pattern",
  connection: "Connection",
  question: "Question",
  insight: "Insight"
};

type DiscoveryContextValue = {
  entries: DiscoveryEntry[];
  addDiscovery: (
    partial: Omit<DiscoveryEntry, "id" | "createdAt">
  ) => DiscoveryEntry;
  removeDiscovery: (id: string) => void;
  getDiscovery: (id: string) => DiscoveryEntry | undefined;
  syncing: boolean;
};

const DiscoveryContext = createContext<DiscoveryContextValue | null>(null);

function loadStore(): DiscoveryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(DISCOVERY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { entries?: DiscoveryEntry[] };
    return parsed.entries ?? [];
  } catch {
    return [];
  }
}

function saveStore(entries: DiscoveryEntry[]) {
  localStorage.setItem(DISCOVERY_STORAGE_KEY, JSON.stringify({ entries }));
}

export function DiscoveryProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<DiscoveryEntry[]>([]);
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
        const remote = await fetchDiscoveries(supabase, user.id);
        const local = loadStore();
        if (cancelled) return;

        if (remote.length === 0 && local.length > 0) {
          const migrated = local.map((e) => ({ ...e, id: crypto.randomUUID() }));
          await replaceDiscoveries(supabase, user.id, migrated);
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
  }, [hydrated, user?.id]);

  const addDiscovery = useCallback(
    (partial: Omit<DiscoveryEntry, "id" | "createdAt">) => {
      const entry: DiscoveryEntry = {
        ...partial,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      };
      setEntries((prev) => {
        const next = [entry, ...prev];
        saveStore(next);
        const supabase = createClientIfConfigured();
        if (user && supabase && cloudReady.current) {
          upsertDiscovery(supabase, user.id, entry).catch(() => {});
        }
        return next;
      });
      return entry;
    },
    [user]
  );

  const removeDiscovery = useCallback(
    (id: string) => {
      setEntries((prev) => {
        const next = prev.filter((e) => e.id !== id);
        saveStore(next);
        const supabase = createClientIfConfigured();
        if (user && supabase && cloudReady.current) {
          deleteDiscoveryRemote(supabase, user.id, id).catch(() => {});
        }
        return next;
      });
    },
    [user]
  );

  const getDiscovery = useCallback(
    (id: string) => entries.find((e) => e.id === id),
    [entries]
  );

  const value = useMemo(
    () => ({ entries, addDiscovery, removeDiscovery, getDiscovery, syncing }),
    [entries, addDiscovery, removeDiscovery, getDiscovery, syncing]
  );

  return <DiscoveryContext.Provider value={value}>{children}</DiscoveryContext.Provider>;
}

export function useDiscovery(): DiscoveryContextValue {
  const ctx = useContext(DiscoveryContext);
  if (!ctx) throw new Error("useDiscovery must be used within DiscoveryProvider");
  return ctx;
}
