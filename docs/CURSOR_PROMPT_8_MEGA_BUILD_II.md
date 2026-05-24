# CURSOR PROMPT 8 — MEGA BUILD II: Systems, Search, Polish
## Dictionary Integration + Search + Journal + Timeline + Relationship Web + Archive Landing + Mobile Nav + Student Parity + Visual Polish

**Priority:** CRITICAL — Production Build  
**Estimated Scope:** 14–18 prompts worth of work  
**Date:** May 23, 2026

---

## CONTEXT

Prompt 7 delivered four pillars: Call Viewer, Aethyr Explorer, Watchtower Map, and Curriculum Viewer. All build and all routes work. Now we need to:

1. Wire the **631-word expanded dictionary** (currently unused JSON sitting in phase-4-data)
2. Build the **missing systems** (search, journal, timeline, relationship web, archive landing)
3. Bring **Student path to parity** with Seeker's upgrades
4. Add **mobile navigation**
5. **Visual polish pass** across all pages

This is the biggest prompt yet. Burn everything.

---

## TRACK A: DICTIONARY INTEGRATION (High Priority)

### A.1 — Switch to the Full Dictionary

A new file exists: `content/phase-4-data/enochian-dictionary-full.json`

Current state: `language-data.ts` loads dictionary entries from `coreVocabulary` in `enochian-calls-data.json` (42 entries). The new file has **631 entries** with richer data.

**Schema of the new file:**

```typescript
type FullDictionaryFile = {
  source: string;
  manuscriptSource: string;
  badge: string;
  note: string;
  totalUniqueWords: number;   // 631
  totalWordTokens: number;    // 1195
  corpusStatistics: {
    hapaxLegomena: number;
    frequencyBands: Record<string, number>;
    topWords: { word: string; count: number }[];
  };
  entries: FullDictionaryEntry[];
};

type FullDictionaryEntry = {
  id: string;                  // lowercase enochian word
  enochian: string;            // uppercase
  transliteration: string;
  pronunciation: {
    dee: string | null;
    goldenDawn?: string;       // not yet populated for most
    modern?: string;           // not yet populated for most
  };
  meanings: {
    english: string;
    source: string;            // e.g., "Call 1, pos 1.5"
    badge: string;
  }[];
  partOfSpeech: string | null; // "noun", "verb", "conjunction", etc.
  sourceLocation: string;      // "Calls 1, 3, 7" etc.
  frequency: number;           // how many times across all 19 Calls
  callAppearances: number[];   // which Calls it appears in
  relatedWords: string[];      // words sharing morphological roots
  morphologicalNotes: string | null;
  scholarlyNotes: any[];
};
```

**Update `lib/language/language-data.ts`:**

```typescript
import dictionaryRaw from "@/content/phase-4-data/enochian-dictionary-full.json";

// Replace the old rowToDictionaryEntry conversion with direct loading:
export function getAllDictionaryEntries(): DictionaryEntry[] {
  return dictionaryRaw.entries.map(entry => ({
    id: entry.id,
    enochian: entry.enochian,
    transliteration: entry.transliteration,
    pronunciation: entry.pronunciation,
    meanings: entry.meanings,
    partOfSpeech: entry.partOfSpeech,
    sourceLocation: entry.sourceLocation,
    frequency: entry.frequency,
    relatedWords: entry.relatedWords,
    morphologicalNotes: entry.morphologicalNotes,
    scholarlyNotes: entry.scholarlyNotes
  }));
}

export function getCorpusStatistics() {
  return dictionaryRaw.corpusStatistics;
}
```

**Update `lib/language/language-types.ts`** — extend `DictionaryEntry` to include the new fields:

```typescript
export type DictionaryEntry = {
  // ... existing fields ...
  callAppearances?: number[];
  // frequency already exists
};
```

### A.2 — Rebuild the Dictionary Page

The current `/language/dictionary` page shows ~42 words. Rebuild it to handle 631:

1. **Search bar** — Full-text search across Enochian words, English meanings, and morphological notes. Debounced input.

2. **Filters:**
   - By part of speech (dropdown: noun, verb, adjective, conjunction, preposition, pronoun, adverb, number, particle, "unclassified")
   - By frequency band (1x, 2-3x, 4-10x, 11+x)
   - By Call number (dropdown: show words from a specific Call)

3. **Sort options:** Alphabetical (default), by frequency (high→low), by Call appearance order

