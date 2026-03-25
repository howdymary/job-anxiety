/**
 * Shared Zod schemas for request validation at the API boundary.
 */

import { z } from "zod";
import {
  COMPANY_TIERS,
  EXPERIENCE_LEVELS,
  JOB_CATEGORIES,
  LOCATION_TYPES
} from "../../../shared/types";

const csvList = <T extends readonly [string, ...string[]]>(values: T) =>
  z
    .string()
    .trim()
    .transform((value) => value.split(",").map((item) => item.trim()).filter(Boolean))
    .pipe(z.array(z.enum(values)))
    .optional();

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20)
});

export const jobsQuerySchema = paginationQuerySchema.extend({
  q: z.string().trim().min(1).max(120).optional(),
  category: csvList(JOB_CATEGORIES),
  companyTier: csvList(COMPANY_TIERS),
  locationType: csvList(LOCATION_TYPES),
  experienceLevel: csvList(EXPERIENCE_LEVELS),
  salaryMin: z.coerce.number().int().nonnegative().optional(),
  salaryMax: z.coerce.number().int().nonnegative().optional(),
  city: z.string().trim().min(1).max(120).optional(),
  posted: z.enum(["24h", "7d", "30d"]).optional()
});

export const jobSearchSchema = z.object({
  q: z.string().trim().min(2).max(120)
});

export const companyQuerySchema = paginationQuerySchema.extend({
  q: z.string().trim().min(1).max(120).optional(),
  tier: csvList(COMPANY_TIERS)
});

export const subscriberPreferencesSchema = z.object({
  categories: z.array(z.enum(JOB_CATEGORIES)).default([]),
  tiers: z.array(z.enum(COMPANY_TIERS)).default([]),
  locationTypes: z.array(z.enum(LOCATION_TYPES)).default([])
});

export const subscriberCreateSchema = z.object({
  email: z.string().trim().email(),
  preferences: subscriberPreferencesSchema.default({
    categories: [],
    tiers: [],
    locationTypes: []
  })
});

export const subscriberConfirmSchema = z.object({
  email: z.string().trim().email(),
  token: z.string().trim().min(12).max(255)
});
