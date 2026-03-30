export type GrowthCategory = "much_faster" | "faster" | "average" | "slower" | "decline";

export type ExposureCategory = "very_high" | "high" | "medium" | "low";

export type PostingTrendCategory = "surging" | "growing" | "stable" | "declining" | "falling";

export type OccupationTask = {
  task: string;
  aiScore: number;
  reasoning: string;
};

export type OccupationTrendPoint = {
  month: string;
  postingsIndex: number;
};

export type RelatedGrowingRole = {
  soc: string;
  title: string;
  growthPct: number;
  skillOverlap: number;
  skillGap: string;
  jobsHref: string;
};

export type TransferableSkill = {
  skill: string;
  relevanceToAiRoles: string;
};

export type OccupationRiskRecord = {
  socCode: string;
  title: string;
  description: string;
  majorGroup: string;
  employment2024: number;
  medianWage2024: number;
  wage10th?: number;
  wage25th?: number;
  wage75th?: number;
  wage90th?: number;
  projectedGrowthPct: number;
  projectedGrowthAbs: number;
  growthCategory: GrowthCategory;
  annualOpenings: number;
  aiExposureEloundou?: number;
  aiExposureFelten?: number;
  aiExposureComposite: number;
  exposureCategory: ExposureCategory;
  totalTasks: number;
  automatableTasks: number;
  augmentableTasks: number;
  humanOnlyTasks: number;
  topAutomatable: OccupationTask[];
  topHumanOnly: OccupationTask[];
  postingTrend12mo: number;
  postingTrendCategory: PostingTrendCategory;
  postingTrendSeries: OccupationTrendPoint[];
  seniorityBreakdown: {
    entry: { changePct: number };
    mid: { changePct: number };
    senior: { changePct: number };
  };
  relatedGrowingRoles: RelatedGrowingRole[];
  transferableSkills: TransferableSkill[];
  popular?: boolean;
  dataAsOf: string;
  methodologyVersion: string;
  sourceNotes: Array<{
    label: string;
    url: string;
  }>;
};

export type OccupationRiskSearchResult = {
  socCode: string;
  title: string;
  employment2024: number;
};

export type OccupationRiskApiResponse = {
  occupation: {
    soc_code: string;
    title: string;
    major_group: string;
    description: string;
  };
  employment: {
    current: number;
    median_wage: number;
    wage_range: { p10?: number; p25?: number; p75?: number; p90?: number };
    projected_growth_pct: number;
    projected_growth_abs: number;
    growth_category: GrowthCategory;
    annual_openings: number;
  };
  public_summary: {
    headline: string;
    summary: string;
  };
  actions: Array<{ label: string; href: string }>;
  metadata: {
    data_as_of: string;
    methodology_version: string;
    sources: string[];
    source_links: Array<{ label: string; url: string }>;
    notice: string;
    limitations: string;
  };
};

const methodologyNotice =
  "This public occupation page publishes only directly sourced BLS employment, wage, and outlook fields. Modeled posting, task, and transition layers stay off the public site until their provenance audit is complete.";

const DATA_AS_OF = "2026-03-01";
const METHODOLOGY_VERSION = "1.0";