4. **Entry cards** — Each word shows:
   - Enochian word in `font-enochian` (large, gold)
   - Transliteration
   - Pronunciation (dee tradition)
   - Part of speech badge (small pill)
   - Frequency indicator (subtle number)
   - Primary meaning(s)
   - Click/tap to expand: all meanings with sources, morphological notes, related words, Call appearances

5. **Corpus statistics panel** at the top (reuse data from `corpusStatistics`):
   - Total unique words / total tokens
   - Hapax legomena count
   - Frequency distribution
   - Top 10 most common words as a horizontal bar chart

6. **Pagination or virtual scroll** — 631 entries is too many to render at once. Use either:
   - Paginate (50 per page) with page controls
   - Or lazy-load on scroll with intersection observer

### A.3 — Dictionary Cross-Links Everywhere

The Call Viewer already links words to dictionary entries. Extend this to:

- **Glossary entries** — When a glossary term has an Enochian equivalent, show a link to the dictionary
- **Aethyr pages** — Governor names, Aethyr names, and angelic king names should link to dictionary entries when they exist
- **Watchtower pages** — Angel names, God-names should link to dictionary entries when they match
- **Lesson content** — When Enochian words appear in lesson prose, detect and auto-link to dictionary (same pattern as glossary tooltips)

---

## TRACK B: SITE-WIDE SEARCH (New System)

### B.1 — Search Route and Component

Create `/search` route and a `SearchOverlay` component accessible from the nav bar.

**Search overlay behavior:**
- Triggered by clicking a search icon in the nav bar OR pressing `Cmd+K` / `Ctrl+K`
- Full-screen overlay with dark backdrop (`bg-ink/95`)
- Large search input at the top, `font-display`, gold border
- Results stream in below as the user types (debounced 200ms)
- Press Escape to close

### B.2 — Search Index

Build a client-side search index at build time. Create `lib/search/search-index.ts`:

**Searchable content types:**

| Type | Source | Fields to index |
|------|--------|----------------|
| Dictionary | enochian-dictionary-full.json | enochian, meanings, morphologicalNotes |
| Glossary | glossary.ts | term, definition, oneLine |
| Lessons | lesson metadata from content-registry | title, lessonNumber, description |
| Calls | enochian-calls-data.json | title, association.description |
| Aethyrs | aethyr-explorer-data.json | name, governor names, region names |
| Watchtowers | watchtower-hierarchy-data.json | angel names, god names, senior names |
| Letters | enochian-alphabet-data.json | name, englishEquivalent |

**Implementation:**
- At build time, generate a static JSON search index: `content/search-index.json`
- Each entry: `{ type, title, subtitle, url, searchText, badge }`
- On the client, load the index and do simple substring/fuzzy matching
- No external search library needed — a simple `filter + includes` is fine for our corpus size (~1000 entries)

### B.3 — Search Results

Group results by type with section headers:
- "Dictionary" → links to `/language/dictionary#word`
- "Glossary" → links to `/glossary/[slug]`
- "Lessons" → links to `/path/seeker/[slug]` or `/path/student/[slug]`
- "Calls" → links to `/language/calls` (with call pre-selected)
- "Aethyrs" → links to `/aethyrs/[name]`
- "Watchtowers" → links to `/watchtowers/[quadrant]`
- "Alphabet" → links to `/language/alphabet/[letter]`

Show max 5 results per type, with "Show all N results" expand button.

### B.4 — Navigation Integration

Add a search icon (magnifying glass) to `app-chrome.tsx` nav bar, right side. On click, open `SearchOverlay`.

---

## TRACK C: JOURNAL SYSTEM (New Pillar)

### C.1 — Journal Route Structure

```
/journal                    → Journal index (list of entries)
/journal/new                → New journal entry
/journal/[id]               → View/edit journal entry
```

### C.2 — Journal Types

Create `lib/journal/journal-types.ts`:

```typescript
export type JournalEntryType = 
  | "reflection"      // From lesson reflection prompts
  | "observation"     // From self-observation prompts
  | "freeform"        // User's own notes
  | "practice"        // Recording a practice session
  | "question"        // A question the user wants to return to
  | "discovery";      // Something the user noticed/discovered

export type JournalEntry = {
  id: string;
  type: JournalEntryType;
  title: string;
  body: string;           // Markdown content
  createdAt: string;       // ISO date
  updatedAt: string;
  tags: string[];
  linkedLesson?: string;   // lesson slug if created from a lesson
  linkedAethyr?: string;   // aethyr name if relevant
  linkedCall?: number;     // call number if relevant
  mood?: string;           // optional: user's self-reported mood
};

export type JournalStore = {
  entries: JournalEntry[];
};
```

