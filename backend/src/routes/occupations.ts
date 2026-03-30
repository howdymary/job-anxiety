import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { searchOccupations } from "../../../shared/occupation-risk";
import { occupationSearchSchema } from "../lib/validation";
import { createRateLimitMiddleware } from "../middleware/rateLimit";

export const occupationsRoutes = new Hono();

occupationsRoutes.use("*", createRateLimitMiddleware({ keyPrefix: "occupations:search", limit: 30, windowMs: 60_000 }));

occupationsRoutes.get("/search", zValidator("query", occupationSearchSchema), (c) => {
  const query = c.req.valid("query");
  const results = searchOccupations(query.q);

  c.header("Cache-Control", "public, max-age=3600");

  return c.json({
    query: query.q,
    count: results.length,
    results: results.map((result) => ({
      soc_code: result.socCode,
      title: result.title,
      employment_2024: result.employment2024
    }))
  });
});
