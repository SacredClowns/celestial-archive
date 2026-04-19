# ENOCHIAN: THE CELESTIAL ARCHIVE
## Folder Structure, Data Model & Technical Architecture
### v1.0 — April 2026

---

## I. REPOSITORY FOLDER STRUCTURE

```
/enochian-celestial-archive
│
├── /docs                          # Project documentation (you are here)
│   ├── PRODUCT_VISION.md
│   ├── SITE_MAP.md
│   ├── PROGRESSION_SYSTEM.md
│   ├── FEATURE_LIST.md
│   ├── VISUAL_DIRECTION.md
│   ├── DATA_MODEL.md
│   ├── MASTER_TIMELINE.md
│   ├── CORE_TERMS.md
│   ├── RESEARCH_QUESTIONS.md
│   ├── OPEN_MYSTERIES.md
│   └── APP_ROADMAP.md
│
├── /research                      # Raw research organized by topic
│   ├── /history
│   │   ├── /john-dee
│   │   ├── /edward-kelley
│   │   └── /angelic-sessions
│   ├── /enochian-language
│   │   ├── /alphabet
│   │   ├── /grammar
│   │   ├── /vocabulary
│   │   └── /linguistic-analysis
│   ├── /watchtowers
│   │   ├── /east-air
│   │   ├── /south-fire
│   │   ├── /west-water
│   │   ├── /north-earth
│   │   ├── /great-table
│   │   └── /tablet-of-union
│   ├── /aethyrs
│   │   ├── /individual (30 files, one per Aethyr)
│   │   ├── /governors
│   │   └── /analysis
│   ├── /calls-and-keys
│   │   ├── /individual (19 files, one per Call)
│   │   └── /analysis
│   ├── /angelic-hierarchy
│   ├── /ritual-furniture
│   ├── /comparative-systems
│   │   ├── /book-of-enoch
│   │   ├── /kabbalah
│   │   ├── /gnosticism
│   │   ├── /hermeticism
│   │   ├── /christian-mysticism
│   │   ├── /sacred-geometry
│   │   └── /psychology
│   ├── /traditions
│   │   ├── /golden-dawn
│   │   └── /crowley
│   └── /sources
│       ├── primary-manuscripts.md
│       ├── key-books.md
│       ├── academic-papers.md
│       └── websites.md
│
├── /content                       # Authored content ready for the app
│   ├── /archive                   # Archive pillar content
│   │   ├── /figures
│   │   ├── /sessions
│   │   ├── /system
│   │   ├── /comparative
│   │   └── /sources
│   ├── /timeline                  # Timeline events and era descriptions
│   │   └── /events
│   ├── /curriculum                # Initiation Path content
│   │   ├── /stage-1-seeker
│   │   ├── /stage-2-student
│   │   ├── /stage-3-explorer
│   │   ├── /stage-4-adept
│   │   ├── /stage-5-archivist
│   │   ├── /stage-6-cartographer
│   │   └── /stage-7-magus
│   ├── /aethyr-journey            # Aethyr content modules
│   │   └── /aethyrs (30 files)
│   ├── /documentary               # Documentary episode scripts
│   │   └── /episodes
│   ├── /language                  # Language Chamber content
│   │   ├── /letters
│   │   ├── /calls
│   │   └── /grammar
│   ├── /labyrinth                 # Hidden content
│   │   ├── /puzzles
│   │   ├── /manuscripts
│   │   └── /secrets
│   ├── /glossary                  # Glossary entries
│   ├── /quizzes                   # Quiz question banks
│   └── /reflections               # Journal prompts and reflection questions
│
├── /app                           # Application code
│   ├── /src
│   │   ├── /components
│   │   ├── /pages
│   │   ├── /layouts
│   │   ├── /hooks
│   │   ├── /stores
│   │   ├── /utils
│   │   ├── /styles
│   │   └── /types
│   ├── /public
│   │   ├── /assets
│   │   │   ├── /images
│   │   │   ├── /icons
│   │   │   ├── /fonts
│   │   │   ├── /audio
│   │   │   └── /diagrams
│   │   └── /data                  # Static JSON data files
│   └── package.json
│
├── /design                        # Design assets and references
│   ├── /moodboards
│   ├── /wireframes
│   ├── /symbols
│   ├── /maps
│   │   ├── /watchtower-diagrams
│   │   ├── /aethyr-maps
│   │   └── /celestial-charts
│   ├── /fonts
│   └── /visual-references
│
└── README.md
```

