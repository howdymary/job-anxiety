import "server-only";

import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { unstable_cache } from "next/cache";
import os from "node:os";
import path from "node:path";

type JobSourceProvider = "greenhouse" | "ashby";
type NewsCategory = "Hiring" | "Layoffs" | "Workplace";
type FetchState = "live" | "cached" | "empty" | "failed";

type JobSource = {
  key: string;
  company: string;
  companySlug: string;
  provider: JobSourceProvider;
  board: string;
  careersUrl: string;
  scope: "company-wide" | "ai-titled-only";
  cohort: "ai-native" | "broader-company";
};

type NewsFeedSpec = {
  key: string;
  category: NewsCategory;
  query: string;
};

export type LiveHomepageJob = {
  id: string;
  sourceKey: string;
  title: string;
  company: string;
  companySlug: string;
  location: string;
  workplaceLabel: string | null;
  postedAt: string;
  applyUrl: string;
  sourceUrl: string;
  sourceLabel: string;
  companyCareersUrl: string;
  salaryMin: number | null;
  salaryMax: number | null;
  familyLabel: string;
};

export type LiveTrendingJob = LiveHomepageJob & {
  familyCount: number;
  companyCount: number;
  velocityLabel: string;
};

export type LiveNewsItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  category: NewsCategory;
};

export type LiveHiringCompany = {
  company: string;
  companySlug: string;
  openRoles: number;
  freshestAt: string;
  careersUrl: string;
};

export type LiveRoleMomentum = {
  familyLabel: string;
  totalOpenings: number;
  companyCount: number;
  freshestAt: string;
};

export type SourceHealth = {
  key: string;
  company: string;
  provider: JobSourceProvider;
  status: FetchState;
  jobCount: number;
  newestJobAt: string | null;
  lastAttemptAt: string;
  lastSuccessAt: string | null;
  lastError: string | null;
  usedCache: boolean;
};

export type NewsHealth = {
  key: string;
  category: NewsCategory;
  status: FetchState;
  itemCount: number;
  newestItemAt: string | null;
  lastAttemptAt: string;
  lastSuccessAt: string | null;
  lastError: string | null;
  usedCache: boolean;
};

export type HomepageFeed = {
  generatedAt: string;
  lastSuccessfulRefreshAt: string | null;
  headline: string;
  subheading: string;
  newestJobs: LiveHomepageJob[];
  trendingJobs: LiveTrendingJob[];
  news: LiveNewsItem[];
  leadStory: LiveNewsItem | null;
  hiringCompanies: LiveHiringCompany[];
  roleMomentum: LiveRoleMomentum[];
  sourceHealth: SourceHealth[];
  newsHealth: NewsHealth[];
  stats: {
    totalOpenRoles: number;
    jobsPostedToday: number;
    companiesHiring: number;
    trendingRole: string;
    liveJobSources: number;
    totalJobSources: number;
    liveNewsSources: number;
    totalNewsSources: number;
  };
  errors: string[];
};

export type LiveJobsSnapshot = {
  generatedAt: string;
  lastSuccessfulRefreshAt: string | null;
  jobs: LiveHomepageJob[];
  hiringCompanies: LiveHiringCompany[];
  sourceHealth: SourceHealth[];
  newsHealth: NewsHealth[];
  errors: string[];
};

type StoredLiveHomepageSnapshot = {
  version: 1;
  generatedAt: string;
  lastSuccessfulRefreshAt: string | null;
  jobResults: StoredSourceResult[];
  newsResults: StoredNewsResult[];
};

type StoredSourceResult = {
  sourceKey: string;
  jobs: LiveHomepageJob[];
  sourceHealth: SourceHealth;
  error: string | null;
};

type StoredNewsResult = {
  specKey: string;
  items: LiveNewsItem[];
  newsHealth: NewsHealth;
  error: string | null;
};

