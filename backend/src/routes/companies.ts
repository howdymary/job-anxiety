/**
 * Companies API is intentionally withheld until it is backed by audited production data.
 */

import { Hono } from "hono";

import { createRateLimitMiddleware } from "../middleware/rateLimit";

export const companiesRoutes = new Hono();

companiesRoutes.use("*", createRateLimitMiddleware({ keyPrefix: "companies:read", limit: 100, windowMs: 60_000 }));

companiesRoutes.get("*", (c) => {
  return c.json(
    {
      error: {
        code: "DATASET_NOT_PUBLISHED",
        message: "The companies API is not published until the production dataset is live and audited."
      }
    },
    503
  );
});