---

## II. CONTENT DATA MODEL

All content is stored as structured JSON with markdown body fields. This enables both file-based and database-backed storage.

---

### Entity: Figure

```json
{
  "id": "john-dee",
  "type": "figure",
  "name": "John Dee",
  "born": "1527-07-13",
  "died": "1608-12",
  "title": "Mathematician, Astronomer, Advisor to Queen Elizabeth I",
  "summary": "The Elizabethan polymath who sought to commune with angels...",
  "body_md": "## Early Life\n\nJohn Dee was born in Tower Ward, London...",
  "source_tradition": "primary",
  "tags": ["history", "figures", "dee", "elizabethan"],
  "related_entities": ["edward-kelley", "elizabeth-i", "rudolf-ii"],
  "timeline_events": ["dee-birth", "dee-meets-kelley", "first-session"],
  "media": {
    "portrait": "figures/dee-portrait.jpg",
    "gallery": ["dee-study.jpg", "mortlake.jpg"]
  },
  "sources": [
    { "type": "book", "title": "John Dee's Conversations with Angels", "author": "Deborah Harkness", "year": 1999 },
    { "type": "manuscript", "title": "Sloane MS 3188", "location": "British Library" }
  ],
  "metadata": {
    "created": "2026-04-15",
    "updated": "2026-04-15",
    "status": "published",
    "initiation_rank_required": "seeker"
  }
}
```

---

### Entity: Enochian Letter

```json
{
  "id": "letter-un",
  "type": "enochian_letter",
  "name": "Un",
  "order": 1,
  "glyph_svg": "letters/un.svg",
  "transliteration": "A",
  "pronunciation_ipa": "/ʌn/",
  "pronunciation_audio": "audio/letters/un.mp3",
  "numerical_value": 6,
  "meaning": "The beginning. The first breath.",
  "symbolism_md": "Un represents the primal creative force...",
  "related_hebrew": "Aleph",
  "related_greek": "Alpha",
  "source_notes": "Received during the sessions of 1583...",
  "source_tradition": "primary",
  "tags": ["alphabet", "language", "symbolism"],
  "hidden_sigil_location": null,
  "metadata": {
    "initiation_rank_required": "student"
  }
}
```

---

### Entity: Angelic Call

```json
{
  "id": "call-01",
  "type": "angelic_call",
  "number": 1,
  "title": "The First Call",
  "enochian_text": "Ol sonf vorsg goho Iad balt...",
  "translation_dee": "I reign over you, saith the God of Justice...",
  "translation_golden_dawn": "I reign over ye, saith the God of Justice...",
  "translation_crowley": "I reign over you, saith the God of Justice...",
  "pronunciation_audio": "audio/calls/call-01.mp3",
  "purpose": "General invocation — establishing divine authority",
  "symbolism_md": "The First Call is the master key...",
  "associated_watchtower": null,
  "associated_aethyr": null,
  "source_tradition": "primary",
  "golden_dawn_notes_md": "The Golden Dawn attributed...",
  "crowley_notes_md": "Crowley employed the First Call as...",
  "tags": ["calls", "invocation", "language"],
  "metadata": {
    "initiation_rank_required": "explorer"
  }
}
```

---

### Entity: Watchtower Tablet