const JOB_SOURCES: JobSource[] = [
  {
    key: "anthropic",
    company: "Anthropic",
    companySlug: "anthropic",
    provider: "greenhouse",
    board: "anthropic",
    careersUrl: "https://www.anthropic.com/careers",
    scope: "company-wide",
    cohort: "ai-native"
  },
  {
    key: "openai",
    company: "OpenAI",
    companySlug: "openai",
    provider: "ashby",
    board: "openai",
    careersUrl: "https://openai.com/careers",
    scope: "company-wide",
    cohort: "ai-native"
  },
  {
    key: "cursor",
    company: "Cursor",
    companySlug: "cursor",
    provider: "ashby",
    board: "cursor",
    careersUrl: "https://cursor.com/careers",
    scope: "company-wide",
    cohort: "ai-native"
  },
  {
    key: "perplexity",
    company: "Perplexity",
    companySlug: "perplexity",
    provider: "ashby",
    board: "perplexity",
    careersUrl: "https://www.perplexity.ai/careers",
    scope: "company-wide",
    cohort: "ai-native"
  },
  {
    key: "langchain",
    company: "LangChain",
    companySlug: "langchain",
    provider: "ashby",
    board: "langchain",
    careersUrl: "https://www.langchain.com/careers",
    scope: "company-wide",
    cohort: "ai-native"
  },
  {
    key: "cohere",
    company: "Cohere",
    companySlug: "cohere",
    provider: "ashby",
    board: "cohere",
    careersUrl: "https://cohere.com/careers",
    scope: "company-wide",
    cohort: "ai-native"
  },
  {
    key: "scale-ai",
    company: "Scale AI",
    companySlug: "scale-ai",
    provider: "greenhouse",
    board: "scaleai",
    careersUrl: "https://scale.com/careers",
    scope: "company-wide",
    cohort: "ai-native"
  },
  {
    key: "runway",
    company: "Runway",
    companySlug: "runway",
    provider: "greenhouse",
    board: "runwayml",
    careersUrl: "https://runwayml.com/careers",
    scope: "company-wide",
    cohort: "ai-native"
  },
  {
    key: "figure",
    company: "Figure",
    companySlug: "figure",
    provider: "greenhouse",
    board: "figureai",
    careersUrl: "https://www.figure.ai/careers",
    scope: "company-wide",
    cohort: "ai-native"
  },
  {
    key: "together-ai",
    company: "Together AI",
    companySlug: "together-ai",
    provider: "greenhouse",
    board: "togetherai",
    careersUrl: "https://www.together.ai/careers",
    scope: "company-wide",
    cohort: "ai-native"
  },
  {
    key: "stability-ai",
    company: "Stability AI",
    companySlug: "stability-ai",
    provider: "greenhouse",
    board: "stabilityai",
    careersUrl: "https://stability.ai/careers",
    scope: "company-wide",
    cohort: "ai-native"
  },
  {
    key: "notion",
    company: "Notion",
    companySlug: "notion",
    provider: "ashby",
    board: "notion",
    careersUrl: "https://www.notion.com/careers",
    scope: "ai-titled-only",
    cohort: "broader-company"
  },
  {
    key: "ramp",
    company: "Ramp",
    companySlug: "ramp",
    provider: "ashby",
    board: "ramp",
    careersUrl: "https://ramp.com/careers",
    scope: "ai-titled-only",
    cohort: "broader-company"
  },
  {
    key: "databricks",
    company: "Databricks",
    companySlug: "databricks",
    provider: "greenhouse",
    board: "databricks",
    careersUrl: "https://www.databricks.com/company/careers",
    scope: "ai-titled-only",
    cohort: "broader-company"
  },
  {
    key: "figma",
    company: "Figma",
    companySlug: "figma",
    provider: "greenhouse",
    board: "figma",
    careersUrl: "https://www.figma.com/careers",
    scope: "ai-titled-only",
    cohort: "broader-company"
  },
  {
    key: "stripe",
    company: "Stripe",
    companySlug: "stripe",
    provider: "greenhouse",
    board: "stripe",
    careersUrl: "https://stripe.com/jobs",
    scope: "ai-titled-only",
    cohort: "broader-company"
  },
  {
    key: "mongodb",
    company: "MongoDB",
    companySlug: "mongodb",
    provider: "greenhouse",
    board: "mongodb",
    careersUrl: "https://www.mongodb.com/careers",
    scope: "ai-titled-only",
    cohort: "broader-company"
  }
];

const NEWS_FEEDS: NewsFeedSpec[] = [
  {
    key: "hiring",
    category: "Hiring",
    query: '"AI jobs" OR "AI hiring" OR "hiring engineers"'
  },
  {
    key: "layoffs",
    category: "Layoffs",
    query: '"tech layoffs" OR "job cuts" OR "workforce reduction"'
  },
  {
    key: "workplace",
    category: "Workplace",
    query: '"remote work" OR wages OR "labor market"'
  }
];

const JOB_WINDOW_DAYS = 45;
const TREND_WINDOW_DAYS = 21;
const NEWS_WINDOW_DAYS = 21;
const SOURCE_EMPTY_CACHE_GRACE_DAYS = 7;
const HOME_FEED_CACHE_VERSION = 1;
const HOME_FEED_CACHE_PATH = process.env.JOBANXIETY_HOME_FEED_CACHE_PATH ?? path.join(os.tmpdir(), "jobanxiety-live-homepage-cache.json");
const AI_TITLED_ROLE_PATTERNS = [
  /\bai\b/i,
  /\bml\b/i,
  /\bmle\b/i,
  /machine learning/i,
  /artificial intelligence/i,
  /generative ai/i,
  /\bgenai\b/i,
  /\bllm\b/i,
  /multimodal/i,
  /\binference\b/i,
  /applied ai/i,
  /agentic/i,
  /ai platform/i,
  /ai product/i,
  /ai models/i,
  /ai search/i,
  /ai sdk/i,
  /ai gateway/i,
  /mosaic ai/i,
  /research scientist, ai/i,
  /research engineer, ai/i,
  /forward deployed ai/i
];
const BROADER_COMPANY_SOURCE_NAMES = JOB_SOURCES.filter((source) => source.cohort === "broader-company").map((source) => source.company);
const AI_NATIVE_SOURCE_COUNT = JOB_SOURCES.filter((source) => source.cohort === "ai-native").length;

