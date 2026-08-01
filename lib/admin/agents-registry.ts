export type AgentDefinition = {
  id: string;
  name: string;
  role: string;
  description: string;
  jobTypes: string[];
  envKey: string | null;
};

/** Registered agents for the Admin desk — wire Hermes via webhook or SDK when ready. */
export const ADMIN_AGENTS: AgentDefinition[] = [
  {
    id: "hermes",
    name: "Hermes",
    role: "Living messenger — seeker counsel & outward channels",
    description:
      "Learns each seeker via Grimoire memory, guides the Enochian path (OpenRouter), and carries formulae to social channels. Grows as lessons are added to the instrument.",
    jobTypes: [
      "seeker_counsel",
      "social_draft",
      "schedule_post",
      "repurpose_formula",
      "campaign_batch",
      "memory_digest"
    ],
    envKey: "HERMES_WEBHOOK_URL"
  },
  {
    id: "athena",
    name: "Athena",
    role: "Course intelligence & student nurture",
    description:
      "Summarizes seeker progress, suggests nurture emails, and flags students ready for the full course.",
    jobTypes: ["crm_digest", "enrollment_review", "lesson_recommendation"],
    envKey: "ATHENA_WEBHOOK_URL"
  },
  {
    id: "thoth",
    name: "Thoth",
    role: "Content factory & curriculum assist",
    description:
      "Turns archive material into lesson promos, newsletter segments, and epistemic-safe copy.",
    jobTypes: ["content_draft", "newsletter_segment", "lesson_blurb"],
    envKey: "THOTH_WEBHOOK_URL"
  }
];

export function isAgentConfigured(agent: AgentDefinition): boolean {
  if (!agent.envKey) return false;
  return Boolean(process.env[agent.envKey]?.trim());
}

export function getAgentWebhook(agentId: string): string | null {
  const agent = ADMIN_AGENTS.find((a) => a.id === agentId);
  if (!agent?.envKey) return null;
  return process.env[agent.envKey]?.trim() ?? null;
}
