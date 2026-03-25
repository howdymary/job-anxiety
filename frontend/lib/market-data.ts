import type { CompanyRecord, JobCategory, JobRecord, TrendPoint, TrendStat } from "@/lib/types";

export const jobCategories: JobCategory[] = [
  {
    slug: "ai-engineer",
    title: "AI Engineer",
    salaryRange: "$145K – $350K",
    growth: "143% growth",
    oneLiner: "The most-hired technical role in AI, sitting between infrastructure and product."
  },
  {
    slug: "gtm-engineer",
    title: "GTM Engineer",
    salaryRange: "$130K – $310K",
    growth: "205% growth",
    oneLiner: "A revenue role disguised as an engineering role, built around automation and signal."
  },
  {
    slug: "vibe-coder",
    title: "Vibe Coder",
    salaryRange: "$70K – $351K",
    growth: "372+ listings",
    oneLiner: "AI-native developers who steer architecture while tools handle the rote implementation."
  },
  {
    slug: "prompt-engineer",
    title: "Prompt Engineer",
    salaryRange: "$90K – $200K",
    growth: "135.8% growth",
    oneLiner: "A role centered on evaluation, prompt systems, and model behavior rather than clever phrasing."
  },
  {
    slug: "ai-product-manager",
    title: "AI Product Manager",
    salaryRange: "$140K – $280K",
    growth: "96% growth",
    oneLiner: "The person translating model capability into a product users can trust."
  },
  {
    slug: "ml-ops-engineer",
    title: "ML Ops Engineer",
    salaryRange: "$150K – $300K",
    growth: "118% growth",
    oneLiner: "The machine-learning platform role that keeps serving, monitoring, and costs under control."
  },
  {
    slug: "ai-safety-researcher",
    title: "AI Safety Researcher",
    salaryRange: "$160K – $400K",
    growth: "90%+ growth",
    oneLiner: "The guardrail role at the frontier: red teaming, alignment, policy, and evaluation."
  },
  {
    slug: "forward-deployed-engineer",
    title: "Forward Deployed Engineer",
    salaryRange: "$175K – $360K",
    growth: "89% growth",
    oneLiner: "Customer-embedded builders who ship AI systems in the field, not from a distance."
  },
  {
    slug: "ai-ux-designer",
    title: "AI UX Designer",
    salaryRange: "$120K – $212K",
    growth: "3x feature adoption",
    oneLiner: "Designers who understand latency, confidence, trust, and when AI should stay out of the way."
  },
  {
    slug: "context-engineer",
    title: "Context Engineer",
    salaryRange: "$165K – $310K",
    growth: "New in 2026",
    oneLiner: "A new systems role focused on memory, retrieval, context windows, and agent state."
  },
  {
    slug: "ai-solutions-engineer",
    title: "AI Solutions Engineer",
    salaryRange: "$140K – $260K",
    growth: "82% growth",
    oneLiner: "The pre- and post-sales translator between product APIs and customer outcomes."
  },
  {
    slug: "data-annotation-specialist",
    title: "Data Annotation Specialist",
    salaryRange: "$50K – $120K",
    growth: "High demand",
    oneLiner: "The most accessible way into the AI stack, with real demand in RLHF and evaluation workflows."
  }
];

