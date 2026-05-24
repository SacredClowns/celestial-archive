"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import {
  DISCOVERY_STORAGE_KEY,
  type DiscoveryEntry,
  type DiscoveryKind
} from "@/lib/discovery/discovery-types";

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
  const [entries, setEntries] = useState<DiscoveryEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setEntries(loadStore());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveStore(entries);
  }, [entries, hydrated]);

  const addDiscovery = useCallback(
    (partial: Omit<DiscoveryEntry, "id" | "createdAt">) => {
      const entry: DiscoveryEntry = {
        ...partial,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      };
      setEntries((prev) => [entry, ...prev]);
      return entry;
    },
    []
  );

  const removeDiscovery = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const getDiscovery = useCallback(
    (id: string) => entries.find((e) => e.id === id),
    [entries]
  );

  const value = useMemo(
    () => ({ entries, addDiscovery, removeDiscovery, getDiscovery }),
    [entries, addDiscovery, removeDiscovery, getDiscovery]
  );

  return <DiscoveryContext.Provider value={value}>{children}</DiscoveryContext.Provider>;
}

export function useDiscovery(): DiscoveryContextValue {
  const ctx = useContext(DiscoveryContext);
  if (!ctx) throw new Error("useDiscovery must be used within DiscoveryProvider");
  return ctx;
}
