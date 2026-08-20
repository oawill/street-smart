import "server-only";

/**
 * Minimal in-memory sliding-window rate limiter. Good enough for a single
 * dev/small-deployment instance; it is NOT distributed-safe — a
 * multi-instance production deployment would need a shared store (e.g.
 * Redis) instead. Documented as a known limitation.
 */
const buckets = new Map<string, number[]>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;
  const hits = (buckets.get(key) ?? []).filter((t) => t > windowStart);
  hits.push(now);
  buckets.set(key, hits);
  return hits.length > limit;
}

export function clientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