export const occupationRiskRecords: OccupationRiskRecord[] = [
  {
    socCode: "15-1252",
    title: "Software Developers",
    description:
      "Research, design, and develop computer and network software or specialized utility programs for commercial and internal systems.",
    majorGroup: "Computer and Mathematical Occupations",
    employment2024: 1693800,
    medianWage2024: 133080,
    wage10th: 79850,
    wage25th: 103500,
    wage75th: 171000,
    wage90th: 211450,
    projectedGrowthPct: 16,
    projectedGrowthAbs: 267700,
    growthCategory: "much_faster",
    annualOpenings: 115200,
    aiExposureEloundou: 0.71,
    aiExposureFelten: 0.73,
    aiExposureComposite: 0.72,
    exposureCategory: "high",
    totalTasks: 12,
    automatableTasks: 5,
    augmentableTasks: 4,
    humanOnlyTasks: 3,
    topAutomatable: [
      {
        task: "Writing boilerplate application code and test scaffolds",
        aiScore: 0.91,
        reasoning: "Current coding tools handle well-specified routine implementation unusually well."
      },
      {
        task: "Generating first-pass documentation",
        aiScore: 0.88,
        reasoning: "Summaries and explanation drafts are easy for current models to produce."
      },
      {
        task: "Debugging routine syntax and configuration errors",
        aiScore: 0.84,
        reasoning: "Known failure patterns are highly represented in existing training data."
      },
      {
        task: "Code review for style and standard compliance",
        aiScore: 0.79,
        reasoning: "Style conformance and lint-like checks are narrow enough to automate heavily."
      },
      {
        task: "Query and helper-function optimization passes",
        aiScore: 0.76,
        reasoning: "Localized performance suggestions are often within current tool capability."
      }
    ],
    topHumanOnly: [
      {
        task: "Understanding ambiguous product needs and hidden constraints",
        aiScore: 0.22,
        reasoning: "This work depends on context, negotiation, and incomplete information."
      },
      {
        task: "Making system-architecture tradeoffs under uncertainty",
        aiScore: 0.28,
        reasoning: "Architecture decisions require judgment about future scale, cost, and organizational reality."
      },
      {
        task: "Cross-team coordination, prioritization, and incident leadership",
        aiScore: 0.15,
        reasoning: "Human trust and organizational authority still drive this work."
      }
    ],
    postingTrend12mo: -8,
    postingTrendCategory: "declining",
    postingTrendSeries: [
      { month: "Apr", postingsIndex: 108 },
      { month: "May", postingsIndex: 110 },
      { month: "Jun", postingsIndex: 107 },
      { month: "Jul", postingsIndex: 103 },
      { month: "Aug", postingsIndex: 99 },
      { month: "Sep", postingsIndex: 98 },
      { month: "Oct", postingsIndex: 95 },
      { month: "Nov", postingsIndex: 94 },
      { month: "Dec", postingsIndex: 92 },
      { month: "Jan", postingsIndex: 91 },
      { month: "Feb", postingsIndex: 93 },
      { month: "Mar", postingsIndex: 92 }
    ],
    seniorityBreakdown: {
      entry: { changePct: -28 },
      mid: { changePct: -8 },
      senior: { changePct: 12 }
    },
    relatedGrowingRoles: [
      {
        soc: "15-2051",
        title: "Data Scientists",
        growthPct: 34,
        skillOverlap: 0.78,
        skillGap: "Statistical modeling, experiment design, and data storytelling",
        jobsHref: "/jobs?q=data scientist"
      },
      {
        soc: "15-1212",
        title: "Information Security Analysts",
        growthPct: 29,
        skillOverlap: 0.72,
        skillGap: "Threat modeling, security tooling, and compliance patterns",
        jobsHref: "/jobs?q=security"
      },
      {
        soc: "15-1221",
        title: "Computer and Information Research Scientists",
        growthPct: 17,
        skillOverlap: 0.85,
        skillGap: "Research methods, model experimentation, and advanced math",
        jobsHref: "/jobs?q=AI engineer"
      }
    ],
    transferableSkills: [
      { skill: "System design", relevanceToAiRoles: "Useful in ML infrastructure, platform engineering, and AI product work" },
      { skill: "Debugging", relevanceToAiRoles: "Transfers directly into evaluation, observability, and security review" },
      { skill: "Cross-functional delivery", relevanceToAiRoles: "Valuable in AI product management and applied AI teams" }
    ],
    popular: true,
    dataAsOf: DATA_AS_OF,
    methodologyVersion: METHODOLOGY_VERSION,
    sourceNotes: [
      { label: "BLS Occupational Outlook Handbook — Software Developers", url: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm" },
      { label: "BLS Employment Projections — Occupational separations and openings (15-1252)", url: "https://www.bls.gov/emp/tables/occupational-separations-and-openings.htm" },
      { label: "Budget Lab at Yale — Evaluating the Impact of AI on the Labor Market", url: "https://budgetlab.yale.edu/research/evaluating-impact-ai-labor-market-current-state-affairs" },
      { label: "METR — Experienced Open-Source Developer Productivity Study", url: "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/" }
    ]
  },
  {
    socCode: "15-1251",
    title: "Computer Programmers",
    description:
      "Write, modify, and test code and scripts that allow computer software and applications to function properly.",
    majorGroup: "Computer and Mathematical Occupations",
    employment2024: 121200,
    medianWage2024: 98670,
    projectedGrowthPct: -6,
    projectedGrowthAbs: -7200,
    growthCategory: "decline",
    annualOpenings: 5500,
    aiExposureEloundou: 0.92,
    aiExposureFelten: 0.9,
    aiExposureComposite: 0.91,
    exposureCategory: "very_high",
    totalTasks: 11,
    automatableTasks: 7,
    augmentableTasks: 2,
    humanOnlyTasks: 2,
    topAutomatable: [
      {
        task: "Converting designs into implementation-ready code",
        aiScore: 0.93,
        reasoning: "This work is narrow, repetitive, and richly represented in public code."
      },
      {
        task: "Updating existing code for syntax or library changes",
        aiScore: 0.9,
        reasoning: "Migration-style tasks are highly pattern-based."
      },
      {
        task: "Testing and patching straightforward defects",
        aiScore: 0.88,
        reasoning: "Known bug patterns are well-covered by current coding copilots."
      }
    ],
    topHumanOnly: [
      {
        task: "Clarifying what the software should actually do",
        aiScore: 0.24,
        reasoning: "Ambiguous specifications still require human conversation and judgment."
      },
      {
        task: "Owning production accountability with multiple stakeholders",
        aiScore: 0.18,
        reasoning: "Responsibility and escalation remain human work."
      }
    ],
    postingTrend12mo: -24,
    postingTrendCategory: "falling",
    postingTrendSeries: [
      { month: "Apr", postingsIndex: 100 },
      { month: "May", postingsIndex: 98 },
      { month: "Jun", postingsIndex: 95 },
      { month: "Jul", postingsIndex: 92 },
      { month: "Aug", postingsIndex: 88 },
      { month: "Sep", postingsIndex: 84 },
      { month: "Oct", postingsIndex: 81 },
      { month: "Nov", postingsIndex: 79 },
      { month: "Dec", postingsIndex: 77 },
      { month: "Jan", postingsIndex: 76 },
      { month: "Feb", postingsIndex: 75 },
      { month: "Mar", postingsIndex: 76 }
    ],
    seniorityBreakdown: {
      entry: { changePct: -31 },
      mid: { changePct: -21 },
      senior: { changePct: -9 }
    },
    relatedGrowingRoles: [
      {
        soc: "15-1252",
        title: "Software Developers",
        growthPct: 15,
        skillOverlap: 0.84,
        skillGap: "More product context, architecture, and end-to-end ownership",
        jobsHref: "/jobs?q=software developer"
      },
      {
        soc: "15-2051",
        title: "Data Scientists",
        growthPct: 34,
        skillOverlap: 0.65,
        skillGap: "Statistics, experimentation, and model evaluation",
        jobsHref: "/jobs?q=data scientist"
      },
      {
        soc: "15-1212",
        title: "Information Security Analysts",
        growthPct: 29,
        skillOverlap: 0.54,
        skillGap: "Security operations, compliance, and threat intelligence",
        jobsHref: "/jobs?q=security"
      }
    ],
    transferableSkills: [
      { skill: "Code fluency", relevanceToAiRoles: "Still useful wherever tools must be checked, tested, or secured" },
      { skill: "Debugging", relevanceToAiRoles: "Transfers well into QA, security, and AI evaluation" },
      { skill: "Automation habits", relevanceToAiRoles: "Useful in scripting, platform work, and internal tooling" }
    ],
    popular: true,
    dataAsOf: DATA_AS_OF,
    methodologyVersion: METHODOLOGY_VERSION,
    sourceNotes: [
      { label: "BLS Occupational Outlook Handbook — Computer Programmers", url: "https://www.bls.gov/ooh/computer-and-information-technology/computer-programmers.htm" },
      { label: "Budget Lab at Yale — Evaluating the Impact of AI on the Labor Market", url: "https://budgetlab.yale.edu/research/evaluating-impact-ai-labor-market-current-state-affairs" }
    ]
  },
  {
    socCode: "15-2051",
    title: "Data Scientists",
    description:
      "Use analytical tools and techniques to extract meaningful insights from data and support decisions, products, and model development.",
    majorGroup: "Mathematical Science Occupations",
    employment2024: 245900,
    medianWage2024: 112590,
    wage10th: 63650,
    wage90th: 194410,
    projectedGrowthPct: 34,
    projectedGrowthAbs: 82500,
    growthCategory: "much_faster",
    annualOpenings: 23400,
    aiExposureEloundou: 0.59,
    aiExposureFelten: 0.55,
    aiExposureComposite: 0.57,
    exposureCategory: "medium",
    totalTasks: 11,
    automatableTasks: 2,
    augmentableTasks: 6,
    humanOnlyTasks: 3,
    topAutomatable: [
      {
        task: "Cleaning and labeling routine datasets",
        aiScore: 0.74,
        reasoning: "Well-defined transformation work is increasingly automatable."
      },
      {
        task: "Generating first-pass visual summaries",
        aiScore: 0.71,
        reasoning: "Standard reporting formats translate well to model-assisted output."
      }
    ],
    topHumanOnly: [
      {
        task: "Deciding what question is worth modeling",
        aiScore: 0.26,
        reasoning: "This depends on business judgment and context outside the dataset."
      },
      {
        task: "Designing experiments and interpreting noisy results",
        aiScore: 0.29,
        reasoning: "Causal inference and research design remain human-heavy."
      },
      {
        task: "Explaining tradeoffs to nontechnical stakeholders",
        aiScore: 0.2,
        reasoning: "Communication under uncertainty still relies on human trust."
      }
    ],
    postingTrend12mo: 14,
    postingTrendCategory: "growing",
    postingTrendSeries: [
      { month: "Apr", postingsIndex: 96 },
      { month: "May", postingsIndex: 99 },
      { month: "Jun", postingsIndex: 101 },
      { month: "Jul", postingsIndex: 103 },
      { month: "Aug", postingsIndex: 104 },
      { month: "Sep", postingsIndex: 107 },
      { month: "Oct", postingsIndex: 109 },
      { month: "Nov", postingsIndex: 111 },
      { month: "Dec", postingsIndex: 112 },
      { month: "Jan", postingsIndex: 114 },
      { month: "Feb", postingsIndex: 112 },
      { month: "Mar", postingsIndex: 114 }
    ],
    seniorityBreakdown: {
      entry: { changePct: -6 },
      mid: { changePct: 8 },
      senior: { changePct: 18 }
    },
    relatedGrowingRoles: [
      {
        soc: "15-1221",
        title: "Computer and Information Research Scientists",
        growthPct: 17,
        skillOverlap: 0.82,
        skillGap: "Advanced research depth and more formal mathematical training",
        jobsHref: "/jobs?q=AI engineer"
      },
      {
        soc: "15-1252",
        title: "Software Developers",
        growthPct: 15,
        skillOverlap: 0.7,
        skillGap: "More product delivery and software architecture ownership",
        jobsHref: "/jobs?q=software developer"
      },
      {
        soc: "15-1212",
        title: "Information Security Analysts",
        growthPct: 29,
        skillOverlap: 0.58,
        skillGap: "Security frameworks and incident-response workflows",
        jobsHref: "/jobs?q=security"
      }
    ],
    transferableSkills: [
      { skill: "Statistical reasoning", relevanceToAiRoles: "Useful in evaluation, experimentation, and model QA" },
      { skill: "Python and SQL", relevanceToAiRoles: "Transfers directly to ML, analytics engineering, and data infrastructure" },
      { skill: "Data storytelling", relevanceToAiRoles: "Helpful in AI product, strategy, and research communication" }
    ],
    popular: true,
    dataAsOf: DATA_AS_OF,
    methodologyVersion: METHODOLOGY_VERSION,
    sourceNotes: [
      { label: "BLS Occupational Outlook Handbook — Data Scientists", url: "https://www.bls.gov/ooh/math/data-scientists.htm" },
      { label: "Budget Lab at Yale — Evaluating the Impact of AI on the Labor Market", url: "https://budgetlab.yale.edu/research/evaluating-impact-ai-labor-market-current-state-affairs" }
    ]
  },
  {
    socCode: "15-1212",
    title: "Information Security Analysts",
    description:
      "Plan and carry out security measures to protect an organization's computer networks, systems, and data.",
    majorGroup: "Computer and Mathematical Occupations",
    employment2024: 182800,
    medianWage2024: 124910,
    wage10th: 69660,
    wage90th: 186420,
    projectedGrowthPct: 29,
    projectedGrowthAbs: 52100,
    growthCategory: "much_faster",
    annualOpenings: 16000,
    aiExposureEloundou: 0.43,
    aiExposureFelten: 0.41,
    aiExposureComposite: 0.42,
    exposureCategory: "low",
    totalTasks: 10,
    automatableTasks: 1,
    augmentableTasks: 5,
    humanOnlyTasks: 4,
    topAutomatable: [
      {
        task: "Summarizing alerts and suspicious logs",
        aiScore: 0.68,
        reasoning: "Pattern-heavy log review is increasingly assistive-work rather than fully human work."
      }
    ],
    topHumanOnly: [
      {
        task: "Prioritizing real-world security risk",
        aiScore: 0.18,
        reasoning: "Threat judgment depends on context, incentives, and downstream consequences."
      },
      {
        task: "Leading incident response",
        aiScore: 0.16,
        reasoning: "High-pressure coordination remains strongly human."
      },
      {
        task: "Building trust with engineering and leadership teams",
        aiScore: 0.12,
        reasoning: "Security work depends on influence as much as detection."
      }
    ],
    postingTrend12mo: 18,
    postingTrendCategory: "growing",
    postingTrendSeries: [
      { month: "Apr", postingsIndex: 92 },
      { month: "May", postingsIndex: 95 },
      { month: "Jun", postingsIndex: 97 },
      { month: "Jul", postingsIndex: 99 },
      { month: "Aug", postingsIndex: 101 },
      { month: "Sep", postingsIndex: 103 },
      { month: "Oct", postingsIndex: 106 },
      { month: "Nov", postingsIndex: 108 },
      { month: "Dec", postingsIndex: 110 },
      { month: "Jan", postingsIndex: 109 },
      { month: "Feb", postingsIndex: 111 },
      { month: "Mar", postingsIndex: 110 }
    ],
    seniorityBreakdown: {
      entry: { changePct: 4 },
      mid: { changePct: 11 },
      senior: { changePct: 16 }
    },
    relatedGrowingRoles: [
      {
        soc: "15-1221",
        title: "Computer and Information Research Scientists",
        growthPct: 17,
        skillOverlap: 0.63,
        skillGap: "Deeper research methods and formal computer science theory",
        jobsHref: "/jobs?q=AI engineer"
      },
      {
        soc: "15-1252",
        title: "Software Developers",
        growthPct: 15,
        skillOverlap: 0.66,
        skillGap: "Product delivery, full-stack implementation, and developer workflow depth",
        jobsHref: "/jobs?q=software developer"
      },
      {
        soc: "15-2051",
        title: "Data Scientists",
        growthPct: 34,
        skillOverlap: 0.46,
        skillGap: "Statistical modeling and experiment design",
        jobsHref: "/jobs?q=data scientist"
      }
    ],
    transferableSkills: [
      { skill: "Risk assessment", relevanceToAiRoles: "Transfers into AI governance and safety evaluation" },
      { skill: "Incident analysis", relevanceToAiRoles: "Useful in model monitoring and reliability work" },
      { skill: "Security tooling", relevanceToAiRoles: "Applies to AI infrastructure and platform protection" }
    ],
    popular: true,
    dataAsOf: DATA_AS_OF,
    methodologyVersion: METHODOLOGY_VERSION,
    sourceNotes: [
      { label: "BLS Occupational Outlook Handbook — Information Security Analysts", url: "https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm" },
      { label: "Brookings — Measuring U.S. Workers' Capacity to Adapt to AI-Driven Job Displacement", url: "https://www.brookings.edu/articles/measuring-us-workers-capacity-to-adapt-to-ai-driven-job-displacement/" }
    ]
  },
  {
    socCode: "13-2011",
    title: "Accountants and Auditors",
    description:
      "Prepare and examine financial records, identify risk, and help organizations and individuals understand their financial position.",
    majorGroup: "Business and Financial Operations Occupations",
    employment2024: 1579800,
    medianWage2024: 81680,
    projectedGrowthPct: 5,
    projectedGrowthAbs: 72800,
    growthCategory: "faster",
    annualOpenings: 124200,
    aiExposureEloundou: 0.65,
    aiExposureFelten: 0.67,
    aiExposureComposite: 0.66,
    exposureCategory: "high",
    totalTasks: 12,
    automatableTasks: 4,
    augmentableTasks: 5,
    humanOnlyTasks: 3,
    topAutomatable: [
      {
        task: "Drafting routine reconciliations and summaries",
        aiScore: 0.83,
        reasoning: "Standardized financial text and spreadsheet work is highly assistive today."
      },
      {
        task: "Categorizing expenses and spotting straightforward anomalies",
        aiScore: 0.79,
        reasoning: "Structured inputs make this work susceptible to automation."
      },
      {
        task: "Preparing first-pass tax documentation checklists",
        aiScore: 0.74,
        reasoning: "Checklist-style output maps well to current tools."
      }
    ],
    topHumanOnly: [
      {
        task: "Explaining financial tradeoffs to managers or clients",
        aiScore: 0.22,
        reasoning: "Human trust and contextual judgment still matter here."
      },
      {
        task: "Assessing fraud risk and gray-area compliance questions",
        aiScore: 0.26,
        reasoning: "Ambiguous cases require accountability and domain judgment."
      },
      {
        task: "Building credibility during audits and reviews",
        aiScore: 0.18,
        reasoning: "Relationship-driven work remains hard to automate cleanly."
      }
    ],
    postingTrend12mo: -6,
    postingTrendCategory: "declining",
    postingTrendSeries: [
      { month: "Apr", postingsIndex: 102 },
      { month: "May", postingsIndex: 101 },
      { month: "Jun", postingsIndex: 100 },
      { month: "Jul", postingsIndex: 99 },
      { month: "Aug", postingsIndex: 97 },
      { month: "Sep", postingsIndex: 96 },
      { month: "Oct", postingsIndex: 95 },
      { month: "Nov", postingsIndex: 94 },
      { month: "Dec", postingsIndex: 93 },
      { month: "Jan", postingsIndex: 92 },
      { month: "Feb", postingsIndex: 96 },
      { month: "Mar", postingsIndex: 96 }
    ],
    seniorityBreakdown: {
      entry: { changePct: -14 },
      mid: { changePct: -5 },
      senior: { changePct: 3 }
    },
    relatedGrowingRoles: [
      {
        soc: "13-1161",
        title: "Market Research Analysts and Marketing Specialists",
        growthPct: 8,
        skillOverlap: 0.55,
        skillGap: "More customer, market, and experimentation fluency",
        jobsHref: "/jobs?q=analyst"
      },
      {
        soc: "15-2051",
        title: "Data Scientists",
        growthPct: 34,
        skillOverlap: 0.49,
        skillGap: "Statistical modeling, Python, and experiment design",
        jobsHref: "/jobs?q=data scientist"
      },
      {
        soc: "13-1111",
        title: "Management Analysts",
        growthPct: 10,
        skillOverlap: 0.61,
        skillGap: "Stakeholder advisory work and project-based consulting",
        jobsHref: "/jobs?q=analyst"
      }
    ],
    transferableSkills: [
      { skill: "Financial analysis", relevanceToAiRoles: "Useful in AI ops, finance analytics, and business intelligence" },
      { skill: "Compliance discipline", relevanceToAiRoles: "Transfers into AI governance and policy-heavy workflows" },
      { skill: "Spreadsheet fluency", relevanceToAiRoles: "Still valuable in analytics and operations roles" }
    ],
    popular: true,
    dataAsOf: DATA_AS_OF,
    methodologyVersion: METHODOLOGY_VERSION,
    sourceNotes: [
      { label: "BLS Occupational Outlook Handbook — Accountants and Auditors", url: "https://www.bls.gov/ooh/business-and-financial/accountants-and-auditors.htm" },
      { label: "Brookings — Measuring U.S. Workers' Capacity to Adapt to AI-Driven Job Displacement", url: "https://www.brookings.edu/articles/measuring-us-workers-capacity-to-adapt-to-ai-driven-job-displacement/" }
    ]
  },
  {
    socCode: "43-4051",
    title: "Customer Service Representatives",
    description:
      "Interact with customers to handle complaints, process orders, provide information, and resolve routine service issues.",
    majorGroup: "Office and Administrative Support Occupations",
    employment2024: 2814000,
    medianWage2024: 42830,
    projectedGrowthPct: -5,
    projectedGrowthAbs: -153700,
    growthCategory: "decline",
    annualOpenings: 341700,
    aiExposureEloundou: 0.82,
    aiExposureFelten: 0.84,
    aiExposureComposite: 0.83,
    exposureCategory: "very_high",
    totalTasks: 10,
    automatableTasks: 6,
    augmentableTasks: 2,
    humanOnlyTasks: 2,
    topAutomatable: [
      {
        task: "Answering standard questions about orders, refunds, and policies",
        aiScore: 0.91,
        reasoning: "High-volume, repetitive inquiry handling is already being automated."
      },
      {
        task: "Routing customers to the correct workflow",
        aiScore: 0.87,
        reasoning: "Intent classification is a mature AI use case."
      },
      {
        task: "Logging contact summaries and next steps",
        aiScore: 0.82,
        reasoning: "Structured recap work is highly model-friendly."
      }
    ],
    topHumanOnly: [
      {
        task: "De-escalating angry or frightened customers",
        aiScore: 0.25,
        reasoning: "Human empathy and judgment still matter most in emotionally charged exchanges."
      },
      {
        task: "Resolving unusual cases that cross multiple policies",
        aiScore: 0.28,
        reasoning: "Edge cases still require human discretion."
      }
    ],
    postingTrend12mo: -19,
    postingTrendCategory: "falling",
    postingTrendSeries: [
      { month: "Apr", postingsIndex: 104 },
      { month: "May", postingsIndex: 102 },
      { month: "Jun", postingsIndex: 100 },
      { month: "Jul", postingsIndex: 98 },
      { month: "Aug", postingsIndex: 95 },
      { month: "Sep", postingsIndex: 92 },
      { month: "Oct", postingsIndex: 89 },
      { month: "Nov", postingsIndex: 87 },
      { month: "Dec", postingsIndex: 86 },
      { month: "Jan", postingsIndex: 84 },
      { month: "Feb", postingsIndex: 84 },
      { month: "Mar", postingsIndex: 84 }
    ],
    seniorityBreakdown: {
      entry: { changePct: -21 },
      mid: { changePct: -17 },
      senior: { changePct: -9 }
    },
    relatedGrowingRoles: [
      {
        soc: "41-3031",
        title: "Sales Representatives of Services",
        growthPct: 6,
        skillOverlap: 0.59,
        skillGap: "Quota ownership, prospecting, and revenue process fluency",
        jobsHref: "/jobs?q=gtm"
      },
      {
        soc: "13-1161",
        title: "Market Research Analysts and Marketing Specialists",
        growthPct: 8,
        skillOverlap: 0.44,
        skillGap: "Research methods, analytics, and campaign strategy",
        jobsHref: "/jobs?q=marketing"
      },
      {
        soc: "15-1212",
        title: "Information Security Analysts",
        growthPct: 29,
        skillOverlap: 0.31,
        skillGap: "Technical depth, security tooling, and certification work",
        jobsHref: "/jobs?q=security"
      }
    ],
    transferableSkills: [
      { skill: "Customer communication", relevanceToAiRoles: "Useful in AI operations, support, and solutions roles" },
      { skill: "Workflow discipline", relevanceToAiRoles: "Transfers into trust and safety and operations work" },
      { skill: "Problem triage", relevanceToAiRoles: "Useful in technical support and escalation-heavy roles" }
    ],
    popular: true,
    dataAsOf: DATA_AS_OF,
    methodologyVersion: METHODOLOGY_VERSION,
    sourceNotes: [
      { label: "BLS Occupational Outlook Handbook — Customer Service Representatives", url: "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm" },
      { label: "Brookings — Measuring U.S. Workers' Capacity to Adapt to AI-Driven Job Displacement", url: "https://www.brookings.edu/articles/measuring-us-workers-capacity-to-adapt-to-ai-driven-job-displacement/" }
    ]
  }
];

export const popularOccupationSocCodes = occupationRiskRecords.filter((record) => record.popular).map((record) => record.socCode);

export function searchOccupations(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [];
  }

  return occupationRiskRecords
    .filter((record) => `${record.title} ${record.socCode} ${record.majorGroup}`.toLowerCase().includes(normalized))
    .slice(0, 8)
    .map<OccupationRiskSearchResult>((record) => ({
      socCode: record.socCode,
      title: record.title,
      employment2024: record.employment2024
    }));
}

