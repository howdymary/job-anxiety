/**
 * Lean in-memory rate limiter stub.
 * Swap this for a Redis-backed sliding window before production deploys.
 */

import { createMiddleware } from "hono/factory";

type RateLimitOptions = {
  keyPrefix: string;
  limit: number;
  windowMs: number;
};

const buckets = new Map<string, number[]>();

const getClientKey = (headers: Headers): string => {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return headers.get("cf-connecting-ip") ?? "unknown";
};

export const createRateLimitMiddleware = ({ keyPrefix, limit, windowMs }: RateLimitOptions) =>
  createMiddleware(async (c, next) => {
    const now = Date.now();
    const key = `${keyPrefix}:${getClientKey(c.req.raw.headers)}`;
    const windowStart = now - windowMs;
    const recentHits = (buckets.get(key) ?? []).filter((timestamp) => timestamp > windowStart);

    if (recentHits.length >= limit) {
      return c.json(
        {
          error: {
            code: "RATE_LIMITED",
            message: "Too many requests. Please slow down."
          }
        },
        429
      );
    }

    recentHits.push(now);
    buckets.set(key, recentHits);
    await next();
  });