### C.3 — Journal Storage

Since we have no backend yet, use **React Context + localStorage** for persistence:

Create `lib/journal/journal-context.tsx`:
- `JournalProvider` wrapping the app in `layout.tsx`
- `useJournal()` hook returning: `entries`, `addEntry()`, `updateEntry()`, `deleteEntry()`, `getEntriesByLesson()`, `getEntriesByTag()`
- Persist to `localStorage` under key `celestial-archive-journal`
- Initialize with empty array if no existing data

### C.4 — Journal Components

**`components/journal/journal-entry-editor.tsx`**
- Textarea for title + body (Markdown)
- Type selector (pills for each JournalEntryType)
- Tag input (comma-separated, auto-complete from existing tags)
- Linked content selector (optional: link to a lesson, aethyr, or call)
- Save / Cancel buttons

**`components/journal/journal-entry-card.tsx`**
- Card showing: type icon, title, first 2 lines of body, date, tags
- Click to navigate to `/journal/[id]`

**`components/journal/journal-index.tsx`**
- List of all entries, sorted by date (newest first)
- Filter by type and tag
- Empty state: "Your journal is empty. As you explore the Archive, you'll find reflection prompts throughout the lessons. Your observations begin here."

**`components/journal/journal-fab.tsx`**
- A floating action button (bottom-right corner) visible on ALL pages
- Circular button with a quill/pen icon
- On click: opens a slide-out panel (not full navigation) for quick journal entry
- The panel should show: quick title input, body textarea, save button
- Pre-fills `linkedLesson` / `linkedAethyr` / `linkedCall` based on current URL

### C.5 — Lesson Integration

Update `components/lesson/knowledge-check.tsx` and any reflection prompt blocks:
- After the user engages with a reflection prompt, show a "Save to Journal" button
- This pre-fills a journal entry with `type: "reflection"`, `linkedLesson: currentLessonSlug`, and the reflection prompt as the title

Add to navigation: "Journal" link in the nav bar.

---

## TRACK D: INTERACTIVE TIMELINE (Rebuild)

### D.1 — Timeline Data

Create `content/phase-4-data/timeline-data.json`:

```typescript
type TimelineEvent = {
  id: string;
  date: string;           // "1527", "1581-03", "1583-04-13", etc.
  dateDisplay: string;     // "March 1581", "April 13, 1583", etc.
  title: string;
  description: string;     // 1-3 sentences
  category: "biographical" | "session" | "publication" | "political" | "legacy";
  actors: string[];        // ["Dee", "Kelley", "Rudolf II", etc.]
  badge: string;
  linkedLesson?: string;   // lesson slug
  linkedCall?: number;
  linkedAethyr?: string;
  source?: string;
};
```

I (Claude) will populate this JSON with ~80-100 events from the Master Timeline. For now, create the structure with 15 key events as seed data:

