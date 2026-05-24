export type TimelineCategory =
  | "biographical"
  | "session"
  | "publication"
  | "political"
  | "legacy"
  | "comparative";

export type TimelineEra =
  | "ancient"
  | "medieval"
  | "renaissance"
  | "dee-kelley"
  | "reception"
  | "golden-dawn"
  | "crowley"
  | "modern";

export type TimelineEvent = {
  id: string;
  date: string;
  dateDisplay: string;
  title: string;
  description: string;
  category: TimelineCategory;
  era: TimelineEra;
  actors: string[];
  badge: string;
  linkedLesson?: string;
  linkedCall?: number;
  linkedAethyr?: string;
  source?: string;
  comingSoon?: boolean;
};

export type TimelineData = {
  title: string;
  subtitle: string;
  events: TimelineEvent[];
};

export const TIMELINE_ERA_LABELS: Record<TimelineEra, string> = {
  ancient: "Ancient & Classical",
  medieval: "Medieval",
  renaissance: "Renaissance",
  "dee-kelley": "Dee & Kelley (1527–1609)",
  reception: "Reception & Print",
  "golden-dawn": "Golden Dawn",
  crowley: "Crowley & Thelema",
  modern: "Modern Scholarship"
};