```json
{
  "id": "watchtower-east",
  "type": "watchtower",
  "name": "Watchtower of the East",
  "element": "air",
  "direction": "east",
  "color_scale_gd": {
    "king": "#ffff00",
    "queen": "#8b00ff"
  },
  "grid": [
    ["r", "Z", "i", "l", "a", "f", "A", "Y", "t", "l", "p", "a"],
    ["a", "r", "d", "Z", "a", "i", "d", "p", "a", "L", "a", "m"]
  ],
  "great_name": "ORO IBAH AOZPI",
  "king": "BATAIVAH",
  "seniors": ["HABIORO", "AAOZAIF", "HTMORDA", "AHAOZPI", "AVTOTAR", "HIPOTGA"],
  "subquadrants": {
    "air_of_air": { "calvary_cross": "IDOIGO", "kerubic": ["rZla", "..."], "servient": ["..."] },
    "water_of_air": {},
    "earth_of_air": {},
    "fire_of_air": {}
  },
  "body_md": "The Watchtower of the East governs the element of Air...",
  "original_vs_reformed_md": "Dee's original arrangement differs from...",
  "source_tradition": "primary",
  "tags": ["watchtowers", "air", "east", "elements", "great-table"],
  "metadata": {
    "initiation_rank_required": "adept"
  }
}
```

---

### Entity: Aethyr

```json
{
  "id": "aethyr-30-tex",
  "type": "aethyr",
  "number": 30,
  "name": "TEX",
  "full_name": "The 30th Aethyr — TEX",
  "position": "outermost",
  "governors": [
    { "name": "TAOAGLA", "region": "...", "tribe": "..." },
    { "name": "GEMNIMB", "region": "...", "tribe": "..." },
    { "name": "ADVORPT", "region": "...", "tribe": "..." }
  ],
  "dee_kelley_material_md": "The 30th Aethyr as described in the original sessions...",
  "crowley_vision_md": "Crowley scried the 30th Aethyr in the Algerian desert...",
  "symbolism_md": "TEX represents the threshold — the outermost boundary...",
  "psychological_interpretation_md": "Psychologically, TEX can be understood as...",
  "themes": ["threshold", "beginning", "outer-boundary", "testing"],
  "reflection_prompts": [
    "What does it mean to stand at the outermost boundary?",
    "What are you leaving behind as you begin this journey?"
  ],
  "journal_prompt": "Write about a time you stood at a threshold...",
  "associated_calls": ["call-19"],
  "celestial_map_position": { "ring": 30, "angle": 0 },
  "source_tradition": "primary",
  "tags": ["aethyrs", "journey", "crowley", "vision-and-voice"],
  "unlock_condition": "archivist_rank",
  "metadata": {
    "initiation_rank_required": "archivist"
  }
}
```

---

### Entity: Timeline Event

```json
{
  "id": "dee-meets-kelley",
  "type": "timeline_event",
  "date": "1582-03-08",
  "date_precision": "day",
  "era": "dee-and-kelley",
  "title": "Dee Meets Kelley",
  "summary": "Edward Kelley arrives at Mortlake and demonstrates scrying ability",
  "body_md": "On March 8, 1582, a man calling himself Edward Talbot...",
  "figures": ["john-dee", "edward-kelley"],
  "location": "Mortlake, England",
  "significance": "critical",
  "source_tradition": "primary",
  "sources": [
    { "type": "diary", "title": "Dee's Spiritual Diaries", "date": "1582-03-08" }
  ],
  "tags": ["history", "dee", "kelley", "meetings"],
  "metadata": {
    "initiation_rank_required": "seeker"
  }
}
```

---

### Entity: Glossary Term

