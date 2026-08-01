export function buildTwitterShareUrl(text: string, url?: string): string {
  const params = new URLSearchParams({ text });
  if (url) params.set("url", url);
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export function buildBlueskyShareUrl(text: string, url?: string): string {
  const full = url ? `${text}\n\n${url}` : text;
  return `https://bsky.app/intent/compose?text=${encodeURIComponent(full)}`;
}

export function buildLinkedInShareUrl(url: string, summary?: string): string {
  const params = new URLSearchParams({ url });
  if (summary) params.set("summary", summary);
  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
}

export function buildFormulaDrafts(spark: string, elaboration: string, siteUrl: string): {
  draftShort: string;
  draftLong: string;
} {
  const draftShort = `${spark} — studying Enochian with epistemic discipline via Enochia.io`;
  const draftLong = `${spark}\n\n${elaboration.slice(0, 280)}${elaboration.length > 280 ? "…" : ""}\n\n#Enochian #CelestialArchive`;
  void siteUrl;
  return { draftShort, draftLong };
}
