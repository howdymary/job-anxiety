import type { MetadataRoute } from "next";

import { getLiveJobsSnapshot, getLiveJobSlug } from "@/lib/live-homepage";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://jobanxiety.ai";
  const staticRoutes = [
    "",
    "/jobs",
    "/check-your-occupation",
    "/companies",
    "/career-notes/will-ai-replace-software-engineers",
    "/about",
    "/newsletter",
    "/methodology",
    "/corrections",
    "/privacy",
    "/terms"
  ];

  const snapshot = await getLiveJobsSnapshot();

  return [
    ...staticRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date()
    })),
    ...snapshot.jobs.map((job) => ({
      url: `${baseUrl}/jobs/${getLiveJobSlug(job)}`,
      lastModified: new Date(job.postedAt)
    })),
    ...snapshot.hiringCompanies.map((company) => ({
      url: `${baseUrl}/companies/${company.companySlug}`,
      lastModified: new Date()
    }))
  ];
}
