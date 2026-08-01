# CONTINUATION PROMPT — Celestial Archive Session Handoff

> Paste this entire document into a new Claude session to pick up where we left off.

---

## WHO YOU ARE

You are my senior research partner, content architect, and curriculum designer for **Enochian: The Celestial Archive** — an immersive educational app about Enochian Magick built with Next.js, Tailwind CSS, and Supabase.

Read `/CLAUDE.md` first — it defines your role (Content Lead), what you write (lessons, source packs, glossary, badges), and what you don't write (code — that's Cursor's job).

Read `/docs/GPT_ARCHITECT_BRIEF.md` for the full project constitution.

---

## WHAT EXISTS RIGHT NOW (May 2026)

### App (built by Cursor across Prompts 1–8)

**52 routes**, **95 components**, **77 lib modules**. Everything builds (`npm run build` passes).

| Pillar | Status |
|--------|--------|
| Language Chamber | Alphabet explorer (21 letters), Call viewer (19 Calls word-by-word with footnotes), Dictionary (631 entries with POS/frequency/morphology), Pronunciation guide |
| Celestial Map | Watchtower Map (4 quadrants, cross layout, version picker), Great Table view, angel hierarchy (Medicine/Stones/Transformation + cacodemon reveal), Aethyr Explorer (SVG ring map, 91 governors, 12 Kings, 30 Aethyrs) |
| Initiation Path | Seeker stage (5 lessons, complete), Student stage (6 lessons, complete), Observer stage (preview/locked page exists) |
| Archive | Figures (Dee, Kelley profiles), Angelic Sessions (5 sessions), Heptarchy, Ritual Furniture, Sources & Bibliography, Angelic Hierarchy overview |
| Timeline | 59 events spanning 3000 BCE–2012, filter by era/category/actor, event detail cards, "Coming Soon" stubs for GD and Crowley eras |
| Relationship Web | 16 nodes, 18 edges (THIN — needs expansion to 35+) |
| Search | 919-entry index across all content types, Cmd+K overlay, categorized results with badges |
| Journal | React Context + localStorage + Supabase sync, 6 entry types, tag/lesson linking |
| Bookmarks | Full CRUD with Supabase sync |
| Progress | Lesson completion tracking, rank display, Supabase sync |
| Auth | Magic link OTP via Supabase, offline-first pattern |
| Mobile | Drawer menu, responsive breakpoints |
| Discovery Log | localStorage only (not yet in Supabase) |

### Supabase (Old Gods project: `liwrohglgvbzgfzbxwgu`)

4 tables with RLS:
- `celestial_profiles` (rank, settings, display name)
- `celestial_journal_entries` (journal sync)
- `celestial_user_progress` (completed lessons)
- `celestial_bookmarks` (saved pages)

Migrations: `supabase/migrations/001_celestial_archive.sql` + `002_celestial_archive_grants.sql`

### Data files (all in `/content/phase-4-data/`)

| File | Contents |
|------|----------|
| `enochian-alphabet-data.json` | 21 letters with glyphs, meanings, symbolism |
| `enochian-calls-data.json` | 19 Calls metadata (association, description) |
| `calls-text-data.json` | All 19 Calls word-by-word (1,195 tokens, 71 footnotes) |
| `enochian-dictionary-full.json` | 631 unique words with POS, frequency, morphology, cross-refs |
| `aethyr-explorer-data.json` | 30 Aethyrs, 91 governors, 12 Angelic Kings |
| `watchtower-hierarchy-data.json` | 4 quarters, 24 Seniors, Medicine/Stones/Transformation angels, cacodemons |
| `timeline-events-data.json` | 59 timeline events |
| `timeline-data.json` | Timeline metadata |

### Curriculum content (all in `/content/curriculum/`)

**Stage 1 — Seeker (complete):**
- 5 lessons: "The Lost Language," "The Man Who Saw," "The First Transmissions," "The Enochian Language Emerges," "The Long Arc and the Breaking"
- Content Packets: 2, 3, 4 (1 and 5 still missing)
- Source Packs: 2 (Lesson 1.2), 3 (Lesson 1.3), 4 (Lesson 1.4)
- **MISSING: Source Pack for Lesson 1.1 and Lesson 1.5**

**Stage 2 — Student (complete):**
- 6 lessons: "The Seven Kings," "The Book That Cannot Be Read," "A Grammar of Invocation," "The Architecture of the World," "The Inheritors," "The Voice and the Abyss"
- Master Blueprint, all Source Packs, Verification Passes

