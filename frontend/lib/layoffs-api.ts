import "server-only";

import type { LiveLayoffsFeed } from "@shared/live-layoffs";
import { getLiveLayoffsFeed } from "@shared/live-layoffs";

function getRawApiBaseUrl() {
  return (
    process.env.JOBANXIETY_API_BASE_URL ??
    process.env.JOBANXIETY_API_HOSTPORT ??
    (process.env.NODE_ENV === "production" ? "https://jobanxiety-api.onrender.com" : "http://localhost:8080")
  );
}

function withProtocol(value: string) {
  return /^https?:\/\//i.test(value) ? value : `http://${value}`;
}

function normalizeLayoffsFeed(feed: LiveLayoffsFeed): LiveLayoffsFeed {
  const events = feed.events.map((event) => ({
    ...event,
    confidence: event.confidence ?? "Confirmed"
  }));

  return {
    ...feed,
    events,
    stats: {
      confirmedDisclosures:
        feed.stats.confirmedDisclosures ?? events.filter((event) => event.confidence === "Confirmed").length,
      reportedDisclosures:
        feed.stats.reportedDisclosures ?? events.filter((event) => event.confidence === "Reported").length,
      totalAffected:
        feed.stats.totalAffected ??
        events.filter((event) => event.confidence === "Confirmed").reduce((sum, event) => sum + event.affectedCount, 0),
      aiCitedEvents: feed.stats.aiCitedEvents ?? events.filter((event) => event.aiSignal === "Cited").length
    }
  };
}

export async function getPublishedLayoffsFeed(): Promise<LiveLayoffsFeed> {
  try {
    const response = await fetch(`${withProtocol(getRawApiBaseUrl())}/api/v1/layoffs`, {
      next: { revalidate: 3600 }
    });

    if (response.ok) {
      return normalizeLayoffsFeed((await response.json()) as LiveLayoffsFeed);
    }
  } catch {
    // Fall back to the local source monitor during frontend-only development.
  }

  return normalizeLayoffsFeed(await getLiveLayoffsFeed());
}
