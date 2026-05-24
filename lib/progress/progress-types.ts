export type ProgressRank = "seeker" | "student";

export type ProgressStore = {
  completedLessonIds: string[];
  lastVisitedLessonId: string | null;
  rank: ProgressRank;
};

export const PROGRESS_STORAGE_KEY = "celestial-archive-progress";

export const DEFAULT_PROGRESS: ProgressStore = {
  completedLessonIds: [],
  lastVisitedLessonId: null,
  rank: "seeker"
};
