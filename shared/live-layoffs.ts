import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";

export type LayoffFeedStatus = "live" | "cached" | "failed";
export type LayoffAiSignal = "Cited" | "Not cited";
export type LayoffConfidence = "Confirmed" | "Reported";
export const TRUSTED_REPORTED_OUTLETS = [
  "Reuters",
  "Bloomberg",
  "The Wall Street Journal",
  "Financial Times",
  "The Information",
  "Associated Press"
] as const;

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
  confidence: LayoffConfidence;
  aiSignal: LayoffAiSignal;
  sourceType: string;
  sourceLabel: string;
  sourceUrl: string;
  reportingOutlet?: string;
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
    reportedDisclosures: number;
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
  reportingOutlet?: string;
  countUnit: "positions" | "employees";
  confidence: LayoffConfidence;
  summaryContext?: string;
  loadText?: () => Promise<RetryOutcome<string>>;
  parser: (plainText: string) => ParsedLayoff | null;
};

type ParsedLayoff = {
  affectedCount: number;
  affectedCountLabel?: string;
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

type XlsxModule = {
  read: (data: Buffer, options: { type: "buffer" }) => { Sheets: Record<string, unknown> };
  utils: {
    sheet_to_json: (
      sheet: unknown,
      options: {
        header: 1;
        raw: true;
      }
    ) => Array<Array<string | number | null>>;
  };
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
    confidence: "Confirmed",
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
    confidence: "Confirmed",
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
  },
  {
    key: "autodesk-2026-01",
    company: "Autodesk",
    companySlug: "autodesk",
    announcedAt: "2026-01-22T13:55:00.000Z",
    announcedLabel: "January 22, 2026",
    sourceType: "SEC exhibit",
    sourceLabel: "Autodesk CEO workforce update filed with the SEC",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/769397/000076939726000006/ceoemlfinal.htm",
    countUnit: "positions",
    confidence: "Confirmed",
    parser: (plainText) => {
      const layoffMatch = plainText.match(
        /reduce the size of Autodesk(?:'s)? workforce by approximately\s+([\d.]+)% globally\s+\(around\s+([\d,]+)\s+roles\)/i
      );

      if (!layoffMatch) {
        return null;
      }

      const affectedPercent = parsePercent(layoffMatch[1]);
      const affectedCount = parseWholeNumber(layoffMatch[2]);

      if (affectedCount == null) {
        return null;
      }

      const aiSignal = /strong foundation across our industry cloud, platform, and AI/i.test(plainText) ? "Cited" : "Not cited";

      return {
        affectedCount,
        affectedPercent,
        isApproximate: true,
        aiSignal,
        aiAttribution:
          aiSignal === "Cited"
            ? "The same SEC-filed employee note says Autodesk is reallocating toward platform, industry cloud, and AI priorities."
            : undefined
      };
    }
  },
  {
    key: "bumble-2025-06",
    company: "Bumble",
    companySlug: "bumble",
    announcedAt: "2025-06-23T00:00:00.000Z",
    announcedLabel: "June 23, 2025",
    sourceType: "SEC filing",
    sourceLabel: "Bumble current report filed with the SEC",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1830043/000119312525146199/d915271d8k.htm",
    countUnit: "positions",
    confidence: "Confirmed",
    parser: (plainText) => {
      const layoffMatch = plainText.match(
        /global workforce by approximately\s+([\d,]+)\s+roles,\s+representing approximately\s+([\d.]+)% of the Company(?:'s)? employees/i
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
  },
  {
    key: "intel-2024-08",
    company: "Intel",
    companySlug: "intel",
    announcedAt: "2024-08-01T00:00:00.000Z",
    announcedLabel: "August 1, 2024",
    sourceType: "Company investor-relations release",
    sourceLabel: "Intel press release on cost actions and restructuring",
    sourceUrl: "https://www.intc.com/news-events/press-releases/detail/1712/actions-to-accelerate-our-progress",
    countUnit: "positions",
    confidence: "Confirmed",
    parser: (plainText) => {
      const layoffMatch = plainText.match(/head count by roughly\s+([\d,]+)\s+roles,\s+or\s+([\d.]+)% of our workforce/i);

      if (!layoffMatch) {
        return null;
      }

      const affectedCount = parseWholeNumber(layoffMatch[1]);
      const affectedPercent = parsePercent(layoffMatch[2]);

      if (affectedCount == null) {
        return null;
      }

      const aiSignal = /fully benefit from powerful trends, like AI/i.test(plainText) ? "Cited" : "Not cited";

      return {
        affectedCount,
        affectedPercent,
        isApproximate: true,
        aiSignal,
        aiAttribution:
          aiSignal === "Cited" ? "Intel's release says the company has not yet fully benefited from trends like AI." : undefined
      };
    }
  },
  {
    key: "unity-2024-01",
    company: "Unity",
    companySlug: "unity",
    announcedAt: "2024-01-08T00:00:00.000Z",
    announcedLabel: "January 8, 2024",
    sourceType: "SEC filing",
    sourceLabel: "Unity current report filed with the SEC",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1810806/000181080624000006/unity-20240108.htm",
    countUnit: "positions",
    confidence: "Confirmed",
    parser: (plainText) => {
      const layoffMatch = plainText.match(
        /reduce approximately\s+([\d,]+)\s+employee roles,\s+or approximately\s+([\d.]+)% of its current workforce/i
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
  },
  {
    key: "irobot-2024-01",
    company: "iRobot",
    companySlug: "irobot",
    announcedAt: "2024-01-29T00:00:00.000Z",
    announcedLabel: "January 29, 2024",
    sourceType: "SEC exhibit",
    sourceLabel: "iRobot restructuring release filed with the SEC",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1159167/000119312524017523/d741198dex992.htm",
    countUnit: "employees",
    confidence: "Confirmed",
    parser: (plainText) => {
      const layoffMatch = plainText.match(
        /reduction of approximately\s+([\d,]+)\s+employees,\s+which represents\s+([\d.]+)\s+percent of the Company(?:'s)? workforce/i
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
  },
  {
    key: "ebay-2024-01",
    company: "eBay",
    companySlug: "ebay",
    announcedAt: "2024-01-23T00:00:00.000Z",
    announcedLabel: "January 23, 2024",
    sourceType: "Company newsroom release",
    sourceLabel: "eBay leadership note on workforce reduction",
    sourceUrl: "https://www.ebayinc.com/stories/news/ensuring-ebays-long-term-success/",
    countUnit: "positions",
    confidence: "Confirmed",
    parser: (plainText) => {
      const layoffMatch = plainText.match(
        /reduce our current workforce by approximately\s+([\d,]+)\s+roles\s+or an estimated\s+([\d.]+)% of full-time employees/i
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
  },
  {
    key: "dropbox-2023-04",
    company: "Dropbox",
    companySlug: "dropbox",
    announcedAt: "2023-04-27T00:00:00.000Z",
    announcedLabel: "April 27, 2023",
    sourceType: "Company investor-relations release",
    sourceLabel: "Dropbox CEO note published on the company site",
    sourceUrl: "https://blog.dropbox.com/topics/company/a-message-from-drew",
    countUnit: "employees",
    confidence: "Confirmed",
    parser: (plainText) => {
      const layoffMatch = plainText.match(
        /reduce our global workforce by about\s+([\d.]+)%,\s+or\s+([\d,]+)\s+Dropboxers/i
      );

      if (!layoffMatch) {
        return null;
      }

      const affectedPercent = parsePercent(layoffMatch[1]);
      const affectedCount = parseWholeNumber(layoffMatch[2]);

      if (affectedCount == null) {
        return null;
      }

      const aiSignal = /AI era of computing has finally arrived/i.test(plainText) ? "Cited" : "Not cited";

      return {
        affectedCount,
        affectedPercent,
        isApproximate: true,
        aiSignal,
        aiAttribution:
          aiSignal === "Cited" ? "Dropbox's CEO note says the company is orienting itself around the AI era of computing." : undefined
      };
    }
  },
  {
    key: "meta-2026-03",
    company: "Meta",
    companySlug: "meta",
    announcedAt: "2026-03-20T00:00:00.000Z",
    announcedLabel: "March 20, 2026",
    sourceType: "California WARN report",
    sourceLabel: "California EDD WARN report — Meta rows effective March 20, 2026",
    sourceUrl: "https://edd.ca.gov/siteassets/files/jobs_and_training/warn/warn_report1.xlsx",
    countUnit: "employees",
    confidence: "Confirmed",
    summaryContext:
      "The current EDD workbook groups the March 20 California reductions across Burlingame, Playa Vista, Sunnyvale, and Menlo Park sites.",
    loadText: () =>
      fetchCaliforniaWarnSummary({
        sourceUrl: "https://edd.ca.gov/siteassets/files/jobs_and_training/warn/warn_report1.xlsx",
        companyPattern: /^Meta Platforms, Inc/i,
        effectiveDateSerial: 46101
      }),
    parser: (plainText) => {
      const layoffMatch = plainText.match(/warn rows show\s+([\d,]+)\s+employees affected across\s+([\d,]+)\s+locations/i);

      if (!layoffMatch) {
        return null;
      }

      const affectedCount = parseWholeNumber(layoffMatch[1]);

      if (affectedCount == null) {
        return null;
      }

      return {
        affectedCount,
        aiSignal: "Not cited"
      };
    }
  },
  {
    key: "oracle-2026-03",
    company: "Oracle",
    companySlug: "oracle",
    announcedAt: "2026-03-31T00:00:00.000Z",
    announcedLabel: "March 31, 2026",
    sourceType: "Reuters-cited report",
    sourceLabel: "News.az report citing Reuters on Oracle layoffs",
    sourceUrl: "https://news.az/news/employees-stunned-as-oracle-announces-major-global-job-cuts",
    reportingOutlet: "Reuters",
    countUnit: "employees",
    confidence: "Reported",
    parser: (plainText) => {
      const layoffMatch = plainText.match(/cuts could hit\s+([\d,]+)\s+to\s+([\d,]+)\s+employees/i);

      if (!layoffMatch) {
        return null;
      }

      const affectedCountMin = parseWholeNumber(layoffMatch[1]);
      const affectedCountMax = parseWholeNumber(layoffMatch[2]);

      if (affectedCountMin == null || affectedCountMax == null) {
        return null;
      }

      const midpoint = Math.round((affectedCountMin + affectedCountMax) / 2);
      const aiSignal = /AI data centres|AI data centers|artificial intelligence/i.test(plainText) ? "Cited" : "Not cited";

      return {
        affectedCount: midpoint,
        affectedCountLabel: `Estimated ${affectedCountMin.toLocaleString("en-US")} to ${affectedCountMax.toLocaleString("en-US")} employees`,
        isApproximate: true,
        aiSignal,
        aiAttribution:
          aiSignal === "Cited"
            ? "The Reuters-sourced report says the layoffs are tied to Oracle's AI data-center spending and financing pressure."
            : undefined
      };
    }
  },
  {
    key: "block-2026-02",
    company: "Block",
    companySlug: "block",
    announcedAt: "2026-02-27T05:47:45.000Z",
    announcedLabel: "February 27, 2026",
    sourceType: "Associated Press report",
    sourceLabel: "Associated Press report on Block layoffs",
    sourceUrl: "https://apnews.com/article/block-dorsey-layoffs-ai-jobs-18e00a0b278977b0a87893f55e3db7bb",
    reportingOutlet: "Associated Press",
    countUnit: "employees",
    confidence: "Reported",
    parser: (plainText) => {
      const layoffMatch = plainText.match(/Block lays off\s+([\d,]+)\s+of its\s+([\d,]+)\s+staff,\s+citing gains from AI/i);

      if (!layoffMatch) {
        return null;
      }

      const affectedCount = parseWholeNumber(layoffMatch[1]);
      const staffCount = parseWholeNumber(layoffMatch[2]);

      if (affectedCount == null) {
        return null;
      }

      return {
        affectedCount,
        affectedPercent:
          affectedCount != null && staffCount != null && staffCount > 0
            ? Math.round((affectedCount / staffCount) * 1000) / 10
            : undefined,
        aiSignal: "Cited",
        aiAttribution: "The Associated Press report says Block laid off 4,000 staff while citing gains from AI."
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

function extractCityFromAddress(address: string) {
  const match = address.match(/\s([A-Za-z .'-]+)\sCA\s\d{5}(?:-\d{4})?$/);
  return match ? match[1].trim() : null;
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
    .replace(/&#(\d+);/g, (_, decimal) => String.fromCodePoint(Number.parseInt(decimal, 10)))
    .replace(/[\u0091\u0092\u2018\u2019]/g, "'")
    .replace(/[\u0093\u0094\u201c\u201d]/g, '"')
    .replace(/[\u0096\u0097\u2013\u2014]/g, "-")
    .replace(/\u2022/g, " ");
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

async function fetchArrayBufferWithRetries(url: string, attempts = 3): Promise<RetryOutcome<ArrayBuffer>> {
  let lastError = "Unknown source error";

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: requestHeaders,
        signal: AbortSignal.timeout(12_000)
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return { ok: true, value: await response.arrayBuffer() };
    } catch (error) {
      lastError = normalizeError(error);
      if (attempt < attempts) {
        await sleep(1000 * 2 ** (attempt - 1));
      }
    }
  }

  return { ok: false, error: lastError };
}

async function fetchCaliforniaWarnSummary({
  sourceUrl,
  companyPattern,
  effectiveDateSerial
}: {
  sourceUrl: string;
  companyPattern: RegExp;
  effectiveDateSerial: number;
}): Promise<RetryOutcome<string>> {
  const workbookResponse = await fetchArrayBufferWithRetries(sourceUrl);

  if (!workbookResponse.ok) {
    return workbookResponse;
  }

  try {
    const require = createRequire(path.join(process.cwd(), "package.json"));
    const xlsx = require(require.resolve("xlsx", { paths: [process.cwd()] })) as XlsxModule;
    const workbook = xlsx.read(Buffer.from(workbookResponse.value), { type: "buffer" });
    const detailedSheetName = Object.keys(workbook.Sheets).find((name) => name.trim() === "Detailed WARN Report");
    const worksheet = detailedSheetName ? workbook.Sheets[detailedSheetName] : null;

    if (!worksheet) {
      return { ok: false, error: "Detailed WARN report sheet not found in workbook." };
    }

    const rows = xlsx.utils.sheet_to_json(worksheet, {
      header: 1,
      raw: true
    });

    const matchedRows = rows
      .slice(2)
      .filter((row: Array<string | number | null>) => companyPattern.test(String(row[4] ?? "")))
      .filter((row: Array<string | number | null>) => String(row[5] ?? "").toLowerCase().includes("layoff"))
      .filter((row: Array<string | number | null>) => Number(row[3] ?? 0) === effectiveDateSerial);

    if (!matchedRows.length) {
      return { ok: false, error: "WARN workbook did not contain matching layoff rows." };
    }

    const affectedCount = matchedRows.reduce((sum: number, row: Array<string | number | null>) => sum + Number(row[6] ?? 0), 0);
    const cities = [
      ...new Set(matchedRows.map((row: Array<string | number | null>) => extractCityFromAddress(String(row[7] ?? ""))).filter(Boolean))
    ];

    return {
      ok: true,
      value: `California WARN rows show ${affectedCount} employees affected across ${matchedRows.length} locations effective on March 20, 2026. Cities: ${cities.join(
        ", "
      )}.`
    };
  } catch (error) {
    return { ok: false, error: normalizeError(error) };
  }
}

function buildAffectedCountLabel(count: number, unit: SourceMonitor["countUnit"], isApproximate?: boolean) {
  const formatted = count.toLocaleString("en-US");
  const noun = unit === "positions" ? "positions" : "employees";
  return isApproximate ? `Approximately ${formatted} ${noun}` : `${formatted} ${noun}`;
}

function buildSummary(source: SourceMonitor, parsed: ParsedLayoff) {
  const countLabel = (parsed.affectedCountLabel ?? buildAffectedCountLabel(parsed.affectedCount, source.countUnit, parsed.isApproximate)).toLowerCase();
  const percentLabel = typeof parsed.affectedPercent === "number" ? `, or ${parsed.affectedPercent}% of the relevant workforce,` : "";
  const contextLabel = source.summaryContext ? ` ${source.summaryContext}` : "";
  return `${source.sourceLabel} says ${countLabel}${percentLabel} were affected.${contextLabel}`.replace(/\s+/g, " ").trim();
}

function mapStoredResults(snapshot: StoredLayoffSnapshot | null) {
  return new Map((snapshot?.sourceResults ?? []).map((result) => [result.key, result] as const));
}

async function loadLayoffSource(source: SourceMonitor, cachedResult: StoredLayoffSourceResult | null) {
  const attemptedAt = new Date().toISOString();
  const response = source.loadText ? await source.loadText() : await fetchWithRetries(source.sourceUrl);

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
    affectedCountLabel: parsed.affectedCountLabel ?? buildAffectedCountLabel(parsed.affectedCount, source.countUnit, parsed.isApproximate),
    affectedPercent: parsed.affectedPercent,
    isApproximate: parsed.isApproximate,
    confidence: source.confidence,
    aiSignal: parsed.aiSignal,
    sourceType: source.sourceType,
    sourceLabel: source.sourceLabel,
    sourceUrl: source.sourceUrl,
    reportingOutlet: source.reportingOutlet,
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
      confirmedDisclosures: events.filter((event) => event.confidence === "Confirmed").length,
      reportedDisclosures: events.filter((event) => event.confidence === "Reported").length,
      totalAffected: events.filter((event) => event.confidence === "Confirmed").reduce((sum, event) => sum + event.affectedCount, 0),
      aiCitedEvents: events.filter((event) => event.aiSignal === "Cited").length
    },
    errors
  };
}
