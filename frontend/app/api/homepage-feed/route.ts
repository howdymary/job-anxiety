import { NextResponse } from "next/server";

import { getHomepageFeed, getLiveJobSlug } from "@/lib/live-homepage";

export async function GET() {
  const feed = await getHomepageFeed();
  const withSlugs = {
    ...feed,
    newestJobs: feed.newestJobs.map((job) => ({
      ...job,
      slug: getLiveJobSlug(job)
    })),
    trendingJobs: feed.trendingJobs.map((job) => ({
      ...job,
      slug: getLiveJobSlug(job)
    }))
  };

  return NextResponse.json(withSlugs, {
    headers: {
      "Cache-Control": "s-maxage=600, stale-while-revalidate=300"
    }
  });
}
