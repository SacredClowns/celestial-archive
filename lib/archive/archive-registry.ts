export type ArchiveFigureRecord = {
  slug: string;
  fileName: string;
  title: string;
};

export type ArchiveSessionRecord = {
  slug: string;
  fileName: string;
  title: string;
};

export const ARCHIVE_FIGURES: ArchiveFigureRecord[] = [
  { slug: "john-dee", fileName: "JOHN_DEE_PROFILE.md", title: "John Dee" },
  { slug: "edward-kelley", fileName: "EDWARD_KELLEY_PROFILE.md", title: "Edward Kelley" }
];

export const ARCHIVE_SESSIONS: ArchiveSessionRecord[] = [
  { slug: "overview", fileName: "ANGELIC_SESSIONS_OVERVIEW.md", title: "Angelic Sessions" },
  { slug: "first-contact", fileName: "SESSION_FIRST_CONTACT.md", title: "First Contact" },
  { slug: "heptarchic-revelation", fileName: "SESSION_HEPTARCHIC_REVELATION.md", title: "The Heptarchic Revelation" },
  { slug: "liber-loagaeth", fileName: "SESSION_LIBER_LOAGAETH.md", title: "Liber Loagaeth" },
  { slug: "angelic-calls", fileName: "SESSION_ANGELIC_CALLS.md", title: "The Angelic Calls" },
  { slug: "watchtower-reception", fileName: "SESSION_WATCHTOWER_RECEPTION.md", title: "The Watchtower Reception" }
];

export function getArchiveFigure(slug: string): ArchiveFigureRecord | undefined {
  return ARCHIVE_FIGURES.find((f) => f.slug === slug);
}

export function getArchiveSession(slug: string): ArchiveSessionRecord | undefined {
  return ARCHIVE_SESSIONS.find((s) => s.slug === slug);
}