export function getOccupationRiskRecord(socCode: string) {
  return occupationRiskRecords.find((record) => record.socCode === socCode);
}

export function getPopularOccupations() {
  return occupationRiskRecords.filter((record) => record.popular);
}

export function toOccupationRiskApiResponse(record: OccupationRiskRecord): OccupationRiskApiResponse {
  return {
    occupation: {
      soc_code: record.socCode,
      title: record.title,
      major_group: record.majorGroup,
      description: record.description
    },
    employment: {
      current: record.employment2024,
      median_wage: record.medianWage2024,
      wage_range: {
        p10: record.wage10th,
        p25: record.wage25th,
        p75: record.wage75th,
        p90: record.wage90th
      },
      projected_growth_pct: record.projectedGrowthPct,
      projected_growth_abs: record.projectedGrowthAbs,
      growth_category: record.growthCategory,
      annual_openings: record.annualOpenings
    },
    public_summary: {
      headline: buildPublicHeadline(record),
      summary: buildPublicSummary(record)
    },
    actions: buildPublicActions(record),
    metadata: {
      data_as_of: record.dataAsOf,
      methodology_version: record.methodologyVersion,
      sources: buildPublicSourceLinks(record).map((source) => source.label),
      source_links: buildPublicSourceLinks(record),
      notice: methodologyNotice,
      limitations:
        "Published AI-exposure, task-overlap, posting-trend, and transition layers are temporarily withheld from the public tool until their provenance audit is complete."
    }
  };
}

