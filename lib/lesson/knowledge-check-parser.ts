export type KnowledgeCheckOption = {
  id: string;
  label: string;
  text: string;
  correct: boolean;
};

export type KnowledgeCheckQuestion = {
  id: string;
  prompt: string;
  options: KnowledgeCheckOption[];
  explanation: string | null;
};

export type MatchingPair = {
  left: string;
  right: string;
};

export type ParsedKnowledgeCheck = {
  mcq: KnowledgeCheckQuestion[];
  matching: { prompt: string; pairs: MatchingPair[] } | null;
};

const OPTION_RE = /^-\s*([A-D])\)\s*(.+)$/;
const MATCH_PAIR_RE = /^-\s*(.+?)\s*(?:→|—|-->|->)\s*(.+)$/;

function parseMcqChunks(text: string): KnowledgeCheckQuestion[] {
  const chunks = text.split(/\n(?=\*\*\d+\.|\n\*\*\d+\.)/).filter(Boolean);
  const questions: KnowledgeCheckQuestion[] = [];

  chunks.forEach((chunk, qi) => {
    const lines = chunk.split("\n").map((l) => l.trimEnd());
    const promptLine = lines.find((l) => /^\*\*.+\*\*$/.test(l.trim()));
    if (!promptLine) return;
    if (/^\*\*match/i.test(promptLine.trim())) return;

    const prompt = promptLine.replace(/^\*\*|\*\*$/g, "").replace(/^\d+\.\s*/, "").trim();
    const options: KnowledgeCheckOption[] = [];
    let explanation: string | null = null;

    for (const line of lines) {
      const opt = line.trim().match(OPTION_RE);
      if (opt) {
        const letter = opt[1];
        let body = opt[2].trim();
        const correct = /✓\s*$/.test(body);
        body = body.replace(/\s*✓\s*$/, "").trim();
        options.push({ id: letter, label: letter, text: body, correct });
        continue;
      }
      const em = line.trim().match(/^\*(.+)\*$/);
      if (em && options.length > 0) {
        explanation = em[1].trim();
      }
    }

    if (options.length > 0) {
      questions.push({ id: `q-${qi}`, prompt, options, explanation });
    }
  });

  return questions;
}

function parseMatchingBlock(text: string): { prompt: string; pairs: MatchingPair[] } | null {
  const match = text.match(/\*\*([^*]*[Mm]atch[^*]*)\*\*([\s\S]*)/);
  if (!match) return null;

  const prompt = match[1].replace(/^\d+\.\s*/, "").trim();
  const body = match[2];
  const pairs: MatchingPair[] = [];

  for (const line of body.split("\n")) {
    const m = line.trim().match(MATCH_PAIR_RE);
    if (m) pairs.push({ left: m[1].trim(), right: m[2].trim() });
  }

  if (pairs.length < 2) return null;
  return { prompt, pairs };
}

/** Parses MCQ and optional matching sections from knowledge-check markdown. */
export function parseFullKnowledgeCheck(raw: string): ParsedKnowledgeCheck {
  const text = raw.trim();
  if (!text) return { mcq: [], matching: null };

  const matching = parseMatchingBlock(text);
  const mcqText = text.replace(/\*\*[^*]*[Mm]atch[^*]*\*\*[\s\S]*/i, "").trim();

  return {
    mcq: parseMcqChunks(mcqText),
    matching
  };
}

/** @deprecated Use parseFullKnowledgeCheck — MCQ only. */
export function parseKnowledgeCheckMarkdown(raw: string): KnowledgeCheckQuestion[] {
  return parseFullKnowledgeCheck(raw).mcq;
}
