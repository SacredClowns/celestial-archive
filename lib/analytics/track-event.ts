/** Fire-and-forget product analytics — stored in celestial_marketing_events when service role is configured. */
export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>,
  sessionId?: string
): void {
  if (typeof window === "undefined") return;
  void fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventName, properties, sessionId })
  }).catch(() => {
    /* silent */
  });
}
