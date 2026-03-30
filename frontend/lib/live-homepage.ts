import "server-only";

import { unstable_cache } from "next/cache";

type JobSourceProvider = "greenhouse" | "ashby";
type NewsCategory = "Hiring" | "Layoffs" | "Workplace";

type JobSource = {
  key: string;
  company: string;
  companySlug: string;
  provider: JobSourceProvider;
  board: string;
  careersUrl: string;
};

type NewsFeedSpec = {
  key: string;
  category: NewsCategory;
  query: string;
};

export type LiveHomepageJob = {
  id: string;
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
  status: "live" | "error";
  jobCount: number;
  newestJobAt: string | null;
};

export type HomepageFeed = {
  generatedAt: string;
  headline: string;
  subheading: string;
  newestJobs: LiveHomepageJob[];
  trendingJobs: LiveTrendingJob[];
  news: LiveNewsItem[];
  leadStory: LiveNewsItem | null;
  hiringCompanies: LiveHiringCompany[];
  roleMomentum: LiveRoleMomentum[];
  sourceHealth: SourceHealth[];
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
  jobs: LiveHomepageJob[];
  hiringCompanies: LiveHiringCompany[];
  sourceHealth: SourceHealth[];
  errors: string[];
};

const JOB_SOURCES: JobSource[] = [
  {
    key: "openai",
    company: "OpenAI",
    companySlug: "openai",
    provider: "ashby",
    board: "openai",
    careersUrl: "https://openai.com/careers"
  },
  {
    key: "cursor",
    company: "Cursor",
    companySlug: "cursor",
    provider: "ashby",
    board: "cursor",
    careersUrl: "https://cursor.com/careers"
  },
  {
    key: "perplexity",
    company: "Perplexity",
    companySlug: "perplexity",
    provider: "ashby",
    board: "perplexity",
    careersUrl: "https://www.perplexity.ai/careers"
  },
  {
    key: "langchain",
    company: "LangChain",
    companySlug: "langchain",
    provider: "ashby",
    board: "langchain",
    careersUrl: "https://www.langchain.com/careers"
  },
  {
    key: "scale-ai",
    company: "Scale AI",
    companySlug: "scale-ai",
    provider: "greenhouse",
    board: "scaleai",
    careersUrl: "https://scale.com/careers"
  },
  {
    key: "runway",
    company: "Runway",
    companySlug: "runway",
    provider: "greenhouse",
    board: "runwayml",
    careersUrl: "https://runwayml.com/careers"
  },
  {
    key: "figure",
    company: "Figure",
    companySlug: "figure",
    provider: "greenhouse",
    board: "figureai",
    careersUrl: "https://www.figure.ai/careers"
  },
  {
    key: "together-ai",
    company: "Together AI",
    companySlug: "together-ai",
    provider: "greenhouse",
    board: "togetherai",
    careersUrl: "https://www.together.ai/careers"
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

  if (normalized.includes("research scientist") || normalized.includes("research engineer")) {
    return "Research";
  }

  if (normalized.includes("recruit") || normalized.includes("sourcer") || normalized.includes("talent")) {
    return "Talent"
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

async function loadJobsFromSource(source: JobSource) {
  const url = buildCompanyUrl(source);

  try {
    const response = await fetch(url, {
      headers: companyRequestHeaders,
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(8_000)
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const payload = (await response.json()) as { jobs?: Record<string, unknown>[] };
    const rawJobs = Array.isArray(payload.jobs) ? payload.jobs : [];
    const jobs = rawJobs
      .map((job) => (source.provider === "greenhouse" ? normalizeGreenhouseJob(source, job) : normalizeAshbyJob(source, job)))
      .filter((job): job is LiveHomepageJob => Boolean(job))
      .sort((left, right) => new Date(right.postedAt).getTime() - new Date(left.postedAt).getTime());

    return {
      jobs,
      sourceHealth: {
        key: source.key,
        company: source.company,
        provider: source.provider,
        status: "live" as const,
        jobCount: jobs.length,
        newestJobAt: jobs[0]?.postedAt ?? null
      },
      error: null
    };
  } catch (error) {
    return {
      jobs: [] as LiveHomepageJob[],
      sourceHealth: {
        key: source.key,
        company: source.company,
        provider: source.provider,
        status: "error" as const,
        jobCount: 0,
        newestJobAt: null
      },
      error: `${source.company}: ${error instanceof Error ? error.message : "Unknown feed error"}`
    };
  }
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

async function loadNewsFeed(spec: NewsFeedSpec) {
  try {
    const response = await fetch(buildNewsUrl(spec.query), {
      headers: companyRequestHeaders,
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(8_000)
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const xml = await response.text();

    return {
      items: parseNewsItems(xml, spec.category),
      error: null
    };
  } catch (error) {
    return {
      items: [] as LiveNewsItem[],
      error: `News (${spec.category}): ${error instanceof Error ? error.message : "Unknown feed error"}`
    };
  }
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
  liveNewsSources: number
) {
  const jobsPostedToday = jobs.filter((job) => isWithinDays(job.postedAt, 1)).length;
  const totalOpenRoles = jobs.length;
  const companiesHiring = new Set(jobs.map((job) => job.company)).size;
  const leadStory = news[0] ?? null;
  const liveJobSources = sourceHealth.filter((source) => source.status === "live").length;
  const trendingRole = roleMomentum[0]?.familyLabel ?? "No clear role pulse yet";

  const headline =
    jobsPostedToday > 0
      ? `${jobsPostedToday} new openings hit tracked AI company boards in the last 24 hours.`
      : `${jobs.length} recent openings are still live across tracked AI company boards.`;

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
  const [jobResults, newsResults] = await Promise.all([
    Promise.all(JOB_SOURCES.map((source) => loadJobsFromSource(source))),
    Promise.all(NEWS_FEEDS.map((spec) => loadNewsFeed(spec)))
  ]);

  const jobs = dedupeJobs(jobResults.flatMap((result) => result.jobs)).sort(
    (left, right) => new Date(right.postedAt).getTime() - new Date(left.postedAt).getTime()
  );
  const sourceHealth = jobResults.map((result) => result.sourceHealth);
  const errors = [...jobResults.map((result) => result.error), ...newsResults.map((result) => result.error)].filter(
    (error): error is string => Boolean(error)
  );
  const liveNewsSources = newsResults.filter((result) => !result.error).length;
  const news = newsResults
    .flatMap((result) => result.items)
    .filter((item, index, items) => items.findIndex((candidate) => candidate.title === item.title) === index)
    .sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());
  const newestJobs = buildNewestJobs(jobs);
  const roleMomentum = buildRoleMomentum(jobs).slice(0, 6);
  const trendingJobs = buildTrendingJobs(jobs, roleMomentum).slice(0, 6);
  const hiringCompanies = buildHiringCompanies(jobs).slice(0, 6);
  const summary = buildHomepageSummary(jobs, news, roleMomentum, sourceHealth, liveNewsSources);

  return {
    generatedAt,
    headline: summary.headline,
    subheading: summary.subheading,
    newestJobs: newestJobs.slice(0, 12),
    trendingJobs,
    news: news.slice(0, 10),
    leadStory: summary.leadStory,
    hiringCompanies,
    roleMomentum,
    sourceHealth,
    stats: summary.stats,
    errors
  };
}

async function getLiveJobsSnapshotUncached(): Promise<LiveJobsSnapshot> {
  const generatedAt = new Date().toISOString();
  const jobResults = await Promise.all(JOB_SOURCES.map((source) => loadJobsFromSource(source)));
  const jobs = dedupeJobs(jobResults.flatMap((result) => result.jobs)).sort(
    (left, right) => new Date(right.postedAt).getTime() - new Date(left.postedAt).getTime()
  );
  const sourceHealth = jobResults.map((result) => result.sourceHealth);
  const errors = jobResults.map((result) => result.error).filter((error): error is string => Boolean(error));
  const hiringCompanies = buildHiringCompanies(jobs);

  return {
    generatedAt,
    jobs,
    hiringCompanies,
    sourceHealth,
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
