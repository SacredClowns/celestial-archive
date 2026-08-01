# Enochia — Hook-up checklist (5-minute)

Your Supabase project: **liwrohglgvbzgfzbxwgu** (shared with Old Gods).

Seeker data lives in the **`enochia`** schema (profiles, journal, progress). CRM and Hermes memory live in **`public`**. The app is wired for that split — verify with `npm run verify:enochia`.

## Step 1 — Open `.env.local`

You already have `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Add these three lines (fill in from Supabase dashboard):

```env
# Settings → API → service_role (click Reveal). NEVER commit this key.
SUPABASE_SERVICE_ROLE_KEY=

# Your email(s) that may open /admin (comma-separated)
CELESTIAL_ADMIN_EMAILS=you@yourdomain.com

# https://openrouter.ai/keys — Hermes living voice in Grimoire
OPENROUTER_API_KEY=
OPENROUTER_MODEL=anthropic/claude-sonnet-4
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Optional:

```env
NEXT_PUBLIC_WISDOM_APP_URL=https://your-wisdom-app.com
HERMES_WEBHOOK_URL=
```

## Step 2 — Verify

```bash
npm run verify:enochia
```

All ✓ → you are wired.

## Step 3 — Run

```bash
npm run dev
```

| URL | What |
|-----|------|
| http://localhost:3000/grimoire | Your seeker chamber + Hermes |
| http://localhost:3000/admin | CRM, newsletter, course, agents |
| http://localhost:3000/admin/gate | Sign in as keeper |

1. Sign in with magic link (same Supabase as Old Gods).
2. Open **Grimoire** — talk to Hermes (needs `OPENROUTER_API_KEY`).
3. Open **Admin** — you should see dashboard counts (needs `SUPABASE_SERVICE_ROLE_KEY` + your email in `CELESTIAL_ADMIN_EMAILS`).

## What runs automatically

- **Sign-in** → profile + CRM contact (`/api/auth/sync-profile`)
- **Page views** → analytics events (when service role is set)
- **Footer newsletter** → `POST /api/newsletter/subscribe`
- **Hermes** → remembers you in `celestial_hermes_memories`

## Production (enochia.io)

Add the same env vars in **Vercel** → Project → Settings → Environment Variables.

Add auth redirect URL in Supabase → Authentication → URL configuration:

- `https://enochia.io/auth/callback`

## More detail

- `docs/ENOCHIA_ADMIN.md` — admin + CRM
- `docs/HERMES_LIVING_GRIMOIRE.md` — Hermes archivist voice