```json
{
  "id": "sigillum-dei-aemeth",
  "type": "glossary_term",
  "term": "Sigillum Dei Aemeth",
  "pronunciation": "/sɪˈdʒɪləm deɪ ˈeɪmɛθ/",
  "short_definition": "The 'Seal of God's Truth' — a complex geometric figure central to Dee's Enochian practice",
  "full_definition_md": "The Sigillum Dei Aemeth is a large wax seal...",
  "category": "ritual-furniture",
  "related_terms": ["holy-table", "scrying", "heptarchy"],
  "related_entities": ["john-dee"],
  "source_tradition": "primary",
  "tags": ["ritual", "geometry", "seal", "furniture"],
  "metadata": {
    "initiation_rank_required": "seeker"
  }
}
```

---

### Entity: Lesson

```json
{
  "id": "lesson-1-1",
  "type": "lesson",
  "stage": 1,
  "stage_name": "seeker",
  "order": 1,
  "title": "The Magician and the Queen",
  "subtitle": "Who was John Dee?",
  "estimated_minutes": 12,
  "body_md": "# The Magician and the Queen\n\nIn the year 1527...",
  "learning_objectives": [
    "Understand Dee's historical context",
    "Recognize his dual identity as scientist and mystic",
    "Identify his relationship with Queen Elizabeth I"
  ],
  "key_terms": ["john-dee", "elizabeth-i", "mortlake", "scrying"],
  "did_you_know": [
    "Dee owned the largest private library in England — over 4,000 volumes",
    "Dee coined the term 'British Empire'"
  ],
  "sources": [
    { "type": "book", "title": "The Queen's Conjurer", "author": "Benjamin Woolley" }
  ],
  "next_lesson": "lesson-1-2",
  "prev_lesson": null,
  "xp_reward": 50,
  "tags": ["curriculum", "beginner", "history", "dee"],
  "metadata": {
    "initiation_rank_required": "seeker"
  }
}
```

---

### Entity: Quiz

```json
{
  "id": "quiz-1",
  "type": "quiz",
  "stage": 1,
  "title": "Seeker Assessment",
  "description": "Test your understanding of Dee, Kelley, and the foundations",
  "passing_score": 70,
  "xp_reward_pass": 100,
  "xp_reward_excellent": 150,
  "questions": [
    {
      "id": "q1-1",
      "type": "multiple_choice",
      "question": "In what year did John Dee first meet Edward Kelley?",
      "options": ["1577", "1580", "1582", "1585"],
      "correct": 2,
      "explanation": "Kelley arrived at Dee's home in Mortlake on March 8, 1582."
    },
    {
      "id": "q1-2",
      "type": "matching",
      "question": "Match each figure to their primary role:",
      "pairs": [
        { "left": "John Dee", "right": "Questioner and recorder" },
        { "left": "Edward Kelley", "right": "Scryer and medium" }
      ]
    }
  ],
  "tags": ["assessment", "stage-1"],
  "metadata": {
    "initiation_rank_required": "seeker"
  }
}
```

---

### Entity: User Profile

```json
{
  "id": "user-uuid",
  "type": "user_profile",
  "display_name": "Seeker of Stars",
  "rank": "student",
  "rank_level": 2,
  "xp_total": 450,
  "xp_to_next_rank": 350,
  "streak_current": 5,
  "streak_longest": 12,
  "lessons_completed": ["lesson-1-1", "lesson-1-2", "lesson-1-3", "lesson-1-4", "lesson-1-5", "lesson-2-1"],
  "quizzes_passed": ["quiz-1"],
  "reflections_written": ["reflection-1"],
  "sigils_earned": ["sigil-seeker"],
  "hidden_sigils_found": ["sigil-un", "sigil-graph"],
  "manuscript_fragments": [1],
  "labyrinth_puzzles_solved": [],
  "bookmarks": ["john-dee", "call-01"],
  "journal_entries": ["entry-uuid-1", "entry-uuid-2"],
  "last_active": "2026-04-15T14:30:00Z",
  "last_page": "/initiation/stage-2/lesson-2-1",
  "settings": {
    "source_traditions_visible": ["primary", "golden_dawn", "crowley", "modern", "comparative"],
    "audio_enabled": true,
    "ambient_sound": true,
    "animations_enabled": true
  }
}
```