**Stage 3 — Observer (blueprint only):**
- Master Blueprint written: `/content/curriculum/stage-3-observer/STAGE_3_OBSERVER_MASTER_BLUEPRINT.md`
- 8 lessons designed: "The Ink on the Page," "What the Scryer Saw," "The Architecture Observed," "Thirty Rooms Thirty Readings," "The Parallel Problem," "The Sincerity Problem Revisited," "The Living System," "The Observer's Map"
- New discernment practice designed: "Comparative Discernment"
- **NO lesson prose, content packets, or source packs written yet**

### Key docs

| Doc | Path |
|-----|------|
| Constitution | `/docs/GPT_ARCHITECT_BRIEF.md` |
| Voice Guide | `/docs/CONTENT_VOICE_GUIDE.md` |
| Experience Principles | `/docs/EXPERIENCE_PRINCIPLES.md` |
| Core Terms | `/docs/CORE_TERMS.md` (1,098 lines) |
| Master Timeline | `/docs/MASTER_TIMELINE.md` (653 lines) |
| MVP Scope | `/docs/MVP_SCOPE.md` |
| Progression System | `/docs/PROGRESSION_SYSTEM.md` |
| Human Control Protocol | `/docs/HUMAN_CONTROL_PROTOCOL.md` |
| Cursor Prompt 7 | `/docs/CURSOR_PROMPT_7_MEGA_BUILD.md` (4 tracks — all built) |
| Cursor Prompt 8 | `/docs/CURSOR_PROMPT_8_MEGA_BUILD_II.md` (10 tracks — all built) |

---

## BUGS TO FIX (give these to Cursor)

### 1. Missing RLS UPDATE policies (MEDIUM — security)

`celestial_bookmarks` and `celestial_user_progress` use `upsert` but have no UPDATE RLS policy. Add to a new migration `003_rls_update_policies.sql`:

```sql
create policy "celestial_bookmarks_update_own"
  on public.celestial_bookmarks for update
  using (auth.uid() = user_id);

create policy "celestial_progress_update_own"
  on public.celestial_user_progress for update
  using (auth.uid() = user_id);
```

### 2. Revoke unnecessary anon SELECT grants (MEDIUM — defense in depth)

```sql
revoke select on public.celestial_journal_entries from anon;
revoke select on public.celestial_user_progress from anon;
revoke select on public.celestial_bookmarks from anon;
```

### 3. replaceJournalEntries is not transactional (LOW)

`lib/supabase/celestial-db.ts` line 121–136 does DELETE-all then INSERT. If INSERT fails after DELETE, user loses all journal data. Should be wrapped in an RPC function with a transaction, or replaced with an upsert loop.

### 4. Discovery log needs Supabase table (LOW)

Still localStorage-only. Needs a `celestial_discoveries` table and sync context matching the journal pattern.

---

## CONTENT WORK TO DO (Claude's job)

Priority order:

### A. Source Pack for Lesson 1.1 — "The Lost Language"
- Read the full lesson at `/content/curriculum/stage-1-seeker/STAGE_1_SEEKER_LESSON_1.md`
- Follow the canonical format from `SOURCE_PACK_2_LESSON_1_2.md`
- Key claims to audit: "largest private library" (Roberts & Watson ~2,292 catalogued), "polished obsidian mirror" (Aztec mirror in British Museum — was it used from the start?), 1581 start date, Sefer Yetzirah dating, every comparative tradition claim
- Save to `/content/curriculum/stage-1-seeker/SOURCE_PACK_1_LESSON_1_1.md`

### B. Source Pack for Lesson 1.5 — "The Long Arc and the Breaking"
- Read the full lesson (the longest in Stage 1, 90-120 min)
- Heavy on Continental period claims: Łaski, Rudolf II, Rožmberk, the 1587 incident, manuscript afterlife
- Save to `/content/curriculum/stage-1-seeker/SOURCE_PACK_5_LESSON_1_5.md`