export const companies: CompanyRecord[] = [
  {
    slug: "anthropic",
    name: "Anthropic",
    tier: "VC-backed startup",
    stageLabel: "Series C",
    headquarters: "San Francisco, CA",
    description: "Frontier lab hiring across research, safety, product, and deployment.",
    website: "https://anthropic.com",
    careersUrl: "https://www.anthropic.com/careers",
    hiringFocus: "Research, safety, product, and field engineering."
  },
  {
    slug: "openai",
    name: "OpenAI",
    tier: "VC-backed startup",
    stageLabel: "Series C",
    headquarters: "San Francisco, CA",
    description: "Applied AI and platform roles close to the frontier.",
    website: "https://openai.com",
    careersUrl: "https://openai.com/careers",
    hiringFocus: "AI engineering, product, safety, and deployment."
  },
  {
    slug: "ramp",
    name: "Ramp",
    tier: "VC-backed startup",
    stageLabel: "Series D",
    headquarters: "New York, NY",
    description: "One of the clearest homes for GTM engineering and AI-native internal tooling.",
    website: "https://ramp.com",
    careersUrl: "https://ramp.com/careers",
    hiringFocus: "GTM engineering, product, and automation."
  },
  {
    slug: "vercel",
    name: "Vercel",
    tier: "High-revenue business",
    stageLabel: "High revenue",
    headquarters: "Remote",
    description: "A software business where AI-native product development has become an operating system.",
    website: "https://vercel.com",
    careersUrl: "https://vercel.com/careers",
    hiringFocus: "AI-native engineering and product roles."
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    tier: "Fortune 500",
    stageLabel: "Fortune 500",
    headquarters: "Redmond, WA",
    description: "A large buyer of AI talent across platform, product, copilots, and research.",
    website: "https://microsoft.com",
    careersUrl: "https://careers.microsoft.com",
    hiringFocus: "Enterprise AI engineering, product, and design."
  },
  {
    slug: "databricks",
    name: "Databricks",
    tier: "High-revenue business",
    stageLabel: "High revenue",
    headquarters: "San Francisco, CA",
    description: "One of the clearest employers for ML Ops, data platforms, and AI infrastructure.",
    website: "https://databricks.com",
    careersUrl: "https://www.databricks.com/company/careers",
    hiringFocus: "ML Ops, data platforms, and customer-facing AI roles."
  },
  {
    slug: "palantir",
    name: "Palantir",
    tier: "High-revenue business",
    stageLabel: "High revenue",
    headquarters: "Denver, CO",
    description: "The canonical home of the forward deployed model.",
    website: "https://www.palantir.com",
    careersUrl: "https://www.palantir.com/careers/",
    hiringFocus: "Forward deployed engineering and applied customer work."
  },
  {
    slug: "scale-ai",
    name: "Scale AI",
    tier: "VC-backed startup",
    stageLabel: "Series F",
    headquarters: "San Francisco, CA",
    description: "A major buyer of data, evaluation, and model operations talent.",
    website: "https://scale.com",
    careersUrl: "https://scale.com/careers",
    hiringFocus: "Data annotation, evaluation, and solutions engineering."
  }
];