---

## III. TAG TAXONOMY

### Content Type Tags

| Tag | Description |
|-----|-------------|
| `history` | Historical events and context |
| `biography` | Person's life story |
| `language` | Enochian language content |
| `alphabet` | Letter-specific content |
| `calls` | The 19 Angelic Calls |
| `watchtowers` | Watchtower Tablet content |
| `aethyrs` | Aethyr-related content |
| `hierarchy` | Angelic hierarchy content |
| `ritual` | Ritual furniture and practice |
| `comparative` | Cross-tradition analysis |
| `psychology` | Psychological interpretation |
| `geometry` | Sacred geometry content |
| `curriculum` | Part of the Initiation Path |
| `assessment` | Quizzes and challenges |
| `hidden` | Labyrinth content |

### Era Tags

| Tag | Period |
|-----|--------|
| `ancient` | Pre-Christian Enochian traditions |
| `biblical` | Biblical and apocryphal period |
| `medieval` | Medieval angel magic |
| `elizabethan` | Dee and Kelley era |
| `dormant` | 1600s–1800s |
| `golden-dawn` | 1888–1903 |
| `crowley` | 1909–1947 |
| `modern` | 1960s–present |

### Source Tradition Tags

| Tag | Meaning |
|-----|---------|
| `primary` | Dee/Kelley original material |
| `golden_dawn` | Golden Dawn interpretation |
| `crowley` | Crowley/Thelema interpretation |
| `modern` | Contemporary academic/practitioner |
| `comparative` | Cross-tradition analysis |
| `speculative` | Unverified theories |

### Difficulty Tags

| Tag | Initiation Rank |
|-----|-----------------|
| `beginner` | Seeker, Student |
| `intermediate` | Explorer, Adept |
| `advanced` | Archivist, Cartographer |
| `expert` | Magus |

---

## IV. DATABASE SCHEMA (Supabase / PostgreSQL)

### Core Tables

