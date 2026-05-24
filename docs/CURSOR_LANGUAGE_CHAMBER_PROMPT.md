# Cursor Implementation Prompt — The Language Chamber
## Phase 4, Pillar 4

---

## WHAT YOU ARE BUILDING

An immersive language-learning instrument for the Enochian alphabet, pronunciation, vocabulary, and the 19 Angelic Calls. The reader explores 21 letters with glyph renderings and audio, searches a dictionary of ~250 attested words, and reads the Calls line by line with synchronized word-by-word breakdowns and pronunciation guides in three traditions.

This is a philological instrument, not a flashy translator. Build it with the same archival restraint as the Observatory tools — gold on dark, dense where the material is dense, empty where the evidence stops.

---

## GOVERNING DOCUMENTS

Read these before writing any code:

1. `/docs/LANGUAGE_CHAMBER_SPEC.md` — Full product specification
2. `/content/phase-4-data/enochian-alphabet-data.json` — All 21 letters with phonology
3. `/content/phase-4-data/enochian-calls-data.json` — All 19 Calls (structural + vocabulary)
4. `/content/phase-4-data/language-chamber-content.md` — All narrative copy
5. `/docs/LIVING_GRIMOIRE_MOTION_SPEC.md` — Motion system rules
6. `/docs/EXPERIENCE_PRINCIPLES.md` — UX commandments

---

## ROUTES

```
/language                    — Landing page (four instrument panels)
/language/alphabet           — Full alphabet explorer
/language/alphabet/[letter]  — Individual letter detail (slug = lowercase letter name, e.g., "un", "pa")
/language/dictionary         — Searchable dictionary
/language/calls              — Call selector + reader
/language/calls/[number]     — Individual Call detail (1-19)
/language/pronunciation      — Pronunciation guide and comparison chart
```

Also accessible from the main navigation and the `/path` progression system.

---

## IMPLEMENTATION PHASES

### Phase 1: TypeScript Types and Data Loading

**File:** `lib/language/language-types.ts`

```typescript
type PronunciationTradition = "dee" | "goldenDawn" | "modern";

type PronunciationEntry = {
  description: string;
  ipa: string;
  englishApprox?: string;
  badge: "historical" | "consensus" | "later" | "occult";
};

type LetterPhonology = {
  dee: PronunciationEntry;
  goldenDawn: PronunciationEntry;
  modern: PronunciationEntry;
};

type ScholarNote = {
  scholar: string;
  observation: string;
  badge: string;
};

type EnochianLetter = {
  position: number;
  name: string;
  englishEquivalent: string;
  fontCharacter: string;
  phonology: LetterPhonology;
  historicalNote: {
    text: string;
    source: string;
    badge: string;
  };
  exampleWords: string[];
  scholarlyNotes: ScholarNote[];
};

type EnochianAlphabetData = {
  id: string;
  title: string;
  subtitle: string;
  totalLetters: number;
  writingDirection: string;
  receptionDate: string;
  letters: EnochianLetter[];
};

type DictionaryEntry = {
  id: string;
  enochian: string;
  transliteration: string;
  pronunciation: {
    dee?: string;
    goldenDawn?: string;
    modern?: string;
  };
  meanings: {
    english: string;
    source: string;
    badge: string;
  }[];
  partOfSpeech: string | null;
  sourceLocation: string;
  frequency: number;
  relatedWords: string[];
  morphologicalNotes: string | null;
  scholarlyNotes: ScholarNote[];
};

type CallLine = {
  lineNumber: number;
  enochian: string;
  english: string;
  pronunciation: {
    dee: string;
    goldenDawn: string;
    modern: string;
  };
  words: {
    enochian: string;
    dictionaryRef: string | null;
  }[];
};

type AngelicCall = {
  number: number;
  title: string;
  totalLines: number;
  lines: CallLine[];
  association: {
    type: "watchtower" | "aethyr" | "general";
    description: string;
    badge: string;
  };
  historicalNotes: {
    text: string;
    source: string;
    badge: string;
  }[];
  scholarlyNotes: ScholarNote[];
  receptionOrder: number;
  uniqueWords: number;
  totalWords: number;
};

type CallsData = {
  id: string;
  title: string;
  totalCalls: number;
  receptionDate: string;
  receptionLocation: string;
  calls: AngelicCall[];
  aethyrNames: string[];
};
```

