/**
 * Job Anxiety Drizzle schema.
 * Mirrors the first-pass PostgreSQL contract for companies, jobs, subscribers, and scraper runs.
 */

import {
  bigint,
  boolean,
  customType,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";
import {
  COMPANY_TIERS,
  EXPERIENCE_LEVELS,
  LOCATION_TYPES,
  SCRAPER_RUN_STATUSES
} from "../../../shared/types";

const tsvector = customType<{ data: string }>({
  dataType() {
    return "tsvector";
  }
});

export const companyTierEnum = pgEnum("company_tier", [...COMPANY_TIERS]);
export const experienceLevelEnum = pgEnum("experience_level", [...EXPERIENCE_LEVELS]);
export const locationTypeEnum = pgEnum("location_type", [...LOCATION_TYPES]);
export const scraperRunStatusEnum = pgEnum("scraper_run_status", [...SCRAPER_RUN_STATUSES]);

export const companies = pgTable(
  "companies",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    domain: text("domain").unique(),
    tier: companyTierEnum("tier").notNull(),
    fortune500Rank: integer("fortune_500_rank"),
    totalFunding: bigint("total_funding", { mode: "number" }),
    lastFundingRound: text("last_funding_round"),
    estimatedRevenue: bigint("estimated_revenue", { mode: "number" }),
    employeeCount: integer("employee_count"),
    industry: text("industry"),
    hqLocation: text("hq_location"),
    logoUrl: text("logo_url"),
    description: text("description"),
    enrichmentSource: text("enrichment_source"),
    enrichmentDate: timestamp("enrichment_date", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    tierIdx: index("idx_companies_tier").on(table.tier),
    domainIdx: index("idx_companies_domain").on(table.domain)
  })
);

export const jobs = pgTable(
  "jobs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .notNull()
      .references(() => companies.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description").notNull(),
    category: text("category").notNull(),
    rawTitle: text("raw_title").notNull(),
    experienceLevel: experienceLevelEnum("experience_level"),
    salaryMin: integer("salary_min"),
    salaryMax: integer("salary_max"),
    salaryCurrency: text("salary_currency").default("USD").notNull(),
    equity: boolean("equity").default(false).notNull(),
    locationType: locationTypeEnum("location_type"),
    locationCity: text("location_city"),
    locationState: text("location_state"),
    locationCountry: text("location_country").default("US").notNull(),
    source: text("source").notNull(),
    sourceUrl: text("source_url").notNull().unique(),
    sourceId: text("source_id"),
    postedAt: timestamp("posted_at", { withTimezone: true }),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    scrapedAt: timestamp("scraped_at", { withTimezone: true }).defaultNow().notNull(),
    searchVector: tsvector("search_vector"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    categoryIdx: index("idx_jobs_category").on(table.category),
    companyIdx: index("idx_jobs_company").on(table.companyId),
    postedIdx: index("idx_jobs_posted").on(table.postedAt),
    sourceUrlIdx: index("idx_jobs_source_url").on(table.sourceUrl)
  })
);

export const subscribers = pgTable("subscribers", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  confirmed: boolean("confirmed").default(false).notNull(),
  confirmToken: text("confirm_token"),
  preferences: jsonb("preferences").$type<Record<string, unknown>>().default({}).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true })
});

export const scraperRuns = pgTable("scraper_runs", {
  id: uuid("id").defaultRandom().primaryKey(),
  source: text("source").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
  jobsFound: integer("jobs_found").default(0).notNull(),
  jobsNew: integer("jobs_new").default(0).notNull(),
  jobsUpdated: integer("jobs_updated").default(0).notNull(),
  errors: jsonb("errors").$type<unknown[]>().default([]).notNull(),
  status: scraperRunStatusEnum("status")
});

export type CompanyRecord = typeof companies.$inferSelect;
export type JobRecord = typeof jobs.$inferSelect;
export type SubscriberRecord = typeof subscribers.$inferSelect;
export type ScraperRunRecord = typeof scraperRuns.$inferSelect;
