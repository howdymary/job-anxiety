/**
 * Jobs API is intentionally withheld until it is backed by audited production data.
 */

import { Hono } from "hono";

import { createRateLimitMiddleware } from "../middleware/rateLimit";

export const jobsRoutes = new Hono();

jobsRoutes.use("*", createRateLimitMiddleware({ keyPrefix: "jobs:read", limit: 100, windowMs: 60_000 }));

jobsRoutes.get("*", (c) => {
  return c.json(
    {
      error: {
        code: "DATASET_NOT_PUBLISHED",
        message: "The jobs API is not published until the production dataset is live and audited."
      }
    },
    503
  );
});