**File:** `lib/language/language-data.ts`

Load data from `/content/phase-4-data/`. Export functions:

```typescript
export function getAlphabetData(): EnochianAlphabetData;
export function getLetterByName(name: string): EnochianLetter;
export function getLetterByPosition(pos: number): EnochianLetter;
export function getAllDictionaryEntries(): DictionaryEntry[];
export function searchDictionary(query: string): DictionaryEntry[];
export function getDictionaryEntry(id: string): DictionaryEntry;
export function getCallByNumber(n: number): AngelicCall;
export function getAllCalls(): AngelicCall[];
```

---

### Phase 2: Alphabet Explorer

**File:** `components/language/alphabet-grid.tsx`

A 7×3 grid of letter cards showing all 21 letters.

**Layout:**
- Desktop: 7 columns × 3 rows, each card ~100px wide
- Mobile: 3 columns × 7 rows, or horizontal scroll strip
- Each card shows:
  - The Enochian glyph (rendered via Enochian font family, `font-enochian text-[36px]`)
  - Letter name below (e.g., "Un") in `font-display text-[12px] text-gold-dim`
  - English equivalent (e.g., "A") in `text-gold-pale text-[10px]`

**Card styling:**
- Default: `bg-ink/20 border border-gold-dim/20 rounded-sm`
- Hover: `border-gold/40 bg-ink/30`
- Active: `border-gold bg-gold/5`

**Interaction:**
- Click a card to navigate to `/language/alphabet/[letter-name]`
- Cards enter with staggered `inscribe` animation (left-to-right, top-to-bottom)

**Font loading:**
- Use an Enochian web font (e.g., "Enochian" or "Enochian Writing"). Load via `@font-face` in globals.css or a font module. Map ASCII characters to glyphs — typing the English equivalent character renders the Enochian glyph.
- Fallback: If font not available, show the English equivalent character in `font-mono` with a label "[glyph unavailable]"

---

### Phase 3: Letter Detail View

**File:** `components/language/letter-detail.tsx`

The full view for a single letter.

**Layout (top to bottom):**

1. **Large glyph** — centered, `font-enochian text-[80px] text-gold` on desktop, `text-[60px]` on mobile
2. **Letter name** — `font-display text-2xl text-gold-pale`, e.g., "Un"
3. **Maps to** — `text-gold-dim text-sm`, e.g., "English letter: A"
4. **Writing direction indicator** — small animated arrow showing right-to-left flow
5. **Pronunciation section** — three-column table (desktop) or stacked cards (mobile):
   | Tradition | Sound | IPA | English Approximation |
   Each column/card styled with the tradition's badge color
6. **Historical Reception** — `CandlelightCard` with the historicalNote text and source
7. **What Scholars Have Observed** — `CandlelightCard` per scholarly note (if any), using `EpistemicBadge`
8. **Words Using This Letter** — horizontal scroll of word chips, each linking to dictionary entry. Styled as `px-3 py-1 bg-ink/30 border border-gold-dim/20 rounded-full text-gold-pale text-sm`

**Navigation:**
- Left/right arrows or swipe to move between letters (position order)
- "Back to alphabet" link at top

---

### Phase 4: Dictionary

**File:** `components/language/dictionary-view.tsx`

**Search bar:**
- Positioned at top, full width
- Input: `bg-ink/20 border border-gold-dim/30 text-gold-pale placeholder:text-gold-dim/40`
- Search icon (magnifying glass) in `text-gold-dim`
- Debounced search (300ms) — searches both English meanings and Enochian transliterations
- Results update in real-time below

