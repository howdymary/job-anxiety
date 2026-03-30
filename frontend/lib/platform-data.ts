import type {
  ApiEndpointDoc,
  AuditedLayoffEvent,
  CorrectionEntry,
  MethodologySection,
  PressResource,
  VerifiedOccupationOutlook
} from "@/lib/types";

export const methodologyMeta = {
  version: "v1.1",
  updatedAt: "March 30, 2026",
  status:
    "Public data pages now publish only source-backed BLS values, live ATS board aggregates, and a narrow set of official-source layoff disclosures. Modeled series stay off public pages until the provenance pipeline is fully audited."
};

export const auditedLayoffEvents: AuditedLayoffEvent[] = [
  {
    slug: "workday-restructuring-2025-02",
    company: "Workday",
    companySlug: "workday",
    announcedLabel: "February 5, 2025",
    affectedCount: 1750,
    affectedCountLabel: "1,750 positions",
    affectedPercent: 8.5,
    confidence: "Confirmed",
    aiSignal: "Cited",
    sourceType: "SEC exhibit",
    sourceLabel: "Workday Exhibit 99.1 filed with the SEC",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1327811/000132781125000030/wday-020525x991.htm",
    macroContext:
      "Workday said the cuts were part of reprioritizing investments and reorganizing the business for a new growth phase. The filing explicitly says the company would keep hiring in strategic areas.",
    aiAttribution:
      "AI was named in the same filing as a priority investment area alongside platform development."
  },
  {
    slug: "recruit-holdings-hrtech-2025-07",
    company: "Recruit Holdings (Indeed and Glassdoor segment)",
    companySlug: "recruit-holdings",
    announcedLabel: "July 11, 2025",
    affectedCount: 1300,
    affectedCountLabel: "Approximately 1,300 employees",
    affectedPercent: 6,
    confidence: "Confirmed",
    aiSignal: "Not cited",
    sourceType: "Company investor-relations release",
    sourceLabel: "Recruit Holdings newsroom release",
    sourceUrl: "https://recruit-holdings.com/en/newsroom/20250711_0001/",
    macroContext:
      "Recruit said the financial impact was already reflected in guidance for its HR Technology segment. The company did not cite AI as a reason in the public release, so the event stays out of any AI-cited subtotal.",
    secondarySources: [
      "The same release says the reduction covered the HR Technology segment that operates Indeed and Glassdoor."
    ]
  },
  {
    slug: "forrester-research-rif-2025-01",
    company: "Forrester Research",
    companySlug: "forrester-research",
    announcedLabel: "January 2025",
    affectedCount: 94,
    affectedCountLabel: "About 94 positions",
    affectedPercent: 6,
    isApproximate: true,
    confidence: "Confirmed",
    aiSignal: "Not cited",
    sourceType: "SEC annual report",
    sourceLabel: "Forrester 2024 annual report filed with the SEC",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1023313/000095017025048161/forr-ars-2025.pdf",
    macroContext:
      "Forrester disclosed a January 2025 reduction in force of approximately 6% of its workforce as part of aligning costs to its 2025 revenue outlook.",
    secondarySources: [
      "The same filing says Forrester employed 1,571 people as of December 31, 2024, so a 6% cut implies roughly 94 positions."
    ]
  }
];

export const verifiedOccupationOutlook: VerifiedOccupationOutlook[] = [
  {
    occupation: "Software Developers, QA Analysts, and Testers",
    socCode: "15-1252 / 15-1253",
    majorGroup: "Computer and Mathematical Occupations",
    employment2024: 1895500,
    medianWage2024: 133080,
    projectedGrowthPct: 15,
    projectedGrowthAbs: 287900,
    annualOpenings: 129200,
    sourceLabel: "BLS Occupational Outlook Handbook — Software Developers, QA Analysts, and Testers",
    sourceUrl: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm"
  },
  {
    occupation: "Computer Programmers",
    socCode: "15-1251",
    majorGroup: "Computer and Mathematical Occupations",
    employment2024: 121200,
    medianWage2024: 98670,
    projectedGrowthPct: -6,
    projectedGrowthAbs: -6800,
    annualOpenings: 5500,
    sourceLabel: "BLS Occupational Outlook Handbook — Computer Programmers",
    sourceUrl: "https://www.bls.gov/ooh/computer-and-information-technology/computer-programmers.htm"
  },
  {
    occupation: "Data Scientists",
    socCode: "15-2051",
    majorGroup: "Mathematical Science Occupations",
    employment2024: 245900,
    medianWage2024: 112590,
    projectedGrowthPct: 34,
    projectedGrowthAbs: 82500,
    annualOpenings: 23400,
    sourceLabel: "BLS Occupational Outlook Handbook — Data Scientists",
    sourceUrl: "https://www.bls.gov/ooh/math/data-scientists.htm"
  },
  {
    occupation: "Information Security Analysts",
    socCode: "15-1212",
    majorGroup: "Computer and Mathematical Occupations",
    employment2024: 182800,
    medianWage2024: 124910,
    projectedGrowthPct: 29,
    projectedGrowthAbs: 52100,
    annualOpenings: 16000,
    sourceLabel: "BLS Occupational Outlook Handbook — Information Security Analysts",
    sourceUrl: "https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm"
  },
  {
    occupation: "Accountants and Auditors",
    socCode: "13-2011",
    majorGroup: "Business and Financial Operations Occupations",
    employment2024: 1579800,
    medianWage2024: 81680,
    projectedGrowthPct: 5,
    projectedGrowthAbs: 72800,
    annualOpenings: 124200,
    sourceLabel: "BLS Occupational Outlook Handbook — Accountants and Auditors",
    sourceUrl: "https://www.bls.gov/ooh/business-and-financial/accountants-and-auditors.htm"
  },
  {
    occupation: "Customer Service Representatives",
    socCode: "43-4051",
    majorGroup: "Office and Administrative Support Occupations",
    employment2024: 2814000,
    medianWage2024: 42830,
    projectedGrowthPct: -5,
    projectedGrowthAbs: -153700,
    annualOpenings: 341700,
    sourceLabel: "BLS Occupational Outlook Handbook — Customer Service Representatives",
    sourceUrl: "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm"
  }
];

