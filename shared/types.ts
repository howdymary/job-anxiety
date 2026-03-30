/**
 * Shared domain types and constants for the Job Anxiety monorepo.
 * Frontend, backend, and tooling should import from here for stable contracts.
 */

export const COMPANY_TIERS = ["fortune_500", "vc_backed", "high_revenue"] as const;
export type CompanyTier = (typeof COMPANY_TIERS)[number];

export const COMPANY_TIER_LABELS: Record<CompanyTier, string> = {
  fortune_500: "Fortune 500",
  vc_backed: "VC-backed startup",
  high_revenue: "High-revenue business"
};

export const EXPERIENCE_LEVELS = ["entry", "mid", "senior", "lead", "executive"] as const;
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

export const EXPERIENCE_LEVEL_LABELS: Record<ExperienceLevel, string> = {
  entry: "Entry",
  mid: "Mid",
  senior: "Senior",
  lead: "Lead",
  executive: "Executive"
};

export const LOCATION_TYPES = ["remote", "hybrid", "onsite"] as const;
export type LocationType = (typeof LOCATION_TYPES)[number];

export const SCRAPER_RUN_STATUSES = ["running", "success", "failed"] as const;
export type ScraperRunStatus = (typeof SCRAPER_RUN_STATUSES)[number];

export const JOB_CATEGORIES = [
  "ai_engineer",
  "ai_research_engineer",
  "vibe_coder",
  "gtm_engineer",
  "prompt_engineer",
  "ai_product_manager",
  "ai_safety",
  "ml_ops",
  "data_annotation",
  "ai_solutions_engineer"
] as const;
export type JobCategory = (typeof JOB_CATEGORIES)[number];

export const JOB_CATEGORY_LABELS: Record<JobCategory, string> = {
  ai_engineer: "AI Engineer",
  ai_research_engineer: "AI Research Engineer",
  vibe_coder: "Vibe Coder",
  gtm_engineer: "GTM Engineer",
  prompt_engineer: "Prompt Engineer",
  ai_product_manager: "AI Product Manager",
  ai_safety: "AI Safety",
  ml_ops: "ML Ops",
  data_annotation: "AI Trainer",
  ai_solutions_engineer: "AI Solutions Engineer"
};

export type SubscriberPreferences = {
  categories: JobCategory[];
  tiers: CompanyTier[];
  locationTypes: LocationType[];
};

export type CompanySummary = {
  id: string;
  name: string;
  slug: string;
  tier: CompanyTier;
  logoUrl?: string | null;
  hqLocation?: string | null;
};

export type JobRecord = {
  id: string;
  slug: string;
  title: string;
  companyName: string;
  companyTier: CompanyTier;
  category: JobCategory;
  categoryLabel: string;
  description: string;
  experienceLevel?: ExperienceLevel | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  locationType?: LocationType | null;
  locationLabel?: string | null;
  postedAt?: string | null;
  matchScore?: number | null;
  applyUrl: string;
  source?: string | null;
};

export type JobListItem = JobRecord;

export type TrendPoint = {
  label: string;
  jobs: number;
};

export type TopHiringCompany = {
  company: string;
  jobs: number;
  tier?: CompanyTier;
};

export type LearningResource = {
  title: string;
  url: string;
};

export type LearningPath = {
  slug: string;
  title: string;
  summary: string;
  rampUpWeeks: number;
  salaryRange: string;
  mustHave: string[];
  niceToHave: string[];
  resources: LearningResource[];
};

export type DashboardSnapshot = {
  weeklyNewJobs: number;
  displacedRoleExamples: string[];
  createdRoleExamples: string[];
  featuredJobs: JobRecord[];
  trendSeries: TrendPoint[];
  featuredLearningPaths: LearningPath[];
};

export type PaginatedResponse<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};
