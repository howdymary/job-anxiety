import type { CareerNote, InsightArticle } from "@/lib/types";

const note = (value: CareerNote) => value;
const article = (value: InsightArticle) => value;

export const careerNotes: CareerNote[] = [
  note({
    slug: "ai-engineer",
    role: "AI Engineer",
    title: "AI Engineer: The Complete Guide",
    subtitle: "An applied engineering role centered on retrieval, evaluation, orchestration, and production reliability.",
    salaryRange: "$145K – $350K",
    growth: "143% growth",
    updatedAt: "Mar 2026",
    experienceBand: "Mid to Senior",
    cardDescription: "Applied engineers who turn model capability into stable product behavior under cost, latency, and safety constraints.",
    mustHave: ["Python or TypeScript in production", "Model API integration and evaluation", "Retrieval, tracing, and failure handling"],
    niceToHave: ["Fine-tuning and model serving", "Vector search and ranking", "Observability for quality, latency, and spend"],
    hiringByTier: [
      { tier: "Fortune 500", companies: ["Google", "Microsoft", "Amazon", "Meta", "NVIDIA", "JPMorgan"] },
      { tier: "VC-backed startup", companies: ["Anthropic", "OpenAI", "Cohere", "Perplexity", "Cursor", "Glean"] },
      { tier: "High-revenue business", companies: ["Databricks", "Snowflake", "Stripe", "Datadog", "Palantir"] }
    ],
    sections: [
      {
        id: "what-the-role-is",
        title: "What the role is",
        paragraphs: [
          "Most teams use this title for the person who takes a model that looks good in a demo and makes it hold up in production. The work usually sits between backend engineering, product engineering, search, and evaluation.",
          "A strong AI Engineer is rarely hired for prompt cleverness alone. The value is in building a service that retrieves the right context, evaluates output quality, handles failure paths, and stays inside latency and budget constraints."
        ]
      },
      {
        id: "day-to-day",
        title: "What you actually do day-to-day",
        paragraphs: [
          "The work starts in dashboards more often than whiteboards. Teams check latency, hallucination rates, fallback volume, token spend, and whether yesterday's prompt change quietly broke a narrow but important workflow.",
          "The implementation work is usually unglamorous in the best sense: retrieval tuning, ranking, prompt orchestration, eval harnesses, guardrails, model routing, and service wrappers around third-party APIs.",
          "Interview loops reflect that reality. Expect a live exercise where you wire a model API into a small product flow, explain tradeoffs around retrieval and evaluation, and talk through how you would catch silent quality regressions after launch."
        ]
      },
      {
        id: "whos-hiring",
        title: "Who's hiring",
        paragraphs: [
          "Demand clusters into three buckets. Labs hire close to capability and infrastructure, venture-backed product companies hire for shipping customer-facing features quickly, and larger software businesses hire to retrofit AI into existing workflows without destabilizing the product.",
          "The strongest postings are explicit about the stack: model providers, orchestration layer, eval tooling, and production environment. A vague description that promises ownership of 'all AI initiatives' usually means the team has not decided whether it needs an engineer, a researcher, or a product manager."
        ]
      },
      {
        id: "what-you-need",
        title: "What you need to know",
        paragraphs: [
          "Teams notice engineers who can separate a model problem from an application problem. Knowing when the issue is retrieval quality, when it is poor prompt structure, and when the workflow itself is under-specified matters more than saying you 'build with AI.'",
          "The most useful tool fluency today usually includes Python, TypeScript, Postgres, embeddings or reranking systems, OpenAI or Anthropic APIs, and at least one observability path for cost and quality. Fine-tuning helps in some teams, but shipping discipline is what gets candidates through the screen."
        ]
      },
      {
        id: "what-it-pays",
        title: "What it pays",
        paragraphs: [
          "Compensation is strongest when the role sits near revenue or core platform work. Series B and Series C startups often have more room on equity than on base salary, while larger companies usually hold a firmer line on stock bands but can offer clearer scope and steadier support."
        ]
      },
      {
        id: "how-to-break-in",
        title: "How to break in",
        paragraphs: [
          "The shortest path from software engineering is to build one narrow system end to end. A good portfolio project has a retrieval layer, an explicit evaluation rubric, observability, and a written postmortem about what broke.",
          "The communities that help most are the technical ones where people share implementation detail instead of broad opinion: LangChain or LlamaIndex community channels, OpenAI and Anthropic developer forums, and engineering meetups where people discuss evals, tracing, and real product failures."
        ]
      },
      {
        id: "where-its-headed",
        title: "Where this role is headed",
        paragraphs: [
          "The title is already splitting. Some teams want infrastructure-heavy engineers who own serving and reliability; others want product engineers who can ship AI features without slowing the roadmap.",
          "The common thread is not model mystique. It is judgment under probabilistic behavior, and that skill is likely to stay expensive."
        ]
      }
    ],
    salaryRows: [
      { experience: "Entry (0–2 yrs)", base: "$120K–$160K", total: "$140K–$200K" },
      { experience: "Mid (2–5 yrs)", base: "$160K–$220K", total: "$200K–$300K" },
      { experience: "Senior (5+ yrs)", base: "$200K–$280K", total: "$280K–$400K" },
      { experience: "Staff / Lead", base: "$250K–$350K", total: "$350K–$550K" }
    ],
    relatedNoteSlugs: ["gtm-engineer", "ml-ops-engineer", "context-engineer"]
  }),
  note({
    slug: "gtm-engineer",
    role: "GTM Engineer",
    title: "GTM Engineer: The Complete Guide",
    subtitle: "A revenue-systems role for operators who can automate targeting, enrichment, routing, and outbound with code.",
    salaryRange: "$130K – $310K",
    growth: "205% growth",
    updatedAt: "Mar 2026",
    experienceBand: "Entry to Senior",
    cardDescription: "A hybrid commercial and technical role built around pipeline generation, workflow automation, and measurable revenue lift.",
    mustHave: ["CRM and outbound workflow literacy", "Automation and enrichment tooling", "Experiment design tied to pipeline metrics"],
    niceToHave: ["Clay, Apollo, HubSpot, or Salesforce depth", "Light scripting in Python or JavaScript", "Data hygiene and attribution instincts"],
    hiringByTier: [
      { tier: "VC-backed startup", companies: ["Clay", "Apollo", "Ramp", "Notion", "Linear", "Vercel"] },
      { tier: "High-revenue business", companies: ["Datadog", "Snowflake", "MongoDB", "Confluent"] },
      { tier: "Fortune 500", companies: ["Salesforce", "HubSpot", "Microsoft"] }
    ],
    sections: [
      {
        id: "what-the-role-is",
        title: "What the role is",
        paragraphs: [
          "The title usually means one person owns the machinery behind modern outbound and demand generation. That includes enrichment, segmentation, routing, message generation, testing, and the messy connective tissue between CRM, data vendors, and workflow tools.",
          "This is not classic sales engineering and it is not standard RevOps. The job is measured by whether the system produces better pipeline, not whether the dashboard looks tidy."
        ]
      },
      {
        id: "day-to-day",
        title: "What you actually do day-to-day",
        paragraphs: [
          "The day starts with failure checking: enrichment breaks, stale fields, routing mistakes, CRM sync problems, and whether the targeting logic is producing garbage with confidence. A strong GTM Engineer trusts numbers only after checking how they were produced.",
          "Expect live build exercises in interviews. Hiring managers often ask candidates to sketch how they would enrich a target-account list, score it, push it into Salesforce or HubSpot, and measure whether the workflow changed meetings booked instead of simply increasing activity."
        ]
      },
      {
        id: "whos-hiring",
        title: "Who's hiring",
        paragraphs: [
          "The cleanest demand is inside venture-backed SaaS companies with aggressive pipeline targets and lean headcount. In larger companies the same work often appears under titles like Growth Systems Engineer, Revenue Systems Engineer, or Technical RevOps.",
          "The best postings are explicit about ownership and metrics. If the listing promises 'full-funnel impact' without naming the systems, data sources, or reporting line, expect the role to become a bucket for every commercial fire drill."
        ]
      },
      {
        id: "what-you-need",
        title: "What you need to know",
        paragraphs: [
          "Candidates who break in fastest usually come from SDR, AE, RevOps, or growth backgrounds and then get technically dangerous enough to automate their own playbook. SQL helps. Basic scripting helps more than most people expect.",
          "The tools named most often are Clay, Apollo, Salesforce, HubSpot, Segment, n8n, Zapier, and internal scripts that clean or enrich data before it hits the rep. The common pattern is not tool worship. It is knowing which layer is worth automating and which still needs a human."
        ]
      },
      {
        id: "what-it-pays",
        title: "What it pays",
        paragraphs: [
          "Compensation often mixes a strong base with a lighter variable component than a pure sales role. Startups usually have more freedom on equity than base, especially if the role reports close to a revenue leader and can be tied to pipeline creation within one or two quarters."
        ]
      },
      {
        id: "how-to-break-in",
        title: "How to break in",
        paragraphs: [
          "The most believable entry path is a portfolio that solves one painful revenue workflow well. Build a system that enriches accounts, prioritizes them, drafts outreach with guardrails, and reports what happened after the sequence ran.",
          "Public communities around Clay, RevGenius, Pavilion, and operator-led growth groups matter because they show how teams actually talk about these problems. Certifications rarely move the needle here; working systems do."
        ]
      },
      {
        id: "where-its-headed",
        title: "Where this role is headed",
        paragraphs: [
          "The strongest GTM Engineers tend to grow into a revenue-platform seat or a broader commercial strategy role. Once a company trusts someone to build the machinery that creates pipeline, the next step is usually ownership of a number, not another dashboard."
        ]
      }
    ],
    salaryRows: [
      { experience: "Entry (0–2 yrs)", base: "$100K–$140K", total: "$130K–$180K" },
      { experience: "Mid (2–5 yrs)", base: "$150K–$200K", total: "$190K–$260K" },
      { experience: "Senior (5+ yrs)", base: "$180K–$240K", total: "$230K–$310K" }
    ],
    relatedNoteSlugs: ["vibe-coder", "ai-solutions-engineer", "ai-product-manager"]
  }),
  note({
    slug: "vibe-coder",
    role: "Vibe Coder",
    title: "Vibe Coder: The Complete Guide",
    subtitle: "A loose hiring label for developers who build quickly with AI assistance without handing judgment over to the model.",
    salaryRange: "$70K – $351K",
    growth: "372+ explicit listings",
    updatedAt: "Mar 2026",
    experienceBand: "Entry to Lead",
    cardDescription: "A developer workflow built around AI-assisted implementation, rigorous review, and unusually strong editing instincts.",
    mustHave: ["Fast prototyping with guardrails", "Debugging and review discipline", "Good taste in architecture and scope"],
    niceToHave: ["Product sense", "Frontend polish", "Strong testing habits"],
    hiringByTier: [
      { tier: "VC-backed startup", companies: ["Cursor", "Replit", "Vercel", "Linear"] },
      { tier: "High-revenue business", companies: ["Stripe", "Notion", "Figma"] },
      { tier: "Fortune 500", companies: ["Microsoft", "Salesforce"] }
    ],
    sections: [
      {
        id: "what-the-role-is",
        title: "What the role is",
        paragraphs: [
          "Most companies do not use this title formally, but the hiring pattern is real. They want developers who can prototype, ship, and revise quickly with tools like Cursor, Claude, or Copilot while still owning code quality.",
          "The serious version of the role is not 'let the model do everything.' It is closer to creative direction plus hard-nosed review."
        ]
      },
      {
        id: "day-to-day",
        title: "What you actually do day-to-day",
        paragraphs: [
          "The work is front-loaded with specification. Good AI-assisted developers write clearer tickets, tighter prompts, and smaller components because loose instructions create expensive messes.",
          "Interviews often expose the difference quickly. Expect a timed build where the evaluator watches how you steer the tool, inspect generated code, tighten types, and recover when the first answer looks plausible but wrong."
        ]
      },
      {
        id: "whos-hiring",
        title: "Who's hiring",
        paragraphs: [
          "The clearest demand is in product-focused startups, internal tools teams, and small companies that value shipping speed over ritual. The strongest employers are candid about how they use AI in the dev loop instead of pretending every line is still handwritten."
        ]
      },
      {
        id: "what-you-need",
        title: "What you need to know",
        paragraphs: [
          "Strong vibe coders are usually good software engineers first. They know how to test, how to refactor, and how to spot when generated code drifts from the actual architecture of the system.",
          "The named tools matter less than the habits: fast iteration, ruthless review, and the ability to explain why the generated code should or should not survive."
        ]
      },
      {
        id: "what-it-pays",
        title: "What it pays",
        paragraphs: [
          "Compensation varies because the title covers everything from contract-heavy build shops to well-funded product teams. The premium shows up when speed clearly translates into shipped product rather than just faster demos."
        ]
      },
      {
        id: "how-to-break-in",
        title: "How to break in",
        paragraphs: [
          "A portfolio matters more than a position on the discourse. Show one or two products that were built with AI assistance, then document the review process, the mistakes the model made, and the fixes you applied.",
          "That record of judgment is what hiring managers look for. Anyone can claim they move fast; fewer people can prove they know when to slow down."
        ]
      },
      {
        id: "where-its-headed",
        title: "Where this role is headed",
        paragraphs: [
          "The label may not last. The workflow probably will. As AI-assisted development becomes ordinary, the candidates who stand out will be the ones who can ship quickly without leaving a codebase full of deferred damage."
        ]
      }
    ],
    salaryRows: [
      { experience: "Entry", base: "$70K–$110K", total: "$80K–$125K" },
      { experience: "Mid", base: "$120K–$180K", total: "$140K–$220K" },
      { experience: "Senior", base: "$170K–$250K", total: "$210K–$320K" },
      { experience: "Lead", base: "$220K–$280K", total: "$260K–$351K" }
    ],
    relatedNoteSlugs: ["ai-engineer", "prompt-engineer", "context-engineer"]
  }),
  note({
    slug: "prompt-engineer",
    role: "Prompt Engineer",
    title: "Prompt Engineer: The Complete Guide",
    subtitle: "A role built around evaluation, rubric design, and model behavior under real workflow constraints.",
    salaryRange: "$90K – $200K",
    growth: "135.8% growth",
    updatedAt: "Mar 2026",
    experienceBand: "Entry to Senior",
    cardDescription: "A discipline of prompt systems, evaluation loops, and behavioral tuning rather than clever wording tricks.",
    mustHave: ["Systematic prompt testing", "Evaluation design", "Clear written reasoning"],
    niceToHave: ["Dataset curation", "Prompt versioning discipline", "Domain or workflow expertise"],
    hiringByTier: [
      { tier: "VC-backed startup", companies: ["Anthropic", "Scale AI", "Harvey", "Perplexity"] },
      { tier: "High-revenue business", companies: ["Datadog", "Snowflake"] },
      { tier: "Fortune 500", companies: ["Accenture", "Microsoft"] }
    ],
    sections: [
      {
        id: "what-the-role-is",
        title: "What the role is",
        paragraphs: [
          "The serious version of this role is closer to evaluation engineer or model-behavior specialist than internet meme. Teams hire for prompt engineering when they need reliable outputs in a narrow workflow and do not yet want a full model-training organization."
        ]
      },
      {
        id: "day-to-day",
        title: "What you actually do day-to-day",
        paragraphs: [
          "Most of the work is comparative testing. Candidates should expect interview cases where they are given a messy workflow, asked to improve a prompt or chain, then explain how they would score quality instead of declaring victory after one good output.",
          "Rubric design matters here. A prompt engineer who cannot define what good, acceptable, and unacceptable output looks like usually tops out quickly."
        ]
      },
      {
        id: "whos-hiring",
        title: "Who's hiring",
        paragraphs: [
          "The clearest demand comes from AI vendors, legal and support automation companies, and enterprises running large internal copilots. In many companies the title is temporary; the underlying work later folds into product, operations, or AI engineering."
        ]
      },
      {
        id: "what-you-need",
        title: "What you need to know",
        paragraphs: [
          "Language precision helps, but workflow knowledge matters more. The candidates who stand out can explain how an output fails a business process, not just how it misses a stylistic preference.",
          "Useful tools include prompt versioning systems, spreadsheet-based evaluation sets, lightweight annotation flows, and reproducible test harnesses."
        ]
      },
      {
        id: "what-it-pays",
        title: "What it pays",
        paragraphs: [
          "Compensation is strongest when the role sits inside revenue-critical or compliance-sensitive workflows. A standalone 'prompt engineer' title with no product or operations tie often pays less and can disappear faster."
        ]
      },
      {
        id: "how-to-break-in",
        title: "How to break in",
        paragraphs: [
          "A credible portfolio looks like an evaluation project, not a list of prompts. Build a real workflow, publish the prompt set, show the scoring rubric, then document where the system still fails.",
          "That is far more persuasive than posting screenshots of a model doing something impressive once."
        ]
      },
      {
        id: "where-its-headed",
        title: "Where this role is headed",
        paragraphs: [
          "The title is already blending into AI product, evaluation, and applied AI operations. The durable skill is not clever phrasing. It is knowing how to make model behavior measurable and improve it methodically."
        ]
      }
    ],
    salaryRows: [
      { experience: "Entry", base: "$90K–$120K", total: "$100K–$135K" },
      { experience: "Mid", base: "$120K–$155K", total: "$140K–$180K" },
      { experience: "Senior", base: "$150K–$200K", total: "$175K–$240K" }
    ],
    relatedNoteSlugs: ["ai-engineer", "ai-product-manager", "context-engineer"]
  }),
  note({
    slug: "ai-product-manager",
    role: "AI Product Manager",
    title: "AI Product Manager: The Complete Guide",
    subtitle: "A product role for deciding where model behavior improves the workflow and where it simply adds risk and confusion.",
    salaryRange: "$140K – $280K",
    growth: "96% growth",
    updatedAt: "Mar 2026",
    experienceBand: "Mid to Senior",
    cardDescription: "A product seat centered on model judgment, rollout discipline, and the economics of shipping AI features responsibly.",
    mustHave: ["Product discovery and prioritization", "Model capability literacy", "Evaluation and rollout discipline"],
    niceToHave: ["SQL and experiment design", "Prompt and workflow prototyping", "Risk and policy judgment"],
    hiringByTier: [
      { tier: "Fortune 500", companies: ["Microsoft", "Google", "Salesforce"] },
      { tier: "VC-backed startup", companies: ["OpenAI", "Anthropic", "Perplexity"] },
      { tier: "High-revenue business", companies: ["Stripe", "Notion", "Databricks"] }
    ],
    sections: [
      {
        id: "what-the-role-is",
        title: "What the role is",
        paragraphs: [
          "The role sits between capability and consequence. An AI Product Manager decides whether a model belongs in the workflow at all, what failure modes are acceptable, and how much uncertainty the user can reasonably absorb.",
          "That turns abstract strategy into practical product work: scope the feature, define the rubric, choose the fallback, and decide what not to automate."
        ]
      },
      {
        id: "day-to-day",
        title: "What you actually do day-to-day",
        paragraphs: [
          "The calendar usually mixes roadmap review, evaluation review, and rollout triage. PMs spend time with engineers and designers looking at bad outputs, reading failure cases, and deciding whether the issue is model quality, prompt design, retrieval quality, or a flawed workflow.",
          "Interview loops often include a product case built around an unreliable assistant or copilot. Expect to be asked how you would measure quality, what you would launch first, and when you would pull the feature back."
        ]
      },
      {
        id: "whos-hiring",
        title: "Who's hiring",
        paragraphs: [
          "The clearest demand is in companies where AI affects the core product rather than a side experiment. That includes labs, application companies, and larger software firms retrofitting copilots, automation, or search into established products.",
          "The strongest postings specify the domain, the model touchpoints, and the operating metrics. A weak listing says 'drive AI strategy' and never names a user problem."
        ]
      },
      {
        id: "what-you-need",
        title: "What you need to know",
        paragraphs: [
          "Useful tool fluency usually includes SQL, product analytics, prompt and evaluation tools, and enough technical comfort to read logs or dashboards without turning every question into an engineering meeting.",
          "What hiring managers really test is judgment. Can the PM tell the difference between an impressive demo and a durable product behavior. Can they explain the tradeoff in plain English."
        ]
      },
      {
        id: "what-it-pays",
        title: "What it pays",
        paragraphs: [
          "Compensation tracks strong product-management markets, with a premium when the team owns a strategic AI line rather than a supporting feature. Startups usually have more room on equity; larger companies are often tighter on base but clearer on level."
        ]
      },
      {
        id: "how-to-break-in",
        title: "How to break in",
        paragraphs: [
          "The most credible route is from product management, solutions, or operations in a domain where model behavior can be evaluated clearly. A portfolio of shipped AI features, rollout docs, and postmortems gets more attention than opinionated threads about strategy.",
          "Candidates who stand out usually bring one detailed case study: what shipped, what failed, how the rubric changed, and what the team learned after launch."
        ]
      },
      {
        id: "where-its-headed",
        title: "Where this role is headed",
        paragraphs: [
          "The best AI PMs are becoming translators between frontier capability and product trust. Over time the work is likely to look less like novelty management and more like disciplined operating systems for probabilistic software."
        ]
      }
    ],
    salaryRows: [
      { experience: "Entry", base: "$140K–$170K", total: "$160K–$200K" },
      { experience: "Mid", base: "$170K–$220K", total: "$210K–$270K" },
      { experience: "Senior", base: "$220K–$280K", total: "$280K–$360K" }
    ],
    relatedNoteSlugs: ["ai-engineer", "prompt-engineer", "ai-ux-designer"]
  }),
  note({
    slug: "ml-ops-engineer",
    role: "ML Ops Engineer",
    title: "ML Ops Engineer: The Complete Guide",
    subtitle: "The platform role that keeps model-serving, monitoring, and retraining from turning into expensive operational theater.",
    salaryRange: "$150K – $300K",
    growth: "118% growth",
    updatedAt: "Mar 2026",
    experienceBand: "Mid to Lead",
    cardDescription: "Infrastructure-heavy work focused on serving, reliability, observability, and the cost of keeping AI systems alive after launch.",
    mustHave: ["Infrastructure and platform engineering fluency", "Monitoring and incident discipline", "Production-minded systems design"],
    niceToHave: ["Kubeflow, Argo, or Airflow", "MLflow, Weights & Biases, or Feast", "Latency and cost optimization"],
    hiringByTier: [
      { tier: "High-revenue business", companies: ["Databricks", "Snowflake", "Datadog"] },
      { tier: "VC-backed startup", companies: ["Cohere", "Scale AI", "Runway"] },
      { tier: "Fortune 500", companies: ["NVIDIA", "Amazon", "Meta"] }
    ],
    sections: [
      {
        id: "what-the-role-is",
        title: "What the role is",
        paragraphs: [
          "This is the platform layer behind applied AI. ML Ops engineers make sure model-serving, feature pipelines, permissions, observability, and retraining workflows behave like a dependable production system rather than a chain of brittle scripts."
        ]
      },
      {
        id: "day-to-day",
        title: "What you actually do day-to-day",
        paragraphs: [
          "The work looks a lot like high-stakes platform engineering: deployment pipelines, rollback plans, model registries, GPU scheduling, cost controls, and blunt conversations about why throughput collapsed after a model change.",
          "Interview loops usually lean technical fast. Expect debugging exercises around a broken training or inference pipeline, design questions on rollout safety, and pointed questions about tools like MLflow, Kubeflow, Argo, Airflow, KServe, or SageMaker."
        ]
      },
      {
        id: "whos-hiring",
        title: "Who's hiring",
        paragraphs: [
          "The natural buyers are infrastructure-heavy AI businesses, mature software companies with active ML platforms, and teams that can no longer hide model operations inside an ordinary backend role.",
          "A good posting names the platform surface. A weak one says 'own MLOps' but never tells you whether the stack is batch training, online inference, feature stores, internal tooling, or customer-facing model delivery."
        ]
      },
      {
        id: "what-you-need",
        title: "What you need to know",
        paragraphs: [
          "Platform habits matter more than model glamour. The strongest candidates come from SRE, DevOps, data platform, or backend infrastructure backgrounds and can explain what happens when traffic, latency, and cost all move in the wrong direction at once.",
          "The useful toolset is concrete: containers, CI/CD, orchestration, monitoring, model registries, tracing, and enough ML literacy to know when a retraining job should or should not fire."
        ]
      },
      {
        id: "what-it-pays",
        title: "What it pays",
        paragraphs: [
          "Compensation is strong because the role owns operational risk. Teams often have more room on level and total package when the job includes on-call burden, platform ownership, or clear responsibility for production incidents."
        ]
      },
      {
        id: "how-to-break-in",
        title: "How to break in",
        paragraphs: [
          "The cleanest path is from DevOps, platform engineering, data infrastructure, or SRE. Build a small serving stack, instrument it, add a registry and deployment workflow, then write down what failed and how you fixed it.",
          "That kind of operational proof beats a notebook full of one-off model demos."
        ]
      },
      {
        id: "where-its-headed",
        title: "Where this role is headed",
        paragraphs: [
          "More companies will realize they need this function before they settle on the title. As model usage matures, the best ML Ops engineers are likely to look increasingly like product-minded infrastructure leads."
        ]
      }
    ],
    salaryRows: [
      { experience: "Mid", base: "$150K–$190K", total: "$180K–$230K" },
      { experience: "Senior", base: "$190K–$250K", total: "$230K–$320K" },
      { experience: "Lead", base: "$240K–$300K", total: "$300K–$420K" }
    ],
    relatedNoteSlugs: ["ai-engineer", "context-engineer", "forward-deployed-engineer"]
  }),
  note({
    slug: "ai-safety-researcher",
    role: "AI Safety Researcher",
    title: "AI Safety Researcher: The Complete Guide",
    subtitle: "A research role focused on model behavior, adversarial testing, and the cost of deploying systems that fail in subtle ways.",
    salaryRange: "$160K – $400K",
    growth: "90%+ growth",
    updatedAt: "Mar 2026",
    experienceBand: "Mid to Lead",
    cardDescription: "Technical safety work built around red teaming, evaluation, policy-sensitive decision-making, and failure analysis.",
    mustHave: ["Risk reasoning under uncertainty", "Evaluation design", "Clear technical writing"],
    niceToHave: ["Adversarial testing", "RLHF or post-training familiarity", "Policy and governance literacy"],
    hiringByTier: [
      { tier: "VC-backed startup", companies: ["Anthropic", "OpenAI", "Cohere"] },
      { tier: "Fortune 500", companies: ["Microsoft", "Google"] },
      { tier: "High-revenue business", companies: ["Palantir", "Databricks"] }
    ],
    sections: [
      {
        id: "what-the-role-is",
        title: "What the role is",
        paragraphs: [
          "AI Safety Researchers study how systems fail, how those failures can be measured, and which mitigations actually hold up outside a carefully staged benchmark. The work ranges from alignment-flavored research to operational safety controls."
        ]
      },
      {
        id: "day-to-day",
        title: "What you actually do day-to-day",
        paragraphs: [
          "A normal week can include red-team design, failure taxonomy work, evaluation dataset curation, literature review, and writing decision memos for product or policy teams. The glamour is limited; the rigor matters.",
          "Interview loops often ask candidates to critique a paper, design an evaluation for a risky use case, or reason through a failure mode where the metrics look acceptable but the system is still unsafe."
        ]
      },
      {
        id: "whos-hiring",
        title: "Who's hiring",
        paragraphs: [
          "Labs remain the clearest buyers, but the role is spreading into high-stakes enterprise deployments, government-adjacent work, and companies facing regulatory or reputational risk from model failures.",
          "The good postings are specific about whether the role is empirical research, product-facing evaluation, policy-sensitive governance, or adversarial testing. If a company says 'safety' but cannot define the threat model, treat that as a warning."
        ]
      },
      {
        id: "what-you-need",
        title: "What you need to know",
        paragraphs: [
          "The best candidates can move between research detail and operational consequence. They can design an evaluation, read a paper critically, write clearly about limitations, and explain why a mitigation is or is not enough.",
          "Tooling varies, but familiarity with evaluation harnesses, benchmark design, annotation quality, and incident-review style writing shows up repeatedly."
        ]
      },
      {
        id: "what-it-pays",
        title: "What it pays",
        paragraphs: [
          "Compensation is high because the cost of weak safety work is no longer theoretical. Frontier labs and high-risk deployments tend to pay the strongest packages, especially when the role blends research depth with product influence."
        ]
      },
      {
        id: "how-to-break-in",
        title: "How to break in",
        paragraphs: [
          "A believable path runs through evaluation engineering, security research, adversarial testing, interpretability work, or policy-literate engineering. Publish careful, defensible analysis rather than broad takes about alignment.",
          "Hiring managers pay attention to thoughtfulness under uncertainty. A precise write-up of one narrow failure mode is usually more convincing than a long manifesto."
        ]
      },
      {
        id: "where-its-headed",
        title: "Where this role is headed",
        paragraphs: [
          "The title is likely to widen as more industries bring governance, model monitoring, and failure analysis into the core operating loop. The work will probably look less niche in a few years than it does now."
        ]
      }
    ],
    salaryRows: [
      { experience: "Mid", base: "$160K–$220K", total: "$190K–$270K" },
      { experience: "Senior", base: "$220K–$300K", total: "$280K–$380K" },
      { experience: "Lead", base: "$280K–$400K", total: "$360K–$520K" }
    ],
    relatedNoteSlugs: ["prompt-engineer", "ai-engineer", "context-engineer"]
  }),
  note({
    slug: "forward-deployed-engineer",
    role: "Forward Deployed Engineer",
    title: "Forward Deployed Engineer: The Complete Guide",
    subtitle: "A customer-embedded engineering role built around shipping systems where procurement, data reality, and organizational politics actually live.",
    salaryRange: "$175K – $360K",
    growth: "89% growth",
    updatedAt: "Mar 2026",
    experienceBand: "Mid to Lead",
    cardDescription: "Customer-facing technical delivery work for teams that need engineers in the room when messy deployments become real.",
    mustHave: ["Customer empathy under pressure", "Systems thinking", "Fast implementation and debugging"],
    niceToHave: ["Security and compliance awareness", "Travel tolerance", "Comfort with procurement and enterprise process"],
    hiringByTier: [
      { tier: "High-revenue business", companies: ["Palantir", "Databricks"] },
      { tier: "VC-backed startup", companies: ["Harvey", "Anduril"] },
      { tier: "Fortune 500", companies: ["Microsoft"] }
    ],
    sections: [
      {
        id: "what-the-role-is",
        title: "What the role is",
        paragraphs: [
          "Forward Deployed Engineers sit with the customer, learn how the work actually gets done, and then build the software or integration layer that closes the gap. In AI companies, that often means taking a general product and making it survive inside a specific enterprise process."
        ]
      },
      {
        id: "day-to-day",
        title: "What you actually do day-to-day",
        paragraphs: [
          "The work is deeply contextual. One week can include stakeholder discovery, data access fights, workflow mapping, integration work, and blunt conversations about what the model can and cannot do in production.",
          "Interview loops usually test for ambiguity tolerance. Expect a case where a customer problem is only half-specified and the real test is whether you can ask the right operational questions before proposing a build."
        ]
      },
      {
        id: "whos-hiring",
        title: "Who's hiring",
        paragraphs: [
          "Palantir made the title famous, but the pattern is spreading anywhere AI products need deep implementation work: defense-tech, legal-tech, data platform companies, and enterprise workflow vendors.",
          "The strongest postings describe the customer environment, security constraints, and travel expectation. A vague listing often hides a role that is equal parts consultant, firefighter, and implementation lead."
        ]
      },
      {
        id: "what-you-need",
        title: "What you need to know",
        paragraphs: [
          "The role rewards engineers who can code, debug, present, and stay calm in a room full of people who need the deployment to work this quarter. Product instinct helps because many customer requests are really symptoms, not requirements.",
          "Useful tools vary by company, but SQL, API integration, workflow mapping, dashboard fluency, and security-conscious engineering show up repeatedly."
        ]
      },
      {
        id: "what-it-pays",
        title: "What it pays",
        paragraphs: [
          "Compensation reflects travel, complexity, and customer proximity. When the role sits near strategic accounts, there is often more flexibility on total package than on title."
        ]
      },
      {
        id: "how-to-break-in",
        title: "How to break in",
        paragraphs: [
          "This is a natural move for engineers who like product work, customer contact, and ambiguous problem-solving more than pure platform depth. Implementation engineering, solutions engineering, consulting, and product-minded backend work are common on-ramps.",
          "A portfolio is less important here than a track record of messy delivery. Teams want examples where requirements were vague, stakeholders disagreed, and the system still shipped."
        ]
      },
      {
        id: "where-its-headed",
        title: "Where this role is headed",
        paragraphs: [
          "As AI moves into regulated and operationally hard industries, more companies will need engineers willing to ship in the field rather than stay one layer removed from the customer."
        ]
      }
    ],
    salaryRows: [
      { experience: "Mid", base: "$175K–$220K", total: "$210K–$280K" },
      { experience: "Senior", base: "$220K–$290K", total: "$280K–$380K" },
      { experience: "Lead", base: "$280K–$360K", total: "$360K–$500K" }
    ],
    relatedNoteSlugs: ["ai-solutions-engineer", "ml-ops-engineer", "ai-engineer"]
  }),
  note({
    slug: "ai-ux-designer",
    role: "AI UX Designer",
    title: "AI UX Designer: The Complete Guide",
    subtitle: "A design role focused on confidence, fallback states, latency, and the awkward human moments that AI features expose in the interface.",
    salaryRange: "$120K – $212K",
    growth: "3x higher adoption",
    updatedAt: "Mar 2026",
    experienceBand: "Mid to Senior",
    cardDescription: "Interaction design for AI products where trust, ambiguity, and model error have to be made legible to real users.",
    mustHave: ["Interaction design", "UX writing judgment", "Systems thinking under uncertainty"],
    niceToHave: ["User research", "Prompt or evaluation literacy", "Basic frontend fluency"],
    hiringByTier: [
      { tier: "Fortune 500", companies: ["Microsoft", "Google", "Adobe"] },
      { tier: "VC-backed startup", companies: ["Perplexity", "Anthropic"] },
      { tier: "High-revenue business", companies: ["Notion", "Figma"] }
    ],
    sections: [
      {
        id: "what-the-role-is",
        title: "What the role is",
        paragraphs: [
          "AI UX Designers work on the layer where model behavior becomes either usable or unsettling. The job is less about ornament and more about helping a person understand what the system knows, what it is guessing, and what happens if they trust it too much."
        ]
      },
      {
        id: "day-to-day",
        title: "What you actually do day-to-day",
        paragraphs: [
          "The work spans interaction patterns, UX copy, confidence cues, citation or provenance treatments, empty states, and the problem of showing uncertainty without making the product feel broken.",
          "Expect portfolio reviews and practical exercises in the interview loop. Hiring teams often ask candidates to redesign an AI workflow with latency, ambiguity, and failure states in mind, usually in Figma with a written rationale."
        ]
      },
      {
        id: "whos-hiring",
        title: "Who's hiring",
        paragraphs: [
          "Product companies with serious AI features are the obvious buyers, but the role is especially valuable where trust is expensive to lose: productivity software, legal tools, support automation, and research products.",
          "The best postings mention real workflows, not abstract design systems. If the company talks about 'reinventing AI UX' without naming the core user task, expect a lot of branding and not much product rigor."
        ]
      },
      {
        id: "what-you-need",
        title: "What you need to know",
        paragraphs: [
          "Classic UX discipline still matters most: journey mapping, usability research, hierarchy, and interaction design. The AI layer adds a need to think clearly about confidence, transparency, escalation paths, and when the system should admit uncertainty.",
          "Useful tools are the usual design stack plus enough product and technical fluency to review prompts, logs, or evaluation findings alongside engineers and PMs."
        ]
      },
      {
        id: "what-it-pays",
        title: "What it pays",
        paragraphs: [
          "Compensation is strongest when the role sits in a strategic product team with real shipping authority. It drops quickly when the company treats AI UX as a decorative layer instead of a product-quality function."
        ]
      },
      {
        id: "how-to-break-in",
        title: "How to break in",
        paragraphs: [
          "Strong case studies matter more than theory. Show a flow where an AI system can be wrong, then document how the design handles doubt, correction, and fallback.",
          "The work that gets noticed is not a shiny mockup. It is a careful explanation of how trust is earned and preserved."
        ]
      },
      {
        id: "where-its-headed",
        title: "Where this role is headed",
        paragraphs: [
          "As AI product experiences mature, this specialization is likely to become standard. The teams that treat it seriously now will probably look less strange in hindsight than the ones that tried to ship around the trust problem."
        ]
      }
    ],
    salaryRows: [
      { experience: "Mid", base: "$120K–$150K", total: "$135K–$175K" },
      { experience: "Senior", base: "$150K–$185K", total: "$180K–$230K" },
      { experience: "Lead", base: "$180K–$212K", total: "$220K–$280K" }
    ],
    relatedNoteSlugs: ["ai-product-manager", "prompt-engineer", "context-engineer"]
  }),
  note({
    slug: "context-engineer",
    role: "Context Engineer",
    title: "Context Engineer: The Complete Guide",
    subtitle: "A systems role devoted to memory, retrieval, ranking, and the question of what an agent should know at the moment it needs to act.",
    salaryRange: "$165K – $310K",
    growth: "New in 2026",
    updatedAt: "Mar 2026",
    experienceBand: "Mid to Senior",
    cardDescription: "A retrieval-and-memory specialization for teams building agents or long-running AI systems that fail when context is thin or stale.",
    mustHave: ["Retrieval and ranking intuition", "Systems design", "Prompt and summarization literacy"],
    niceToHave: ["Vector or hybrid search systems", "MLOps or platform depth", "Knowledge management and information architecture"],
    hiringByTier: [
      { tier: "VC-backed startup", companies: ["OpenAI", "Anthropic", "Cursor"] },
      { tier: "High-revenue business", companies: ["Databricks", "Notion"] },
      { tier: "Fortune 500", companies: ["Microsoft"] }
    ],
    sections: [
      {
        id: "what-the-role-is",
        title: "What the role is",
        paragraphs: [
          "Context Engineers decide what an agent should fetch, retain, compress, summarize, or drop. In practice that means retrieval design, ranking logic, memory policies, context-window budgeting, and the edge cases where the system remembers the wrong thing with complete confidence."
        ]
      },
      {
        id: "day-to-day",
        title: "What you actually do day-to-day",
        paragraphs: [
          "The work spans hybrid search, reranking, context assembly, long-term memory design, summarization quality, and evaluation of whether the retrieved context actually improves the answer. The job is part search relevance, part application engineering, part information architecture.",
          "Interview loops often include a system-design problem around agent memory or RAG quality. Expect questions about stale context, truncation, retrieval latency, and how you would test whether a memory layer helps rather than confuses."
        ]
      },
      {
        id: "whos-hiring",
        title: "Who's hiring",
        paragraphs: [
          "The role appears mostly in AI-native companies building agents, coding tools, copilots, and research products that need useful state across more than one turn. Plenty of companies need the skill before they have a clean title for it.",
          "Good postings mention retrieval, memory, ranking, or context assembly explicitly. Weak ones simply say 'agent engineer' and leave the information problem undefined."
        ]
      },
      {
        id: "what-you-need",
        title: "What you need to know",
        paragraphs: [
          "The strongest candidates usually come from search, backend systems, data infrastructure, or applied AI. They can think clearly about information hierarchy, latency, evaluation, and what happens when the wrong snippet outranks the right one.",
          "Useful tooling often includes Postgres or another datastore, vector search, rerankers, tracing, evaluation harnesses, and enough product sense to know which context is actually worth paying for."
        ]
      },
      {
        id: "what-it-pays",
        title: "What it pays",
        paragraphs: [
          "Compensation reflects the strategic value of making agents feel coherent rather than forgetful. Startups tend to pay a premium when the role sits close to product differentiation, while larger companies usually absorb it into broader engineering ladders."
        ]
      },
      {
        id: "how-to-break-in",
        title: "How to break in",
        paragraphs: [
          "This is a natural adjacency for AI Engineers, MLOps engineers, search engineers, and knowledge-systems builders. A good portfolio project shows retrieval quality, memory policy, evaluation, and a written explanation of where the system still fails.",
          "The candidates who stand out can explain not just what they retrieved, but why that information deserved to be in context at all."
        ]
      },
      {
        id: "where-its-headed",
        title: "Where this role is headed",
        paragraphs: [
          "If agent products keep growing, context engineering is likely to become a standard specialization. The underlying problem is durable even if the title changes."
        ]
      }
    ],
    salaryRows: [
      { experience: "Mid", base: "$165K–$210K", total: "$190K–$250K" },
      { experience: "Senior", base: "$210K–$260K", total: "$250K–$320K" },
      { experience: "Lead", base: "$250K–$310K", total: "$310K–$410K" }
    ],
    relatedNoteSlugs: ["ai-engineer", "prompt-engineer", "ml-ops-engineer"]
  }),
  note({
    slug: "ai-solutions-engineer",
    role: "AI Solutions Engineer",
    title: "AI Solutions Engineer: The Complete Guide",
    subtitle: "A customer-facing technical role that closes the gap between an impressive demo and a deployment a buyer will actually trust.",
    salaryRange: "$140K – $260K",
    growth: "82% growth",
    updatedAt: "Mar 2026",
    experienceBand: "Mid to Senior",
    cardDescription: "Technical translation work spanning discovery, demos, proofs of concept, integrations, and the early moments of customer adoption.",
    mustHave: ["Customer communication", "API and integration fluency", "Implementation judgment"],
    niceToHave: ["Sales engineering experience", "Prompt or workflow literacy", "Project management discipline"],
    hiringByTier: [
      { tier: "VC-backed startup", companies: ["Scale AI", "Harvey", "Glean"] },
      { tier: "High-revenue business", companies: ["Databricks", "Stripe"] },
      { tier: "Fortune 500", companies: ["Salesforce", "Microsoft"] }
    ],
    sections: [
      {
        id: "what-the-role-is",
        title: "What the role is",
        paragraphs: [
          "AI Solutions Engineers help buyers move from curiosity to implementation. The work includes discovery, solution design, proof-of-concept builds, integration planning, and the practical trust-building required to get a customer from pilot to production."
        ]
      },
      {
        id: "day-to-day",
        title: "What you actually do day-to-day",
        paragraphs: [
          "A typical week mixes technical demos, security and architecture conversations, sample-app work, prompt or workflow tuning, and the uncomfortable moment when a customer asks whether the product can survive their messiest edge case.",
          "Interview loops often include live demos, architecture whiteboarding, and customer-handling scenarios. Expect to explain an API integration in plain English and then answer a hard technical follow-up without losing the room."
        ]
      },
      {
        id: "whos-hiring",
        title: "Who's hiring",
        paragraphs: [
          "The obvious buyers are API companies, enterprise workflow vendors, and AI application businesses with a consultative sales motion. The role gets stronger as the product gets more powerful and less self-explanatory.",
          "The best postings make the split clear between pre-sales, post-sales, and implementation ownership. If the listing promises all three without support, expect a role that can turn into nonstop context switching."
        ]
      },
      {
        id: "what-you-need",
        title: "What you need to know",
        paragraphs: [
          "You need enough engineering to be credible with customer technical teams and enough commercial judgment to keep a buying process moving. API literacy, sample-app building, prompt or workflow understanding, and steady written communication all matter.",
          "Tools vary, but Postman, SDKs, SQL, dashboards, and lightweight integration code show up constantly."
        ]
      },
      {
        id: "what-it-pays",
        title: "What it pays",
        paragraphs: [
          "Comp usually sits between strong engineering pay and strong sales-engineering pay. Startups often have more room on equity and variable upside, while larger companies tend to be clearer about banding and quota exposure."
        ]
      },
      {
        id: "how-to-break-in",
        title: "How to break in",
        paragraphs: [
          "This is one of the most natural moves for implementation engineers, sales engineers, solutions architects, and technically credible customer-success leaders. The strongest proof is a portfolio of demos, reference implementations, or customer-facing technical writing that actually teaches something."
        ]
      },
      {
        id: "where-its-headed",
        title: "Where this role is headed",
        paragraphs: [
          "As AI buying matures, solutions talent is likely to remain a critical adoption lever. Better products reduce some hand-holding, but they do not eliminate the need for someone who can translate technical possibility into buyer confidence."
        ]
      }
    ],
    salaryRows: [
      { experience: "Mid", base: "$140K–$180K", total: "$170K–$220K" },
      { experience: "Senior", base: "$180K–$220K", total: "$220K–$280K" },
      { experience: "Lead", base: "$220K–$260K", total: "$270K–$340K" }
    ],
    relatedNoteSlugs: ["forward-deployed-engineer", "gtm-engineer", "ai-product-manager"]
  }),
  note({
    slug: "data-annotation-specialist",
    role: "Data Annotation Specialist",
    title: "Data Annotation Specialist: The Complete Guide",
    subtitle: "A practical entry point into AI work built around labeling quality, evaluation rigor, and careful judgment rather than raw speed.",
    salaryRange: "$50K – $120K",
    growth: "High demand",
    updatedAt: "Mar 2026",
    experienceBand: "Entry to Mid",
    cardDescription: "Entry-level AI operations work centered on labeling, quality control, rubric interpretation, and model-evaluation support.",
    mustHave: ["Attention to detail", "Consistency under repetitive work", "Clear written reasoning"],
    niceToHave: ["Domain knowledge", "Quality assurance habits", "Spreadsheet or annotation-tool fluency"],
    hiringByTier: [
      { tier: "VC-backed startup", companies: ["Scale AI", "Labelbox"] },
      { tier: "High-revenue business", companies: ["Databricks"] },
      { tier: "Fortune 500", companies: ["Large consulting and outsourcing firms"] }
    ],
    sections: [
      {
        id: "what-the-role-is",
        title: "What the role is",
        paragraphs: [
          "Data Annotation Specialists label, review, and evaluate the examples used to train or audit AI systems. The role is often dismissed as rote work, but the valuable version depends on judgment, consistency, and the ability to follow a rubric without quietly drifting away from it."
        ]
      },
      {
        id: "day-to-day",
        title: "What you actually do day-to-day",
        paragraphs: [
          "The work can be repetitive, but the best teams are not measuring pure throughput. They care about rubric adherence, edge-case handling, inter-rater consistency, and whether the annotator can explain why a difficult item should be labeled one way rather than another.",
          "Interview loops are usually simple but revealing: short labeling tasks, rubric comprehension tests, attention checks, and writing samples that show whether the candidate can justify a tricky decision clearly."
        ]
      },
      {
        id: "whos-hiring",
        title: "Who's hiring",
        paragraphs: [
          "Labs, data-platform businesses, model-evaluation vendors, and outsourcing firms all need this work. The strongest opportunities usually sit in teams that value quality-control paths, domain specialization, or movement into QA and operations."
        ]
      },
      {
        id: "what-you-need",
        title: "What you need to know",
        paragraphs: [
          "Consistency matters more than speed at the high end of the role. The strongest annotators can follow a complex guideline, flag ambiguity instead of guessing, and improve rubric quality by spotting where the instructions break down.",
          "Useful tools often include Labelbox-style annotation software, spreadsheets, review dashboards, and ticketing systems for adjudication."
        ]
      },
      {
        id: "what-it-pays",
        title: "What it pays",
        paragraphs: [
          "Comp is lower than engineering tracks, but the barrier to entry is lower as well. The better opportunities usually come with a quality-control path, domain premium, or exposure to evaluation operations rather than commodity piecework."
        ]
      },
      {
        id: "how-to-break-in",
        title: "How to break in",
        paragraphs: [
          "For career changers, this is a practical way into AI operations. The best entry strategy is to show reliability, careful written reasoning, and comfort with detailed instructions, then move toward QA, evaluation, trust-and-safety operations, or domain-specific review work."
        ]
      },
      {
        id: "where-its-headed",
        title: "Where this role is headed",
        paragraphs: [
          "As models improve, the work is shifting from raw volume toward harder evaluation and adjudication. Better data still matters, but better judgment about edge cases matters more."
        ]
      }
    ],
    salaryRows: [
      { experience: "Entry", base: "$50K–$70K", total: "$50K–$75K" },
      { experience: "Mid", base: "$70K–$95K", total: "$75K–$105K" },
      { experience: "Lead / QA", base: "$95K–$120K", total: "$110K–$145K" }
    ],
    relatedNoteSlugs: ["ai-solutions-engineer", "prompt-engineer", "ai-engineer"]
  })
];

