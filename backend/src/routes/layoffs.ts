import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { getLiveLayoffsFeed } from "../../../shared/live-layoffs";
import { layoffsQuerySchema } from "../lib/validation";
import { createRateLimitMiddleware } from "../middleware/rateLimit";

export const layoffsRoutes = new Hono();

layoffsRoutes.use("*", createRateLimitMiddleware({ keyPrefix: "layoffs:read", limit: 60, windowMs: 60_000 }));

layoffsRoutes.get("/", zValidator("query", layoffsQuerySchema), async (c) => {
  const query = c.req.valid("query");
  const feed = await getLiveLayoffsFeed();
  const normalizedCompany = query.company?.toLowerCase();
  const filteredEvents = feed.events.filter((event) => {
    if (query.aiSignal === "cited" && event.aiSignal !== "Cited") {
      return false;
    }

    if (query.aiSignal === "not_cited" && event.aiSignal !== "Not cited") {
      return false;
    }

    if (normalizedCompany) {
      const haystack = `${event.company} ${event.companySlug}`.toLowerCase();
      return haystack.includes(normalizedCompany);
    }

    return true;
  });

  c.header("Cache-Control", "public, max-age=3600");

  return c.json({
    generatedAt: feed.generatedAt,
    lastSuccessfulRefreshAt: feed.lastSuccessfulRefreshAt,
    stats: {
      confirmedDisclosures: filteredEvents.length,
      totalAffected: filteredEvents.reduce((sum, event) => sum + event.affectedCount, 0),
      aiCitedEvents: filteredEvents.filter((event) => event.aiSignal === "Cited").length
    },
    events: filteredEvents,
    sourceHealth: feed.sourceHealth,
    errors: feed.errors
  });
});

layoffsRoutes.get("/health", async (c) => {
  const feed = await getLiveLayoffsFeed();
  c.header("Cache-Control", "public, max-age=300");

  return c.json({
    generatedAt: feed.generatedAt,
    lastSuccessfulRefreshAt: feed.lastSuccessfulRefreshAt,
    stats: feed.stats,
    sourceHealth: feed.sourceHealth,
    errors: feed.errors
  });
});
