import { NextResponse } from "next/server";

import { getHomepageFeed } from "@/lib/live-homepage";

export async function GET() {
  const feed = await getHomepageFeed();

  return NextResponse.json(feed, {
    headers: {
      "Cache-Control": "s-maxage=600, stale-while-revalidate=300"
    }
  });
}
