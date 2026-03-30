/**
 * Trends API is intentionally withheld until it is backed by audited production data.
 */

import { Hono } from "hono";

import { createRateLimitMiddleware } from "../middleware/rateLimit";

export const trendsRoutes = new Hono();

trendsRoutes.use("*", createRateLimitMiddleware({ keyPrefix: "trends:read", limit: 100, windowMs: 60_000 }));

trendsRoutes.get("*", (c) => {
  return c.json(
    {
      error: {
        code: "DATASET_NOT_PUBLISHED",
        message: "The trends API is not published until the production dataset is live and audited."
      }
    },
    503
  );
});
