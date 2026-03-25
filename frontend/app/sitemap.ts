import type { MetadataRoute } from "next";

import { careerNotes, insightArticles } from "@/lib/editorial-content";
import { companies, jobs } from "@/lib/market-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://reframe.work";
  const staticRoutes = ["", "/jobs", "/companies", "/career-notes", "/insights", "/trends", "/about", "/newsletter"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date()
    })),
    ...jobs.map((job) => ({
      url: `${baseUrl}/jobs/${job.slug}`,
      lastModified: new Date(job.postedAt)
    })),
    ...companies.map((company) => ({
      url: `${baseUrl}/companies/${company.slug}`,
      lastModified: new Date()
    })),
    ...careerNotes.map((note) => ({
      url: `${baseUrl}/career-notes/${note.slug}`,
      lastModified: new Date("2026-03-25")
    })),
    ...insightArticles.map((articleItem) => ({
      url: `${baseUrl}/insights/${articleItem.slug}`,
      lastModified: new Date(articleItem.publishedAt)
    }))
  ];
}
