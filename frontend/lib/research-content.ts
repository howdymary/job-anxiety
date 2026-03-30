export type ResearchStudyPart = {
  id: string;
  label: string;
  title: string;
  window: string;
  description: string;
  questions: string[];
};

export type ResearchAgent = {
  name: string;
  role: string;
  focus: string;
  responsibilities: string[];
};

export type ResearchFootprintPoint = {
  label: string;
  value: number;
  note: string;
};

export type ResearchSectorCoverage = {
  sector: string;
  exposure: "Very High" | "High" | "Medium-High" | "Medium";
  priority: "Primary" | "High" | "Medium" | "Lower";
  detail: string;
};

export type ResearchSourceMatrixRow = {
  source: string;
  precursor: boolean;
  software: boolean;
  national: boolean;
  note: string;
};

export type ResearchRoadmapItem = {
  id: string;
  question: string;
  title: string;
  summary: string;
  preview: "split-area" | "dual-line" | "diverging-bars" | "scatter" | "map";
};

export const researchMeta = {
  eyebrow: "Research",
  title: "The Great Reallocation",
  description:
    "A working research brief on how AI, automation, and labor-market restructuring are changing work across the United States.",
  version: "Research Protocol v1.0",
  updated: "March 2026",
  status:
    "This page summarizes the study design, evidence base, and current analytical surfaces. It is not a final findings release."
};

export const researchStats = [
  { label: "Study parts", value: "3" },
  { label: "Source families", value: "8" },
  { label: "States covered", value: "50" },
  { label: "MSAs", value: "389" },
  { label: "Commuting zones", value: "722" },
  { label: "Priority sectors", value: "10" }
];

export const researchFootprintData: ResearchFootprintPoint[] = [
  { label: "Core occupations", value: 356, note: "Occupation set named in the protocol abstract" },
  { label: "States", value: 50, note: "Nationwide state coverage" },
  { label: "MSAs", value: 389, note: "Metro-level analysis units" },
  { label: "Commuting zones", value: 722, note: "Local labor-market units for the precursor analysis" }
];

export const researchStudyParts: ResearchStudyPart[] = [
  {
    id: "precursor",
    label: "Part I",
    title: "The Precursor: Robotics, Automation, and Manufacturing",
    window: "2000–2024",
    description:
      "A historical control for the AI era. This section extends the Acemoglu and Restrepo robotics framework to measure displacement velocity, geographic concentration, wage effects, and labor-market adjustment speed.",
    questions: [
      "How many manufacturing jobs were displaced by robotics and automation, and at what rate?",
      "Which commuting zones absorbed the largest shocks, and how long did recovery take?",
      "What happened to wages, labor-force participation, disability claims, and related secondary outcomes?"
    ]
  },
  {
    id: "software",
    label: "Part II",
    title: "The Canary Sector: Software Engineering",
    window: "January 2019 to present",
    description:
      "A deep role-level study of the first sector to feel direct pressure from generative AI tools. The protocol tracks 14 software sub-occupations, seniority splits, layoffs, compensation, and the creation of new AI-native roles.",
    questions: [
      "Which software roles show the sharpest breaks after GitHub Copilot and ChatGPT adoption?",
      "Is the pressure concentrated at entry level, or distributed across seniority bands?",
      "Are new AI roles offsetting the decline in older engineering and support roles?"
    ]
  },
  {
    id: "national",
    label: "Part III",
    title: "The Nationwide Study",
    window: "2022 to latest available data",
    description:
      "A broad occupation, sector, and geography analysis that compares actual employment changes with pre-AI BLS projections, then layers on AI exposure scores, wage effects, and demographic segmentation.",
    questions: [
      "Which occupations are materially underperforming their projected path in high-exposure categories?",
      "Which sectors are showing net displacement versus net creation?",
      "Where is impact concentrating geographically, and who is least able to transition?"
    ]
  }
];