export const jobs: JobRecord[] = [
  {
    slug: "anthropic-ai-research-engineer",
    title: "AI Research Engineer",
    companySlug: "anthropic",
    company: "Anthropic",
    companyTier: "VC-backed startup",
    companyStageLabel: "Series C",
    category: "ai-engineer",
    categoryLabel: "AI Engineer",
    location: "Remote",
    locationType: "Remote",
    city: "Remote",
    experience: "Senior",
    salaryMin: 200000,
    salaryMax: 350000,
    postedAt: "2026-03-23T09:00:00.000Z",
    excerpt: "Work on frontier model capabilities, evaluation tooling, and deployment systems.",
    description: [
      "This role sits at the line between experimentation and shipping. You'll work with researchers, inference teams, and product partners to make model capability legible in production.",
      "The work is less about novel papers and more about making ambitious systems reliable enough to reach users."
    ],
    applyUrl: "https://www.anthropic.com/careers",
    relatedCompanyJobSlugs: ["anthropic-ai-safety-systems"]
  },
  {
    slug: "ramp-gtm-engineer",
    title: "GTM Engineer",
    companySlug: "ramp",
    company: "Ramp",
    companyTier: "VC-backed startup",
    companyStageLabel: "Series D",
    category: "gtm-engineer",
    categoryLabel: "GTM Engineer",
    location: "NYC",
    locationType: "Hybrid",
    city: "New York",
    experience: "Mid",
    salaryMin: 180000,
    salaryMax: 260000,
    postedAt: "2026-03-24T14:00:00.000Z",
    excerpt: "Build revenue systems with data, enrichment, AI workflows, and just enough code.",
    description: [
      "Ramp is hiring the hybrid operator who can write code, tune workflows, and turn commercial signal into pipeline.",
      "Expect a mix of product instincts, data hygiene, and experimentation discipline."
    ],
    applyUrl: "https://ramp.com/careers",
    relatedCompanyJobSlugs: []
  },
  {
    slug: "vercel-vibe-coder",
    title: "Vibe Coder",
    companySlug: "vercel",
    company: "Vercel",
    companyTier: "High-revenue business",
    companyStageLabel: "High revenue",
    category: "vibe-coder",
    categoryLabel: "Vibe Coder",
    location: "Remote",
    locationType: "Remote",
    city: "Remote",
    experience: "Mid",
    salaryMin: 160000,
    salaryMax: 280000,
    postedAt: "2026-03-24T18:00:00.000Z",
    excerpt: "Ship AI-assisted product experiments quickly without losing architectural judgment.",
    description: [
      "This role assumes you already use Cursor, Claude Code, or Copilot fluently and know where those tools speed you up versus where they mislead.",
      "The team cares more about product velocity and judgment than about writing every line by hand."
    ],
    applyUrl: "https://vercel.com/careers",
    relatedCompanyJobSlugs: []
  },
  {
    slug: "openai-ai-product-manager",
    title: "AI Product Manager",
    companySlug: "openai",
    company: "OpenAI",
    companyTier: "VC-backed startup",
    companyStageLabel: "Series C",
    category: "ai-product-manager",
    categoryLabel: "AI Product Manager",
    location: "San Francisco",
    locationType: "Hybrid",
    city: "San Francisco",
    experience: "Senior",
    salaryMin: 220000,
    salaryMax: 320000,
    postedAt: "2026-03-22T12:00:00.000Z",
    excerpt: "Turn model capability into product decisions users can trust and teams can actually ship.",
    description: [
      "You'll work across research, design, safety, and GTM to decide when AI belongs in the product and when restraint is the better product decision.",
      "The job is equal parts roadmap, evaluation, and product judgment."
    ],
    applyUrl: "https://openai.com/careers",
    relatedCompanyJobSlugs: []
  },
  {
    slug: "microsoft-ai-ux-designer",
    title: "AI UX Designer",
    companySlug: "microsoft",
    company: "Microsoft",
    companyTier: "Fortune 500",
    companyStageLabel: "Fortune 500",
    category: "ai-ux-designer",
    categoryLabel: "AI UX Designer",
    location: "Seattle",
    locationType: "Hybrid",
    city: "Seattle",
    experience: "Senior",
    salaryMin: 155000,
    salaryMax: 212000,
    postedAt: "2026-03-21T08:00:00.000Z",
    excerpt: "Design AI interactions around trust, confidence, fallback states, and real task completion.",
    description: [
      "This is not a prompt-writing role dressed up as design. It's about interaction models, interface language, and knowing how uncertainty should look and feel.",
      "The strongest candidates pair interface taste with a practical understanding of how model performance behaves under pressure."
    ],
    applyUrl: "https://careers.microsoft.com",
    relatedCompanyJobSlugs: []
  },
  {
    slug: "palantir-forward-deployed-engineer",
    title: "Forward Deployed Engineer",
    companySlug: "palantir",
    company: "Palantir",
    companyTier: "High-revenue business",
    companyStageLabel: "High revenue",
    category: "forward-deployed-engineer",
    categoryLabel: "Forward Deployed Engineer",
    location: "London",
    locationType: "On-site",
    city: "London",
    experience: "Lead",
    salaryMin: 190000,
    salaryMax: 360000,
    postedAt: "2026-03-20T16:00:00.000Z",
    excerpt: "Embed with customers, understand the mess on the ground, and build AI systems that survive real use.",
    description: [
      "This role is high-context and field-oriented. You'll spend less time polishing demos and more time getting working systems into organizations with constraints.",
      "The strongest engineers here are comfortable traveling, learning a customer's language, and shipping quickly in ambiguity."
    ],
    applyUrl: "https://www.palantir.com/careers/",
    relatedCompanyJobSlugs: []
  },
  {
    slug: "databricks-ml-ops-engineer",
    title: "ML Ops Engineer",
    companySlug: "databricks",
    company: "Databricks",
    companyTier: "High-revenue business",
    companyStageLabel: "High revenue",
    category: "ml-ops-engineer",
    categoryLabel: "ML Ops Engineer",
    location: "Remote",
    locationType: "Remote",
    city: "Remote",
    experience: "Senior",
    salaryMin: 190000,
    salaryMax: 255000,
    postedAt: "2026-03-24T10:00:00.000Z",
    excerpt: "Own model serving, monitoring, feature flows, and the boring details that make AI products actually work.",
    description: [
      "This is the infrastructure role beneath the demo. You're making sure experiments become systems, not slide decks.",
      "Expect work across deployment, observability, permissions, and serving reliability."
    ],
    applyUrl: "https://www.databricks.com/company/careers",
    relatedCompanyJobSlugs: []
  },
  {
    slug: "scale-ai-solutions-engineer",
    title: "AI Solutions Engineer",
    companySlug: "scale-ai",
    company: "Scale AI",
    companyTier: "VC-backed startup",
    companyStageLabel: "Series F",
    category: "ai-solutions-engineer",
    categoryLabel: "AI Solutions Engineer",
    location: "San Francisco",
    locationType: "Hybrid",
    city: "San Francisco",
    experience: "Mid",
    salaryMin: 150000,
    salaryMax: 240000,
    postedAt: "2026-03-19T13:00:00.000Z",
    excerpt: "Translate product capability into implementations customers can understand, buy, and keep using.",
    description: [
      "This role sits between pre-sales, delivery, and technical trust. You'll help customers imagine the solution, then prove it works in their environment.",
      "Strong people here communicate clearly, write just enough code, and know how to close the last mile."
    ],
    applyUrl: "https://scale.com/careers",
    relatedCompanyJobSlugs: []
  },
  {
    slug: "scale-data-annotation-specialist",
    title: "Data Annotation Specialist",
    companySlug: "scale-ai",
    company: "Scale AI",
    companyTier: "VC-backed startup",
    companyStageLabel: "Series F",
    category: "data-annotation-specialist",
    categoryLabel: "Data Annotation Specialist",
    location: "Remote",
    locationType: "Remote",
    city: "Remote",
    experience: "Entry",
    salaryMin: 55000,
    salaryMax: 90000,
    postedAt: "2026-03-24T07:30:00.000Z",
    excerpt: "An accessible entry point into AI work through labeling, evaluation, and data quality.",
    description: [
      "Good annotation work is not rote clicking. The job increasingly rewards judgment, consistency, and the ability to follow nuanced quality rubrics.",
      "For career changers, this is one of the clearest ways to get close to training loops and evaluation systems."
    ],
    applyUrl: "https://scale.com/careers",
    relatedCompanyJobSlugs: ["scale-ai-solutions-engineer"]
  },
  {
    slug: "anthropic-ai-safety-systems",
    title: "AI Safety Systems Engineer",
    companySlug: "anthropic",
    company: "Anthropic",
    companyTier: "VC-backed startup",
    companyStageLabel: "Series C",
    category: "ai-safety-researcher",
    categoryLabel: "AI Safety Researcher",
    location: "Remote",
    locationType: "Remote",
    city: "Remote",
    experience: "Lead",
    salaryMin: 225000,
    salaryMax: 380000,
    postedAt: "2026-03-18T11:00:00.000Z",
    excerpt: "Build evaluation systems, red-team workflows, and policy-sensitive safety tooling.",
    description: [
      "This work blends research judgment with production systems. You're designing the instrumentation that tells the company whether models are behaving acceptably in the real world.",
      "The best candidates are fluent in ambiguity and unusually precise in how they reason about risk."
    ],
    applyUrl: "https://www.anthropic.com/careers",
    relatedCompanyJobSlugs: ["anthropic-ai-research-engineer"]
  },
  {
    slug: "openai-context-engineer",
    title: "Context Engineer",
    companySlug: "openai",
    company: "OpenAI",
    companyTier: "VC-backed startup",
    companyStageLabel: "Series C",
    category: "context-engineer",
    categoryLabel: "Context Engineer",
    location: "San Francisco",
    locationType: "Hybrid",
    city: "San Francisco",
    experience: "Senior",
    salaryMin: 210000,
    salaryMax: 310000,
    postedAt: "2026-03-17T09:30:00.000Z",
    excerpt: "Design agent memory, retrieval, and context strategies that survive more than a single request.",
    description: [
      "This is one of the newest titles on the board. The work spans context windows, retrieval design, state persistence, summarization, and memory hygiene.",
      "In practice it looks like systems design for agents: what to remember, when to fetch, and how to keep the model grounded."
    ],
    applyUrl: "https://openai.com/careers",
    relatedCompanyJobSlugs: ["openai-ai-product-manager"]
  }
];