```json
[
  {"id": "dee-birth", "date": "1527-07-13", "dateDisplay": "July 13, 1527", "title": "John Dee Born", "description": "Born in Tower Ward, London. Son of Rowland Dee, a gentleman server at the court of Henry VIII.", "category": "biographical", "actors": ["Dee"], "badge": "historical"},
  {"id": "dee-cambridge", "date": "1542", "dateDisplay": "1542", "title": "Dee Enters Cambridge", "description": "Enters St. John's College, Cambridge at age 15. Studies mathematics, astronomy, Greek, Latin, philosophy.", "category": "biographical", "actors": ["Dee"], "badge": "historical"},
  {"id": "dee-louvain", "date": "1548", "dateDisplay": "1548", "title": "Dee Studies at Louvain", "description": "Travels to the University of Louvain. Studies with Gemma Frisius and Gerard Mercator. Acquires reputation across Europe.", "category": "biographical", "actors": ["Dee"], "badge": "historical"},
  {"id": "dee-monas", "date": "1564", "dateDisplay": "1564", "title": "Monas Hieroglyphica Published", "description": "Dee publishes Monas Hieroglyphica in Antwerp — a dense symbolic treatise attempting to unify all knowledge through a single glyph.", "category": "publication", "actors": ["Dee"], "badge": "historical"},
  {"id": "first-actions", "date": "1581-12-22", "dateDisplay": "December 22, 1581", "title": "First Angelic Actions Begin", "description": "Dee begins scrying sessions, initially with Barnabas Saul as medium. Records the first 'actions' in his spiritual diaries.", "category": "session", "actors": ["Dee", "Saul"], "badge": "historical"},
  {"id": "kelley-arrives", "date": "1582-03-10", "dateDisplay": "March 10, 1582", "title": "Edward Kelley Arrives at Mortlake", "description": "Kelley (initially calling himself Edward Talbot) presents himself at Dee's Mortlake house. The partnership that produces the Enochian system begins.", "category": "biographical", "actors": ["Dee", "Kelley"], "badge": "historical"},
  {"id": "heptarchy", "date": "1582-03", "dateDisplay": "March–November 1582", "title": "Mystical Heptarchy Received", "description": "The septenary system of planetary kings and princes is transmitted. Dee records the Heptarchical system in his working papers.", "category": "session", "actors": ["Dee", "Kelley"], "badge": "historical"},
  {"id": "enochian-alphabet", "date": "1583-05", "dateDisplay": "May 1583", "title": "Enochian Alphabet Received", "description": "The 21-letter alphabet of the Angelical language is transmitted to Kelley, along with initial vocabulary.", "category": "session", "actors": ["Dee", "Kelley"], "badge": "historical"},
  {"id": "depart-england", "date": "1583-09-21", "dateDisplay": "September 21, 1583", "title": "Dee and Kelley Depart England", "description": "Dee, Kelley, and their families leave England for the continent, traveling to Kraków at the invitation of the Polish nobleman Albert Łaski.", "category": "biographical", "actors": ["Dee", "Kelley", "Łaski"], "badge": "historical"},
  {"id": "calls-received", "date": "1584-04", "dateDisplay": "April–July 1584", "title": "The 19 Angelic Calls Received in Kraków", "description": "The 48 Angelic Keys (19 Calls, with Call 19 generating 30 variants for the Aethyrs) are transmitted. Received in reverse order: Call 19 first, Call 1 last.", "category": "session", "actors": ["Dee", "Kelley"], "badge": "historical"},
  {"id": "wife-swap", "date": "1587-04-18", "dateDisplay": "April 18, 1587", "title": "The Cross-Matching Incident", "description": "The angel Madimi instructs Dee and Kelley to share their wives. The incident severely strains the partnership. Dee records his anguish in his diary.", "category": "session", "actors": ["Dee", "Kelley", "Jane Dee", "Joanna Kelley"], "badge": "historical"},
  {"id": "great-table-corrected", "date": "1587-04-20", "dateDisplay": "April 20, 1587", "title": "Great Table Corrected by Raphael", "description": "The angel Raphael transmits a corrected version of the Great Table, replacing the 1583 original.", "category": "session", "actors": ["Dee", "Kelley"], "badge": "historical"},
  {"id": "dee-returns", "date": "1589-12", "dateDisplay": "December 1589", "title": "Dee Returns to England", "description": "After six years abroad, Dee returns to England. His Mortlake library has been vandalized and looted.", "category": "biographical", "actors": ["Dee"], "badge": "historical"},
  {"id": "dee-death", "date": "1608-12", "dateDisplay": "Late 1608 or early 1609", "title": "John Dee Dies", "description": "Dee dies in poverty at Mortlake, aged 81. His manuscripts pass through various hands before reaching the British Library.", "category": "biographical", "actors": ["Dee"], "badge": "historical"},
  {"id": "casaubon", "date": "1659", "dateDisplay": "1659", "title": "A True and Faithful Relation Published", "description": "Méric Casaubon publishes Dee's spiritual diaries as 'A True and Faithful Relation of What Passed for Many Years Between Dr. John Dee and Some Spirits' — intending to discredit Dee.", "category": "publication", "actors": ["Casaubon"], "badge": "historical"}
]
```

### D.2 — Timeline Components

Create `components/timeline/`:

**`interactive-timeline.tsx`**
- Vertical timeline layout (mobile) / horizontal scrolling timeline (desktop)
- Events as cards along a central line/axis
- Color-coded by category:
  - biographical → `text-gold-pale`
  - session → `text-amber` (these are the angelic transmission events)
  - publication → `text-gold-dim`
  - political → `text-gold-dim/70`
  - legacy → `text-gold-dim/50`