export const insightArticles: InsightArticle[] = [
  article({
    slug: "will-ai-take-my-job",
    title: "Will AI Take My Job? What the Data Actually Shows",
    description: "A calmer, harder look at the relationship between automation, job loss, and the new roles being created.",
    publishedAt: "2026-03-25",
    readTime: "9 min",
    targetKeyword: "will AI take my job",
    relatedNoteSlugs: ["ai-engineer", "gtm-engineer", "data-annotation-specialist"],
    sections: [
      { id: "fear", title: "The fear is real. The lazy conclusion is not.", paragraphs: ["It is reasonable to worry about AI and work. What is less reasonable is to treat the market as if it only subtracts. That is not how major tool shifts usually work. They compress some tasks, eliminate some roles, and create new role categories around the work that remains hard, contextual, or newly valuable.", "The current AI market already shows this pattern. Routine work is under pressure. But category creation is happening at the same time. GTM Engineer was not a common job title three years ago. Context Engineer barely existed as a phrase. AI UX Designer is moving from novelty to necessity."] },
      { id: "data", title: "What the market data suggests", paragraphs: ["The more useful question is not whether AI takes jobs in the abstract. It does. The better question is which kinds of jobs become more valuable as AI gets folded into products, services, and internal operations.", "The answer, increasingly, is work that combines judgment with systems. People who can evaluate, integrate, steer, deploy, or explain AI are seeing demand rise. People whose job is mostly formatting, repeating, or relaying the same pattern are more exposed."] },
      { id: "transitions", title: "Transitions are the real story", paragraphs: ["The most practical pattern is transition, not replacement. A software engineer becomes an AI Engineer. An SDR becomes a GTM Engineer. A support operator becomes an AI operations specialist or evaluator. That does not mean the transition is automatic. It means the labor market is reorganizing around a new set of bottlenecks and adjacent roles.", "The people who do best in that shift are usually the ones who stop arguing with the direction of travel early and start learning the adjacent systems around it."] },
      { id: "what-to-do", title: "What to do with that information", paragraphs: ["Do not try to predict the whole market. Pick the next believable move. If you already have technical depth, study AI systems and evaluation. If you sit near revenue, learn automation and signal tools. If you need an accessible starting point, move closer to data quality, annotation, or solutions work.", "Fear is not useless if it pushes you toward a real skill acquisition plan. It becomes useless when it turns into doomscrolling."] }
    ]
  }),
  article({
    slug: "new-ai-jobs-2026",
    title: "AI Jobs That Didn't Exist in 2023",
    description: "A field guide to the job titles that emerged as AI moved from demo to operating system.",
    publishedAt: "2026-03-25",
    readTime: "8 min",
    targetKeyword: "new AI jobs 2026",
    relatedNoteSlugs: ["vibe-coder", "gtm-engineer", "context-engineer"],
    sections: [
      { id: "overview", title: "A market making up new language in public", paragraphs: ["Some of the most interesting AI job titles are young enough that half the battle is defining them clearly. That is not a flaw. It is a sign that the market is still forming.", "Vibe Coder, GTM Engineer, Context Engineer, and AI UX Designer all emerged because older titles stopped describing what the work actually was."] },
      { id: "roles", title: "The roles worth paying attention to", paragraphs: ["Vibe Coder is the clearest sign that AI-assisted development is becoming a real hiring category. GTM Engineer captures the merger of revenue work and automation. Context Engineer exists because agents need memory and retrieval strategy, not just a bigger model. AI UX Designer became necessary once teams realized an AI feature can be technically correct and still feel unusable."] },
      { id: "why-now", title: "Why these titles appeared so quickly", paragraphs: ["The titles emerged once companies understood that AI's hard problems were not only model problems. They were workflow problems, interface problems, trust problems, and systems problems. New labels appear when the old org chart no longer fits the real bottleneck."] }
    ]
  }),
  article({
    slug: "what-is-a-vibe-coder",
    title: "What Is a Vibe Coder? The $150K Role That Changed Software",
    description: "A clear explanation of a role many people mock before they understand it.",
    publishedAt: "2026-03-25",
    readTime: "7 min",
    targetKeyword: "what is a vibe coder",
    relatedNoteSlugs: ["vibe-coder", "ai-engineer", "prompt-engineer"],
    sections: [
      { id: "definition", title: "A useful definition", paragraphs: ["A vibe coder is an AI-native developer who uses coding models as an active part of the implementation loop while keeping architectural and quality judgment firmly human.", "The simplest misunderstanding is to treat the role as cheating. The better analogy is that it is the next stage of abstraction. Software has always moved toward higher-level tools. This is another step in that direction."] },
      { id: "what-makes-someone-good", title: "What makes a good one", paragraphs: ["Good vibe coders are not passive recipients of generated code. They are unusually strong editors. They know what to specify, what to accept, what to rewrite, and what to test more aggressively because the model made it."] },
      { id: "why-companies-care", title: "Why companies pay for it", paragraphs: ["Companies do not care about the discourse. They care about throughput and quality. If a developer can ship more, faster, without making the codebase worse, the market will pay for that."] }
    ]
  }),
  article({
    slug: "how-to-become-gtm-engineer",
    title: "How to Become a GTM Engineer (With No Engineering Background)",
    description: "A practical AI career transition for commercial operators who want a more scalable role.",
    publishedAt: "2026-03-25",
    readTime: "10 min",
    targetKeyword: "how to become a GTM engineer",
    relatedNoteSlugs: ["gtm-engineer", "ai-solutions-engineer", "ai-product-manager"],
    sections: [
      { id: "why-this-role", title: "Why this role is unusually realistic", paragraphs: ["GTM Engineer is one of the few AI-adjacent roles where commercial operators with technical appetite have a credible edge. You already understand pipeline and sales pain. The new piece is learning to automate it."] },
      { id: "timeline", title: "A believable six-month path", paragraphs: ["Month one: learn basic Python and APIs. Month two: learn Clay or an equivalent workflow tool. Month three: build lead enrichment and scoring. Month four: add personalized outreach generation. Month five: instrument results. Month six: package the whole thing into a case study someone can evaluate.", "The trick is to build around an actual sales workflow, not a sandbox detached from revenue."] },
      { id: "proof", title: "What counts as proof", paragraphs: ["Your resume matters less than a working demo. Show a system that takes a target account list, enriches it, scores it, generates tailored outreach, and reports what happened next."] }
    ]
  }),
  article({
    slug: "ai-engineer-salary-2026",
    title: "AI Engineer Salary Guide 2026",
    description: "What AI Engineers earn by experience, company tier, and total comp structure.",
    publishedAt: "2026-03-25",
    readTime: "8 min",
    targetKeyword: "AI engineer salary 2026",
    relatedNoteSlugs: ["ai-engineer", "ml-ops-engineer", "context-engineer"],
    sections: [
      { id: "ranges", title: "The range is wide for a reason", paragraphs: ["AI Engineer pay spans from mid-six figures at ordinary software companies to truly elite compensation at frontier labs. The variation is not random. It reflects scarcity, mission sensitivity, and proximity to the core AI product."] },
      { id: "tiers", title: "How company tier changes the number", paragraphs: ["Fortune 500 employers pay well, especially in total comp, but tend to be more structured. VC-backed labs often pay aggressively for top-end talent. High-revenue software firms can be surprisingly competitive when the role ties directly to product outcomes."] },
      { id: "what-to-watch", title: "What to watch besides base salary", paragraphs: ["Look at equity quality, bonus structure, expected on-call burden, and how much of the role is actually AI versus adjacent backend work. Many jobs say AI and pay like conventional backend roles."] }
    ]
  }),
  article({
    slug: "best-companies-hiring-ai",
    title: "Best Companies Hiring for AI Roles Right Now",
    description: "A categorized look at the employers most serious about AI hiring.",
    publishedAt: "2026-03-25",
    readTime: "7 min",
    targetKeyword: "companies hiring AI engineers",
    relatedNoteSlugs: ["ai-engineer", "forward-deployed-engineer", "ai-solutions-engineer"],
    sections: [
      { id: "builders", title: "Companies building AI", paragraphs: ["Anthropic, OpenAI, Cohere, and similar labs are obvious magnets because they sit close to the capability frontier. Roles here are usually demanding, selective, and unusually well paid."] },
      { id: "deployers", title: "Companies deploying AI", paragraphs: ["Microsoft, Google, Salesforce, and many other large employers are building AI deeply into product lines and internal systems. These roles are often less glamorous on paper and more practical in day-to-day work."] },
      { id: "enablers", title: "Companies enabling AI", paragraphs: ["Databricks, Scale AI, Snowflake, and adjacent businesses matter because they sell the picks and shovels of the AI market. The talent needs are broad, from platform and MLOps to solutions and data quality."] }
    ]
  }),
  article({
    slug: "ai-career-paths",
    title: "AI Career Paths: A Visual Guide",
    description: "How adjacent roles connect, and where the most realistic transitions start.",
    publishedAt: "2026-03-25",
    readTime: "9 min",
    targetKeyword: "AI career paths",
    relatedNoteSlugs: ["ai-engineer", "gtm-engineer", "ai-ux-designer"],
    sections: [
      { id: "map", title: "Think adjacency, not reinvention", paragraphs: ["Most successful AI career moves are adjacent, not heroic. Software engineers move toward AI Engineer. Designers move toward AI UX Designer. SDRs move toward GTM Engineer. Analysts move toward evaluation or data quality work."] },
      { id: "technical", title: "Technical paths", paragraphs: ["A practical technical ladder might run Data Analyst → ML Engineer → AI Engineer → Research Engineer. Another might run Backend Engineer → MLOps Engineer → Context Engineer."] },
      { id: "commercial", title: "Commercial and product paths", paragraphs: ["A commercial ladder might run SDR → RevOps → GTM Engineer. A product ladder might run Product Manager → AI Product Manager. The important thing is to move toward the AI-specific bottleneck already adjacent to your experience."] }
    ]
  })
];

export const careerNoteMap = Object.fromEntries(careerNotes.map((noteItem) => [noteItem.slug, noteItem])) as Record<string, CareerNote>;
export const insightArticleMap = Object.fromEntries(insightArticles.map((item) => [item.slug, item])) as Record<string, InsightArticle>;
