/**
 * Jobs routes for list, search, and detail queries.
 * This first pass runs on mock data so the frontend can integrate before persistence is ready.
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { jobsQuerySchema, jobSearchSchema } from "../lib/validation";
import { mockJobs } from "../lib/mock-data";
import { createRateLimitMiddleware } from "../middleware/rateLimit";
import type { ExperienceLevel, JobCategory, JobRecord, LocationType, PaginatedResponse } from "../../../shared/types";

type JobsQuery = {
  q?: string;
  category?: JobCategory[];
  companyTier?: JobRecord["companyTier"][];
  locationType?: LocationType[];
  experienceLevel?: ExperienceLevel[];
  salaryMin?: number;
  salaryMax?: number;
  city?: string;
  posted?: "24h" | "7d" | "30d";
  page: number;
  pageSize: number;
};

const postedWindowDays: Record<NonNullable<JobsQuery["posted"]>, number> = {
  "24h": 1,
  "7d": 7,
  "30d": 30
};

const withinPostedWindow = (job: JobRecord, posted: JobsQuery["posted"]): boolean => {
  if (!posted || !job.postedAt) {
    return true;
  }

  const postedDate = new Date(job.postedAt);
  if (Number.isNaN(postedDate.getTime())) {
    return true;
  }

  const ageInDays = (Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24);
  return ageInDays <= postedWindowDays[posted];
};

const matchesFilters = (job: JobRecord, query: JobsQuery): boolean => {
  const normalizedQuery = query.q?.toLowerCase();
  const locationLabel = job.locationLabel?.toLowerCase() ?? "";
  const description = job.description.toLowerCase();

  if (
    normalizedQuery &&
    !job.title.toLowerCase().includes(normalizedQuery) &&
    !job.companyName.toLowerCase().includes(normalizedQuery) &&
    !description.includes(normalizedQuery)
  ) {
    return false;
  }

  if (query.category?.length && !query.category.includes(job.category)) {
    return false;
  }

  if (query.companyTier?.length && !query.companyTier.includes(job.companyTier)) {
    return false;
  }

  if (query.locationType?.length && (!job.locationType || !query.locationType.includes(job.locationType))) {
    return false;
  }

  if (query.experienceLevel?.length && (!job.experienceLevel || !query.experienceLevel.includes(job.experienceLevel))) {
    return false;
  }

  if (typeof query.salaryMin === "number" && typeof job.salaryMax === "number" && job.salaryMax < query.salaryMin) {
    return false;
  }

  if (typeof query.salaryMax === "number" && typeof job.salaryMin === "number" && job.salaryMin > query.salaryMax) {
    return false;
  }

  if (query.city && !locationLabel.includes(query.city.toLowerCase())) {
    return false;
  }

  return withinPostedWindow(job, query.posted);
};

const paginate = (jobs: JobRecord[], page: number, pageSize: number): PaginatedResponse<JobRecord> => {
  const start = (page - 1) * pageSize;

  return {
    items: jobs.slice(start, start + pageSize),
    page,
    pageSize,
    total: jobs.length
  };
};

export const jobsRoutes = new Hono();

jobsRoutes.use("*", createRateLimitMiddleware({ keyPrefix: "jobs:read", limit: 100, windowMs: 60_000 }));

jobsRoutes.get("/", zValidator("query", jobsQuerySchema), (c) => {
  const query = c.req.valid("query");
  const filteredJobs = mockJobs.filter((job) => matchesFilters(job, query));

  return c.json({
    ...paginate(filteredJobs, query.page, query.pageSize),
    filters: query
  });
});

jobsRoutes.get("/search", zValidator("query", jobSearchSchema), (c) => {
  const query = c.req.valid("query");
  const normalized = query.q.toLowerCase();
  const results = mockJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(normalized) ||
      job.companyName.toLowerCase().includes(normalized) ||
      job.description.toLowerCase().includes(normalized)
  );

  return c.json({
    query: query.q,
    results
  });
});

jobsRoutes.get("/:slug", (c) => {
  const job = mockJobs.find((item) => item.slug === c.req.param("slug"));
  if (!job) {
    return c.json(
      {
        error: {
          code: "NOT_FOUND",
          message: "Job not found."
        }
      },
      404
    );
  }

  return c.json(job);
});
