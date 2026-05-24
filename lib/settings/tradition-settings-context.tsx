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

export type TraditionSettings = {
  showOccultLens: boolean;
  showLaterTraditions: boolean;
  showSpeculativeLens: boolean;
};

const STORAGE_KEY = "celestial-archive-tradition-settings";

const DEFAULT_SETTINGS: TraditionSettings = {
  showOccultLens: true,
  showLaterTraditions: true,
  showSpeculativeLens: true
};

type TraditionSettingsContextValue = {
  settings: TraditionSettings;
  setSetting: <K extends keyof TraditionSettings>(key: K, value: TraditionSettings[K]) => void;
  resetSettings: () => void;
  isLensVisible: (lens: { tone: string; title: string }) => boolean;
};

const TraditionSettingsContext = createContext<TraditionSettingsContextValue | null>(null);

function loadSettings(): TraditionSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function TraditionSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<TraditionSettings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings, hydrated]);

  const setSetting = useCallback(
    <K extends keyof TraditionSettings>(key: K, value: TraditionSettings[K]) => {
      setSettings((s) => ({ ...s, [key]: value }));
    },
    []
  );

  const resetSettings = useCallback(() => setSettings(DEFAULT_SETTINGS), []);

  const isLensVisible = useCallback(
    (lens: { tone: string; title: string }) => {
      const title = lens.title.toLowerCase();
      if (!settings.showLaterTraditions) {
        if (lens.tone === "later") return false;
        if (/golden dawn|crowley|regardie|thelem|post-dee|modern reception/i.test(title)) {
          return false;
        }
      }
      if (!settings.showOccultLens && lens.tone === "occult") return false;
      if (!settings.showSpeculativeLens && lens.tone === "speculative") return false;
      return true;
    },
    [settings]
  );

  const value = useMemo(
    () => ({ settings, setSetting, resetSettings, isLensVisible }),
    [settings, setSetting, resetSettings, isLensVisible]
  );

  return (
    <TraditionSettingsContext.Provider value={value}>{children}</TraditionSettingsContext.Provider>
  );
}

export function useTraditionSettings(): TraditionSettingsContextValue {
  const ctx = useContext(TraditionSettingsContext);
  if (!ctx) throw new Error("useTraditionSettings must be used within TraditionSettingsProvider");
  return ctx;
}
