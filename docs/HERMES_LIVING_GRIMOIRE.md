# Hermes — Living Grimoire Messenger

## Like you're five

**Hermes is the slightly wyrd archivist who carries messages** — dust, candlewax, disciplined listening. Uncanny in tone, never in claims.

- The **Archive** is the big library everyone can visit.
- **Your Grimoire** is your private notebook + dashboard.
- **Hermes** lives in your Grimoire. He remembers what you studied, your aha moments (Formulae), and helps you learn **without** telling you what to believe.

As **you** add lessons to the course, Hermes's "map" gets longer — because it reads the same lesson list the website uses. As **you** talk to him, he remembers you in Supabase (`celestial_hermes_memories`).

When you're ready, Hermes can also help **you** (the keeper) post to social media — that's the Admin desk.

## Plug in the brain (OpenRouter)

In `.env.local` (server only — never `NEXT_PUBLIC_`):

```env
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_MODEL=anthropic/claude-sonnet-4
NEXT_PUBLIC_SITE_URL=https://enochia.io
```

Restart the dev server. In Grimoire, Hermes badge shows **living** instead of **quiet mode**.

## Migration

Run `006_celestial_hermes_memory.sql` in Supabase SQL Editor so conversations persist per user.

## Modes in Grimoire

| Button | What Hermes does |
|--------|------------------|
| Ask Hermes | Answer your question in context |
| What next? | Suggest one next lesson or archive room |
| Deepen my Formula | Help elaborate an aha without stealing it |
| Clear channel | Explain language/manuscript at your rank |

## How Hermes "grows with the course"

1. **Course corpus** — `lib/hermes/course-corpus.ts` lists Seeker + Student folios from registries. Add a lesson to the registry → Hermes knows it on the next message.
2. **Seeker context** — each call sends progress, formulae, journal titles.
3. **Memory** — last exchanges stored in `celestial_hermes_memories` (relationship summary can be expanded later with auto-summarize jobs).
4. **Instrument expansion** — Observer lessons, new archive rooms: add to registries + optional `HERMES_CORPUS_SNIPPETS` env later.

## Keeper + matrix win

- Seekers get a **living** practice tool (grimoire + messenger), not a static PDF course.
- You get CRM + newsletter + course roster + agent queue in `/admin`.
- Hermes repurpose_formula jobs can turn seeker sparks into ethical social copy (badge-aware prompts in `lib/hermes/hermes-identity.ts`).

## Optional webhook

`HERMES_WEBHOOK_URL` still works for external automations (n8n). The built-in path uses OpenRouter directly at `/api/hermes/counsel`.
