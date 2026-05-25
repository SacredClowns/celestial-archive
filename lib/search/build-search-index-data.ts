import hierarchyRaw from "@/content/phase-4-data/watchtower-hierarchy-data.json";
import { getAllDictionaryEntries, getAllCalls, getAlphabetData } from "@/lib/language/language-data";
import { getAllAethyrs } from "@/lib/aethyrs/aethyr-data";
import { publishedGlossaryEntries } from "@/lib/glossary";
import { ARCHIVE_FIGURES, ARCHIVE_SESSIONS } from "@/lib/archive/archive-registry";
import { HEPTARCHY_ENTITIES } from "@/lib/archive/heptarchy-entities";
import { RITUAL_FURNITURE_ITEMS } from "@/lib/archive/ritual-furniture";
import { seekerLessonRegistry } from "@/lib/content-registry";
import { studentLessonRegistry } from "@/lib/student/student-lesson-registry";
import { getTimelineEvents } from "@/lib/timeline/timeline-data";
import type { SearchIndexEntry } from "@/lib/search/search-types";

const WATCHTOWER_DIR: Record<string, string> = {
  east: "air",
  south: "water",
  west: "earth",
  north: "fire"
};

export function buildSearchIndex(): SearchIndexEntry[] {
  const items: SearchIndexEntry[] = [];

  for (const e of getAllDictionaryEntries()) {
    const meaningText = e.meanings.map((m) => m.english).join(" ");
    items.push({
      type: "dictionary",
      title: e.enochian,
      subtitle: meaningText.slice(0, 80),
      url: `/language/dictionary#${e.id}`,
      searchText: `${e.enochian} ${e.transliteration} ${meaningText} ${e.morphologicalNotes ?? ""} ${e.partOfSpeech ?? ""}`.toLowerCase(),
      badge: "historical"
    });
  }

  for (const f of ARCHIVE_FIGURES) {
    items.push({
      type: "lesson",
      title: f.title,
      subtitle: "Archive figure",
      url: `/archive/figures/${f.slug}`,
      searchText: `${f.title} dee kelley archive profile`.toLowerCase(),
      badge: "historical"
    });
  }

  for (const s of ARCHIVE_SESSIONS) {
    items.push({
      type: "lesson",
      title: s.title,
      subtitle: "Angelic session",
      url: `/archive/sessions/${s.slug}`,
      searchText: `${s.title} session scrying archive`.toLowerCase(),
      badge: "historical"
    });
  }

  items.push({
    type: "lesson",
    title: "Sources & Bibliography",
    subtitle: "Archive",
    url: "/archive/sources",
    searchText: "sources bibliography manuscripts peterson laycock casaubon".toLowerCase(),
    badge: "historical"
  });

  items.push({
    type: "lesson",
    title: "Angelic Hierarchy",
    subtitle: "Archive overview",
    url: "/archive/hierarchy",
    searchText: "angels hierarchy seniors kings governors kerubic medicine".toLowerCase(),
    badge: "historical"
  });

  items.push({
    type: "lesson",
    title: "Heptarchia Mystica",
    subtitle: "Archive — kings and princes",
    url: "/archive/heptarchy",
    searchText: "heptarchia mystica seven kings princes ministers tabula bonorum".toLowerCase(),
    badge: "historical"
  });

  for (const h of HEPTARCHY_ENTITIES) {
    items.push({
      type: "lesson",
      title: h.name,
      subtitle: `Heptarchic ${h.role}`,
      url: `/archive/heptarchy/${h.slug}`,
      searchText: `${h.name} heptarchic ${h.role} ${h.summary} ${h.day ?? ""}`.toLowerCase(),
      badge: h.badge
    });
  }

  items.push({
    type: "lesson",
    title: "Discovery log",
    subtitle: "Personal",
    url: "/discovery",
    searchText: "discovery log found pattern connection manuscript".toLowerCase(),
    badge: "consensus"
  });

  items.push({
    type: "lesson",
    title: "Observer — Stage 3 Preview",
    subtitle: "Initiation Path",
    url: "/path/observer",
    searchText: "observer stage 3 cartographic watchtower".toLowerCase(),
    badge: "consensus"
  });

  for (const g of publishedGlossaryEntries()) {
    items.push({
      type: "glossary",
      title: g.term,
      subtitle: g.oneLine,
      url: `/glossary/${g.slug}`,
      searchText: `${g.term} ${g.oneLine} ${g.definition}`.toLowerCase(),
      badge: g.primaryBadge
    });
  }

  for (const r of seekerLessonRegistry) {
    items.push({
      type: "lesson",
      title: r.title,
      subtitle: `Seeker · ${r.lessonNumber}`,
      url: `/path/seeker/${r.slug}`,
      searchText: `${r.title} ${r.lessonNumber} seeker ${r.glossaryTerms.join(" ")}`.toLowerCase()
    });
  }

  for (const r of studentLessonRegistry) {
    items.push({
      type: "lesson",
      title: r.title,
      subtitle: `Student · ${r.lessonNumber}`,
      url: `/path/student/${r.slug}`,
      searchText: `${r.title} ${r.lessonNumber} student ${r.glossaryTerms.join(" ")}`.toLowerCase()
    });
  }

  for (const c of getAllCalls()) {
    items.push({
      type: "call",
      title: c.title,
      subtitle: c.association.description.slice(0, 80),
      url: `/language/calls?call=${c.number}`,
      searchText: `${c.title} call ${c.number} ${c.association.description}`.toLowerCase()
    });
  }

  for (const a of getAllAethyrs()) {
    const govNames = a.governors.map((g) => g.name).join(" ");
    items.push({
      type: "aethyr",
      title: a.name,
      subtitle: `Aethyr ${a.number}`,
      url: `/aethyrs/${a.name}`,
      searchText: `${a.name} aethyr ${govNames} ${a.order}`.toLowerCase()
    });
  }

  const hierarchy = hierarchyRaw as {
    quarters: Record<string, { seniors?: { names: string[] }; angelsOfMedicine?: { angels: { name: string }[] } }>;
  };
  for (const [dir, q] of Object.entries(hierarchy.quarters ?? {})) {
    const quadrant = WATCHTOWER_DIR[dir] ?? dir;
    const names = [
      ...(q.seniors?.names ?? []),
      ...(q.angelsOfMedicine?.angels?.map((a) => a.name) ?? [])
    ].join(" ");
    items.push({
      type: "watchtower",
      title: `${dir.charAt(0).toUpperCase()}${dir.slice(1)} quarter`,
      subtitle: `Watchtower · ${quadrant}`,
      url: `/watchtowers/${quadrant}`,
      searchText: `watchtower ${dir} ${quadrant} ${names}`.toLowerCase()
    });
  }

  for (const letter of getAlphabetData().letters) {
    items.push({
      type: "alphabet",
      title: letter.name,
      subtitle: `Maps to ${letter.englishEquivalent}`,
      url: `/language/alphabet/${letter.name.toLowerCase()}`,
      searchText: `${letter.name} ${letter.englishEquivalent} alphabet`.toLowerCase()
    });
  }

  for (const rf of RITUAL_FURNITURE_ITEMS) {
    items.push({
      type: "lesson",
      title: rf.title,
      subtitle: "Ritual furniture",
      url: `/archive/ritual-furniture/${rf.slug}`,
      searchText: `${rf.title} ${rf.subtitle} ${rf.summary} ritual furniture`.toLowerCase(),
      badge: rf.badge
    });
  }

  for (const ev of getTimelineEvents()) {
    items.push({
      type: "timeline",
      title: ev.title,
      subtitle: ev.dateDisplay,
      url: `/timeline#${ev.id}`,
      searchText: `${ev.title} ${ev.description} ${ev.actors.join(" ")} ${ev.category}`.toLowerCase(),
      badge: ev.badge
    });
  }

  return items;
}
