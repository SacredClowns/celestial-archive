import eventsRaw from "@/content/phase-4-data/timeline-events-data.json";
import metaRaw from "@/content/phase-4-data/timeline-data.json";
import type { TimelineCategory, TimelineData, TimelineEra, TimelineEvent } from "@/lib/timeline/timeline-types";

type RawTimelineEvent = {
  id: string;
  year: number;
  month: number | null;
  day: number | null;
  endYear?: number | null;
  title: string;
  description: string;
  category: string;
  badge: string;
  era: string;
  tags?: string[];
  sources?: string[];
  lessonConnections?: string[];
  significance?: string;
};

const meta = metaRaw as { title: string; subtitle: string };

const GLYPH_TO_BADGE: Record<string, string> = {
  "◆": "historical",
  "◇": "consensus",
  "○": "occult",
  "△": "later",
  "~": "speculative",
  "?": "disputed",
  "⚠": "caution"
};

function normalizeCategory(raw: string): TimelineCategory {
  if (
    raw === "biographical" ||
    raw === "session" ||
    raw === "publication" ||
    raw === "political" ||
    raw === "legacy" ||
    raw === "comparative"
  ) {
    return raw;
  }
  return "legacy";
}

function normalizeEra(raw: string): TimelineEra {
  const eras: TimelineEra[] = [
    "ancient",
    "medieval",
    "renaissance",
    "dee-kelley",
    "reception",
    "golden-dawn",
    "crowley",
    "modern"
  ];
  if (raw === "aftermath") return "reception";
  if (eras.includes(raw as TimelineEra)) return raw as TimelineEra;
  return "modern";
}

function lessonHref(id: string): string | undefined {
  const seekerMap: Record<string, string> = {
    "seeker-1-1": "/path/seeker/the-lost-language",
    "seeker-1-2": "/path/seeker/the-partnership",
    "seeker-1-3": "/path/seeker/the-first-transmissions",
    "seeker-1-4": "/path/seeker/the-enochian-language-emerges",
    "seeker-1-5": "/path/seeker/the-long-arc-and-the-breaking"
  };
  const studentMap: Record<string, string> = {
    "student-2-1": "/path/student/the-seven-kings",
    "student-2-2": "/path/student/the-book-that-cannot-be-read",
    "student-2-3": "/path/student/a-grammar-of-invocation",
    "student-2-4": "/path/student/the-architecture-of-the-world",
    "student-2-5": "/path/student/the-inheritors",
    "student-2-6": "/path/student/the-voice-and-the-abyss"
  };
  return seekerMap[id] ?? studentMap[id];
}

function isoDate(e: RawTimelineEvent): string {
  const y = String(e.year).padStart(4, "0");
  const m = e.month != null ? String(e.month).padStart(2, "0") : "01";
  const d = e.day != null ? String(e.day).padStart(2, "0") : "01";
  return `${y}-${m}-${d}`;
}

function dateDisplay(e: RawTimelineEvent): string {
  if (e.month != null && e.day != null) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return `${months[e.month - 1]} ${e.day}, ${e.year}`;
  }
  if (e.month != null) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return `${months[e.month - 1]} ${e.year}`;
  }
  if (e.endYear && e.endYear !== e.year) {
    return `${e.year}–${e.endYear}`;
  }
  if (e.year < 0) return `${Math.abs(e.year)} BCE`;
  return String(e.year);
}

function actorsFromTags(tags: string[] | undefined): string[] {
  if (!tags?.length) return [];
  const people = new Set<string>();
  const map: Record<string, string> = {
    dee: "Dee",
    kelley: "Kelley",
    casaubon: "Casaubon",
    crowley: "Crowley",
    mathers: "Mathers",
    regardie: "Regardie"
  };
  for (const t of tags) {
    if (map[t]) people.add(map[t]);
  }
  return [...people];
}

function mapRawEvent(e: RawTimelineEvent): TimelineEvent {
  const badgeKey = GLYPH_TO_BADGE[e.badge] ?? e.badge;
  const lessonId = e.lessonConnections?.[0];
  const linkedLesson = lessonId ? lessonHref(lessonId) : undefined;
  return {
    id: e.id,
    date: isoDate(e),
    dateDisplay: dateDisplay(e),
    title: e.title,
    description: e.description,
    category: normalizeCategory(e.category),
    era: normalizeEra(e.era),
    actors: actorsFromTags(e.tags),
    badge: badgeKey,
    linkedLesson,
    source: e.sources?.join("; ")
  };
}

const COMING_SOON_STUBS: TimelineEvent[] = [
  {
    id: "era-gd-stub",
    date: "1888-01-01",
    dateDisplay: "1888 onward",
    title: "Golden Dawn Reception — full era",
    description:
      "Detailed Golden Dawn timeline entries are being prepared. The Relationship Web and Student lesson 2.5 cover this transmission for now.",
    category: "legacy",
    era: "golden-dawn",
    actors: ["Mathers", "Golden Dawn"],
    badge: "later",
    comingSoon: true
  },
  {
    id: "era-crowley-stub",
    date: "1909-01-01",
    dateDisplay: "1909 onward",
    title: "Crowley's Aethyr Workings — full era",
    description:
      "Expanded Crowley-era events will appear here. See Student lesson 2.6 and the Aethyr Explorer for experiential material, always badged ○.",
    category: "legacy",
    era: "crowley",
    actors: ["Crowley"],
    badge: "occult",
    comingSoon: true
  }
];

const rawEvents = eventsRaw as RawTimelineEvent[];
const events: TimelineEvent[] = [...rawEvents.map(mapRawEvent), ...COMING_SOON_STUBS].sort((a, b) =>
  a.date.localeCompare(b.date)
);

export function getTimelineData(): TimelineData {
  return {
    title: meta.title,
    subtitle: meta.subtitle,
    events
  };
}

export function getTimelineEvents(): TimelineEvent[] {
  return getTimelineData().events;
}

export function getTimelineActors(): string[] {
  const set = new Set<string>();
  events.forEach((e) => e.actors.forEach((a) => set.add(a)));
  return [...set].sort();
}

export function getTimelineEras(): TimelineEra[] {
  const set = new Set<TimelineEra>();
  events.forEach((e) => set.add(e.era));
  return [...set];
}