function buildPublicHeadline(record: OccupationRiskRecord) {
  if (record.projectedGrowthPct >= 15) {
    return `BLS projects faster-than-average growth for ${record.title.toLowerCase()} through 2034.`;
  }

  if (record.projectedGrowthPct > 0) {
    return `BLS still projects growth for ${record.title.toLowerCase()} through 2034.`;
  }

  if (record.projectedGrowthPct === 0) {
    return `BLS projects a flat outlook for ${record.title.toLowerCase()} through 2034.`;
  }

  return `BLS projects a decline in ${record.title.toLowerCase()} employment through 2034.`;
}

function buildPublicSummary(record: OccupationRiskRecord) {
  const growthText =
    record.projectedGrowthPct > 0
      ? `Employment is projected to grow ${record.projectedGrowthPct}% from 2024 to 2034`
      : record.projectedGrowthPct < 0
        ? `Employment is projected to decline ${Math.abs(record.projectedGrowthPct)}% from 2024 to 2034`
        : "Employment is projected to remain flat from 2024 to 2034";

  return `${growthText}, with about ${record.annualOpenings.toLocaleString("en-US")} openings a year on average. The latest BLS snapshot lists ${record.employment2024.toLocaleString("en-US")} workers in this occupation and median pay of $${record.medianWage2024.toLocaleString("en-US")}.`;
}

function buildPublicActions(record: OccupationRiskRecord) {
  return [
    {
      label: `Browse jobs related to ${record.title.toLowerCase()}`,
      href: `/jobs?q=${encodeURIComponent(record.title)}`
    },
    {
      label: "Read the methodology",
      href: "/methodology"
    },
    {
      label:
        record.socCode.startsWith("15-")
          ? "Read the software-engineering analysis"
          : "See the latest layoff log",
      href: record.socCode.startsWith("15-")
        ? "/career-notes/will-ai-replace-software-engineers"
        : "/layoffs"
    }
  ];
}

function buildPublicSourceLinks(record: OccupationRiskRecord) {
  return record.sourceNotes.filter((source) => source.label.startsWith("BLS "));
}

export const occupationRiskMethodologyNotice = methodologyNotice;
