/**
 * Company routes backed by stable mock data for the first implementation pass.
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { companyQuerySchema } from "../lib/validation";
import { mockCompanies, mockJobs } from "../lib/mock-data";
import { createRateLimitMiddleware } from "../middleware/rateLimit";

export const companiesRoutes = new Hono();

companiesRoutes.use("*", createRateLimitMiddleware({ keyPrefix: "companies:read", limit: 100, windowMs: 60_000 }));

companiesRoutes.get("/", zValidator("query", companyQuerySchema), (c) => {
  const query = c.req.valid("query");
  const filteredCompanies = mockCompanies.filter((company) => {
    const normalizedQuery = query.q?.toLowerCase();

    if (normalizedQuery && !company.name.toLowerCase().includes(normalizedQuery)) {
      return false;
    }

    if (query.tier?.length && !query.tier.includes(company.tier)) {
      return false;
    }

    return true;
  });

  const start = (query.page - 1) * query.pageSize;

  return c.json({
    items: filteredCompanies.slice(start, start + query.pageSize),
    page: query.page,
    pageSize: query.pageSize,
    total: filteredCompanies.length,
    filters: query
  });
});

companiesRoutes.get("/:slug", (c) => {
  const company = mockCompanies.find((item) => item.slug === c.req.param("slug"));
  if (!company) {
    return c.json(
      {
        error: {
          code: "NOT_FOUND",
          message: "Company not found."
        }
      },
      404
    );
  }

  return c.json({
    ...company,
    jobs: mockJobs.filter((job) => job.companyName === company.name)
  });
});
