# Student rank — build notes (engineering)

## Turbopack / Next.js

The Student lesson loader reads markdown from `content/curriculum/stage-2-student/` using `fs` and `process.cwd()` on the server. Next.js may emit an **NFT tracing warning** during production builds (filesystem trace sees the repo root). This does not fail the build.

**Mitigations (future):** narrow imports so config does not trace the whole tree; or document-only ignore comments on `path.join` per Next.js guidance; or move curriculum reads behind a data package path that Turbopack can scope.

## Registry as source of truth

- `markdownFileName` on each `StudentLessonRecord` points at the lesson `.md` file. Presence on disk is checked with `studentLessonMarkdownExists(slug)` (`lib/student/student-content-flags.ts`).
- Slug-specific maps in the loader were removed; the loader resolves the file via the registry only.

## Filing expectations for 2.3–2.6

See `docs/STUDENT_LESSON_FILING.md` for filename patterns and the split-body contract.

## Controlled preview

All `/path/student` routes use `robots: { index: false, follow: false }`. Stage copy is marked as **controlled preview** (ribbon + layout strip).
