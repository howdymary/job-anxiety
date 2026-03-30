import type { Metadata } from "next";

import { HomepageStream } from "@/components/home/homepage-stream";
import { getHomepageFeed } from "@/lib/live-homepage";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "JobAnxiety.ai — AI Job Market & Layoff Tracker",
  description:
    "Track live AI job openings, read official-source layoff disclosures, and follow source-backed research on how AI is reshaping work."
};

export default async function HomePage() {
  const feed = await getHomepageFeed();

  return <HomepageStream feed={feed} />;
}