export const researchPhases = [
  {
    title: "Phase 1: Data collection",
    timing: "Weeks 1–4",
    summary:
      "Acquire, clean, validate, and document federal labor data, displacement records, job-posting feeds, and historical automation inputs."
  },
  {
    title: "Phase 2: Analysis",
    timing: "Weeks 5–10",
    summary:
      "Run the economic, sector, geographic, and statistical workstreams in parallel, with robustness checks and uncertainty bounds built in."
  },
  {
    title: "Phase 3: Synthesis",
    timing: "Weeks 11–14",
    summary:
      "Write the paper, fact-check every empirical claim, produce the executive summary, and prepare charts, maps, and public-facing data assets."
  }
];

export const researchAgents: ResearchAgent[] = [
  {
    name: "Principal Investigator",
    role: "Coordination and final review",
    focus:
      "Owns sequencing, quality control, conflict resolution, and the publication bar for every claim, estimate, and conclusion.",
    responsibilities: [
      "Enforce the two-source rule for factual claims",
      "Send weak analysis back for revision",
      'Ensure causal language stays properly hedged'
    ]
  },
  {
    name: "Data Collection Agent",
    role: "Data engineering and provenance",
    focus:
      "Builds the reproducible data layer: BLS, CPS, JOLTS, WARN Act, SEC, job-posting data, and historical automation sources.",
    responsibilities: [
      "Document source URLs, download dates, and transformations",
      "Validate totals, missingness, and plausibility",
      "Deliver clean scripted datasets to the analysis agents"
    ]
  },
  {
    name: "Labor Economist",
    role: "Economic framework and interpretation",
    focus:
      "Owns the task-based theory, displacement-versus-augmentation framing, wage dynamics, and the main occupation-level estimates.",
    responsibilities: [
      "Replicate and extend the robotics displacement benchmark",
      "Test the Jevons question inside software and at national scale",
      "Pair effect sizes with confidence intervals and practical meaning"
    ]
  },
  {
    name: "Sector Analyst",
    role: "Industry-level explanation",
    focus:
      "Translates abstract labor patterns into company behavior, task-level change, and sector-by-sector operational reality.",
    responsibilities: [
      "Map sub-occupation posting trends and structural breaks",
      "Track company AI-adoption timelines against hiring and layoffs",
      "Build sector fact sheets with created-versus-eliminated roles"
    ]
  },
  {
    name: "Geographic Analyst",
    role: "Spatial labor-market analysis",
    focus:
      "Tells the state, metro, and commuting-zone story: where the shocks land, where recovery happens, and where mismatch grows.",
    responsibilities: [
      "Produce displacement maps at CZ, MSA, and state level",
      "Measure geographic mismatch between lost roles and new roles",
      "Test whether a knowledge-economy analog to the Rust Belt is emerging"
    ]
  },
  {
    name: "Statistical Methods and Writer/Editor",
    role: "Validation and publication",
    focus:
      "One side keeps the methods honest; the other turns the protocol and results into a paper that can survive peer review and careful public scrutiny.",
    responsibilities: [
      "Run robustness checks, power analysis, and uncertainty reporting",
      "Fact-check every number and every chart",
      "Write the paper, executive summary, and launch materials in plain language"
    ]
  }
];

export const researchDataStreams = [
  {
    title: "Federal labor data",
    detail:
      "BLS OEWS, Employment Projections, CPS microdata, JOLTS, QCEW, LAUS, ACS, and County Business Patterns anchor the employment, wage, and demographic analysis."
  },
  {
    title: "Displacement records",
    detail:
      "WARN Act filings across major tech-employment states, SEC 8-K disclosures, Challenger layoff series, and Layoffs.fyi form the layoff and restructuring layer."
  },
  {
    title: "Job-posting and demand signals",
    detail:
      "Lightcast, Indeed Hiring Lab, LinkedIn economic data, and company-level hiring surfaces support the software and occupation-level demand analysis."
  },
  {
    title: "Exposure and task data",
    detail:
      "Eloundou, Felten, O*NET, Brookings adaptive-capacity measures, and Anthropic usage data provide exposure and transition context."
  },
  {
    title: "Historical automation inputs",
    detail:
      "International Federation of Robotics data, manufacturing employment history, and secondary outcomes like opioid mortality and disability claims provide the benchmark comparison."
  }
];

