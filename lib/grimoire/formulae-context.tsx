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
  FORMULAE_STORAGE_KEY,
  type FormulaAnalytics,
  type FormulaEntry
} from "@/lib/grimoire/formula-types";
import { buildFormulaDrafts } from "@/lib/grimoire/social-share";

type FormulaeContextValue = {
  entries: FormulaEntry[];
  addFormula: (
    partial: Omit<
      FormulaEntry,
      "id" | "createdAt" | "updatedAt" | "share" | "analytics"
    > & { share?: Partial<FormulaEntry["share"]> }
  ) => FormulaEntry;
  updateFormula: (id: string, patch: Partial<FormulaEntry>) => void;
  removeFormula: (id: string) => void;
  getFormula: (id: string) => FormulaEntry | undefined;
  recordAnalytics: (id: string, field: keyof FormulaAnalytics) => void;
};

const FormulaeContext = createContext<FormulaeContextValue | null>(null);

function loadStore(): FormulaEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FORMULAE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { entries?: FormulaEntry[] };
    return parsed.entries ?? [];
  } catch {
    return [];
  }
}

function saveStore(entries: FormulaEntry[]) {
  localStorage.setItem(FORMULAE_STORAGE_KEY, JSON.stringify({ entries }));
}

function newId(): string {
  return `formula-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function FormulaeProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<FormulaEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setEntries(loadStore());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveStore(entries);
  }, [entries, hydrated]);

  const addFormula = useCallback(
    (
      partial: Omit<
        FormulaEntry,
        "id" | "createdAt" | "updatedAt" | "share" | "analytics"
      > & { share?: Partial<FormulaEntry["share"]> }
    ): FormulaEntry => {
      const now = new Date().toISOString();
      const siteUrl =
        typeof window !== "undefined" ? window.location.origin : "https://enochia.io";
      const drafts = buildFormulaDrafts(partial.spark, partial.elaboration, siteUrl);
      const entry: FormulaEntry = {
        ...partial,
        id: newId(),
        share: {
          draftShort: partial.share?.draftShort ?? drafts.draftShort,
          draftLong: partial.share?.draftLong ?? drafts.draftLong
        },
        analytics: {
          copied: 0,
          sharedTwitter: 0,
          sharedBluesky: 0,
          sharedLinkedIn: 0,
          sharedGeneric: 0
        },
        createdAt: now,
        updatedAt: now
      };
      setEntries((prev) => [entry, ...prev]);
      return entry;
    },
    []
  );

  const updateFormula = useCallback((id: string, patch: Partial<FormulaEntry>) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, ...patch, updatedAt: new Date().toISOString() } : e
      )
    );
  }, []);

  const removeFormula = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const getFormula = useCallback(
    (id: string) => entries.find((e) => e.id === id),
    [entries]
  );

  const recordAnalytics = useCallback((id: string, field: keyof FormulaAnalytics) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              analytics: { ...e.analytics, [field]: e.analytics[field] + 1 },
              updatedAt: new Date().toISOString()
            }
          : e
      )
    );
  }, []);

  const value = useMemo(
    () => ({
      entries,
      addFormula,
      updateFormula,
      removeFormula,
      getFormula,
      recordAnalytics
    }),
    [entries, addFormula, updateFormula, removeFormula, getFormula, recordAnalytics]
  );

  return <FormulaeContext.Provider value={value}>{children}</FormulaeContext.Provider>;
}

export function useFormulae(): FormulaeContextValue {
  const ctx = useContext(FormulaeContext);
  if (!ctx) throw new Error("useFormulae must be used within FormulaeProvider");
  return ctx;
}
