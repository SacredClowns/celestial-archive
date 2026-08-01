# Enochia.io Admin & Grimoire

Two private layers — not on the public Archive navigation.

| Route | Who | Purpose |
|-------|-----|---------|
| `/grimoire` | Every signed-in seeker | Personal metrics, hosts of intelligence, formulae (aha moments), wisdom bridge |
| `/admin` | Keepers (`CELESTIAL_ADMIN_EMAILS`) | CRM, newsletter, course roster, analytics, Hermes/agents, content factory |

## Setup

```env
# Existing
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
CELESTIAL_ADMIN_EMAILS=you@enochia.io

# Required for full CRM / newsletter / analytics (server only — never NEXT_PUBLIC)
SUPABASE_SERVICE_ROLE_KEY=

# Hermes brain in Grimoire (seeker counsel)
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_MODEL=anthropic/claude-sonnet-4
NEXT_PUBLIC_SITE_URL=https://enochia.io

# Agent webhooks (optional — external automations)
HERMES_WEBHOOK_URL=https://your-hermes-agent/run
ATHENA_WEBHOOK_URL=
THOTH_WEBHOOK_URL=

# Wisdom app deep link (seeker Grimoire)
NEXT_PUBLIC_WISDOM_APP_URL=https://your-old-gods-or-wisdom-app.com
NEXT_PUBLIC_WISDOM_APP_LABEL=The Mechanism of Magick
```

## Migrations

Apply in order:

1. `004_celestial_crm_marketing.sql` — CRM, newsletter, enrollments, events, agent jobs, content pieces
2. `005_celestial_crm_grants.sql` — PostgREST grants

## Agents (Hermes desk)

Queue jobs from **Admin → Agents**. If `HERMES_WEBHOOK_URL` is set, the server POSTs `{ jobId, agentId, jobType, payload }` when you queue work.

| Agent | Role |
|-------|------|
| Hermes | Social drafts & scheduling |
| Athena | Course / student nurture intelligence |
| Thoth | Content factory & newsletter segments |

## Public APIs

- `POST /api/newsletter/subscribe` — `{ "email": "...", "source": "footer" }`
- `POST /api/analytics/event` — `{ "eventName": "page_view", "properties": {} }`

## CRM stages

`lead` → `newsletter` → `seeker` → `student` → `enrolled` → `alumni` / `churned`

Enrolling a student in **Course & App** upserts CRM to `enrolled` and creates a `celestial_course_enrollments` row.
