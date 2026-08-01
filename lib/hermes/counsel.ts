import { buildCourseCorpus } from "@/lib/hermes/course-corpus";
import { HERMES_MODES, HERMES_SYSTEM_PROMPT, type HermesMode } from "@/lib/hermes/hermes-identity";
import { completeWithOpenRouter, isOpenRouterConfigured } from "@/lib/hermes/openrouter";
import { buildSeekerContext, type SeekerContextBundle } from "@/lib/hermes/seeker-context";
import { pickCounsel, HOST_INTELLIGENCES } from "@/lib/grimoire/host-intelligences";
import type { DiscoveryEntry } from "@/lib/discovery/discovery-types";
import type { FormulaEntry } from "@/lib/grimoire/formula-types";
import type { JournalEntry } from "@/lib/journal/journal-types";
import type { ProgressStore } from "@/lib/progress/progress-types";
import type { HermesMemory } from "@/lib/supabase/hermes-db";

export type CounselInput = {
  mode: HermesMode;
  message: string;
  progress: ProgressStore;
  isLessonComplete: (id: string) => boolean;
  journalEntries: JournalEntry[];
  discoveries: DiscoveryEntry[];
  formulae: FormulaEntry[];
  memory: HermesMemory | null;
};

export type CounselResult = {
  reply: string;
  source: "openrouter" | "fallback";
  context: SeekerContextBundle;
  model?: string;
};

function fallbackCounsel(ctx: SeekerContextBundle, mode: HermesMode, message: string): string {
  const host = HOST_INTELLIGENCES.find((h) => h.id === ctx.hostId) ?? HOST_INTELLIGENCES[0]!;
  const line = pickCounsel(host, message.length + mode.length);

  const archivistFrame =
    "I am here in quiet mode — the lamps are lit, but the long-distance courier has not yet been bound. What follows is a scrap from the shelf; connect OpenRouter when you are ready for my full voice.";

  if (mode === "next_step" && ctx.suggestedNextLessonHref) {
    return `${archivistFrame}\n\n${line}\n\nWhen the corridor feels clear, take up the next folio on your path. One step. One witness at a time.\n\nWhat do you expect to find there — evidence, or confirmation?`;
  }

  return `${archivistFrame}\n\n${line}\n\nWhat is it you are actually asking the manuscripts to give you?`;
}

export async function generateHermesCounsel(input: CounselInput): Promise<CounselResult> {
  const context = buildSeekerContext({
    progress: input.progress,
    isLessonComplete: input.isLessonComplete,
    journalEntries: input.journalEntries,
    discoveries: input.discoveries,
    formulae: input.formulae,
    hermesMemorySummary: input.memory?.relationshipSummary,
    learningFocus: input.memory?.learningFocus
  });

  if (!isOpenRouterConfigured()) {
    return {
      reply: fallbackCounsel(context, input.mode, input.message),
      source: "fallback",
      context
    };
  }

  const corpus = buildCourseCorpus();
  const history =
    input.memory?.recentExchanges
      .slice(-6)
      .map((e) => `${e.role}: ${e.text}`)
      .join("\n") ?? "";

  const userMessage = `
MODE: ${input.mode} — ${HERMES_MODES[input.mode]}

${context.narrative}

COURSE MAP:
${corpus}

RECENT DIALOGUE:
${history || "(first exchange)"}

SEEKER SAYS:
${input.message || "(asks for counsel without a specific question — offer gentle orientation)"}

Reply as Hermes. If mode is next_step, name one folio or archive room and why. End with one reflection question, not a command.
`.trim();

  const { text, model } = await completeWithOpenRouter({
    system: HERMES_SYSTEM_PROMPT,
    userMessage
  });

  return { reply: text, source: "openrouter", context, model };
}