export const LIVE_JOB_SOURCE_LABEL = `Tracked public Greenhouse and Ashby boards across ${AI_NATIVE_SOURCE_COUNT} AI-native companies plus AI-titled roles at ${BROADER_COMPANY_SOURCE_NAMES.join(", ")}.`;

let cachedSnapshotFromDisk: StoredLiveHomepageSnapshot | null | undefined;

const companyRequestHeaders = {
  "User-Agent": "jobanxiety.ai/1.0 (+https://jobanxiety.ai)"
};

function buildCompanyUrl(source: JobSource) {
  if (source.provider === "greenhouse") {
    return `https://boards-api.greenhouse.io/v1/boards/${source.board}/jobs`;
  }

  return `https://api.ashbyhq.com/posting-api/job-board/${source.board}`;
}

function buildNewsUrl(query: string) {
  const params = new URLSearchParams({
    q: query,
    hl: "en-US",
    gl: "US",
    ceid: "US:en"
  });

  return `https://news.google.com/rss/search?${params.toString()}`;
}

function parseDate(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const target = new Date(value);
  return Number.isNaN(target.getTime()) ? null : target;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeError(error: unknown) {
  return error instanceof Error ? error.message : "Unknown feed error";
}

function latestIso(values: Array<string | null | undefined>) {
  const parsed = values
    .map((value) => parseDate(value ?? null))
    .filter((value): value is Date => Boolean(value));

  if (!parsed.length) {
    return null;
  }

  return parsed.sort((left, right) => right.getTime() - left.getTime())[0].toISOString();
}

function mapStoredSourceResults(snapshot: StoredLiveHomepageSnapshot | null) {
  return new Map((snapshot?.jobResults ?? []).map((result) => [result.sourceKey, result] as const));
}

function mapStoredNewsResults(snapshot: StoredLiveHomepageSnapshot | null) {
  return new Map((snapshot?.newsResults ?? []).map((result) => [result.specKey, result] as const));
}

async function readStoredSnapshot(): Promise<StoredLiveHomepageSnapshot | null> {
  if (cachedSnapshotFromDisk !== undefined) {
    return cachedSnapshotFromDisk;
  }

  try {
    const raw = await readFile(HOME_FEED_CACHE_PATH, "utf8");
    const parsed = JSON.parse(raw) as StoredLiveHomepageSnapshot;
    if (parsed.version !== HOME_FEED_CACHE_VERSION) {
      cachedSnapshotFromDisk = null;
      return null;
    }

    cachedSnapshotFromDisk = parsed;
    return parsed;
  } catch {
    cachedSnapshotFromDisk = null;
    return null;
  }
}

async function persistStoredSnapshot(snapshot: StoredLiveHomepageSnapshot) {
  try {
    const directory = path.dirname(HOME_FEED_CACHE_PATH);
    await mkdir(directory, { recursive: true });

    const tempPath = `${HOME_FEED_CACHE_PATH}.tmp`;
    await writeFile(tempPath, JSON.stringify(snapshot), "utf8");
    await rename(tempPath, HOME_FEED_CACHE_PATH);
    cachedSnapshotFromDisk = snapshot;
  } catch {
    // Best effort only. The live feed must still render even if disk writes fail.
  }
}

type RetryOutcome<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

async function fetchWithRetries<T>(
  url: string,
  parser: (response: Response) => Promise<T>,
  options: RequestInit = {},
  attempts = 3
): Promise<RetryOutcome<T>> {
  let lastError = "Unknown feed error";

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(8_000)
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return { ok: true, value: await parser(response) };
    } catch (error) {
      lastError = normalizeError(error);
      if (attempt < attempts) {
        await sleep(1000 * 2 ** (attempt - 1));
      }
    }
  }

  return { ok: false, error: lastError };
}

function isWithinDays(value: string | null | undefined, maxDays: number) {
  const target = parseDate(value);
  if (!target) {
    return false;
  }

  return Date.now() - target.getTime() <= maxDays * 24 * 60 * 60 * 1000;
}

function stripMarkup(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, decimal) => String.fromCodePoint(Number.parseInt(decimal, 10)));
}

function parseMoney(raw: string) {
  const normalized = raw.replace(/[$,\s]/g, "").toLowerCase();
  if (!normalized) {
    return null;
  }

  if (normalized.endsWith("k")) {
    const amount = Number.parseFloat(normalized.slice(0, -1));
    return Number.isNaN(amount) ? null : Math.round(amount * 1000);
  }

  const amount = Number.parseInt(normalized, 10);
  return Number.isNaN(amount) ? null : amount;
}

function extractSalaryRange(text: string | null | undefined) {
  if (!text) {
    return { salaryMin: null, salaryMax: null };
  }

  const patterns = [
    /\$([\d,.]+k?)\s*(?:-|–|to)\s*\$([\d,.]+k?)/i,
    /\$([\d,.]+k?)/i
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (!match) {
      continue;
    }

    const salaryMin = parseMoney(match[1]);
    const salaryMax = parseMoney(match[2] ?? match[1]);

    if (salaryMin && salaryMax) {
      return {
        salaryMin: Math.min(salaryMin, salaryMax),
        salaryMax: Math.max(salaryMin, salaryMax)
      };
    }
  }

  return { salaryMin: null, salaryMax: null };
}