- Filterable by category and by actor
- Clicking an event card expands it to show full description + linked content
- Events with linked lessons/calls/aethyrs show link badges

**`timeline-event-card.tsx`**
- Date display (prominent)
- Title
- Actors as small pills
- Description (1-3 sentences)
- Badge
- Linked content buttons (if applicable)

**`timeline-filter-bar.tsx`**
- Category filter pills
- Actor filter (Dee, Kelley, Golden Dawn, Crowley)
- Date range slider (1527–1904)

### D.3 — Rebuild `/timeline` Route

Replace the current stub with the full interactive timeline. Page header: "The Celestial Timeline — A Chronology of the Enochian Transmissions"

---

## TRACK E: RELATIONSHIP WEB (New Pillar)

### E.1 — Route

Create `/relationships` route.

### E.2 — Leverage Existing Data

The project already has `lib/relationship-web/types.ts` and `lib/relationship-web/seed.ts` with node and edge data. The edge types are: "Derived from", "Reorganized by", "Used by", "Extended by", "Inspired by", "Contradicted by", "Transmitted via", "Alternative to".

### E.3 — Visualization

Build `components/relationship-web/web-graph.tsx`:

- **SVG force-directed graph** (or simpler: radial/hierarchical layout)
- Nodes represent: Dee, Kelley, the Enochian system, Golden Dawn, Crowley, Regardie, manuscripts, etc.
- Edges show the relationship type with labels
- Clicking a node shows a detail panel with:
  - Name, type (person/text/organization/concept)
  - Description
  - All connections listed
  - Links to relevant pages (lessons, glossary entries, etc.)

**Simpler fallback** if SVG graph is too complex: a grid of cards with connection lines drawn as CSS borders/SVG overlays. The key is showing HOW ideas flow from Dee → manuscripts → Casaubon → Golden Dawn → Crowley → modern practice.

### E.4 — Navigation

Add "Web" to the nav bar (between Glossary and Observatory).

---

## TRACK F: ARCHIVE LANDING PAGE (Rebuild)

### F.1 — Rebuild `/archive`

The current archive page is a stub. Rebuild it as the **true hub** of the app — the "main library" that the home page leads to.

**Layout:**

1. **Hero section** — "The Celestial Archive" title with subtle starfield or geometric background. Subtitle: "A living research archive of the Enochian system — its history, language, cosmology, and continuing mysteries."

2. **Pillar cards grid** — Show all major sections as large cards:
   - Initiation Path (stages/lessons)
   - Language Chamber (alphabet, dictionary, calls)
   - Watchtower Map (Great Table, quadrants)
   - Aethyr Explorer (30 Aethyrs)
   - Timeline (chronology)
   - Observatory (Loagaeth, Great Table comparison)
   - Glossary (100+ terms)
   - Journal (personal reflections)
   - Relationship Web (transmission history)

   Each card: icon/glyph, title, 1-line description, link. Use `CandlelightCard` with hover glow.

3. **Quick stats** — "The Archive contains: 19 Angelic Calls (1,195 words) · 631 Dictionary Entries · 30 Aethyrs · 91 Governors · 24 Seniors · 48 Angels · 11 Lessons · 100+ Glossary Terms"

4. **Recent discoveries / highlighted content** — 3 rotating cards showing specific interesting content (hardcode for now):
   - "The Lost Language" (Lesson 1.1)
   - "The Key of the Thirty Ayres" (Call 19)
   - "LIL — The First Aethyr"

### F.2 — Update Home Page Link

Ensure the home page's main CTA button navigates to `/archive`.

---

## TRACK G: STUDENT RENDERER PARITY

### G.1 — Mirror Seeker Upgrades to Student Path

The Student lesson renderer (`student-lesson-renderer.tsx`) needs the same upgrades that the Seeker path got in Prompt 7:

1. **Badge rendering in prose** — Same inline badge detection (◆◇○△◎~?⚠) with tooltips
2. **Lens tabs** — Use the same `LensTabs` component. Student lessons also have lens sections.
3. **Lesson progress bar** — Same scroll-based gold line
4. **Lesson sidebar** — Same `CandlelightCard` panels
5. **Knowledge check** — Same "Consider" / reflection pattern (no scoring)
6. **Lesson navigation footer** — Previous/Next with Student lesson chain

### G.2 — Student Stage Map