export const researchSourceMatrix: ResearchSourceMatrixRow[] = [
  {
    source: "BLS OEWS and wage tables",
    precursor: true,
    software: true,
    national: true,
    note: "Employment and wage estimates by occupation, state, and metro"
  },
  {
    source: "CPS microdata",
    precursor: true,
    software: true,
    national: true,
    note: "Worker-level demographics, employment status, hours, and wages"
  },
  {
    source: "JOLTS and hiring flows",
    precursor: false,
    software: true,
    national: true,
    note: "Openings, hires, and separations by industry"
  },
  {
    source: "WARN Act and layoff disclosures",
    precursor: true,
    software: true,
    national: true,
    note: "State filings, SEC events, and layoff event normalization"
  },
  {
    source: "Lightcast and Indeed posting data",
    precursor: false,
    software: true,
    national: true,
    note: "Role-level demand, skills, geography, and seniority signals"
  },
  {
    source: "IFR robotics data",
    precursor: true,
    software: false,
    national: false,
    note: "Robot stock and automation history for the manufacturing benchmark"
  },
  {
    source: "ACS, CBP, and commuting data",
    precursor: true,
    software: false,
    national: true,
    note: "Regional resilience, establishment counts, and local labor-market structure"
  },
  {
    source: "Exposure and task indices",
    precursor: false,
    software: true,
    national: true,
    note: "Eloundou, Felten, O*NET, Brookings, and task-level AI usage context"
  }
];

export const researchSectorCoverage: ResearchSectorCoverage[] = [
  {
    sector: "Software engineering",
    exposure: "Very High",
    priority: "Primary",
    detail: "The first sector with direct generative-AI tooling pressure."
  },
  {
    sector: "Customer service",
    exposure: "Very High",
    priority: "High",
    detail: "High automation potential and large absolute worker counts."
  },
  {
    sector: "Financial services",
    exposure: "High",
    priority: "High",
    detail: "White-collar analysis work with high documented AI exposure."
  },
  {
    sector: "Marketing and content",
    exposure: "Very High",
    priority: "High",
    detail: "Creative and production work with visible AI substitution pressure."
  },
  {
    sector: "Legal services",
    exposure: "High",
    priority: "High",
    detail: "Contract review and document analysis are early AI use cases."
  },
  {
    sector: "Administrative and office",
    exposure: "Very High",
    priority: "High",
    detail: "Large exposed workforce in structured clerical task groups."
  },
  {
    sector: "Accounting and auditing",
    exposure: "High",
    priority: "Medium",
    detail: "Structured review work with strong automation pressure."
  },
  {
    sector: "Healthcare administration",
    exposure: "Medium-High",
    priority: "Medium",
    detail: "Back-office healthcare work with documentation and process burden."
  },
  {
    sector: "Translation and interpretation",
    exposure: "Very High",
    priority: "Medium",
    detail: "A category where model quality already changes the labor market."
  },
  {
    sector: "Retail and warehouse",
    exposure: "Medium",
    priority: "Lower",
    detail: "Included mainly for the bridge between robotics and AI-enabled operations."
  }
];