export const landingTicker = [
  "AI Engineer",
  "GTM Engineer",
  "Vibe Coder",
  "Prompt Engineer",
  "ML Ops",
  "AI PM",
  "AI Safety",
  "Forward Deployed Engineer",
  "Context Engineer",
  "AI UX Designer"
];

export const landingStats: TrendStat[] = [
  {
    label: "growth in AI Engineer roles",
    value: "143%",
    context: "Year-over-year based on the current tracked market."
  },
  {
    label: "growth in GTM Engineer roles",
    value: "205%",
    context: "A role category that barely existed three years ago."
  },
  {
    label: "median salary, AI Product Manager",
    value: "$220K",
    context: "Median total compensation across current tracked postings."
  }
];

export const trendPoints: TrendPoint[] = [
  { label: "Oct", roles: 4200 },
  { label: "Nov", roles: 4680 },
  { label: "Dec", roles: 5030 },
  { label: "Jan", roles: 5620 },
  { label: "Feb", roles: 6210 },
  { label: "Mar", roles: 7040 }
];

export const homepageNumbers = {
  weeklyRoles: 1284,
  trackedCompanies: 326
};

export const topHiringCompanies = [
  { name: "Anthropic", roles: 42 },
  { name: "OpenAI", roles: 36 },
  { name: "Ramp", roles: 31 },
  { name: "Databricks", roles: 28 },
  { name: "Microsoft", roles: 24 }
];
