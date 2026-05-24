import { describe, expect, it } from "vitest";
import { parseKnowledgeCheckMarkdown } from "@/lib/lesson/knowledge-check-parser";

describe("parseKnowledgeCheckMarkdown", () => {
  it("parses MCQ blocks with correct markers", () => {
    const md = `
## Multiple Choice

**1. On what date did Edward Kelley arrive at Mortlake?**
- A) March 8, 1582 ✓
- B) March 10, 1582
- C) April 1, 1584

*Kelley arrived on March 8.*
`;
    const q = parseKnowledgeCheckMarkdown(md);
    expect(q).toHaveLength(1);
    expect(q[0].options.find((o) => o.correct)?.id).toBe("A");
    expect(q[0].explanation).toContain("March 8");
  });
});
