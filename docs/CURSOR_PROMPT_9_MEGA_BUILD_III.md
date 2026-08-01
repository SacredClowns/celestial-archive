# CURSOR PROMPT 9 — MEGA BUILD III: Sync, Polish, Curriculum Wire
## Supabase hardening + Discovery sync + Relationship Web + Observer UI + Archive render

**Priority:** HIGH  
**Date:** May 2026  
**Prerequisite:** Prompt 8 complete; Supabase migrations 001–003 applied on `liwrohglgvbzgfzbxwgu`

---

## CONTEXT

Content pipeline (Observer packets, Lesson 3.1 draft, Source Packs 1 & 1.5) runs in parallel. This prompt is **implementation only** — no new lesson prose unless wiring existing markdown.

---

## TRACK A — Supabase (verify + harden)

### A.1 — Confirm migrations

Repo files:

- `supabase/migrations/001_celestial_archive.sql`
- `supabase/migrations/002_celestial_archive_grants.sql`
- `supabase/migrations/003_celestial_rls_discoveries.sql`

Run `npm run verify:supabase` — must list all five tables including `celestial_discoveries`.

### A.2 — Journal sync safety

`replaceJournalEntries` in `lib/supabase/celestial-db.ts` now upserts then deletes orphans — add unit test or integration note; do not revert to delete-all-first.

### A.3 — Discovery sync (DONE in repo — verify)

- `celestial_discoveries` table
- `fetchDiscoveries`, `upsertDiscovery`, `deleteDiscovery`, `replaceDiscoveries` in `celestial-db.ts`
- `lib/discovery/discovery-context.tsx` mirrors journal/bookmark pattern

Test: sign in → add discovery → reload → persists.

---

## TRACK B — Relationship Web expansion

**File:** `lib/relationship-web/seed.ts`

- 37 nodes, 45 edges (expanded)
- Node `kind`: person | artifact | text | organization | system
- Edge labels extended in `lib/relationship-web/types.ts`

**UI:** `components/relationship-web/web-graph.tsx` — optional: show `kind` in node list panel; improve layout for 35+ nodes (scroll, filter by kind).

---

## TRACK C — Observer path UI

**File:** `app/path/observer/page.tsx` — lesson list from blueprint (done); wire links when lesson routes exist.

Register Observer lessons in `lib/student/` or new `lib/observer/observer-lesson-registry.ts` when prose is cleared.

---

## TRACK D — Archive markdown render

Ensure these render through `ArchiveMarkdownView` with badges:

- `content/archive/profiles/JOHN_DEE_PROFILE.md`
- `content/archive/profiles/EDWARD_KELLEY_PROFILE.md`
- `content/archive/angelic-sessions/*.md`

Add `QuestionsThisRaises` to profile pages if missing.

---

## TRACK E — MVP gaps (pick up)

| Item | Action |
|------|--------|
| Breadcrumbs | `components/layout/breadcrumbs.tsx` — ensure all major routes |
| Quiz engine | Matching quiz exists; wire more lessons |
| Flashcards | `components/language/alphabet-flashcards.tsx` — Student path link |
| Student settings | tradition lens toggles on `/path/settings` |

---

## TRACK F — Build & deploy

```bash
npm run build
npm test
```

Vercel: add `NEXT_PUBLIC_SUPABASE_*` env vars; auth redirect URLs for production domain.

---

## DO NOT

- Modify Old Gods / Roma tables (non-`celestial_*`)
- Force-push main
- Add gamification copy

---

## DONE WHEN

- [ ] `verify:supabase` passes 5 tables
- [ ] Discovery sync works signed-in
- [ ] Relationship web shows 35+ nodes without layout break
- [ ] Observer preview lists 8 lessons
- [ ] Build green