Update `/path/student` index page to match the Seeker index design:
- "Stage 2: Student — You have crossed the threshold."
- Show all 6 Student lessons as cards with the same styling

---

## TRACK H: MOBILE NAVIGATION

### H.1 — Hamburger Menu

The nav bar currently shows 7+ items that overflow on mobile. Add:

1. **Hamburger icon** (☰) visible on screens < 768px, replacing the inline nav items
2. **Slide-out drawer** from the right side:
   - Dark background (`bg-deep`)
   - All nav items stacked vertically
   - Search icon at the top
   - Journal quick-entry button
   - Close button (X)
3. **Keyboard accessibility** — Escape closes, Tab traps focus within drawer

### H.2 — Responsive Audit

Check all pages at 375px (iPhone SE) viewport:
- Watchtower grid should stack or show horizontal scroll
- Aethyr rings should resize or switch to list-only view on mobile
- Timeline should use vertical layout on mobile
- Lesson lens tabs should use accordion on mobile (already implemented per Prompt 7, verify)
- Dictionary should be single-column
- Search overlay should be full-screen on mobile

---

## TRACK I: WATCHTOWER ANGEL HIERARCHY WIRING

### I.1 — Wire Remaining Angel Types

The watchtower hierarchy data JSON has ALL angel types (Medicine, Precious Stones, Transformation), but Cursor noted only Seniors/Kings are showing. Update `components/watchtowers/angel-hierarchy.tsx` and `quadrant-detail.tsx` to display:

1. **Angels of Medicine** section — 4 angels per quadrant with:
   - Angel names (both variants)
   - God-names (2 per quadrant)
   - Cacodemons (4 per quadrant)
   - God-names reversed
   - Note: "These are the sixteen good angels who are most skilled and powerful in medicine and in the curing of diseases."

2. **Angels of Precious Stones** section — Same layout:
   - Note: "These are the names of the sixteen good angels who are powerful and learned in the finding, collection, use, and virtues of metals, and in the coagulations and powers of jewels."

3. **Angels of Transformation** section — Same layout:
   - Note: "These are the names of the sixteen good angels who are powerful and learned in Transformation."

4. **Cacodemon warnings** — Show cacodemons in a separate collapsible section with an ⚠ badge and a note: "These are the corresponding cacodemons — entities that can inflict the inverse of what the good angels provide. Their names are listed for completeness, not for invocation."

### I.2 — God-Name Highlighting in the Grid

On the quadrant detail page, the tablet grid should highlight cells that form God-names. Overlay the name extraction pattern:
- Top row of each sub-quadrant → 3-letter or 4-letter God-names
- Cross of the tablet → Seniors names (6-letter horizontal readings)
- Use subtle colored outlines on the highlighted cells with a legend

---

## TRACK J: VISUAL POLISH PASS

### J.1 — Page Transitions

Add a subtle fade-in animation when navigating between pages. Use CSS:

```css
@keyframes page-enter {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-enter {
  animation: page-enter 0.4s ease-out;
}
```

Apply this class to the main content wrapper of each page.

### J.2 — Loading States

Add loading states for all dynamic pages:
- Skeleton cards (gold-dim/10 rectangles) for card grids
- Skeleton lines for lesson content
- Spinning glyph (use the existing `slow-spin` animation on a ✦ character) for full-page loads

### J.3 — Empty States

Every page that can be empty needs a beautiful empty state:
- Journal: "Your reflections begin here."
- Search (no results): "No passages match your query."
- Dictionary (no filter results): "No words match your search."

### J.4 — Favicon and Meta

- Set a favicon (use a simple gold ✦ on dark background, or the Enochian letter for "B" if the font is available)
- Add proper `<title>` and `<meta description>` to each page
- OpenGraph tags for social sharing: title, description, image (use a gold-on-dark placeholder)

### J.5 — Footer

Create a simple site footer (`components/layout/footer.tsx`):
- "The Celestial Archive" in small text
- "An exploration of the Enochian system of John Dee and Edward Kelley"
- "All historical claims are sourced and badged. No claim is endorsed as fact."
- Links: Archive · Glossary · About (link to lesson 1.1)
- Very minimal — `text-gold-dim/50`, `border-t border-gold-dim/10`

### J.6 — Scroll-to-Top

Add a scroll-to-top button that appears when the user scrolls down more than 500px. Small circular button, bottom-right (above the journal FAB), with an up-arrow. Fades in/out.

