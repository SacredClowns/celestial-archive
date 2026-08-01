# Instrumentarium — Keeper's Control Chamber

The **Instrumentarium** is the Celestial Archive's systems-admin surface: a themed control panel mapped to practice areas from [awesome-sysadmin](https://github.com/awesome-foss/awesome-sysadmin) (monitoring, metrics, logs, identity, backups, configuration, service discovery, CI, troubleshooting).

It is **not** linked from public navigation. Keepers reach it directly.

## URLs

| Route | Purpose |
|-------|---------|
| `/instrumentarium/gate` | Wyrd sign-in threshold (magic link) |
| `/instrumentarium` | Dashboard (admin allowlist required) |
| `GET /api/instrumentarium/status` | JSON diagnostics (admin session required) |

## Configuration

Add to `.env.local` (server-only for the allowlist):

```env
CELESTIAL_ADMIN_EMAILS=you@example.com,other@example.com
```

Uses the same Supabase project as Old Gods (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).

After sign-in, only emails on the allowlist may load the dashboard or status API. Others see **Sealed Chamber**.

## Domains (panels)

| Chamber name | Sysadmin analogue |
|--------------|-------------------|
| Vigil of the Spheres | Monitoring & status |
| Measures & Omens | Metrics |
| Scroll of Echoes | Logs (session, this browser) |
| Seals of Identity | Identity / SSO |
| Vault of Memory | Databases / celestial tables |
| Glyphs of Configuration | Configuration management |
| Constellation Registry | Service discovery |
| Rites of Renewal | CI / deployment commands |
| Lenses of Trouble | Troubleshooting |

## Rites (CLI)

From the repo root:

- `npm run verify:supabase` — celestial table presence
- `npm run build` — search index + production build
- `npm test` — Vitest

## Security notes

- Do not expose `CELESTIAL_ADMIN_EMAILS` to the client.
- Status API returns 403 for signed-in non-admins and 401 without a session.
- Routes use `robots: noindex`.
