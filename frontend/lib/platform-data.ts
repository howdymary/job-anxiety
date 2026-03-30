import type {
  ApiEndpointDoc,
  CorrectionEntry,
  MethodologySection,
  PressResource,
  VerifiedOccupationOutlook
} from "@/lib/types";

export const methodologyMeta = {
  version: "v1.1",
  updatedAt: "March 30, 2026",
  status:
    "Public data pages now publish only source-backed BLS values, live ATS board aggregates, and a monitored official-source layoff feed. Modeled series stay off public pages until the provenance pipeline is fully audited."
};

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
      "Monitored official-source layoff disclosures only, with explicit AI-signal labeling."
    ]
  },
  {
    title: "How layoff confidence works",
    body: [
      "The live layoff page now publishes only filing-grade or official company disclosures that can still be fetched from their source URLs. Those entries are marked Confirmed and remain intentionally narrow while the broader provenance pipeline is being audited.",
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
    description: "Narrow official-source layoff monitor that publishes only confirmed workforce reductions with direct source links.",
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
    path: "/api/v1/layoffs",
    description: "Official-source layoff feed with current monitored disclosures and source-health metadata.",
    auth: "Public"
  },
  {
    method: "GET",
    path: "/api/v1/layoffs/health",
    description: "Source-health view for the monitored layoff feed.",
    auth: "Public"
  },
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