---

## GLOBAL REQUIREMENTS

### Theme (unchanged from Prompt 7)

All components use: `bg-ink`/`bg-deep`/`bg-parchment`, `text-gold`/`text-gold-pale`/`text-gold-dim`/`text-amber`, `border-gold-dim/20`, `font-display` (Cinzel) for headings, `font-body` (Cormorant) for prose, `font-enochian` for Enochian text, `CandlelightCard` for cards, `shadow-gold` for hover effects, `max-w-reading` for prose.

### No New Dependencies

You may NOT add: charting libraries, animation libraries (Framer Motion), state management (Redux/Zustand), CSS-in-JS, search libraries (Fuse.js/Lunr). Everything must be built with what's already in `package.json` + native browser APIs + CSS.

Exception: You MAY add `@next/font` if it helps with font loading, and you may add `next-themes` ONLY if implementing a light mode toggle (not required).

### File Organization

```
lib/
  journal/
    journal-types.ts         ← NEW
    journal-context.tsx       ← NEW (React Context + localStorage)
  search/
    search-index.ts           ← NEW (build-time index generator)
    search-types.ts           ← NEW
  timeline/
    timeline-types.ts         ← NEW
    timeline-data.ts          ← NEW

components/
  journal/
    journal-entry-editor.tsx  ← NEW
    journal-entry-card.tsx    ← NEW
    journal-index.tsx         ← NEW
    journal-fab.tsx           ← NEW (floating action button)
  search/
    search-overlay.tsx        ← NEW
    search-result-card.tsx    ← NEW
  timeline/
    interactive-timeline.tsx  ← NEW
    timeline-event-card.tsx   ← NEW
    timeline-filter-bar.tsx   ← NEW
  relationship-web/
    web-graph.tsx             ← NEW
    web-node-detail.tsx       ← NEW
  layout/
    app-chrome.tsx            ← UPDATE (search icon, mobile hamburger, journal link)
    footer.tsx                ← NEW
    mobile-drawer.tsx         ← NEW
    scroll-to-top.tsx         ← NEW

app/
  journal/
    page.tsx                  ← NEW
    new/
      page.tsx                ← NEW
    [id]/
      page.tsx                ← NEW
  search/
    page.tsx                  ← NEW (fallback for non-JS)
  relationships/
    page.tsx                  ← NEW
  timeline/
    page.tsx                  ← REBUILD (replace stub)
  archive/
    page.tsx                  ← REBUILD (replace stub)
  layout.tsx                  ← UPDATE (wrap with JournalProvider)

content/
  phase-4-data/
    enochian-dictionary-full.json    ← EXISTS (wire it in)
    timeline-data.json               ← NEW (seed data, Claude will expand)
```

### Navigation Update

Final nav order in `app-chrome.tsx`:
```
Archive · Path · Language · Watchtowers · Aethyrs · Timeline · Glossary · Web · Observatory · Journal · [Search Icon]
```

On mobile (< 768px): Only show "Archive" + hamburger icon. Everything else goes in the drawer.

### Build Verification

After each track:
1. `npm run build` succeeds
2. All new routes in build output
3. No TypeScript errors
4. Responsive at 375px and 1440px

---

## EXECUTION ORDER

**Phase 1 (foundations):** Track A (dictionary), Track H (mobile nav)  
**Phase 2 (new systems):** Track B (search), Track C (journal), Track D (timeline)  
**Phase 3 (parity + polish):** Track G (student parity), Track I (watchtower wiring), Track F (archive landing)  
**Phase 4 (visuals):** Track J (polish), Track E (relationship web)

But tracks are largely independent — parallelize freely.

---

## WHAT CLAUDE PROVIDES NEXT

After this build:
- Full timeline data (80-100 events covering 1527–1904)
- Relationship web expanded seed data (30+ nodes, 50+ edges)
- Stage 3 curriculum content (Practitioner rank)
- Watchtower interpretive content (narrative descriptions for each quadrant)
- Aethyr narrative content (descriptions, Crowley vision summaries, psychological interpretations)
- Documentary mode script content

---

*Prepared by Claude (Content Lead) for Cursor (Build Lead). All architectural decisions follow GPT_ARCHITECT_BRIEF.md. Visual decisions follow EXPERIENCE_PRINCIPLES.md. The ink/gold/parchment palette is non-negotiable. Burn every credit.*
