/**
 * Stable mock data for the first backend pass.
 * This keeps the API useful before Postgres + scraper ingestion are wired end to end.
 */

import {
  JOB_CATEGORY_LABELS,
  type CompanySummary,
  type JobRecord,
  type TopHiringCompany,
  type TrendPoint
} from "../../../shared/types";

export const mockCompanies: CompanySummary[] = [
  {
    id: "company-openai",
    name: "OpenAI",
    slug: "openai",
    tier: "vc_backed",
    hqLocation: "San Francisco, CA"
  },
  {
    id: "company-anthropic",
    name: "Anthropic",
    slug: "anthropic",
    tier: "vc_backed",
    hqLocation: "San Francisco, CA"
  },
  {
    id: "company-vercel",
    name: "Vercel",
    slug: "vercel",
    tier: "high_revenue",
    hqLocation: "Remote"
  },
  {
    id: "company-microsoft",
    name: "Microsoft",
    slug: "microsoft",
    tier: "fortune_500",
    hqLocation: "Redmond, WA"
  }
];

export const mockJobs: JobRecord[] = [
  {
    id: "job-openai-ai-pm",
    slug: "openai-ai-product-manager",
    title: "AI Product Manager",
    companyName: "OpenAI",
    companyTier: "vc_backed",
    category: "ai_product_manager",
    categoryLabel: JOB_CATEGORY_LABELS.ai_product_manager,
    description:
      "Shape model-powered product experiences, define evaluation loops, and partner across research, safety, and engineering to ship trusted AI systems.",
    experienceLevel: "senior",
    salaryMin: 220000,
    salaryMax: 320000,
    locationType: "hybrid",
    locationLabel: "San Francisco, CA",
    postedAt: "2026-03-20T12:00:00.000Z",
    matchScore: 94,
    applyUrl: "https://openai.com/careers",
    source: "company"
  },
  {
    id: "job-anthropic-safety",
    slug: "anthropic-ai-safety-researcher",
    title: "AI Safety Researcher",
    companyName: "Anthropic",
    companyTier: "vc_backed",
    category: "ai_safety",
    categoryLabel: JOB_CATEGORY_LABELS.ai_safety,
    description:
      "Run evaluations, design guardrail systems, and help frontier models behave safely in real user workflows.",
    experienceLevel: "mid",
    salaryMin: 210000,
    salaryMax: 290000,
    locationType: "remote",
    locationLabel: "Remote (US)",
    postedAt: "2026-03-22T12:00:00.000Z",
    matchScore: 91,
    applyUrl: "https://www.anthropic.com/careers",
    source: "greenhouse"
  },
  {
    id: "job-vercel-vibe-coder",
    slug: "vercel-ai-native-product-engineer",
    title: "AI-Native Product Engineer",
    companyName: "Vercel",
    companyTier: "high_revenue",
    category: "vibe_coder",
    categoryLabel: JOB_CATEGORY_LABELS.vibe_coder,
    description:
      "Use AI-assisted workflows to ship product experiments quickly, validate ideas with users, and define AI-first engineering practices.",
    experienceLevel: "mid",
    salaryMin: 170000,
    salaryMax: 240000,
    locationType: "remote",
    locationLabel: "Remote",
    postedAt: "2026-03-18T12:00:00.000Z",
    matchScore: 88,
    applyUrl: "https://vercel.com/careers",
    source: "greenhouse"
  },
  {
    id: "job-microsoft-ai-engineer",
    slug: "microsoft-ai-engineer-platform",
    title: "AI Engineer, Applied Platform",
    companyName: "Microsoft",
    companyTier: "fortune_500",
    category: "ai_engineer",
    categoryLabel: JOB_CATEGORY_LABELS.ai_engineer,
    description:
      "Build enterprise AI features, model integrations, and evaluation tooling that serve customer-facing workflows at scale.",
    experienceLevel: "lead",
    salaryMin: 195000,
    salaryMax: 265000,
    locationType: "hybrid",
    locationLabel: "New York, NY",
    postedAt: "2026-03-21T12:00:00.000Z",
    matchScore: 86,
    applyUrl: "https://careers.microsoft.com",
    source: "company"
  }
];

export const mockTrendSeries: TrendPoint[] = [
  { label: "Jan", jobs: 3200 },
  { label: "Feb", jobs: 4100 },
  { label: "Mar", jobs: 5250 },
  { label: "Apr", jobs: 6120 },
  { label: "May", jobs: 7040 },
  { label: "Jun", jobs: 8120 }
];

export const mockTopHiringCompanies: TopHiringCompany[] = [
  { company: "Anthropic", jobs: 42, tier: "vc_backed" },
  { company: "OpenAI", jobs: 36, tier: "vc_backed" },
  { company: "Vercel", jobs: 29, tier: "high_revenue" },
  { company: "Microsoft", jobs: 25, tier: "fortune_500" }
];

export const mockLocationDistribution = [
  { label: "San Francisco, CA", jobs: 112 },
  { label: "New York, NY", jobs: 76 },
  { label: "Remote (US)", jobs: 184 },
  { label: "Remote (Global)", jobs: 61 }
];

export const mockSalaryRanges = [
  { category: "ai_engineer", label: JOB_CATEGORY_LABELS.ai_engineer, averageMin: 180000, averageMax: 255000 },
  {
    category: "ai_product_manager",
    label: JOB_CATEGORY_LABELS.ai_product_manager,
    averageMin: 185000,
    averageMax: 270000
  },
  { category: "ai_safety", label: JOB_CATEGORY_LABELS.ai_safety, averageMin: 200000, averageMax: 285000 },
  { category: "vibe_coder", label: JOB_CATEGORY_LABELS.vibe_coder, averageMin: 145000, averageMax: 220000 }
];