function inferWorkplaceLabel(location: string, workplaceType?: string | null, isRemote?: boolean | null) {
  if (workplaceType === "Remote" || isRemote) {
    return "Remote";
  }

  if (workplaceType === "Hybrid") {
    return "Hybrid";
  }

  if (workplaceType === "OnSite") {
    return "On-site";
  }

  const normalizedLocation = location.toLowerCase();

  if (normalizedLocation.includes("remote")) {
    return "Remote";
  }

  if (normalizedLocation.includes("hybrid")) {
    return "Hybrid";
  }

  return null;
}

function normalizeRoleFamily(title: string) {
  const normalized = title.toLowerCase();

  if (
    /\bai\b/.test(normalized) ||
    /\bml\b/.test(normalized) ||
    normalized.includes("machine learning") ||
    normalized.includes("applied ai") ||
    normalized.includes("artificial intelligence") ||
    normalized.includes("llm") ||
    normalized.includes("generative ai") ||
    normalized.includes("genai") ||
    normalized.includes("multimodal") ||
    normalized.includes("mle") ||
    normalized.includes("inference") ||
    normalized.includes("mosaic ai")
  ) {
    return "Applied AI and ML";
  }

  if (normalized.includes("research scientist") || normalized.includes("research engineer")) {
    return "Research";
  }

  if (normalized.includes("recruit") || normalized.includes("sourcer") || normalized.includes("talent")) {
    return "Talent";
  }

  if (normalized.includes("gtm")) {
    return "GTM Engineering";
  }

  if (normalized.includes("product manager")) {
    return "Product";
  }

  if (normalized.includes("product engineer")) {
    return "Product Engineering";
  }

  if (normalized.includes("software engineer") || normalized.includes("backend") || normalized.includes("front-end")) {
    return "Software Engineering";
  }

  if (normalized.includes("forward deployed") || normalized.includes("solutions")) {
    return "Solutions";
  }

  if (normalized.includes("data") || normalized.includes("ml") || normalized.includes("infrastructure")) {
    return "Data and Platform";
  }

  if (normalized.includes("sales") || normalized.includes("growth") || normalized.includes("marketing")) {
    return "Growth and Revenue";
  }

  if (normalized.includes("operations") || normalized.includes("deal desk") || normalized.includes("revops")) {
    return "Operations";
  }

  const fallback = title
    .split(/[,:/—-]/)[0]
    .trim()
    .split(/\s+/)
    .slice(0, 3)
    .join(" ");

  return fallback || "Generalist";
}

function isAiTitledRole(title: string) {
  return AI_TITLED_ROLE_PATTERNS.some((pattern) => pattern.test(title));
}

function shouldKeepJob(source: JobSource, job: LiveHomepageJob) {
  if (source.scope === "company-wide") {
    return true;
  }

  return isAiTitledRole(job.title);
}

function normalizeGreenhouseJob(source: JobSource, rawJob: Record<string, unknown>): LiveHomepageJob | null {
  const postedAt = typeof rawJob.first_published === "string" ? rawJob.first_published : typeof rawJob.updated_at === "string" ? rawJob.updated_at : null;

  if (!postedAt || !isWithinDays(postedAt, JOB_WINDOW_DAYS)) {
    return null;
  }

  const locationName =
    typeof rawJob.location === "object" && rawJob.location && "name" in rawJob.location && typeof rawJob.location.name === "string"
      ? rawJob.location.name
      : "Location not listed";

  const metadataText = Array.isArray(rawJob.metadata)
    ? rawJob.metadata
        .map((item) => (item && typeof item === "object" && "value" in item && typeof item.value === "string" ? item.value : ""))
        .join(" ")
    : "";

  const salary = extractSalaryRange(metadataText);
  const title = typeof rawJob.title === "string" ? rawJob.title.trim() : null;
  const sourceUrl = typeof rawJob.absolute_url === "string" ? rawJob.absolute_url : null;

  if (!title || !sourceUrl) {
    return null;
  }

  return {
    id: `${source.key}-${String(rawJob.id ?? title)}`,
    sourceKey: source.key,
    title,
    company: source.company,
    companySlug: source.companySlug,
    location: locationName,
    workplaceLabel: inferWorkplaceLabel(locationName),
    postedAt,
    applyUrl: sourceUrl,
    sourceUrl,
    sourceLabel: "Greenhouse",
    companyCareersUrl: source.careersUrl,
    salaryMin: salary.salaryMin,
    salaryMax: salary.salaryMax,
    familyLabel: normalizeRoleFamily(title)
  };
}

