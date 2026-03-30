import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

export type LayoffFeedStatus = "live" | "cached" | "failed";
export type LayoffAiSignal = "Cited" | "Not cited";

export type OfficialLayoffEvent = {
  slug: string;
  company: string;
  companySlug: string;
  announcedAt: string;
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
  summary: string;
  aiAttribution?: string;
};

export type LayoffSourceHealth = {
  key: string;
  company: string;
  status: LayoffFeedStatus;
  sourceUrl: string;
  lastAttemptAt: string;
  lastSuccessAt: string | null;
  lastError: string | null;
  usedCache: boolean;
};

export type LiveLayoffsFeed = {
  generatedAt: string;
  lastSuccessfulRefreshAt: string | null;
  events: OfficialLayoffEvent[];
  sourceHealth: LayoffSourceHealth[];
  stats: {
    confirmedDisclosures: number;
    totalAffected: number;
    aiCitedEvents: number;
  };
  errors: string[];
};

type SourceMonitor = {
  key: string;
  company: string;
  companySlug: string;
  announcedAt: string;
  announcedLabel: string;
  sourceType: string;
  sourceLabel: string;
  sourceUrl: string;
  countUnit: "positions" | "employees";
  summaryContext?: string;
  parser: (plainText: string) => ParsedLayoff | null;
};

type ParsedLayoff = {
  affectedCount: number;
  affectedPercent?: number;
  isApproximate?: boolean;
  aiSignal: LayoffAiSignal;
  aiAttribution?: string;
};

type StoredLayoffSnapshot = {
  version: 1;
  generatedAt: string;
  lastSuccessfulRefreshAt: string | null;
  sourceResults: StoredLayoffSourceResult[];
};

type StoredLayoffSourceResult = {
  key: string;
  event: OfficialLayoffEvent | null;
  sourceHealth: LayoffSourceHealth;
  error: string | null;
};

const LAYOFF_CACHE_VERSION = 1;
const LAYOFF_CACHE_PATH =
  process.env.JOBANXIETY_LAYOFF_FEED_CACHE_PATH ?? path.join(os.tmpdir(), "jobanxiety-live-layoffs-cache.json");

const requestHeaders = {
  "User-Agent": "jobanxiety.ai/1.0 (+https://jobanxiety.ai)"
};

