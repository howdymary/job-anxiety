/**
 * Trends routes backed by mock analytics.
 */

import { Hono } from "hono";

import { mockLocationDistribution, mockSalaryRanges, mockTopHiringCompanies, mockTrendSeries } from "../lib/mock-data";
import { createRateLimitMiddleware } from "../middleware/rateLimit";

export const trendsRoutes = new Hono();

trendsRoutes.use("*", createRateLimitMiddleware({ keyPrefix: "trends:read", limit: 100, windowMs: 60_000 }));

trendsRoutes.get("/categories", (c) => {
  return c.json({ points: mockTrendSeries });
});

trendsRoutes.get("/companies", (c) => {
  return c.json({ companies: mockTopHiringCompanies });
});

trendsRoutes.get("/locations", (c) => {
  return c.json({ locations: mockLocationDistribution });
});

trendsRoutes.get("/salaries", (c) => {
  return c.json({ salaries: mockSalaryRanges });
});
