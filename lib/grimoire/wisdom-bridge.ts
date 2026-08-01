/** Deep-dive wisdom app (Old Gods / mechanism of magick) — configure in env. */
export function getWisdomAppUrl(): string | null {
  const url =
    process.env.NEXT_PUBLIC_WISDOM_APP_URL ??
    process.env.NEXT_PUBLIC_OLD_GODS_URL ??
    null;
  if (!url) return null;
  try {
    new URL(url);
    return url.replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function getWisdomAppLabel(): string {
  return process.env.NEXT_PUBLIC_WISDOM_APP_LABEL ?? "The Mechanism of Magick";
}
