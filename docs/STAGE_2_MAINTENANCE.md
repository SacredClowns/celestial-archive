# Stage 2 (Student) — maintenance

Stage 2 is a **controlled preview archive**, not a product funnel and not a puzzle box.

Guiding law: *The deeper room is not more true. It is only more complex.*

This document is the single place to learn how to file new Student material without breaking the stage.

---

## What Stage 2 is

- **Reader column**: lesson manuscript (markdown) mounted on `/path/student/[slug]`
- **Verification folio**: Source Pack markdown stored beside the lesson
- **Demonstrations**: comparison surfaces mounted from registry flags (table fragment / grid / transmission map)

Stage 2 does not “unlock” truth. It teaches reading discipline under increasing complexity.

---

## How to add or update a Student lesson safely

1. **Update the registry row** in `lib/student/student-lesson-registry.ts`
   - `id`, `slug`, `order`, `lessonNumber`, `title`, `subtitle`
   - `markdownFileName` must point to a file under `content/curriculum/stage-2-student/`
   - `sourcePackId` and `sourcePackFileName` must be present and unique
   - `internalPreviewOnly` must remain `true` for all Student lessons
2. **Create or edit the lesson manuscript** at the `markdownFileName`
3. **Create or edit the Source Pack** at the `sourcePackFileName`
4. Run validation and tests (see below). Do not ship if Stage 2 validation fails.

---

## Required frontmatter (Student lessons)

Every lesson file must include YAML frontmatter with these keys:

- `id`
- `slug`
- `title`
- `subtitle`
- `stage`
- `order`
- `lessonNumber`
- `duration`
- `sourcePackId`
- `status`
- `previousLessonId`
- `nextLessonId`
- `glossaryTerms`
- `timelineAnchors`
- `epistemicTonesHeader`

**Important:**

- Do not introduce new frontmatter keys casually. Unknown keys are treated as **contract drift** and fail validation.
- Glossary terms must exist in `lib/glossary.ts` (or Stage 2 validation will fail).

---

## Required directives (Student manuscripts)

Student lesson manuscripts may only use the canonical directives defined in:

- `lib/student/student-directives.ts` (`STUDENT_DIRECTIVE_NAMES`)

If a manuscript introduces an unsupported directive, Stage 2 validation fails loudly.

Every Student lesson must include:

- `:::closing-passage`
- `:::source-strip`

---

## Source Pack naming convention

Source Packs live beside lessons in:

`content/curriculum/stage-2-student/`

Naming pattern:

`SOURCE_PACK_<n>_STUDENT_2_<n>.md`

The registry row must set:

- `sourcePackId`: `SOURCE_PACK_<n>_STUDENT_2_<n>`
- `sourcePackFileName`: `SOURCE_PACK_<n>_STUDENT_2_<n>.md`

Duplicate ids or filenames fail validation.

---

## Comparison surface rules

Demonstrations are declared only in the registry (`comparisonRequirements`).

Mounted order is stable:

- **Table fragment** (Great Table posture)
- **Grid** (structural fragment)
- **Transmission map (local)**

Rules:

- Declare only what the lesson needs; “more surfaces” is not “more truth.”
- If any surfaces are declared, Stage 2 validation requires matching labels (no silent mismatch).

---

## Preview-only rules

Stage 2 remains **controlled preview** until explicit launch:

- Student routes keep `robots: { index: false, follow: false }`
- The Student layout ribbon must read **“Controlled preview — Student path”**
- Registry `internalPreviewOnly` must remain `true`

---

## Validation and test commands

- `npm test` (runs the full suite, including Stage 2 invariants)
- `npm run validate:student` (Stage 2 invariants only)
- `npm run build` (Next production build)

---

## Common failure modes (caught by validation)

- A lesson file is renamed on disk but `markdownFileName` isn’t updated
- A Source Pack is missing or misnamed
- A glossary term is added to frontmatter without a matching glossary entry
- A directive is invented (`:::something-new`) and silently fails to render
- Lesson sequencing drifts (broken prev/next chain)
- Duplicate `lessonNumber`, `slug`, `sourcePackId`, or `sourcePackFileName`

---

## What not to do

- Do not add “coming soon” voice or teaser language to Stage 2 absence states
- Do not add new directive names without updating the canonical list and renderer support
- Do not turn demonstrations into “decoding” mechanics
- Do not let later rooms read as “the real answer”