**Filter bar:**
- Horizontal strip of filter chips below search
- Chips: All | From the Calls | Pronouns | Verbs | Nouns | Numbers | Angel Names
- Active chip: `bg-gold/15 border-gold text-gold`
- Inactive: `bg-ink/20 border-gold-dim/20 text-gold-dim`

**Results list:**
- Each entry renders as a row showing:
  - Enochian word (in Enochian font, `font-enochian text-[20px]`)
  - Transliteration (`font-mono text-gold-pale`)
  - Primary meaning (`text-gold-dim`)
  - Badge icon
  - Frequency indicator (dot count or number)
- Click a row to expand inline or navigate to detail view

**Dictionary entry detail:**
- Full-width card with all fields from the DictionaryEntry type
- Pronunciation displayed for the currently selected tradition (toggle available)
- "Appears in" section lists which Calls use this word (linked)
- Related words rendered as clickable chips
- Scholarly notes in `CandlelightCard` wrappers

**Empty state:**
No words match your search. The Enochian vocabulary is small (~250 attested words).

---

### Phase 5: Call Viewer

**File:** `components/language/call-viewer.tsx`

**Call selector:**
- Horizontal strip showing numbers 1–19 as cells
- Active call has bright border + indicator below
- Cells styled like the Loagaeth leaf navigator:
  - `bg-gold/15 border-gold text-gold` for active
  - `bg-ink/20 border-gold-dim/20 text-gold-dim` for inactive

**Call reading view:**

Layout is a two-column structure on desktop, single column on mobile:

**Left column (Enochian):**
- Each line of Enochian text on its own row
- Line numbers in `text-gold-dim/40 text-[9px]` along the left margin
- Text in `font-display text-[15px] text-gold-pale leading-relaxed`
- Below each line (toggleable): phonetic pronunciation in `text-gold-dim text-[12px] font-mono`

**Right column (English):**
- Dee's English translation, line-aligned with the Enochian
- Text in `text-gold-dim text-[14px] leading-relaxed italic`
- Line numbers matching the left column

**Interactive words:**
- Every Enochian word is wrapped in a `<button>` with hover state `bg-gold/10 rounded-sm`
- On click/tap, a floating card appears showing:
  - Dictionary entry (meaning, pronunciation, frequency)
  - Other Calls containing this word (linked)
  - Morphological notes if available
- Card dismisses on click-outside or Escape
- Only one word card open at a time

**Pronunciation tradition toggle:**
- Three buttons above the Call text: "Dee's Original" | "Golden Dawn" | "Modern"
- Switches which pronunciation appears in the phonetic guide below each line
- Default: Dee's Original

**Enochian script toggle:**
- Button to toggle between Latin transliteration (default) and Enochian font rendering
- When Enochian font is active, the left column renders in `font-enochian` with right-to-left text direction

**Call metadata strip:**
- Below the Call title: reception order, total lines, unique words, total words, Watchtower/Aethyr association
- Styled as a horizontal strip of label:value pairs in `text-gold-dim text-[11px]`

---

### Phase 6: The 19th Call — Aethyr Mode

**File:** `components/language/aethyr-call-selector.tsx`

When Call 19 is selected, an additional UI element appears:

**Aethyr selector:**
- Grid of 30 cells (6×5 on desktop, 5×6 on mobile) showing all Aethyr names
- Each cell: three-letter Aethyr name (e.g., TEX, RII, BAG...) with Aethyr number below
- Ordered 30→1 (TEX first, LIL last)
- Clicking an Aethyr updates the Call 19 text to insert that Aethyr's name in the variable position
- Active Aethyr cell: `bg-gold/20 border-gold`
- Default: TEX (Aethyr 30) selected

**Variable position highlighting:**
- In the Call text, the Aethyr name appears in a distinct color: `text-amber` (warmer than the surrounding gold-pale text)
- A tooltip on hover explains: "This is the variable position. The name of the target Aethyr is substituted here."

---

### Phase 7: Pronunciation Comparison Page

**File:** `components/language/pronunciation-guide.tsx`

