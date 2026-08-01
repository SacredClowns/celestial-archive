/** Comma-separated allowlist in CELESTIAL_ADMIN_EMAILS (server-only). */
export function getAdminEmails(): string[] {
  const raw = process.env.CELESTIAL_ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const allow = getAdminEmails();
  if (allow.length === 0) return false;
  return allow.includes(email.trim().toLowerCase());
}

export function adminAccessConfigured(): boolean {
  return getAdminEmails().length > 0;
}
