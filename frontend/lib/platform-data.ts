import type {
  ApiEndpointDoc,
  CorrectionEntry,
  DisplacementPoint,
  LayoffEvent,
  MethodologySection,
  PressResource,
  PulseStat
} from "@/lib/types";

export const methodologyMeta = {
  version: "v1.0",
  updatedAt: "March 29, 2026",
  status:
    "The public frontend is still rendering curated sample records while the production scraper, database, and audit pipeline are being wired together."
};

export const marketPulseStats: PulseStat[] = [
  {
    label: "Active AI roles",
    value: "12,847",
    context: "Current tracked inventory across company sites and public boards.",
    href: "/jobs"
  },
  {
    label: "Posted this week",
    value: "3,214",
    context: "New roles surfaced in the last seven days.",
    href: "/jobs"
  },
  {
    label: "Layoff events",
    value: "14",
    context: "Development sample of recent layoff events tracked by source type and confidence.",
    href: "/layoffs"
  },
  {
    label: "AI cited as factor",
    value: "8",
    context: "Only events where AI appears in the source language or a clearly contextual reporting thread.",
    href: "/methodology"
  }
];

export const displacementRatioPoints: DisplacementPoint[] = [
  { label: "Oct", jobsCreated: 1420, aiLayoffs: 160 },
  { label: "Nov", jobsCreated: 1680, aiLayoffs: 210 },
  { label: "Dec", jobsCreated: 1840, aiLayoffs: 220 },
  { label: "Jan", jobsCreated: 2110, aiLayoffs: 260 },
  { label: "Feb", jobsCreated: 2480, aiLayoffs: 310 },
  { label: "Mar", jobsCreated: 3214, aiLayoffs: 420 }
];

export const layoffEvents: LayoffEvent[] = [
  {
    slug: "microsoft-mixed-reality-2026-03",
    company: "Microsoft",
    companySlug: "microsoft",
    announcedDate: "2026-03-27",
    affectedCount: 650,
    affectedPercent: 3.2,
    confidence: "Confirmed",
    aiSignal: "Not cited",
    sourceType: "WARN notice",
    sourceLabel: "Washington WARN filing",
    sourceUrl: "https://esd.wa.gov/labormarketinfo/worker-adjustment-and-retraining-notification-warn",
    departments: ["Hardware", "Mixed reality"],
    macroContext:
      "This sits closer to a longer hardware reset than a clean automation story. The public language points to portfolio discipline, not explicit AI substitution."
  },
  {
    slug: "scale-ai-ops-2026-03",
    company: "Scale AI",
    companySlug: "scale-ai",
    announcedDate: "2026-03-24",
    affectedCount: 180,
    affectedPercent: 4.5,
    confidence: "Reported",
    aiSignal: "Contextual",
    sourceType: "News report",
    sourceLabel: "Single-report coverage of internal restructuring",
    sourceUrl: "https://www.theinformation.com/",
    departments: ["Operations", "Programs"],
    macroContext:
      "The event lines up with margin pressure in model-evaluation services. AI is part of the company narrative, but the public reporting does not prove direct replacement.",
    secondarySources: ["Company hiring page remained active for evaluation and solutions roles."]
  },
  {
    slug: "palantir-services-2026-03",
    company: "Palantir",
    companySlug: "palantir",
    announcedDate: "2026-03-18",
    affectedCount: 95,
    confidence: "Reported",
    aiSignal: "Not cited",
    sourceType: "News report",
    sourceLabel: "Regional business journal report",
    sourceUrl: "https://www.bizjournals.com/",
    departments: ["Internal tooling", "Corporate operations"],
    macroContext:
      "Too small to treat as a market signal on its own, but still useful as a reminder that AI hiring strength and workforce reduction can coexist inside the same company."
  },
  {
    slug: "databricks-go-to-market-2026-02",
    company: "Databricks",
    companySlug: "databricks",
    announcedDate: "2026-02-26",
    affectedCount: 120,
    confidence: "Confirmed",
    aiSignal: "Cited",
    sourceType: "Press release",
    sourceLabel: "Company restructuring note",
    sourceUrl: "https://www.databricks.com/company/newsroom",
    departments: ["Go-to-market", "Enablement"],
    macroContext:
      "The language here matters: management framed the cut around automation, tooling maturity, and a narrower operating model. That is stronger than a vague 'efficiency' claim."
  }
];

