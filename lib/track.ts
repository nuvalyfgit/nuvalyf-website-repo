/**
 * Sends a GA4 event. Does nothing until the visitor has accepted analytics
 * (gtag only exists after consent), so it is safe to call anywhere.
 */
export function track(event: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", event, params);
}