function normalizeAshbyJob(source: JobSource, rawJob: Record<string, unknown>): LiveHomepageJob | null {
  const postedAt = typeof rawJob.publishedAt === "string" ? rawJob.publishedAt : null;

  if (!postedAt || !isWithinDays(postedAt, JOB_WINDOW_DAYS)) {
    return null;
  }

  const locationParts = [
    typeof rawJob.location === "string" ? rawJob.location : "",
    ...(Array.isArray(rawJob.secondaryLocations)
      ? rawJob.secondaryLocations
          .map((item) => (item && typeof item === "object" && "location" in item && typeof item.location === "string" ? item.location : ""))
          .filter(Boolean)
      : [])
  ].filter(Boolean);

  const location = locationParts.length > 0 ? Array.from(new Set(locationParts)).join(" / ") : "Location not listed";
  const title = typeof rawJob.title === "string" ? rawJob.title.trim() : null;
  const applyUrl = typeof rawJob.applyUrl === "string" ? rawJob.applyUrl : null;
  const sourceUrl = typeof rawJob.jobUrl === "string" ? rawJob.jobUrl : null;
  const description = typeof rawJob.descriptionPlain === "string" ? rawJob.descriptionPlain : "";

  if (!title || !applyUrl || !sourceUrl) {
    return null;
  }

  const salary = extractSalaryRange(description);
  const workplaceType = typeof rawJob.workplaceType === "string" ? rawJob.workplaceType : null;
  const isRemote = typeof rawJob.isRemote === "boolean" ? rawJob.isRemote : null;

  return {
    id: `${source.key}-${String(rawJob.id ?? title)}`,
    sourceKey: source.key,
    title,
    company: source.company,
    companySlug: source.companySlug,
    location,
    workplaceLabel: inferWorkplaceLabel(location, workplaceType, isRemote),
    postedAt,
    applyUrl,
    sourceUrl,
    sourceLabel: "Ashby",
    companyCareersUrl: source.careersUrl,
    salaryMin: salary.salaryMin,
    salaryMax: salary.salaryMax,
    familyLabel: normalizeRoleFamily(title)
  };
}

async function loadJobsFromSource(source: JobSource, cachedResult: StoredSourceResult | null) {
  const url = buildCompanyUrl(source);
  const attemptedAt = new Date().toISOString();
  const response = await fetchWithRetries(
    url,
    async (response) => {
      const payload = (await response.json()) as { jobs?: Record<string, unknown>[] };
      const rawJobs = Array.isArray(payload.jobs) ? payload.jobs : [];
      const jobs = rawJobs
        .map((job) => (source.provider === "greenhouse" ? normalizeGreenhouseJob(source, job) : normalizeAshbyJob(source, job)))
        .filter((job): job is LiveHomepageJob => Boolean(job))
        .filter((job) => shouldKeepJob(source, job))
        .sort((left, right) => new Date(right.postedAt).getTime() - new Date(left.postedAt).getTime());

      return jobs;
    },
    { headers: companyRequestHeaders, next: { revalidate: 600 } }
  );

  const liveJobs = response.ok ? response.value : [];
  const liveNewestJobAt = liveJobs[0]?.postedAt ?? null;
  const hasLiveJobs = liveJobs.length > 0;
  const hasCachedJobs = Boolean(cachedResult?.jobs?.length);
  const cachedHealth = cachedResult?.sourceHealth;
  const cachedLastSuccessAt = cachedHealth?.lastSuccessAt ?? cachedHealth?.newestJobAt ?? null;
  const cachedIsFresh =
    cachedLastSuccessAt != null && Date.now() - new Date(cachedLastSuccessAt).getTime() <= SOURCE_EMPTY_CACHE_GRACE_DAYS * 24 * 60 * 60 * 1000;
  const shouldUseCache = hasCachedJobs && (!response.ok || (!hasLiveJobs && cachedIsFresh));
  const jobs = shouldUseCache ? (cachedResult?.jobs ?? []) : liveJobs;
  const cacheReason = !response.ok ? response.error : !hasLiveJobs && cachedIsFresh ? "Source returned no jobs; using the last verified snapshot." : null;
  const sourceHealth: SourceHealth = {
    key: source.key,
    company: source.company,
    provider: source.provider,
    status: hasLiveJobs ? "live" : shouldUseCache ? "cached" : response.ok ? "empty" : "failed",
    jobCount: jobs.length,
    newestJobAt: jobs[0]?.postedAt ?? null,
    lastAttemptAt: attemptedAt,
    lastSuccessAt: hasLiveJobs ? liveNewestJobAt : cachedLastSuccessAt,
    lastError: cacheReason,
    usedCache: shouldUseCache
  };

  if (!response.ok) {
    console.warn(`[jobanxiety] source fetch failed for ${source.key}: ${response.error}`);
  } else if (!hasLiveJobs && cachedIsFresh) {
    console.warn(`[jobanxiety] source ${source.key} returned no jobs; using cached snapshot`);
  } else if (!hasLiveJobs) {
    console.info(`[jobanxiety] source ${source.key} returned no jobs`);
  }

  return {
    jobs,
    sourceHealth,
    error: cacheReason ? `${source.company}: ${cacheReason}` : null
  };
}

function readTag(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeHtmlEntities(match[1].trim()) : null;
}

