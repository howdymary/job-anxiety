import type { Metadata } from "next";

import { HomepageStream } from "@/components/home/homepage-stream";
import { getHomepageFeed } from "@/lib/live-homepage";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "JobAnxiety.ai — AI Job Market & Layoff Tracker",
  description:
    "Track AI job openings, layoffs, and labor market trends with source-verified data. Updated daily. Career guides for workers navigating AI-era change."
};

export default async function HomePage() {
  const feed = await getHomepageFeed();

  return <HomepageStream feed={feed} />;
}