export const methodologySections: MethodologySection[] = [
  {
    title: "What goes into the tracker",
    body: [
      "Jobs are pulled from public hiring surfaces and normalized into a common record structure. Layoffs are tracked separately and only counted once they clear a source and confidence threshold.",
      "Every public number is meant to trace back to a source class, a timestamp, and a methodology version. That contract matters more than how polished the chart looks."
    ],
    bullets: [
      "Company ATS pages and structured public job feeds for hiring data.",
      "WARN notices, company statements, and reported coverage for layoff events.",
      "Frozen weekly and monthly snapshots so historical charts do not drift when classifications change."
    ]
  },
  {
    title: "How AI attribution works",
    body: [
      "We separate explicit attribution from context. 'The company cited AI in the restructuring language' and 'the company is investing heavily in AI while reducing headcount' are not the same claim.",
      "Aggregate counts should stay conservative. Reported or contextual events are useful for pattern-finding, but they should not be treated like legal proof."
    ],
    bullets: [
      "Confirmed: official filing, WARN notice, direct statement, or two credible sources.",
      "Reported: one credible source, labeled as single-source reporting.",
      "Rumored: visible for context only and excluded from topline totals."
    ]
  },
  {
    title: "What the current build still lacks",
    body: [
      "The scraper, provenance storage, and audit trail described in the production spec are not fully wired into this frontend yet. The public pages currently use curated sample records to shape the experience and the data contract.",
      "That is why the methodology page exists now, before the pipeline is fully live: the trust model should be obvious before the scale arrives."
    ]
  }
];

export const sourceHierarchy = [
  "SEC filings and other formal disclosures",
  "WARN Act notices",
  "Direct company statements",
  "Major reporting organizations",
  "Beat reporting and regional business press",
  "Social or anonymous signals, labeled separately and never merged into headline totals"
];

export const correctionEntries: CorrectionEntry[] = [
  {
    date: "March 26, 2026",
    title: "Reclassified one Databricks event from Confirmed to Reported",
    body:
      "A company blog reference was not sufficient on its own for confirmed status. The event remains visible, but its confidence was lowered until a second source or filing is attached.",
    status: "Resolved"
  },
  {
    date: "March 19, 2026",
    title: "Removed duplicated role counts from a stale ATS mirror",
    body:
      "A mirror board surfaced old records as fresh listings. Those rows were removed from the weekly jobs total and the historical snapshot was annotated instead of silently rewritten.",
    status: "Resolved"
  }
];

export const pressResources: PressResource[] = [
  {
    title: "Displacement ratio chart",
    description: "The signature chart: AI jobs created versus AI-related layoff language over time.",
    href: "/trends",
    format: "Chart"
  },
  {
    title: "Methodology and source hierarchy",
    description: "A plain-language explanation of confidence levels, attribution rules, and what is still mocked in the current build.",
    href: "/methodology",
    format: "Methodology"
  },
  {
    title: "Corrections log",
    description: "Public record of classification, sourcing, and counting changes.",
    href: "/corrections",
    format: "Log"
  }
];

export const apiEndpoints: ApiEndpointDoc[] = [
  {
    method: "GET",
    path: "/api/v1/jobs",
    description: "Paginated AI job listings with salary, location, and category filters.",
    auth: "Anonymous"
  },
  {
    method: "GET",
    path: "/api/v1/companies",
    description: "Company directory with hiring metadata.",
    auth: "Anonymous"
  },
  {
    method: "GET",
    path: "/api/v1/trends/categories",
    description: "Category trend series for charts and snapshots.",
    auth: "Anonymous"
  },
  {
    method: "GET",
    path: "/api/v1/trends/summary",
    description: "Market pulse summary for active roles, weekly adds, layoffs, and AI-cited share.",
    auth: "Planned in current frontend slice"
  },
  {
    method: "GET",
    path: "/api/v1/layoffs",
    description: "Layoff tracker with filters for company, confidence, and AI attribution.",
    auth: "Planned in current frontend slice"
  },
  {
    method: "POST",
    path: "/api/v1/subscribers",
    description: "Newsletter signup with pending confirmation status.",
    auth: "Anonymous"
  }
];
