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

export async function getPublishedLayoffsFeed(): Promise<LiveLayoffsFeed> {
  try {
    const response = await fetch(`${withProtocol(getRawApiBaseUrl())}/api/v1/layoffs`, {
      next: { revalidate: 3600 }
    });

    if (response.ok) {
      return (await response.json()) as LiveLayoffsFeed;
    }
  } catch {
    // Fall back to the local source monitor during frontend-only development.
  }

  return getLiveLayoffsFeed();
}