export const researchRoadmap: ResearchRoadmapItem[] = [
  {
    id: "H1",
    question: "Are AI job gains outrunning AI-linked losses right now?",
    title: "The displacement ratio",
    summary:
      "A split-area chart comparing AI-job creation with AI-attributed layoffs across a rolling 12-month window.",
    preview: "split-area"
  },
  {
    id: "P1",
    question: "How fast is AI displacement moving relative to manufacturing automation?",
    title: "Automation velocity comparison",
    summary:
      "A dual-line benchmark chart that compares the speed of the manufacturing precursor shock with the white-collar AI era.",
    preview: "dual-line"
  },
  {
    id: "S2",
    question: "Which software roles are expanding and which are contracting?",
    title: "Role creation versus elimination ledger",
    summary:
      "A diverging role chart for software sub-occupations, with growth on the right and contraction on the left.",
    preview: "diverging-bars"
  },
  {
    id: "N1",
    question: "Do high-exposure occupations actually underperform their projected path?",
    title: "Occupation-level AI displacement index",
    summary:
      "The signature analytical scatter plot: AI exposure on one axis, deviation from BLS expectations on the other.",
    preview: "scatter"
  },
  {
    id: "N7",
    question: "Where is a knowledge-economy displacement belt forming?",
    title: "AI displacement geography",
    summary:
      "A map layer built to compare current AI displacement concentration with the manufacturing geography from the precursor study.",
    preview: "map"
  }
];

export const researchWalkthrough = [
  {
    step: "1",
    title: "Start with labor-market baselines",
    detail: "Use BLS employment and wage tables to define what each occupation and geography looked like before the AI shock window."
  },
  {
    step: "2",
    title: "Layer on exposure and task data",
    detail: "Merge occupation codes with AI exposure indices and task-level context so the analysis does not rely on title anecdotes alone."
  },
  {
    step: "3",
    title: "Compare actual versus expected",
    detail: "Measure how the real labor market diverges from pre-AI BLS projections rather than treating every decline as an AI story by default."
  },
  {
    step: "4",
    title: "Control for competing shocks",
    detail: "Separate AI-consistent effects from post-COVID normalization, rate tightening, sector-specific slowdowns, and hiring resets."
  },
  {
    step: "5",
    title: "Publish with uncertainty visible",
    detail: "Every chart, map, and table must carry source attribution, uncertainty where applicable, and language that matches what the data can actually support."
  }
];

export const researchMethodHighlights = [
  "Use commuting zones as the main local labor-market unit for the precursor analysis.",
  "Compare actual occupation-level employment changes with pre-AI BLS projections to estimate candidate displacement signals.",
  "Run structural break tests around June 2022 and November 2022 for software hiring series.",
  "Control for macro confounds such as post-COVID normalization, rate tightening, and sector-specific demand swings.",
  "Report point estimates with uncertainty bounds, and publish robustness checks whether they support the main narrative or not."
];

export const researchOutputs = [
  "Full research paper with appendices for methodology, robustness checks, and occupation tables",
  "Executive summary for journalists, policymakers, and company leaders",
  "Interactive dashboard, maps, and chart pack for jobanxiety.ai",
  "Downloadable occupation-level displacement index and data releases",
  "Public methodology documentation and code repository for reproducibility"
];

export const researchLimitations = [
  "AI attribution remains the hardest problem. The protocol can estimate exposure-consistent effects, but it cannot observe the clean counterfactual world without AI.",
  "Federal labor data arrives with meaningful lag, so the cleanest measures may trail the current news cycle by months.",
  "Occupation codes are coarser than real job titles, especially inside software and other fast-moving white-collar fields.",
  "Wage data can mislead when lower-paid workers are displaced first, mechanically raising average wages for those who remain."
];

export const researchDistribution = [
  { label: "Academic", detail: "Working paper distribution, conference presentation, and submission to labor-economics journals." },
  { label: "Journalism", detail: "Embeddable charts, an executive summary, and citation-ready data for reporters under deadline." },
  { label: "Policy", detail: "Briefing materials for federal and state policymakers focused on labor transitions and regional vulnerability." },
  { label: "Public", detail: "Interactive jobanxiety.ai research pages, maps, and updates linked to practical job-market guidance." }
];

export const researchQualityGate = [
  "Every empirical claim traced back to a documented source",
  "Every regression and time-series break test cleared through robustness checks",
  "Every map and table validated against raw inputs before publication",
  "Every causal phrase reviewed for appropriate hedging and limitation language"
];
