import { NextResponse } from "next/server";

import { careerNotes, insightArticles } from "@/lib/editorial-content";
import { getLiveJobSlug, getLiveJobsSnapshot } from "@/lib/live-homepage";
import { searchOccupationRisk } from "@/lib/occupation-risk-api";

type SearchEntry = {
  id: string;
  href: string;
  label: string;
  meta: string;
  summary?: string;
  kind: "page" | "job" | "occupation" | "guide";
};

const pageEntries: SearchEntry[] = [
  { id: "page-home", href: "/", label: "Home", meta: "Page", summary: "Market pulse and latest openings", kind: "page" },
  { id: "page-jobs", href: "/jobs", label: "Jobs", meta: "Page", summary: "Live postings across tracked companies", kind: "page" },
  { id: "page-companies", href: "/companies", label: "Companies", meta: "Page", summary: "Tracked employers and current boards", kind: "page" },
  { id: "page-layoffs", href: "/layoffs", label: "Layoffs", meta: "Page", summary: "Confirmed workforce disclosures", kind: "page" },
  { id: "page-trends", href: "/trends", label: "Trends", meta: "Page", summary: "Live hiring signals", kind: "page" },
  { id: "page-research", href: "/research", label: "Research", meta: "Page", summary: "BLS occupation brief", kind: "page" },
  { id: "page-about", href: "/about", label: "About", meta: "Page", summary: "Mission, newsletter, and contact details", kind: "page" },
  { id: "page-methodology", href: "/methodology", label: "Methodology", meta: "Trust", summary: "Sourcing and limits", kind: "page" },
  { id: "page-corrections", href: "/corrections", label: "Corrections", meta: "Trust", summary: "Public corrections log", kind: "page" },
  { id: "page-press", href: "/press", label: "Press", meta: "Resources", summary: "Embeds and citation formats", kind: "page" },
  { id: "page-api", href: "/api", label: "API", meta: "Developers", summary: "Endpoint documentation", kind: "page" },
  { id: "page-newsletter", href: "/newsletter", label: "Newsletter", meta: "Page", summary: "Subscribe to updates", kind: "page" }
];

function matchesQuery(value: string, query: string) {
  return value.toLowerCase().includes(query);
}

function formatSalary(minimum: number | null, maximum: number | null) {
  if (minimum == null || maximum == null) {
    return "Salary not listed";
  }

  return `$${Math.round(minimum / 1000)}K–$${Math.round(maximum / 1000)}K`;
}

function buildOccupationUrl(socCode: string) {
  return `/check-your-occupation?soc=${encodeURIComponent(socCode)}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";

  if (query.length < 2 || query.length > 100) {
    return NextResponse.json({ error: "Query must be between 2 and 100 characters." }, { status: 400 });
  }

  const [snapshot, occupationResults] = await Promise.all([getLiveJobsSnapshot(), searchOccupationRisk(query)]);

  const pageMatches = pageEntries.filter((item) => {
    return matchesQuery(item.label, query) || matchesQuery(item.meta, query) || matchesQuery(item.summary ?? "", query);
  });

  const companyMatches = snapshot.hiringCompanies
    .filter((company) => matchesQuery(company.company, query))
    .map((company) => ({
      id: `company-${company.companySlug}`,
      href: `/companies/${company.companySlug}`,
      label: company.company,
      meta: "Company",
      summary: `${company.openRoles.toLocaleString("en-US")} live roles`,
      kind: "page" as const
    }));

  const jobMatches = snapshot.jobs
    .filter((job) => {
      const haystack = `${job.title} ${job.company} ${job.location} ${job.familyLabel}`.toLowerCase();
      return haystack.includes(query);
    })
    .slice(0, 8)
    .map((job) => ({
      id: `job-${job.id}`,
      href: `/jobs/${getLiveJobSlug(job)}`,
      label: job.title,
      meta: job.company,
      summary: `${job.location} · ${formatSalary(job.salaryMin, job.salaryMax)}`,
      kind: "job" as const
    }));

  const occupationMatches = occupationResults.slice(0, 8).map((occupation) => ({
    id: `occupation-${occupation.socCode}`,
    href: buildOccupationUrl(occupation.socCode),
    label: occupation.title,
    meta: occupation.socCode,
    summary: `${occupation.employment2024.toLocaleString("en-US")} employed`,
    kind: "occupation" as const
  }));

  const guideMatches = [...careerNotes, ...insightArticles]
    .filter((item) => {
      const haystack = [
        item.title,
        "subtitle" in item ? item.subtitle : "",
        "description" in item ? item.description : "",
        "cardDescription" in item ? item.cardDescription : "",
        "role" in item ? item.role : ""
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    })
    .slice(0, 10)
    .map((item) =>
      "publishedAt" in item
        ? {
            id: `insight-${item.slug}`,
            href: `/insights/${item.slug}`,
            label: item.title,
            meta: item.readTime,
            summary: item.description,
            kind: "guide" as const
          }
        : {
            id: `career-note-${item.slug}`,
            href: `/career-notes/${item.slug}`,
            label: item.title,
            meta: "Career guide",
            summary: item.subtitle,
            kind: "guide" as const
          }
    );

  const sections = [
    { title: "Pages", items: [...pageMatches, ...companyMatches].slice(0, 10) },
    { title: "Jobs", items: jobMatches },
    { title: "Occupations", items: occupationMatches },
    { title: "Guides", items: guideMatches }
  ];

  return NextResponse.json(
    {
      query,
      count: sections.reduce((sum, section) => sum + section.items.length, 0),
      sections
    },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