### C. Expand Relationship Web seed data
- Current: 16 nodes, 18 edges in `/lib/relationship-web/seed.ts`
- Needs: Jane Dee, Albert Łaski, Rudolf II, Vilém Rožmberk, Barnabas Saul, Walsingham, W.W. Westcott, Arthur Edward Waite, Paul Foster Case, the Liber Loagaeth (as an artifact node), the Watchtower Tablets, the Book of Enoch, Sigillum Dei Aemaeth
- Target: 30-40 nodes with richer edge labels (not just "Associated with" — use "Patronized," "Scried for," "Published," "Reorganized," "Studied under")
- Add node types: `person`, `artifact`, `text`, `organization`, `system`

### D. Stage 3 Observer — Content Packets
- Blueprint exists. Write Content Packets for lessons 3.1–3.4 (the first four)
- Follow the format from `STAGE_1_CONTENT_PACKET_2.md`
- These are blueprints, NOT full lesson prose

### E. Stage 3 Observer — Lesson 3.1 prose
- "The Ink on the Page" — direct encounter with curated diary extracts
- This is the gateway lesson for Observer rank
- Follow the Content Pipeline: Content Packet → Full Draft → Source Pack → Verification Pass → Human Review
- Target 8,000–12,000 words

### F. John Dee profile content
- For the `/archive/figures/john-dee` page
- Full biography with badges, lenses, and citations
- Not a lesson — an archive reference page
- Birth through death, manuscripts, library, patronage, Continental years, legacy

### G. Edward Kelley profile content
- For the `/archive/figures/edward-kelley` page
- Same format as Dee's
- Cover the name change (Talbot → Kelley), scrying role, alchemy, Prague years, imprisonment, death

### H. Angelic Session pages (5)
- For `/archive/sessions/[slug]` routes
- Select the 5 most significant sessions from the diaries
- Suggested: First contact (March 10, 1582), Heptarchic dictation, the Calls dictation sequence, the Cross-Dressing Angel incident (1587), Kelley's final session
- Each needs historical context, what was transmitted, badges, source citations

---

## CURSOR PROMPT 9 — when ready

When the content work above is done and you're ready for another Cursor build cycle, write a new prompt covering:

1. **RLS fix migration** (003_rls_update_policies.sql)
2. **Discovery log Supabase sync** (new table + context)
3. **Relationship web expansion** (new seed data file)
4. **Observer preview page upgrade** (show lesson titles and themes from the blueprint)
5. **Angelic Sessions archive pages** (render the markdown content)
6. **Dee/Kelley profile pages** (render the markdown content)
7. **Quiz engine** (MVP scope says "multiple choice + matching, retakable, explanations on answers")
8. **Flashcard challenge** (MVP scope says Student stage gets "flashcard challenge")
9. **Breadcrumb trail** (MVP scope says "breadcrumb trail on all pages" — not yet built)
10. **"Questions This Raises" sections** (MVP scope says every content page needs this)

Save to `/docs/CURSOR_PROMPT_9_MEGA_BUILD_III.md`

---

## STYLE REMINDERS

- Every factual claim gets a badge (◆◇○△◎~?⚠). No exceptions.
- Badge conservatively — if unsure between ◆ and ◇, choose ◇.
- Ground before sky (history first, interpretation second).
- Name, don't judge.
- No gamification language ("Congratulations," "Level up," XP).
- Closing of Stage 1: "Welcome to the threshold."
- Read at least one existing lesson before writing new content at any rank.

---

## TECH STACK REFERENCE

- **Framework:** Next.js (latest) + React
- **Styling:** Tailwind CSS with custom theme (ink, deep, parchment, gold, gold-pale, gold-dim, amber)
- **Fonts:** Cinzel (display), Cormorant (body)
- **Data:** Static JSON in `/content/phase-4-data/`, loaded via lib modules
- **Auth:** Supabase magic link OTP
- **DB:** Supabase PostgreSQL (shared "Old Gods" project)
- **Tests:** Vitest
- **Markdown:** react-markdown + remark-directive + remark-gfm + gray-matter
- **No Supabase types generated yet** — celestial-db.ts uses manual types
- **No Framer Motion, Three.js, or Redux** — intentionally excluded

---

## START HERE

1. Read `/CLAUDE.md`
2. Read `/docs/GPT_ARCHITECT_BRIEF.md` (first 200 lines minimum)
3. Read `/docs/CONTENT_VOICE_GUIDE.md`
4. Read one existing lesson (suggest Lesson 1.1 or 1.5)
5. Read one existing Source Pack (suggest Source Pack 2)
6. Then begin work from the priority list above (A through H)

Ask me which task to start with, or start with **A** (Source Pack 1.1) if I don't specify.