```sql
-- Content entities (polymorphic)
CREATE TABLE entities (
  id          TEXT PRIMARY KEY,
  type        TEXT NOT NULL,  -- figure, letter, call, watchtower, aethyr, etc.
  title       TEXT NOT NULL,
  summary     TEXT,
  body_md     TEXT,
  source_tradition TEXT NOT NULL DEFAULT 'primary',
  rank_required TEXT NOT NULL DEFAULT 'seeker',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  status      TEXT DEFAULT 'draft',  -- draft, review, published
  sort_order  INTEGER DEFAULT 0,
  data        JSONB  -- type-specific structured data
);

-- Tags
CREATE TABLE tags (
  id    SERIAL PRIMARY KEY,
  name  TEXT UNIQUE NOT NULL,
  category TEXT  -- content_type, era, tradition, difficulty
);

-- Entity-Tag junction
CREATE TABLE entity_tags (
  entity_id TEXT REFERENCES entities(id),
  tag_id    INTEGER REFERENCES tags(id),
  PRIMARY KEY (entity_id, tag_id)
);

-- Entity relationships (cross-linking)
CREATE TABLE entity_relations (
  source_id     TEXT REFERENCES entities(id),
  target_id     TEXT REFERENCES entities(id),
  relation_type TEXT NOT NULL,  -- related_to, part_of, preceded_by, etc.
  PRIMARY KEY (source_id, target_id, relation_type)
);

-- Timeline events
CREATE TABLE timeline_events (
  id             TEXT PRIMARY KEY,
  date_start     DATE,
  date_end       DATE,
  date_precision TEXT DEFAULT 'day',  -- day, month, year, decade, century
  era            TEXT NOT NULL,
  title          TEXT NOT NULL,
  summary        TEXT,
  body_md        TEXT,
  location       TEXT,
  significance   TEXT DEFAULT 'normal',  -- minor, normal, major, critical
  source_tradition TEXT DEFAULT 'primary',
  data           JSONB
);

-- Timeline event figures
CREATE TABLE event_figures (
  event_id  TEXT REFERENCES timeline_events(id),
  figure_id TEXT REFERENCES entities(id),
  role      TEXT,
  PRIMARY KEY (event_id, figure_id)
);

-- Sources/citations
CREATE TABLE sources (
  id        SERIAL PRIMARY KEY,
  type      TEXT NOT NULL,  -- book, manuscript, paper, website
  title     TEXT NOT NULL,
  author    TEXT,
  year      INTEGER,
  publisher TEXT,
  url       TEXT,
  location  TEXT,
  notes     TEXT
);

-- Entity-source citations
CREATE TABLE citations (
  entity_id TEXT REFERENCES entities(id),
  source_id INTEGER REFERENCES sources(id),
  page      TEXT,
  note      TEXT,
  PRIMARY KEY (entity_id, source_id)
);

-- Curriculum lessons
CREATE TABLE lessons (
  id                TEXT PRIMARY KEY,
  stage             INTEGER NOT NULL,
  stage_name        TEXT NOT NULL,
  lesson_order      INTEGER NOT NULL,
  title             TEXT NOT NULL,
  subtitle          TEXT,
  estimated_minutes INTEGER,
  body_md           TEXT,
  objectives        JSONB,  -- array of strings
  did_you_know      JSONB,  -- array of strings
  xp_reward         INTEGER DEFAULT 50,
  prev_lesson       TEXT,
  next_lesson       TEXT
);

-- Quizzes
CREATE TABLE quizzes (
  id              TEXT PRIMARY KEY,
  stage           INTEGER NOT NULL,
  title           TEXT NOT NULL,
  passing_score   INTEGER DEFAULT 70,
  xp_reward_pass  INTEGER DEFAULT 100,
  xp_reward_high  INTEGER DEFAULT 150,
  questions       JSONB NOT NULL  -- array of question objects
);

-- User profiles
CREATE TABLE user_profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id         UUID UNIQUE NOT NULL,  -- Supabase auth reference
  display_name    TEXT,
  rank            TEXT DEFAULT 'seeker',
  rank_level      INTEGER DEFAULT 1,
  xp_total        INTEGER DEFAULT 0,
  streak_current  INTEGER DEFAULT 0,
  streak_longest  INTEGER DEFAULT 0,
  last_active     TIMESTAMPTZ,
  last_page       TEXT,
  settings        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- User progress tracking
CREATE TABLE user_progress (
  user_id         UUID REFERENCES user_profiles(id),
  entity_id       TEXT NOT NULL,  -- lesson, quiz, reflection, sigil, etc.
  entity_type     TEXT NOT NULL,
  status          TEXT NOT NULL,  -- started, completed, passed, failed
  score           INTEGER,
  completed_at    TIMESTAMPTZ,
  data            JSONB,
  PRIMARY KEY (user_id, entity_id)
);

-- User journal
CREATE TABLE journal_entries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES user_profiles(id),
  title       TEXT,
  body_md     TEXT,
  entry_type  TEXT DEFAULT 'free',  -- free, reflection, aethyr, discovery
  related_entity TEXT,
  tags        JSONB DEFAULT '[]',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- User bookmarks
CREATE TABLE bookmarks (
  user_id     UUID REFERENCES user_profiles(id),
  entity_id   TEXT NOT NULL,
  note        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, entity_id)
);

-- Discovery tracking (Labyrinth)
CREATE TABLE discoveries (
  user_id         UUID REFERENCES user_profiles(id),
  discovery_type  TEXT NOT NULL,  -- hidden_sigil, manuscript, puzzle, secret_page
  discovery_id    TEXT NOT NULL,
  discovered_at   TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, discovery_id)
);
```