function parseNewsItems(xml: string, category: NewsCategory) {
  const matches = xml.matchAll(/<item>([\s\S]*?)<\/item>/gi);
  const items: LiveNewsItem[] = [];

  for (const match of matches) {
    const block = match[1];
    const rawTitle = readTag(block, "title");
    const url = readTag(block, "link");
    const publishedAt = readTag(block, "pubDate");
    const source = readTag(block, "source");

    if (!rawTitle || !url || !publishedAt || !source) {
      continue;
    }

    const parsedPublishedAt = parseDate(publishedAt);
    if (!parsedPublishedAt) {
      continue;
    }

    const isoPublishedAt = parsedPublishedAt.toISOString();
    if (!isWithinDays(isoPublishedAt, NEWS_WINDOW_DAYS)) {
      continue;
    }

    const title = rawTitle.endsWith(` - ${source}`) ? rawTitle.slice(0, -(source.length + 3)) : rawTitle;

    items.push({
      id: `${category}-${title}`,
      title,
      url,
      source: stripMarkup(source),
      publishedAt: isoPublishedAt,
      category
    });
  }

  return items;
}

async function loadNewsFeed(spec: NewsFeedSpec, cachedResult: StoredNewsResult | null) {
  const attemptedAt = new Date().toISOString();
  const response = await fetchWithRetries(
    buildNewsUrl(spec.query),
    async (response) => parseNewsItems(await response.text(), spec.category),
    { headers: companyRequestHeaders, next: { revalidate: 900 } }
  );

  const liveItems = response.ok ? response.value : [];
  const hasLiveItems = liveItems.length > 0;
  const hasCachedItems = Boolean(cachedResult?.items?.length);
  const shouldUseCache = !response.ok && hasCachedItems;
  const items = shouldUseCache ? (cachedResult?.items ?? []) : liveItems;
  const cachedHealth = cachedResult?.newsHealth;
  const cachedLastSuccessAt = cachedHealth?.lastSuccessAt ?? cachedHealth?.newestItemAt ?? null;
  const newsHealth: NewsHealth = {
    key: spec.key,
    category: spec.category,
    status: hasLiveItems ? "live" : shouldUseCache ? "cached" : response.ok ? "empty" : "failed",
    itemCount: items.length,
    newestItemAt: items[0]?.publishedAt ?? null,
    lastAttemptAt: attemptedAt,
    lastSuccessAt: hasLiveItems ? items[0]?.publishedAt ?? null : cachedLastSuccessAt,
    lastError: response.ok ? null : response.error,
    usedCache: shouldUseCache
  };

  if (!response.ok) {
    console.warn(`[jobanxiety] news feed failed for ${spec.key}: ${response.error}`);
  } else if (!hasLiveItems) {
    console.info(`[jobanxiety] news feed ${spec.key} returned no items`);
  }

  return {
    items,
    newsHealth,
    error: response.ok ? null : `News (${spec.category}): ${response.error}`
  };
}

