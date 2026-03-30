export type CompanyTier = "Fortune 500" | "VC-backed startup" | "High-revenue business";

export type JobLocationType = "Remote" | "Hybrid" | "On-site";

export type ExperienceBand = "Entry" | "Mid" | "Senior" | "Lead";

export type JobCategorySlug =
  | "ai-engineer"
  | "gtm-engineer"
  | "vibe-coder"
  | "prompt-engineer"
  | "ai-product-manager"
  | "ml-ops-engineer"
  | "ai-safety-researcher"
  | "forward-deployed-engineer"
  | "ai-ux-designer"
  | "context-engineer"
  | "ai-solutions-engineer"
  | "data-annotation-specialist";

export type JobCategory = {
  slug: JobCategorySlug;
  title: string;
  salaryRange: string;
  growth: string;
  oneLiner: string;
};

export type CompanyRecord = {
  slug: string;
  name: string;
  tier: CompanyTier;
  stageLabel: string;
  headquarters: string;
  description: string;
  website: string;
  careersUrl: string;
  hiringFocus: string;
};

export type JobRecord = {
  slug: string;
  title: string;
  companySlug: string;
  company: string;
  companyTier: CompanyTier;
  companyStageLabel: string;
  category: JobCategorySlug;
  categoryLabel: string;
  location: string;
  locationType: JobLocationType;
  city: string;
  experience: ExperienceBand;
  salaryMin: number;
  salaryMax: number;
  postedAt: string;
  excerpt: string;
  description: string[];
  applyUrl: string;
  relatedCompanyJobSlugs: string[];
};

export type TrendPoint = {
  label: string;
  roles: number;
};

export type TrendStat = {
  label: string;
  value: string;
  context: string;
};

export type PulseStat = {
  label: string;
  value: string;
  context: string;
  href: string;
};

export type LayoffConfidence = "Confirmed" | "Reported" | "Rumored";

export type LayoffAiSignal = "Cited" | "Contextual" | "Not cited";

export type LayoffEvent = {
  slug: string;
  company: string;
  companySlug?: string;
  announcedDate: string;
  affectedCount: number;
  affectedPercent?: number;
  confidence: LayoffConfidence;
  aiSignal: LayoffAiSignal;
  sourceType: string;
  sourceLabel: string;
  sourceUrl: string;
  secondarySources?: string[];
  departments?: string[];
  macroContext: string;
  aiAttribution?: string;
};

export type AuditedLayoffEvent = {
  slug: string;
  company: string;
  companySlug?: string;
  announcedLabel: string;
  affectedCount: number;
  affectedCountLabel: string;
  affectedPercent?: number;
  isApproximate?: boolean;
  confidence: "Confirmed";
  aiSignal: LayoffAiSignal;
  sourceType: string;
  sourceLabel: string;
  sourceUrl: string;
  macroContext: string;
  aiAttribution?: string;
  secondarySources?: string[];
};

export type DisplacementPoint = {
  label: string;
  jobsCreated: number;
  aiLayoffs: number;
};

export type VerifiedOccupationOutlook = {
  occupation: string;
  socCode: string;
  majorGroup: string;
  employment2024: number;
  medianWage2024: number;
  projectedGrowthPct: number;
  projectedGrowthAbs: number;
  annualOpenings?: number;
  sourceLabel: string;
  sourceUrl: string;
};

export type MethodologySection = {
  title: string;
  body: string[];
  bullets?: string[];
};

export type CorrectionEntry = {
  date: string;
  title: string;
  body: string;
  status: string;
};

export type PressResource = {
  title: string;
  description: string;
  href: string;
  format: string;
};

export type ApiEndpointDoc = {
  method: string;
  path: string;
  description: string;
  auth: string;
};

export type CareerNoteSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type SalaryRow = {
  experience: string;
  base: string;
  total: string;
};

export type CareerNote = {
  slug: JobCategorySlug;
  role: string;
  title: string;
  subtitle: string;
  salaryRange: string;
  growth: string;
  updatedAt: string;
  experienceBand: string;
  cardDescription: string;
  sections: CareerNoteSection[];
  salaryRows: SalaryRow[];
  mustHave: string[];
  niceToHave: string[];
  hiringByTier: Array<{
    tier: CompanyTier;
    companies: string[];
  }>;
  relatedNoteSlugs: JobCategorySlug[];
};

export type InsightArticle = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  targetKeyword: string;
  relatedNoteSlugs: JobCategorySlug[];
  sections: CareerNoteSection[];
};