export const methodologySections: MethodologySection[] = [
  {
    title: "What is currently published",
    body: [
      "The public site now limits itself to three source classes: current BLS occupation pages, live public ATS job boards, and primary-source layoff disclosures such as SEC filings or company investor-relations releases.",
      "If a data series cannot yet be reproduced from those source classes, it stays off the public charts and off the public page copy."
    ],
    bullets: [
      "BLS Occupational Outlook Handbook pages for employment, wage, and projection fields.",
      "Live Greenhouse and Ashby boards for current role counts, company counts, and posting recency.",
      "Official-source layoff disclosures only, with explicit AI-signal labeling."
    ]
  },
  {
    title: "How layoff confidence works",
    body: [
      "The live layoff page now publishes only filing-grade or official company disclosures. Those entries are marked Confirmed and remain intentionally narrow while the broader provenance pipeline is being audited.",
      "AI context is kept separate from the fact of the workforce reduction. A company may be investing in AI while cutting staff without saying AI caused the event."
    ],
    bullets: [
      "Confirmed: SEC filing, annual report, WARN notice, or direct company investor-relations statement.",
      "AI cited: the source text itself names AI as an investment priority, restructuring factor, or explicit driver.",
      "Not cited: the source documents the cut but does not attribute it to AI."
    ]
  },
  {
    title: "What stays off the public site for now",
    body: [
      "Synthetic displacement ratios, placeholder geography layers, and unaudited research dashboards have been removed from the public research and trends pages until their lineage is auditable end to end.",
      "The occupation page now follows the same rule. If a modeled layer cannot be reproduced from audited public inputs, it stays off the public site until that work is complete."
    ]
  }
];

export const sourceHierarchy = [
  "SEC filings, annual reports, and formal investor-relations disclosures",
  "WARN Act notices and equivalent government notices",
  "Direct company newsroom or investor-relations releases",
  "Current BLS and other official federal labor data",
  "Major research institutions and peer-reviewed or institutionally reviewed studies",
  "Secondary reporting only when the primary document is unavailable and the claim is clearly attributed"
];

export const correctionEntries: CorrectionEntry[] = [
  {
    date: "March 30, 2026",
    title: "Removed sample layoff and research datasets from public pages",
    body:
      "The public trends, research, and layoff surfaces were narrowed to source-backed BLS, ATS, and official-disclosure data only. Provisional modeled series were removed rather than left in place with caveats.",
    status: "Resolved"
  },
  {
    date: "March 30, 2026",
    title: "Corrected the software-developer baseline to the specific BLS occupation",
    body:
      "Software Developers now uses the current BLS 15-1252 line item instead of the broader combined occupation family values that also include QA analysts and testers.",
    status: "Resolved"
  }
];

export const pressResources: PressResource[] = [
  {
    title: "Research brief",
    description: "Source-backed research page built from current BLS occupation data and live public ATS board aggregates.",
    href: "/research",
    format: "Research"
  },
  {
    title: "Layoff disclosure log",
    description: "Narrow official-source layoff log that publishes only confirmed workforce reductions with direct source links.",
    href: "/layoffs",
    format: "Tracker"
  },
  {
    title: "Methodology and source hierarchy",
    description: "Current publication rules for what data is live, what is withheld, and how AI attribution is handled.",
    href: "/methodology",
    format: "Methodology"
  },
  {
    title: "Corrections log",
    description: "Public record of sourcing, counting, and publication-scope changes.",
    href: "/corrections",
    format: "Log"
  }
];

export const apiEndpoints: ApiEndpointDoc[] = [
  {
    method: "GET",
    path: "/api/v1/occupations/search",
    description: "Autocomplete search across the published occupation brief dataset.",
    auth: "Public"
  },
  {
    method: "GET",
    path: "/api/v1/risk/:soc",
    description: "Source-backed occupation brief for a valid SOC code.",
    auth: "Public"
  },
  {
    method: "POST",
    path: "/api/v1/subscribers",
    description: "Newsletter signup with pending confirmation status.",
    auth: "Public"
  }
];