---

## V. TECHNICAL ARCHITECTURE RECOMMENDATIONS

### Frontend

| Layer | Recommendation | Rationale |
|-------|---------------|-----------|
| **Framework** | Next.js 14+ (App Router) | SSR for SEO, RSC for performance, file-based routing matches our IA |
| **Styling** | Tailwind CSS + CSS custom properties | Utility-first + our design tokens via CSS variables |
| **Animation** | Framer Motion | Declarative, performant, supports layout animations |
| **Maps/Visualization** | D3.js + Canvas/SVG hybrid | Maximum control for custom celestial visualizations |
| **State Management** | Zustand | Lightweight, perfect for user progress state |
| **Content Rendering** | MDX or next-mdx-remote | Markdown with embedded interactive components |
| **Search** | Algolia or Meilisearch | Instant, typo-tolerant full-text search |
| **Audio** | Howler.js or Tone.js | Web Audio API wrapper for ambient and pronunciation audio |
| **Icons** | Custom SVG icon system | Hand-drawn style requires custom, not a library |

### Backend

| Layer | Recommendation | Rationale |
|-------|---------------|-----------|
| **Database** | Supabase (PostgreSQL) | Auth + DB + storage + realtime in one platform |
| **Auth** | Supabase Auth | Email/password + OAuth, integrates with RLS |
| **Storage** | Supabase Storage | Media files (images, audio, SVGs) |
| **API** | Next.js API Routes + Supabase client | Server-side data fetching, RLS for security |
| **CMS** | Content JSON files in repo + admin panel | Start file-based, migrate to CMS when needed |
| **Search Index** | Meilisearch (self-hosted) or Algolia | Faceted search across all entity types |

### Infrastructure

| Layer | Recommendation | Rationale |
|-------|---------------|-----------|
| **Hosting** | Vercel | Native Next.js support, edge functions, CDN |
| **CDN** | Vercel Edge + Cloudflare (assets) | Global performance for media-heavy content |
| **Monitoring** | Vercel Analytics + Sentry | Performance and error tracking |
| **CI/CD** | GitHub Actions | Automated testing, linting, deployment |

---

## VI. NAMING CONVENTIONS

### File Naming
- All lowercase, hyphen-separated: `john-dee.json`, `call-01.md`
- Aethyrs: `aethyr-30-tex.json` (number-name format)
- Lessons: `lesson-1-1.md` (stage-order)
- Images: `dee-portrait-1.jpg` (entity-description-variant)

### Entity IDs
- Globally unique, human-readable: `john-dee`, `call-01`, `aethyr-30-tex`, `watchtower-east`
- Prefixed by type when ambiguous: `lesson-1-1`, `quiz-1`, `sigil-seeker`

### CSS Variables
- Prefixed by category: `--color-gold`, `--font-display`, `--space-lg`, `--anim-page-enter`

### Component Names
- PascalCase: `WatchtowerGrid`, `AethyrSphere`, `ProgressSigil`, `CallReader`

---

## VII. SEARCH ARCHITECTURE

### Search Index Fields

| Field | Weight | Searchable | Filterable |
|-------|--------|-----------|------------|
| `title` | 10 | Yes | No |
| `summary` | 5 | Yes | No |
| `body_md` | 1 | Yes | No |
| `type` | - | No | Yes |
| `source_tradition` | - | No | Yes |
| `tags` | 3 | Yes | Yes |
| `era` | - | No | Yes |
| `rank_required` | - | No | Yes |

### Search Features
- Instant results as you type
- Faceted filtering by entity type, era, tradition
- Highlighted matches in results
- "Related" suggestions below results
- Recent searches saved per user
- Search analytics to improve content

---

*This data model is designed to be both human-readable (JSON files in the repo for authoring) and machine-optimized (PostgreSQL for the live app). Content flows from research → authored JSON → database → user's screen.*
