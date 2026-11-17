/**
 * Small in-memory rate limiter for form endpoints: `limit` requests per `windowMs` per IP.
 * It resets on each server instance, which is enough to stop casual form spam.
 */
const hits = new Map<string, number[]>();

export function rateLimited(request: Request, key: string, limit = 5, windowMs = 10 * 60_000): boolean {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
  const id = `${key}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(id) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(id, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}
