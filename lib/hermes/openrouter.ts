export function isOpenRouterConfigured(): boolean {
  return Boolean(process.env.OPENROUTER_API_KEY?.trim());
}

export async function completeWithOpenRouter(opts: {
  system: string;
  userMessage: string;
  model?: string;
}): Promise<{ text: string; model: string }> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("OPENROUTER_API_KEY not configured");

  const model =
    opts.model ??
    process.env.OPENROUTER_MODEL ??
    "anthropic/claude-sonnet-4";

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://enochia.io",
      "X-Title": "Enochia Celestial Archive — Hermes"
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: opts.system },
        { role: "user", content: opts.userMessage }
      ],
      max_tokens: 900,
      temperature: 0.65
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
    model?: string;
  };

  const text = data.choices?.[0]?.message?.content?.trim() ?? "";
  if (!text) throw new Error("Empty response from OpenRouter");
  return { text, model: data.model ?? model };
}
