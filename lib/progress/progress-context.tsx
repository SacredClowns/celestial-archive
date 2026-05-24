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
  DEFAULT_PROGRESS,
  PROGRESS_STORAGE_KEY,
  type ProgressRank,
  type ProgressStore
} from "@/lib/progress/progress-types";
import { createClientIfConfigured } from "@/lib/supabase/client";
import {
  fetchLessonProgress,
  markLessonComplete as markLessonRemote,
  replaceLessonProgress
} from "@/lib/supabase/celestial-db";

type ProgressContextValue = {
  progress: ProgressStore;
  markLessonComplete: (lessonId: string) => void;
  isLessonComplete: (lessonId: string) => boolean;
  setLastVisited: (lessonId: string) => void;
  setRank: (rank: ProgressRank) => void;
  completedCount: number;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function loadProgress(): ProgressStore {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<ProgressStore>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      completedLessonIds: Array.isArray(parsed.completedLessonIds)
        ? parsed.completedLessonIds
        : []
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function saveProgress(progress: ProgressStore) {
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressStore>(DEFAULT_PROGRESS);
  const [hydrated, setHydrated] = useState(false);
  const cloudReady = useRef(false);

  useEffect(() => {
    setProgress(loadProgress());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const supabase = createClientIfConfigured();
    if (!user || !supabase) {
      cloudReady.current = false;
      return;
    }

    let cancelled = false;
    cloudReady.current = false;

    (async () => {
      try {
        const remote = await fetchLessonProgress(supabase, user.id);
        const local = loadProgress();
        const merged = Array.from(
          new Set([...local.completedLessonIds, ...remote])
        );
        if (cancelled) return;
        if (merged.length > remote.length || (merged.length > 0 && remote.length === 0)) {
          await replaceLessonProgress(supabase, user.id, merged);
        }
        const next: ProgressStore = {
          ...local,
          completedLessonIds: merged
        };
        setProgress(next);
        saveProgress(next);
        cloudReady.current = true;
      } catch {
        cloudReady.current = false;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (user && !cloudReady.current) return;
    saveProgress(progress);
  }, [progress, hydrated, user]);

  const markLessonComplete = useCallback(
    (lessonId: string) => {
      setProgress((p) => {
        if (p.completedLessonIds.includes(lessonId)) return p;
        return { ...p, completedLessonIds: [...p.completedLessonIds, lessonId] };
      });
      const supabase = createClientIfConfigured();
      if (user && supabase && cloudReady.current) {
        void markLessonRemote(supabase, user.id, lessonId).catch(() => {});
      }
    },
    [user]
  );

  const isLessonComplete = useCallback(
    (lessonId: string) => progress.completedLessonIds.includes(lessonId),
    [progress.completedLessonIds]
  );

  const setLastVisited = useCallback((lessonId: string) => {
    setProgress((p) => ({ ...p, lastVisitedLessonId: lessonId }));
  }, []);

  const setRank = useCallback((rank: ProgressRank) => {
    setProgress((p) => ({ ...p, rank }));
  }, []);

  const value = useMemo(
    () => ({
      progress,
      markLessonComplete,
      isLessonComplete,
      setLastVisited,
      setRank,
      completedCount: progress.completedLessonIds.length
    }),
    [progress, markLessonComplete, isLessonComplete, setLastVisited, setRank]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