const MONITORED_SOURCES: SourceMonitor[] = [
  {
    key: "workday-2025-02",
    company: "Workday",
    companySlug: "workday",
    announcedAt: "2025-02-05T00:00:00.000Z",
    announcedLabel: "February 5, 2025",
    sourceType: "SEC exhibit",
    sourceLabel: "Workday Exhibit 99.1 filed with the SEC",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1327811/000132781125000030/wday-020525x991.htm",
    countUnit: "positions",
    parser: (plainText) => {
      const layoffMatch = plainText.match(
        /eliminate approximately\s+([\d,]+)\s+positions,\s+or\s+([\d.]+)% of our current workforce/i
      );

      if (!layoffMatch) {
        return null;
      }

      const affectedCount = parseWholeNumber(layoffMatch[1]);
      const affectedPercent = parsePercent(layoffMatch[2]);

      if (affectedCount == null) {
        return null;
      }

      const aiSignal = /demand for ai/i.test(plainText) ? "Cited" : "Not cited";

      return {
        affectedCount,
        affectedPercent,
        isApproximate: true,
        aiSignal,
        aiAttribution:
          aiSignal === "Cited" ? "The same filing says rising demand for AI could drive a new era of growth." : undefined
      };
    }
  },
  {
    key: "recruit-2025-07",
    company: "Recruit Holdings (Indeed and Glassdoor segment)",
    companySlug: "recruit-holdings",
    announcedAt: "2025-07-11T00:00:00.000Z",
    announcedLabel: "July 11, 2025",
    sourceType: "Company investor-relations release",
    sourceLabel: "Recruit Holdings newsroom release",
    sourceUrl: "https://recruit-holdings.com/en/newsroom/20250711_0001/",
    countUnit: "employees",
    summaryContext: "The release covers Recruit's HR Technology segment, which includes Indeed and Glassdoor.",
    parser: (plainText) => {
      const layoffMatch = plainText.match(
        /reduction of approximately\s+([\d,]+)\s+employees,\s+representing about\s+([\d.]+)% of the segment(?:'s|’s)? total workforce/i
      );

      if (!layoffMatch) {
        return null;
      }

      const affectedCount = parseWholeNumber(layoffMatch[1]);
      const affectedPercent = parsePercent(layoffMatch[2]);

      if (affectedCount == null) {
        return null;
      }

      return {
        affectedCount,
        affectedPercent,
        isApproximate: true,
        aiSignal: "Not cited"
      };
    }
  }
];

let cachedSnapshotFromDisk: StoredLayoffSnapshot | null | undefined;

function parseWholeNumber(value: string) {
  const normalized = Number.parseInt(value.replace(/,/g, ""), 10);
  return Number.isNaN(normalized) ? null : normalized;
}

function parsePercent(value: string) {
  const normalized = Number.parseFloat(value);
  return Number.isNaN(normalized) ? undefined : normalized;
}

function latestIso(values: Array<string | null | undefined>) {
  const parsed = values
    .map((value) => (value ? new Date(value) : null))
    .filter((value): value is Date => value !== null)
    .filter((value) => !Number.isNaN(value.getTime()));

  if (!parsed.length) {
    return null;
  }

  return parsed.sort((left, right) => right.getTime() - left.getTime())[0].toISOString();
}

function normalizeError(error: unknown) {
  return error instanceof Error ? error.message : "Unknown source error";
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

function stripMarkup(value: string) {
  return decodeHtmlEntities(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

async function readStoredSnapshot(): Promise<StoredLayoffSnapshot | null> {
  if (cachedSnapshotFromDisk !== undefined) {
    return cachedSnapshotFromDisk;
  }

  try {
    const raw = await readFile(LAYOFF_CACHE_PATH, "utf8");
    const parsed = JSON.parse(raw) as StoredLayoffSnapshot;

    if (parsed.version !== LAYOFF_CACHE_VERSION) {
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

async function persistStoredSnapshot(snapshot: StoredLayoffSnapshot) {
  try {
    const directory = path.dirname(LAYOFF_CACHE_PATH);
    await mkdir(directory, { recursive: true });

    const tempPath = `${LAYOFF_CACHE_PATH}.tmp`;
    await writeFile(tempPath, JSON.stringify(snapshot), "utf8");
    await rename(tempPath, LAYOFF_CACHE_PATH);
    cachedSnapshotFromDisk = snapshot;
  } catch {
    // Best effort only. The layoff feed should still render if disk writes fail.
  }
}

type RetryOutcome<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetries(url: string, attempts = 3): Promise<RetryOutcome<string>> {
  let lastError = "Unknown source error";

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: requestHeaders,
        signal: AbortSignal.timeout(8_000)
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return { ok: true, value: await response.text() };
    } catch (error) {
      lastError = normalizeError(error);
      if (attempt < attempts) {
        await sleep(1000 * 2 ** (attempt - 1));
      }
    }
  }

  return { ok: false, error: lastError };
}

function buildAffectedCountLabel(count: number, unit: SourceMonitor["countUnit"], isApproximate?: boolean) {
  const formatted = count.toLocaleString("en-US");
  const noun = unit === "positions" ? "positions" : "employees";
  return isApproximate ? `Approximately ${formatted} ${noun}` : `${formatted} ${noun}`;
}

function buildSummary(source: SourceMonitor, parsed: ParsedLayoff) {
  const countLabel = buildAffectedCountLabel(parsed.affectedCount, source.countUnit, parsed.isApproximate).toLowerCase();
  const percentLabel = typeof parsed.affectedPercent === "number" ? `, or ${parsed.affectedPercent}% of the relevant workforce,` : "";
  const contextLabel = source.summaryContext ? ` ${source.summaryContext}` : "";
  return `${source.sourceLabel} says ${countLabel}${percentLabel} were affected.${contextLabel}`.replace(/\s+/g, " ").trim();
}

function mapStoredResults(snapshot: StoredLayoffSnapshot | null) {
  return new Map((snapshot?.sourceResults ?? []).map((result) => [result.key, result] as const));
}

async function loadLayoffSource(source: SourceMonitor, cachedResult: StoredLayoffSourceResult | null) {
  const attemptedAt = new Date().toISOString();
  const response = await fetchWithRetries(source.sourceUrl);

  if (!response.ok) {
    const cachedEvent = cachedResult?.event ?? null;
    const health: LayoffSourceHealth = {
      key: source.key,
      company: source.company,
      status: cachedEvent ? "cached" : "failed",
      sourceUrl: source.sourceUrl,
      lastAttemptAt: attemptedAt,
      lastSuccessAt: cachedResult?.sourceHealth.lastSuccessAt ?? null,
      lastError: response.error,
      usedCache: Boolean(cachedEvent)
    };

    return {
      event: cachedEvent,
      sourceHealth: health,
      error: `${source.company}: ${response.error}`
    };
  }

  const plainText = stripMarkup(response.value);
  const parsed = source.parser(plainText);

  if (!parsed) {
    const cachedEvent = cachedResult?.event ?? null;
    const parseError = "Official source fetched but the layoff fields could not be parsed.";
    const health: LayoffSourceHealth = {
      key: source.key,
      company: source.company,
      status: cachedEvent ? "cached" : "failed",
      sourceUrl: source.sourceUrl,
      lastAttemptAt: attemptedAt,
      lastSuccessAt: cachedEvent ? cachedResult?.sourceHealth.lastSuccessAt ?? null : null,
      lastError: parseError,
      usedCache: Boolean(cachedEvent)
    };

    return {
      event: cachedEvent,
      sourceHealth: health,
      error: cachedEvent ? `${source.company}: ${parseError}` : `${source.company}: ${parseError}`
    };
  }

  const event: OfficialLayoffEvent = {
    slug: source.key,
    company: source.company,
    companySlug: source.companySlug,
    announcedAt: source.announcedAt,
    announcedLabel: source.announcedLabel,
    affectedCount: parsed.affectedCount,
    affectedCountLabel: buildAffectedCountLabel(parsed.affectedCount, source.countUnit, parsed.isApproximate),
    affectedPercent: parsed.affectedPercent,
    isApproximate: parsed.isApproximate,
    confidence: "Confirmed",
    aiSignal: parsed.aiSignal,
    sourceType: source.sourceType,
    sourceLabel: source.sourceLabel,
    sourceUrl: source.sourceUrl,
    summary: buildSummary(source, parsed),
    aiAttribution: parsed.aiAttribution
  };

  return {
    event,
    sourceHealth: {
      key: source.key,
      company: source.company,
      status: "live" as const,
      sourceUrl: source.sourceUrl,
      lastAttemptAt: attemptedAt,
      lastSuccessAt: attemptedAt,
      lastError: null,
      usedCache: false
    },
    error: null
  };
}

export async function getLiveLayoffsFeed(): Promise<LiveLayoffsFeed> {
  const generatedAt = new Date().toISOString();
  const storedSnapshot = await readStoredSnapshot();
  const cachedResults = mapStoredResults(storedSnapshot);
  const sourceResults = await Promise.all(
    MONITORED_SOURCES.map((source) => loadLayoffSource(source, cachedResults.get(source.key) ?? null))
  );

  const events = sourceResults
    .map((result) => result.event)
    .filter((event): event is OfficialLayoffEvent => Boolean(event))
    .sort((left, right) => new Date(right.announcedAt).getTime() - new Date(left.announcedAt).getTime());
  const sourceHealth = sourceResults.map((result) => result.sourceHealth);
  const errors = sourceResults.map((result) => result.error).filter((error): error is string => Boolean(error));
  const lastSuccessfulRefreshAt = latestIso(sourceResults.map((result) => result.sourceHealth.lastSuccessAt));

  if (events.length > 0) {
    await persistStoredSnapshot({
      version: LAYOFF_CACHE_VERSION,
      generatedAt,
      lastSuccessfulRefreshAt,
      sourceResults: sourceResults.map((result) => ({
        key: result.sourceHealth.key,
        event: result.event,
        sourceHealth: result.sourceHealth,
        error: result.error
      }))
    });
  }

  return {
    generatedAt,
    lastSuccessfulRefreshAt,
    events,
    sourceHealth,
    stats: {
      confirmedDisclosures: events.length,
      totalAffected: events.reduce((sum, event) => sum + event.affectedCount, 0),
      aiCitedEvents: events.filter((event) => event.aiSignal === "Cited").length
    },
    errors
  };
}
