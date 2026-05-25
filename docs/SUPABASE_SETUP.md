# Supabase setup (shared with Old Gods)

The Celestial Archive uses the **same Supabase project** as Old Gods. User data lives in `celestial_*` tables so Roma / Old Gods tables are untouched.

## 1. Environment variables

Copy from the Old Gods project (or Supabase dashboard → **Settings → API**):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Save as `.env.local` in this repo root. Restart `npm run dev`.

## 2. Database migrations (applied on shared project)

Migrations are in `supabase/migrations/` and target project **`liwrohglgvbzgfzbxwgu`** (Old Gods / Roma Eterna):

| File | Purpose |
|------|---------|
| `001_celestial_archive.sql` | Tables + RLS policies |
| `002_celestial_archive_grants.sql` | `authenticated` / `anon` grants + PostgREST schema reload |

**Status:** Both migrations have been applied to the shared project (March 2026).

To verify locally:

```bash
npm run verify:supabase
```

To re-apply manually: Supabase **SQL Editor** → paste each file in order.

This creates:

| Table | Purpose |
|-------|---------|
| `celestial_profiles` | Display name, rank, settings |
| `celestial_journal_entries` | Journal |
| `celestial_user_progress` | Completed lesson IDs |
| `celestial_bookmarks` | Saved pages |

All tables use RLS: users only see their own rows. Table names are prefixed `celestial_` so Old Gods tables (`profiles`, `seeker_progress`, etc.) are untouched.

## 3. Auth redirect URL

Project: `liwrohglgvbzgfzbxwgu` (shared with Old Gods / Roma Eterna)

Dashboard: https://supabase.com/dashboard/project/liwrohglgvbzgfzbxwgu/auth/url-configuration

Add:

- **Site URL** (local dev): `http://localhost:3000`
- **Redirect URLs**:
  - `http://localhost:3000/auth/callback`
  - `https://your-production-domain/auth/callback` (when deployed)

Magic-link sign-in uses the same `auth.users` pool as Old Gods.

## 4. Behavior

| State | Journal / progress / bookmarks |
|-------|--------------------------------|
| Not signed in | `localStorage` only |
| Signed in | Loaded from Supabase; writes sync to cloud |
| First sign-in with local data | Local entries merged up to Supabase once |

Lesson **content** stays in the repo (markdown / JSON), not in Supabase.

## 5. Vercel

Add the same two `NEXT_PUBLIC_*` variables in the Vercel project settings for production.
