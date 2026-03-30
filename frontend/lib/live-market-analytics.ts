import "server-only";

import { getLiveJobsSnapshot, type LiveHomepageJob } from "@/lib/live-homepage";

export type LiveWeeklyOpeningsPoint = {
  label: string;
  openings: number;
};

export type LiveRoleFamilyPoint = {
  familyLabel: string;
  openings: number;
  companies: number;
};

export type LiveCompanyHiringPoint = {
  company: string;
  openings: number;
};

export type LiveWorkplaceMixPoint = {
  label: string;
  count: number;
};

export type LiveMarketAnalytics = {
  generatedAt: string;
  weeklyOpenings: LiveWeeklyOpeningsPoint[];
  roleFamilies: LiveRoleFamilyPoint[];
  companies: LiveCompanyHiringPoint[];
  workplaceMix: LiveWorkplaceMixPoint[];
  stats: {
    totalOpenRoles: number;
    postedLast7Days: number;
    companiesHiring: number;
    liveBoards: number;
    totalBoards: number;
    salaryCoveragePct: number;
  };
  sourceHealth: Awaited<ReturnType<typeof getLiveJobsSnapshot>>["sourceHealth"];
  errors: string[];
};

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function startOfUtcWeek(value: Date) {
  const target = new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()));
  const day = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() - day + 1);
  return target;
}

function addUtcDays(value: Date, days: number) {
  const target = new Date(value);
  target.setUTCDate(target.getUTCDate() + days);
  return target;
}

function formatMonthDay(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  }).format(value);
}

function buildWeeklyOpenings(jobs: LiveHomepageJob[]) {
  const thisWeekStart = startOfUtcWeek(new Date());
  const starts = Array.from({ length: 6 }, (_, index) => addUtcDays(thisWeekStart, (index - 5) * 7));
  const series = starts.map((start) => ({
    label: formatMonthDay(start),
    openings: 0,
    startTime: start.getTime()
  }));

  const firstStart = series[0]?.startTime ?? thisWeekStart.getTime();

  for (const job of jobs) {
    const postedAt = new Date(job.postedAt);
    if (Number.isNaN(postedAt.getTime())) {
      continue;
    }

    const bucketStart = startOfUtcWeek(postedAt).getTime();
    if (bucketStart < firstStart) {
      continue;
    }

    const bucket = series.find((item) => item.startTime === bucketStart);
    if (bucket) {
      bucket.openings += 1;
    }
  }

  return series.map(({ label, openings }) => ({ label, openings }));
}

function buildRoleFamilies(jobs: LiveHomepageJob[]) {
  const grouped = new Map<string, { openings: number; companies: Set<string> }>();

  for (const job of jobs) {
    const existing = grouped.get(job.familyLabel) ?? { openings: 0, companies: new Set<string>() };
    existing.openings += 1;
    existing.companies.add(job.company);
    grouped.set(job.familyLabel, existing);
  }

  return Array.from(grouped.entries())
    .map(([familyLabel, entry]) => ({
      familyLabel,
      openings: entry.openings,
      companies: entry.companies.size
    }))
    .sort((left, right) => {
      if (right.openings !== left.openings) {
        return right.openings - left.openings;
      }

      return right.companies - left.companies;
    })
    .slice(0, 8);
}

function buildWorkplaceMix(jobs: LiveHomepageJob[]) {
  const grouped = new Map<string, number>([
    ["Remote", 0],
    ["Hybrid", 0],
    ["On-site", 0],
    ["Unspecified", 0]
  ]);

  for (const job of jobs) {
    const label = job.workplaceLabel ?? "Unspecified";
    grouped.set(label, (grouped.get(label) ?? 0) + 1);
  }

  return Array.from(grouped.entries())
    .map(([label, count]) => ({ label, count }))
    .filter((item) => item.count > 0);
}

export async function getLiveMarketAnalytics(): Promise<LiveMarketAnalytics> {
  const snapshot = await getLiveJobsSnapshot();
  const salaryCoverageCount = snapshot.jobs.filter((job) => typeof job.salaryMin === "number" || typeof job.salaryMax === "number").length;

  return {
    generatedAt: snapshot.generatedAt,
    weeklyOpenings: buildWeeklyOpenings(snapshot.jobs),
    roleFamilies: buildRoleFamilies(snapshot.jobs),
    companies: snapshot.hiringCompanies.slice(0, 8).map((item) => ({
      company: item.company,
      openings: item.openRoles
    })),
    workplaceMix: buildWorkplaceMix(snapshot.jobs),
    stats: {
      totalOpenRoles: snapshot.jobs.length,
      postedLast7Days: snapshot.jobs.filter((job) => Date.now() - new Date(job.postedAt).getTime() <= SEVEN_DAYS_MS).length,
      companiesHiring: snapshot.hiringCompanies.length,
      liveBoards: snapshot.sourceHealth.filter((item) => item.status === "live").length,
      totalBoards: snapshot.sourceHealth.length,
      salaryCoveragePct: snapshot.jobs.length > 0 ? Math.round((salaryCoverageCount / snapshot.jobs.length) * 100) : 0
    },
    sourceHealth: snapshot.sourceHealth,
    errors: snapshot.errors
  };
}