function dedupeJobs(jobs: LiveHomepageJob[]) {
  const seen = new Set<string>();

  return jobs.filter((job) => {
    const key = `${job.company}|${job.title}|${job.location}`.toLowerCase();
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function slugifySegment(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function getLiveJobSlug(job: Pick<LiveHomepageJob, "companySlug" | "title" | "id">) {
  const titlePart = slugifySegment(job.title) || "role";
  const idPart = slugifySegment(job.id) || "job";
  return `${job.companySlug}-${titlePart}-${idPart}`;
}

function buildNewestJobs(jobs: LiveHomepageJob[]) {
  const seen = new Set<string>();

  return jobs.filter((job) => {
    const key = `${job.company}|${job.title}`.toLowerCase();
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function buildRoleMomentum(jobs: LiveHomepageJob[]) {
  const grouped = new Map<string, { jobs: LiveHomepageJob[]; companies: Set<string> }>();

  for (const job of jobs) {
    if (!isWithinDays(job.postedAt, TREND_WINDOW_DAYS)) {
      continue;
    }

    const entry = grouped.get(job.familyLabel) ?? { jobs: [], companies: new Set<string>() };
    entry.jobs.push(job);
    entry.companies.add(job.company);
    grouped.set(job.familyLabel, entry);
  }

  return Array.from(grouped.entries())
    .map(([familyLabel, entry]) => ({
      familyLabel,
      totalOpenings: entry.jobs.length,
      companyCount: entry.companies.size,
      freshestAt: entry.jobs.sort((left, right) => new Date(right.postedAt).getTime() - new Date(left.postedAt).getTime())[0]?.postedAt ?? new Date(0).toISOString()
    }))
    .sort((left, right) => {
      if (right.companyCount !== left.companyCount) {
        return right.companyCount - left.companyCount;
      }

      if (right.totalOpenings !== left.totalOpenings) {
        return right.totalOpenings - left.totalOpenings;
      }

      return new Date(right.freshestAt).getTime() - new Date(left.freshestAt).getTime();
    });
}

function buildTrendingJobs(jobs: LiveHomepageJob[], roleMomentum: LiveRoleMomentum[]) {
  const grouped = new Map<string, { jobs: LiveHomepageJob[]; companies: Set<string> }>();

  for (const job of jobs) {
    if (!isWithinDays(job.postedAt, TREND_WINDOW_DAYS)) {
      continue;
    }

    const entry = grouped.get(job.familyLabel) ?? { jobs: [], companies: new Set<string>() };
    entry.jobs.push(job);
    entry.companies.add(job.company);
    grouped.set(job.familyLabel, entry);
  }

  const momentumByFamily = new Map(roleMomentum.map((item) => [item.familyLabel, item]));

  return Array.from(grouped.entries())
    .map(([familyLabel, entry]) => {
      const leadJob = entry.jobs.sort((left, right) => new Date(right.postedAt).getTime() - new Date(left.postedAt).getTime())[0];
      const momentum = momentumByFamily.get(familyLabel);

      if (!leadJob || !momentum) {
        return null;
      }

      return {
        ...leadJob,
        familyCount: momentum.totalOpenings,
        companyCount: momentum.companyCount,
        velocityLabel:
          momentum.companyCount > 1
            ? `${momentum.totalOpenings} fresh posts across ${momentum.companyCount} companies`
            : `${momentum.totalOpenings} fresh posts this cycle`
      } satisfies LiveTrendingJob;
    })
    .filter((item): item is LiveTrendingJob => Boolean(item))
    .sort((left, right) => {
      if (right.companyCount !== left.companyCount) {
        return right.companyCount - left.companyCount;
      }

      if (right.familyCount !== left.familyCount) {
        return right.familyCount - left.familyCount;
      }

      return new Date(right.postedAt).getTime() - new Date(left.postedAt).getTime();
    });
}

function buildHiringCompanies(jobs: LiveHomepageJob[]) {
  const grouped = new Map<string, LiveHiringCompany>();

  for (const job of jobs) {
    const existing = grouped.get(job.company);
    if (!existing) {
      grouped.set(job.company, {
        company: job.company,
        companySlug: job.companySlug,
        openRoles: 1,
        freshestAt: job.postedAt,
        careersUrl: job.companyCareersUrl
      });
      continue;
    }

    existing.openRoles += 1;
    if (new Date(job.postedAt).getTime() > new Date(existing.freshestAt).getTime()) {
      existing.freshestAt = job.postedAt;
    }
  }

  return Array.from(grouped.values()).sort((left, right) => {
    if (right.openRoles !== left.openRoles) {
      return right.openRoles - left.openRoles;
    }

    return new Date(right.freshestAt).getTime() - new Date(left.freshestAt).getTime();
  });
}

function buildHomepageSummary(
  jobs: LiveHomepageJob[],
  news: LiveNewsItem[],
  roleMomentum: LiveRoleMomentum[],
  sourceHealth: SourceHealth[],
  newsHealth: NewsHealth[]
) {
  const jobsPostedToday = jobs.filter((job) => isWithinDays(job.postedAt, 1)).length;
  const totalOpenRoles = jobs.length;
  const companiesHiring = new Set(jobs.map((job) => job.company)).size;
  const leadStory = news[0] ?? null;
  const liveJobSources = sourceHealth.filter((source) => source.status !== "failed").length;
  const liveNewsSources = newsHealth.filter((item) => item.status !== "failed").length;
  const trendingRole = roleMomentum[0]?.familyLabel ?? "No clear role pulse yet";

  const headline =
    jobsPostedToday > 0
      ? `${jobsPostedToday} new openings hit the tracked AI boards and filtered AI-role feeds in the last 24 hours.`
      : `${jobs.length} recent openings are still live across the tracked AI boards and filtered AI-role feeds.`;

  const subheading =
    companiesHiring > 0
      ? `Newest jobs are ranked by publish time, trending jobs by posting velocity, and the market brief by the latest reporting on hiring, layoffs, and workplace shifts across ${companiesHiring} hiring companies.`
      : "The live feeds are reachable, but there is not enough recent inventory yet to call a real market pulse.";

  return {
    leadStory,
    headline,
    subheading,
    stats: {
      totalOpenRoles,
      jobsPostedToday,
      companiesHiring,
      trendingRole,
      liveJobSources,
      totalJobSources: JOB_SOURCES.length,
      liveNewsSources,
      totalNewsSources: NEWS_FEEDS.length
    }
  };
}

async function getHomepageFeedUncached(): Promise<HomepageFeed> {
  const generatedAt = new Date().toISOString();
  const storedSnapshot = await readStoredSnapshot();
  const cachedJobResults = mapStoredSourceResults(storedSnapshot);
  const cachedNewsResults = mapStoredNewsResults(storedSnapshot);
  const [jobResults, newsResults] = await Promise.all([
    Promise.all(JOB_SOURCES.map((source) => loadJobsFromSource(source, cachedJobResults.get(source.key) ?? null))),
    Promise.all(NEWS_FEEDS.map((spec) => loadNewsFeed(spec, cachedNewsResults.get(spec.key) ?? null)))
  ]);

  const jobs = dedupeJobs(jobResults.flatMap((result) => result.jobs)).sort(
    (left, right) => new Date(right.postedAt).getTime() - new Date(left.postedAt).getTime()
  );
  const sourceHealth = jobResults.map((result) => result.sourceHealth);
  const newsHealth = newsResults.map((result) => result.newsHealth);
  const errors = [...jobResults.map((result) => result.error), ...newsResults.map((result) => result.error)].filter(
    (error): error is string => Boolean(error)
  );
  const news = newsResults
    .flatMap((result) => result.items)
    .filter((item, index, items) => items.findIndex((candidate) => candidate.title === item.title) === index)
    .sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());
  const newestJobs = buildNewestJobs(jobs);
  const roleMomentum = buildRoleMomentum(jobs).slice(0, 6);
  const trendingJobs = buildTrendingJobs(jobs, roleMomentum).slice(0, 6);
  const hiringCompanies = buildHiringCompanies(jobs).slice(0, 6);
  const summary = buildHomepageSummary(jobs, news, roleMomentum, sourceHealth, newsHealth);
  const lastSuccessfulRefreshAt = latestIso([
    ...jobResults.map((result) => result.sourceHealth.lastSuccessAt),
    ...newsResults.map((result) => result.newsHealth.lastSuccessAt)
  ]);

  if (jobs.length > 0 || news.length > 0) {
    await persistStoredSnapshot({
      version: HOME_FEED_CACHE_VERSION,
      generatedAt,
      lastSuccessfulRefreshAt,
      jobResults: jobResults.map((result) => ({
        sourceKey: result.sourceHealth.key,
        jobs: result.jobs,
        sourceHealth: result.sourceHealth,
        error: result.error
      })),
      newsResults: newsResults.map((result) => ({
        specKey: result.newsHealth.key,
        items: result.items,
        newsHealth: result.newsHealth,
        error: result.error
      }))
    });
  }

  return {
    generatedAt,
    lastSuccessfulRefreshAt,
    headline: summary.headline,
    subheading: summary.subheading,
    newestJobs: newestJobs.slice(0, 12),
    trendingJobs,
    news: news.slice(0, 10),
    leadStory: summary.leadStory,
    hiringCompanies,
    roleMomentum,
    sourceHealth,
    newsHealth,
    stats: summary.stats,
    errors
  };
}

async function getLiveJobsSnapshotUncached(): Promise<LiveJobsSnapshot> {
  const generatedAt = new Date().toISOString();
  const storedSnapshot = await readStoredSnapshot();
  const cachedJobResults = mapStoredSourceResults(storedSnapshot);
  const cachedNewsResults = mapStoredNewsResults(storedSnapshot);
  const jobResults = await Promise.all(JOB_SOURCES.map((source) => loadJobsFromSource(source, cachedJobResults.get(source.key) ?? null)));
  const jobs = dedupeJobs(jobResults.flatMap((result) => result.jobs)).sort(
    (left, right) => new Date(right.postedAt).getTime() - new Date(left.postedAt).getTime()
  );
  const sourceHealth = jobResults.map((result) => result.sourceHealth);
  const newsHealth = NEWS_FEEDS.map((spec) => cachedNewsResults.get(spec.key)?.newsHealth ?? null).filter((item): item is NewsHealth => Boolean(item));
  const errors = jobResults.map((result) => result.error).filter((error): error is string => Boolean(error));
  const hiringCompanies = buildHiringCompanies(jobs);
  const lastSuccessfulRefreshAt = latestIso([
    ...jobResults.map((result) => result.sourceHealth.lastSuccessAt),
    ...Array.from(cachedNewsResults.values()).map((result) => result.newsHealth.lastSuccessAt)
  ]);

  if (jobs.length > 0) {
    await persistStoredSnapshot({
      version: HOME_FEED_CACHE_VERSION,
      generatedAt,
      lastSuccessfulRefreshAt,
      jobResults: jobResults.map((result) => ({
        sourceKey: result.sourceHealth.key,
        jobs: result.jobs,
        sourceHealth: result.sourceHealth,
        error: result.error
      })),
      newsResults: NEWS_FEEDS.map((spec) => {
        const cachedNews = cachedNewsResults.get(spec.key);
        return cachedNews
          ? {
              specKey: spec.key,
              items: cachedNews.items,
              newsHealth: cachedNews.newsHealth,
              error: cachedNews.error
            }
          : {
              specKey: spec.key,
              items: [],
              newsHealth: {
                key: spec.key,
                category: spec.category,
                status: "empty",
                itemCount: 0,
                newestItemAt: null,
                lastAttemptAt: generatedAt,
                lastSuccessAt: null,
                lastError: null,
                usedCache: false
              },
              error: null
            };
      })
    });
  }

  return {
    generatedAt,
    lastSuccessfulRefreshAt,
    jobs,
    hiringCompanies,
    sourceHealth,
    newsHealth,
    errors
  };
}

export const getHomepageFeed = unstable_cache(getHomepageFeedUncached, ["homepage-feed-v1"], {
  revalidate: 600
});

export const getLiveJobsSnapshot = unstable_cache(getLiveJobsSnapshotUncached, ["live-jobs-v1"], {
  revalidate: 600
});

export async function getLiveJobBySlug(slug: string) {
  const snapshot = await getLiveJobsSnapshot();
  return snapshot.jobs.find((job) => getLiveJobSlug(job) === slug) ?? null;
}
