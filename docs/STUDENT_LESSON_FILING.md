# Student Stage — lesson filing (engineer + content)

## Location

All Stage 2 lesson bodies and rigor layers live in:

`content/curriculum/stage-2-student/`

## Naming — lessons

| Lesson | Registry `markdownFileName` |
|--------|-----------------------------|
| 2.1 | `STAGE_2_STUDENT_LESSON_1.md` |
| 2.2 | `STAGE_2_STUDENT_LESSON_2.md` |
| 2.3 | `STAGE_2_STUDENT_LESSON_3.md` |
| 2.4 | `STAGE_2_STUDENT_LESSON_4.md` |
| 2.5 | `STAGE_2_STUDENT_LESSON_5.md` |
| 2.6 | `STAGE_2_STUDENT_LESSON_6.md` |

The registry row must set `markdownFileName` to the filename. The loader resolves the path from the registry only (no duplicate slug map).

## Naming — source packs

Pattern:

`SOURCE_PACK_<n>_STUDENT_2_<n>.md`

Set `sourcePackFileName` on the matching `StudentLessonRecord` when the file exists. The lesson page shows rigor-layer presence separately from lesson prose.

## What you change to “file” a lesson

1. Add or update the markdown file at the name above.
2. Ensure YAML frontmatter matches `id` / `slug` in `lib/student/student-lesson-registry.ts`.
3. Set `status` to `open` in the registry when the folio is ready for controlled preview.
4. Add the source pack file when the rigor layer exists; set `sourcePackFileName` accordingly.

No new routes or loader code should be required.

## Split-body contract (Seeker parity)

Lesson files must include:

- `### Learning Goals` (start of main reader column for the splitter)
- `# COMPANION ELEMENTS` (or equivalent) before closing
- `# CLOSING PASSAGE` banner and `:::closing-passage`
- `:::source-strip` with `*Epistemic status` for postface extraction

See existing filed lessons for the exact section markers.