**Route:** `/language/pronunciation`

A reference page showing all three pronunciation traditions in a single comparative view.

**Full alphabet comparison table:**
- Columns: Letter Name | English | Dee's Original | Golden Dawn | Modern
- 21 rows (one per letter)
- IPA values in `font-mono text-[13px]`
- English approximations below IPA in `text-gold-dim text-[11px]`
- Tradition column headers colored by badge type

**Digraph section:**
- Table of ch, ph, sh, th with sound values and English examples
- Styled as a `CandlelightCard`

**Tradition descriptions:**
- Three expandable cards, one per tradition
- Each card contains the tradition's history, method, and key characteristics
- Text from `language-chamber-content.md` §III

---

### Phase 8: Page Assembly

**File:** `app/language/page.tsx`

Server component that renders:

1. **Introduction text** (from content doc §I)
2. **Four instrument panels** linking to sub-routes:
   - Alphabet → `/language/alphabet`
   - Dictionary → `/language/dictionary`
   - The Calls → `/language/calls`
   - Pronunciation → `/language/pronunciation`
3. **Source note** at bottom

**Instrument panel design:**
Each panel is a card (~200px tall on desktop) with:
- Icon or glyph at top (use a representative Enochian letter or symbol)
- Title in `font-display text-xl text-gold`
- Subtitle in `text-gold-dim text-sm`
- Click navigates to the sub-route
- Hover: subtle glow effect (`shadow-gold/10`)
- Enter animation: staggered `inscribe`

**Route files to create:**
```
app/language/page.tsx                    — Landing
app/language/alphabet/page.tsx           — Alphabet grid
app/language/alphabet/[letter]/page.tsx  — Letter detail
app/language/dictionary/page.tsx         — Dictionary
app/language/calls/page.tsx              — Call selector + viewer
app/language/calls/[number]/page.tsx     — Individual Call (optional, can be client-side routing)
app/language/pronunciation/page.tsx      — Pronunciation guide
```

---

## COMPONENT TREE

```
app/language/page.tsx (server)
├── Introduction text (static markdown)
├── InstrumentPanel × 4 (client)
│   ├── AlphabetPanel → /language/alphabet
│   ├── DictionaryPanel → /language/dictionary
│   ├── CallsPanel → /language/calls
│   └── PronunciationPanel → /language/pronunciation
└── Source note

app/language/alphabet/page.tsx (server)
├── AlphabetGrid (client)
│   └── LetterCard × 21
└── Source note

app/language/alphabet/[letter]/page.tsx (server)
├── LetterDetail (client)
│   ├── GlyphDisplay
│   ├── PronunciationTable
│   ├── HistoricalNote (CandlelightCard)
│   ├── ScholarlyNotes (CandlelightCard × n)
│   └── ExampleWords (chip list → dictionary links)
└── LetterNavigation (prev/next arrows)

app/language/dictionary/page.tsx (server)
├── DictionarySearch (client)
│   ├── SearchInput
│   ├── FilterChips
│   └── ResultsList
│       └── DictionaryEntryRow × n
│           └── DictionaryEntryDetail (expandable)
└── Source note

app/language/calls/page.tsx (server)
├── CallSelector (client, horizontal strip 1-19)
├── CallViewer (client, shown when call selected)
│   ├── CallMetadataStrip
│   ├── PronunciationToggle
│   ├── ScriptToggle (Latin / Enochian font)
│   ├── TwoColumnReader
│   │   ├── EnochianColumn (interactive words)
│   │   │   ├── PronunciationGuide (toggleable per line)
│   │   │   └── WordPopover (on word click)
│   │   └── EnglishColumn
│   ├── AethyrSelector (only for Call 19)
│   └── ScholarshipPanel
└── Source note

app/language/pronunciation/page.tsx (server)
├── TraditionCards × 3 (expandable)
├── ComparisonTable (21 rows × 5 columns)
├── DigraphTable
└── Source note
```

---

## DATA FILES

All in `/content/phase-4-data/`:

- `enochian-alphabet-data.json` — Complete 21-letter alphabet dataset
- `enochian-calls-data.json` — All 19 Calls with line-by-line structure
- `language-chamber-content.md` — All narrative copy and UI text

---

## ENOCHIAN FONT SETUP

1. Obtain an Enochian web font (recommend "Enochian" from themagickalreview.org archive, or the Schueler font from schuelers.com — both are freely available for non-commercial/educational use)
2. Add font files to `/public/fonts/enochian/`
3. Register via `@font-face` in `globals.css`:

```css
@font-face {
  font-family: 'Enochian';
  src: url('/fonts/enochian/enochian.woff2') format('woff2'),
       url('/fonts/enochian/enochian.woff') format('woff'),
       url('/fonts/enochian/enochian.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

4. Add to Tailwind config:

```typescript
fontFamily: {
  enochian: ['Enochian', 'serif'],
  // ... existing families
}
```

5. Usage: `<span className="font-enochian text-[36px]">A</span>` renders the glyph for Un (letter A).

**Fallback:** If the Enochian font fails to load, show the Latin transliteration character in `font-mono` with a subtle dashed border and label.

---

## MOTION

Follow the Living Grimoire Motion Spec. Specifically:

- Alphabet grid cards enter with staggered `inscribe` animation (7 per row, ~40ms stagger)
- Letter detail view enters with `animate-room-enter`
- Dictionary search results appear with `inscribe` stagger (~20ms per result)
- Call text lines reveal with `inscribe` stagger (~15ms per line)
- Word popover appears with `transition-opacity duration-slow`
- Pronunciation tradition toggle is instant (no transition — the guide swaps)
- Instrument panels on landing page enter with staggered `inscribe` (~80ms per panel)
- Aethyr selector cells enter with grid stagger pattern

---

## PERFORMANCE

- Alphabet grid: 21 cards — trivial DOM count
- Dictionary: ~250 entries. Render all; filter client-side. If the dictionary grows beyond 500 entries, virtualize the list.
- Call viewer: The longest Call has ~30 lines, each with ~10 words = ~300 interactive word elements. Well within budget.
- Enochian font: Load asynchronously with `font-display: swap` to avoid FOIT
- Word popover: Render one at a time; dismiss previous before showing new
- Search: Client-side filtering over ~250 entries is instant; no need for server-side search

---

## ACCESSIBILITY

1. All letter cards have `role="button"` and `aria-label="Letter [name], equivalent to [english]"`
2. Dictionary search input has `role="searchbox"` and `aria-label="Search Enochian dictionary"`
3. Filter chips have `role="radio"` within a `role="radiogroup"`
4. Call selector cells have `role="tab"` within `role="tablist"`
5. Interactive words in Call text have `role="button"` and `aria-label="[word]: tap for definition"`
6. Word popover has `role="dialog"` with `aria-label="Word definition"`
7. Pronunciation toggle uses `role="radiogroup"` with `aria-label="Pronunciation tradition"`
8. Script toggle uses `role="switch"` with `aria-label="Toggle Enochian script"`
9. All animations respect `prefers-reduced-motion`
10. Keyboard navigation: Tab moves between interactive elements; Enter/Space activates; Escape closes popovers

---

## TESTING

1. All 21 letters render with correct names, English equivalents, and phonology
2. Enochian font renders all 21 glyphs correctly (or fallback shows cleanly)
3. Letter detail view shows correct data for each letter, including scholarly notes
4. Dictionary search returns correct results for both English and Enochian queries
5. Dictionary filters narrow results correctly
6. All 19 Calls render with correct Enochian text and English translation
7. Word-click popover shows correct dictionary data
8. Pronunciation toggle switches phonetic guide for all three traditions
9. Call 19 Aethyr selector correctly substitutes Aethyr names into the Call text
10. Enochian script toggle renders text in correct right-to-left direction
11. Mobile layouts render correctly at 375px width
12. Empty/edge states display correctly (no results, unavailable pronunciation)
