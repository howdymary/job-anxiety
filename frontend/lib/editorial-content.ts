import type { CareerNote, InsightArticle } from "@/lib/types";

const note = (value: CareerNote) => value;
const article = (value: InsightArticle) => value;

export const careerNotes: CareerNote[] = [
  note({
    slug: "ai-engineer",
    role: "AI Engineer",
    title: "AI Engineer: The Complete Guide",
    subtitle: "The most-hired technical role in AI, with 143% job growth in the past year.",
    salaryRange: "$145K – $350K",
    growth: "143% growth",
    updatedAt: "Mar 2026",
    experienceBand: "Mid to Senior",
    cardDescription: "The most-hired technical role in AI, sitting between infrastructure and product delivery.",
    mustHave: ["Python or TypeScript", "API integration fluency", "Prompt and evaluation basics"],
    niceToHave: ["Fine-tuning familiarity", "Vector databases", "Observability for AI systems"],
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
          "An AI Engineer builds and deploys AI systems that work in production. Unlike a research scientist publishing papers, an AI Engineer takes a foundation model and makes it do something useful, reliably, at scale.",
          "The role exploded because every company wants to integrate AI, but very few people know how to do it well. Calling an API is easy. Building a system that handles edge cases, fails gracefully, stays within cost budgets, and improves the user experience is engineering."
        ]
      },
      {
        id: "day-to-day",
        title: "What you actually do day-to-day",
        paragraphs: [
          "Mornings often start with monitoring dashboards. Did latency spike overnight. Did costs drift. Did a prompt chain start producing brittle outputs for a slice of users that looked fine in test.",
          "Mid-morning is implementation time: retrieval systems, evals, prompt scaffolding, guardrails, service wrappers, and the unglamorous interface between model output and the rest of the product.",
          "Afternoons are cross-functional. Product managers ask what is feasible. Designers want to understand where latency or uncertainty should show up. Backend teams need model inference to behave like a dependable service, not a demo."
        ]
      },
      {
        id: "whos-hiring",
        title: "Who's hiring",
        paragraphs: [
          "The hiring market splits into three buckets. Frontier labs want people close to model capability. Enterprise companies want AI Engineers who can slot models into mature systems. High-revenue software businesses need people who can turn promising experiments into repeatable product features."
        ]
      },
      {
        id: "what-you-need",
        title: "What you need to know",
        paragraphs: [
          "Must-haves are less glamorous than most beginners expect: API integration, service thinking, prompt and evaluation discipline, and the ability to debug systems whose behavior is partly probabilistic. Nice-to-haves include fine-tuning, vector databases, and model-serving fluency."
        ]
      },
      {
        id: "what-it-pays",
        title: "What it pays",
        paragraphs: [
          "Compensation is strong because the role sits at the point where companies can convert model capability into revenue, product differentiation, or internal leverage."
        ]
      },
      {
        id: "how-to-break-in",
        title: "How to break in",
        paragraphs: [
          "If you are already a software engineer, you are closer than you think. The shortest path is to learn evaluation, retrieval, inference constraints, and the difference between a cool prototype and a production system.",
          "A good first project is not a chatbot clone. It is a narrow tool with clear inputs, measurable outputs, and explicit failure cases. Fine-tune a small model, deploy it as an API, instrument it, and write about the tradeoffs you discovered."
        ]
      },
      {
        id: "where-its-headed",
        title: "Where this role is headed",
        paragraphs: [
          "The title will probably fragment. Some AI Engineers will drift toward infrastructure and MLOps. Others will become product-side application specialists. The common thread will remain the same: making AI systems useful under real constraints."
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
    subtitle: "The hybrid role replacing five SDRs and quietly paying $220K.",
    salaryRange: "$130K – $310K",
    growth: "205% growth",
    updatedAt: "Mar 2026",
    experienceBand: "Entry to Senior",
    cardDescription: "The revenue systems role built on automation, signal, and product-minded code.",
    mustHave: ["Outbound system thinking", "Workflow automation", "Experiment design"],
    niceToHave: ["Clay or Apollo", "Lead scoring", "Light application scripting"],
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
          "A GTM Engineer builds and automates revenue-generating systems using AI and code. The role sits between engineering, sales, and marketing. It is neither traditional RevOps nor classic software engineering.",
          "The reason it pays so well is simple: one good GTM Engineer can create measurable pipeline. The work is attached to revenue, not just internal efficiency."
        ]
      },
      {
        id: "day-to-day",
        title: "What you actually do day-to-day",
        paragraphs: [
          "Mornings start with dashboards and workflow checks: lead volume, response rates, enrichment failures, and whether the signal model is still finding the right accounts.",
          "The rest of the day is a mix of no-code and code. You tweak Clay workflows, build custom scoring logic, connect CRM systems, and test whether a small change in targeting or message structure changes revenue outcomes."
        ]
      },
      {
        id: "whos-hiring",
        title: "Who's hiring",
        paragraphs: [
          "The cleanest demand is in SaaS startups with ambitious growth goals, but the title is also spreading into larger businesses under softer names like Revenue Operations Engineer or Growth Systems Engineer."
        ]
      },
      {
        id: "what-you-need",
        title: "What you need to know",
        paragraphs: [
          "You need enough code to build or repair internal tools, enough data sense to trust or distrust your own funnel numbers, and enough commercial taste to know whether a workflow is creating real demand or just more motion."
        ]
      },
      {
        id: "what-it-pays",
        title: "What it pays",
        paragraphs: [
          "Compensation is often structured around base plus OTE, which makes sense because the work sits close to pipeline and revenue."
        ]
      },
      {
        id: "how-to-break-in",
        title: "How to break in",
        paragraphs: [
          "This is one of the most realistic transitions for ambitious SDRs, AEs, and RevOps operators with technical appetite. Learn Python, learn Clay, build a workflow that enriches leads and writes usable personalization, then show a real sales leader what it produces.",
          "The portfolio piece matters more than a perfect resume. Demonstrate a system that turns signal into meetings."
        ]
      },
      {
        id: "where-its-headed",
        title: "Where this role is headed",
        paragraphs: [
          "The best GTM Engineers will likely become mini-general managers. Once you can write code that creates revenue, the next question is usually not whether you can automate more. It is whether you can own a number."
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
    subtitle: "The AI-native developer role that proves you do not need to write every line by hand.",
    salaryRange: "$70K – $351K",
    growth: "372+ explicit listings",
    updatedAt: "Mar 2026",
    experienceBand: "Entry to Lead",
    cardDescription: "The role category formed around AI-assisted development as a first-class workflow.",
    mustHave: ["Prompt-driven development", "Debugging judgment", "Architecture taste"],
    niceToHave: ["Product instinct", "Design sensitivity", "Testing discipline"],
    hiringByTier: [
      { tier: "VC-backed startup", companies: ["Cursor", "Replit", "Vercel", "Linear"] },
      { tier: "High-revenue business", companies: ["Stripe", "Notion", "Figma"] },
      { tier: "Fortune 500", companies: ["Microsoft", "Salesforce"] }
    ],
    sections: [
      { id: "what-the-role-is", title: "What the role is", paragraphs: ["A vibe coder is an AI-native developer who treats coding tools as collaborators, not novelties. The work is less about typing and more about steering: architecture, constraints, review, and taste."] },
      { id: "day-to-day", title: "What you actually do day-to-day", paragraphs: ["The rhythm is fast: sketch the architecture, push implementation through AI-assisted loops, then spend your real time on review, refactoring, and edge cases."] },
      { id: "whos-hiring", title: "Who's hiring", paragraphs: ["The clearest demand is inside product-driven software companies that value speed and are honest about how modern teams now build."] },
      { id: "what-you-need", title: "What you need to know", paragraphs: ["You need to know when the tool is helping and when it is hallucinating confidence. Strong vibe coders are good editors of generated code."] },
      { id: "what-it-pays", title: "What it pays", paragraphs: ["Pay varies widely because the title spans startups, agencies, and more established product teams."] },
      { id: "how-to-break-in", title: "How to break in", paragraphs: ["Build in public. Show how you use AI tools to ship meaningful work, not toy demos. A portfolio with good judgment beats discourse about whether the workflow is legitimate."] },
      { id: "where-its-headed", title: "Where this role is headed", paragraphs: ["Over time the title may disappear because the workflow will become normal. But the underlying skill, guiding AI tools without losing rigor, is likely to stay valuable."] }
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
    subtitle: "A role built around evaluation, optimization, and model behavior rather than clever one-liners.",
    salaryRange: "$90K – $200K",
    growth: "135.8% growth",
    updatedAt: "Mar 2026",
    experienceBand: "Entry to Senior",
    cardDescription: "Prompt engineering is becoming a discipline of evaluation, workflow design, and behavioral tuning.",
    mustHave: ["Systematic testing", "Evaluation loops", "Clear language"],
    niceToHave: ["Dataset curation", "Prompt versioning", "Customer workflow literacy"],
    hiringByTier: [
      { tier: "VC-backed startup", companies: ["Anthropic", "Scale AI", "Harvey", "Perplexity"] },
      { tier: "High-revenue business", companies: ["Datadog", "Snowflake"] },
      { tier: "Fortune 500", companies: ["Accenture", "Microsoft"] }
    ],
    sections: [
      { id: "what-the-role-is", title: "What the role is", paragraphs: ["Prompt Engineer used to sound flimsy. The serious version of the role is not about magic words. It is about repeatable prompt systems, evaluation, and behavior tuning."] },
      { id: "day-to-day", title: "What you actually do day-to-day", paragraphs: ["Expect side-by-side testing, prompt revisions, rubric design, and the unglamorous work of measuring whether outputs are actually improving."] },
      { id: "whos-hiring", title: "Who's hiring", paragraphs: ["Labs, services firms, and enterprises with large internal AI rollouts are the main buyers."] },
      { id: "what-you-need", title: "What you need to know", paragraphs: ["You need language precision, rigorous testing habits, and enough domain knowledge to know what a good answer should look like."] },
      { id: "what-it-pays", title: "What it pays", paragraphs: ["Comp is solid but increasingly tied to whether the role is paired with evaluation, customer operations, or product delivery."] },
      { id: "how-to-break-in", title: "How to break in", paragraphs: ["Create prompt experiments around a real workflow, show before-and-after quality, and publish the evaluation method with the result."] },
      { id: "where-its-headed", title: "Where this role is headed", paragraphs: ["The role is likely to merge into AI product, AI engineering, and evaluation roles over time."] }
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
    subtitle: "The role that decides when AI belongs in the product and when it does not.",
    salaryRange: "$140K – $280K",
    growth: "96% growth",
    updatedAt: "Mar 2026",
    experienceBand: "Mid to Senior",
    cardDescription: "A product role built around model judgment, evaluation, and responsible product decisions.",
    mustHave: ["Product discovery", "Model capability literacy", "Evaluation habits"],
    niceToHave: ["Prompting", "SQL", "Policy intuition"],
    hiringByTier: [
      { tier: "Fortune 500", companies: ["Microsoft", "Google", "Salesforce"] },
      { tier: "VC-backed startup", companies: ["OpenAI", "Anthropic", "Perplexity"] },
      { tier: "High-revenue business", companies: ["Stripe", "Notion", "Databricks"] }
    ],
    sections: [
      { id: "what-the-role-is", title: "What the role is", paragraphs: ["AI Product Managers sit between model capability and user value. Their real job is deciding what deserves to ship and what should remain a prototype."] },
      { id: "day-to-day", title: "What you actually do day-to-day", paragraphs: ["Much of the work is evaluation, roadmap judgment, and explaining limits as clearly as opportunities."] },
      { id: "whos-hiring", title: "Who's hiring", paragraphs: ["The role shows up anywhere AI features are core to the product roadmap."] },
      { id: "what-you-need", title: "What you need to know", paragraphs: ["You need product sense, comfort with ambiguity, and a clear understanding of what models can and cannot do reliably."] },
      { id: "what-it-pays", title: "What it pays", paragraphs: ["Comp tracks strong product management markets, with a premium when the AI layer is strategically important."] },
      { id: "how-to-break-in", title: "How to break in", paragraphs: ["If you already work in product, learn evaluation and model behavior deeply enough to ask better roadmap questions than your peers."] },
      { id: "where-its-headed", title: "Where this role is headed", paragraphs: ["The strongest AI PMs will become translators between frontier capability and practical user trust."] }
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
    subtitle: "The DevOps of machine learning, and one of the most quietly valuable roles in the stack.",
    salaryRange: "$150K – $300K",
    growth: "118% growth",
    updatedAt: "Mar 2026",
    experienceBand: "Mid to Lead",
    cardDescription: "The role keeping serving, monitoring, and platform operations from collapsing under AI ambition.",
    mustHave: ["Infrastructure fluency", "Monitoring discipline", "Platform thinking"],
    niceToHave: ["Kubeflow", "MLflow", "Cost optimization"],
    hiringByTier: [
      { tier: "High-revenue business", companies: ["Databricks", "Snowflake", "Datadog"] },
      { tier: "VC-backed startup", companies: ["Cohere", "Scale AI", "Runway"] },
      { tier: "Fortune 500", companies: ["NVIDIA", "Amazon", "Meta"] }
    ],
    sections: [
      { id: "what-the-role-is", title: "What the role is", paragraphs: ["ML Ops Engineers own the machinery behind shipping models. They are the reason an AI system keeps working after launch."] },
      { id: "day-to-day", title: "What you actually do day-to-day", paragraphs: ["Expect serving issues, monitoring, retraining cadence, permissions, pipelines, and too many conversations about cost."] },
      { id: "whos-hiring", title: "Who's hiring", paragraphs: ["Infrastructure-heavy AI businesses and large companies with serious ML footprints are the natural buyers."] },
      { id: "what-you-need", title: "What you need to know", paragraphs: ["Platform engineering habits matter more than flashy model knowledge. Reliability is the point."] },
      { id: "what-it-pays", title: "What it pays", paragraphs: ["Pay is strong because the role carries operational risk. When the platform fails, the product fails."] },
      { id: "how-to-break-in", title: "How to break in", paragraphs: ["If you are already in DevOps, platform engineering, or SRE, move toward model-serving infrastructure and observability."] },
      { id: "where-its-headed", title: "Where this role is headed", paragraphs: ["More companies will realize they need it before they realize what to call it."] }
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
    subtitle: "A role growing with regulation, risk, and the cost of getting model behavior wrong.",
    salaryRange: "$160K – $400K",
    growth: "90%+ growth",
    updatedAt: "Mar 2026",
    experienceBand: "Mid to Lead",
    cardDescription: "A research-and-systems role focused on red teaming, alignment, and practical safety behavior.",
    mustHave: ["Risk reasoning", "Evaluation design", "Clear writing"],
    niceToHave: ["RLHF familiarity", "Policy background", "Adversarial testing"],
    hiringByTier: [
      { tier: "VC-backed startup", companies: ["Anthropic", "OpenAI", "Cohere"] },
      { tier: "Fortune 500", companies: ["Microsoft", "Google"] },
      { tier: "High-revenue business", companies: ["Palantir", "Databricks"] }
    ],
    sections: [
      { id: "what-the-role-is", title: "What the role is", paragraphs: ["AI Safety Researchers work on the systems and methods that make model behavior safer, more predictable, and easier to evaluate."] },
      { id: "day-to-day", title: "What you actually do day-to-day", paragraphs: ["The work ranges from adversarial testing and red teaming to building evaluation suites and writing policy-sensitive guidance."] },
      { id: "whos-hiring", title: "Who's hiring", paragraphs: ["Labs are the clearest buyers, but enterprises with regulated or high-risk deployments are hiring too."] },
      { id: "what-you-need", title: "What you need to know", paragraphs: ["You need rigor, comfort with ambiguity, and the ability to translate risk into actual process."] },
      { id: "what-it-pays", title: "What it pays", paragraphs: ["Compensation is high because the downside of weak safety work is increasingly expensive."] },
      { id: "how-to-break-in", title: "How to break in", paragraphs: ["Start with evaluation, red-team work, or policy-literate engineering. Publish careful thinking, not just opinions."] },
      { id: "where-its-headed", title: "Where this role is headed", paragraphs: ["The title may widen as more industries bring governance and model behavior into the core product loop."] }
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
    subtitle: "A field role built for shipping custom systems where the real constraints live.",
    salaryRange: "$175K – $360K",
    growth: "89% growth",
    updatedAt: "Mar 2026",
    experienceBand: "Mid to Lead",
    cardDescription: "The customer-embedded engineering model pioneered by Palantir and spreading into AI.",
    mustHave: ["Customer empathy", "Systems thinking", "Fast implementation"],
    niceToHave: ["Travel tolerance", "Security awareness", "Procurement patience"],
    hiringByTier: [
      { tier: "High-revenue business", companies: ["Palantir", "Databricks"] },
      { tier: "VC-backed startup", companies: ["Harvey", "Anduril"] },
      { tier: "Fortune 500", companies: ["Microsoft"] }
    ],
    sections: [
      { id: "what-the-role-is", title: "What the role is", paragraphs: ["Forward Deployed Engineers embed with customers and build solutions where the messy details actually live."] },
      { id: "day-to-day", title: "What you actually do day-to-day", paragraphs: ["You are in the field, translating vague operational pain into working systems. The job is highly contextual and usually high pressure."] },
      { id: "whos-hiring", title: "Who's hiring", paragraphs: ["The title is still most associated with Palantir, but the pattern is spreading anywhere AI deployments require deep customer integration."] },
      { id: "what-you-need", title: "What you need to know", paragraphs: ["You need technical depth, speed, and a temperament suited to customers who are stressed and specific."] },
      { id: "what-it-pays", title: "What it pays", paragraphs: ["Comp reflects travel, complexity, and the reality that the job often sits close to important accounts."] },
      { id: "how-to-break-in", title: "How to break in", paragraphs: ["This is a good next move for engineers who like product work, customer contact, and ambiguity more than pure platform depth."] },
      { id: "where-its-headed", title: "Where this role is headed", paragraphs: ["As AI moves into harder industries, more companies will need engineers willing to ship in the field."] }
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
    subtitle: "The role that decides how uncertainty, trust, and automation should feel in a real interface.",
    salaryRange: "$120K – $212K",
    growth: "3x higher adoption",
    updatedAt: "Mar 2026",
    experienceBand: "Mid to Senior",
    cardDescription: "A design role focused on confidence, trust, fallback states, and AI behavior in the interface.",
    mustHave: ["Interaction design", "UX writing instinct", "Systems thinking"],
    niceToHave: ["Research background", "Prompt literacy", "Frontend fluency"],
    hiringByTier: [
      { tier: "Fortune 500", companies: ["Microsoft", "Google", "Adobe"] },
      { tier: "VC-backed startup", companies: ["Perplexity", "Anthropic"] },
      { tier: "High-revenue business", companies: ["Notion", "Figma"] }
    ],
    sections: [
      { id: "what-the-role-is", title: "What the role is", paragraphs: ["AI UX Designers work on the interface layer where AI either feels useful or feels untrustworthy."] },
      { id: "day-to-day", title: "What you actually do day-to-day", paragraphs: ["The work spans flows, interface language, confidence cues, empty states, and the problem of showing uncertainty without making the product feel broken."] },
      { id: "whos-hiring", title: "Who's hiring", paragraphs: ["Product companies with serious AI features are the obvious market."] },
      { id: "what-you-need", title: "What you need to know", paragraphs: ["You need classic UX discipline plus a feel for model limitations and latency."] },
      { id: "what-it-pays", title: "What it pays", paragraphs: ["Comp is strong where the role sits inside strategic product teams rather than innovation theater."] },
      { id: "how-to-break-in", title: "How to break in", paragraphs: ["Strong case studies matter more than theory. Show interfaces that solve the trust problem, not just the aesthetic problem."] },
      { id: "where-its-headed", title: "Where this role is headed", paragraphs: ["As AI product experiences mature, this role is likely to become standard rather than novel."] }
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
    subtitle: "The new role devoted to memory, retrieval, and what an agent should remember next.",
    salaryRange: "$165K – $310K",
    growth: "New in 2026",
    updatedAt: "Mar 2026",
    experienceBand: "Mid to Senior",
    cardDescription: "A new systems role focused on agent memory, retrieval, and context strategy.",
    mustHave: ["Retrieval thinking", "Systems design", "Prompt and summarization literacy"],
    niceToHave: ["Vector databases", "MLOps", "Knowledge management"],
    hiringByTier: [
      { tier: "VC-backed startup", companies: ["OpenAI", "Anthropic", "Cursor"] },
      { tier: "High-revenue business", companies: ["Databricks", "Notion"] },
      { tier: "Fortune 500", companies: ["Microsoft"] }
    ],
    sections: [
      { id: "what-the-role-is", title: "What the role is", paragraphs: ["Context Engineers think about what an agent should know, what it should fetch, and what it should forget."] },
      { id: "day-to-day", title: "What you actually do day-to-day", paragraphs: ["The work spans retrieval, memory summaries, context compression, state management, and quality tradeoffs across long-running systems."] },
      { id: "whos-hiring", title: "Who's hiring", paragraphs: ["Mostly AI-native companies building agents or systems that need to persist useful state across more than one turn."] },
      { id: "what-you-need", title: "What you need to know", paragraphs: ["You need systems judgment, comfort with ambiguity, and a strong sense for information design under constraint."] },
      { id: "what-it-pays", title: "What it pays", paragraphs: ["Comp reflects the strategic value of making agents feel coherent rather than forgetful."] },
      { id: "how-to-break-in", title: "How to break in", paragraphs: ["This role is a natural adjacency for AI Engineers, MLOps engineers, and search or platform engineers willing to specialize."] },
      { id: "where-its-headed", title: "Where this role is headed", paragraphs: ["If agent products keep growing, context engineering may become a standard specialization rather than a novel title."] }
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
    subtitle: "The customer-facing technical role that closes the last mile between product and adoption.",
    salaryRange: "$140K – $260K",
    growth: "82% growth",
    updatedAt: "Mar 2026",
    experienceBand: "Mid to Senior",
    cardDescription: "The technical translator between AI products and customer reality.",
    mustHave: ["Customer communication", "Integration fluency", "Implementation taste"],
    niceToHave: ["Sales engineering", "Prompt literacy", "Project management"],
    hiringByTier: [
      { tier: "VC-backed startup", companies: ["Scale AI", "Harvey", "Glean"] },
      { tier: "High-revenue business", companies: ["Databricks", "Stripe"] },
      { tier: "Fortune 500", companies: ["Salesforce", "Microsoft"] }
    ],
    sections: [
      { id: "what-the-role-is", title: "What the role is", paragraphs: ["AI Solutions Engineers help customers understand, adopt, and implement AI products in the real world."] },
      { id: "day-to-day", title: "What you actually do day-to-day", paragraphs: ["The job is part technical demo, part implementation, and part trust-building."] },
      { id: "whos-hiring", title: "Who's hiring", paragraphs: ["Companies with API products, workflow platforms, or enterprise AI sales motions are obvious buyers."] },
      { id: "what-you-need", title: "What you need to know", paragraphs: ["You need enough engineering to be credible and enough communication skill to keep customers moving."] },
      { id: "what-it-pays", title: "What it pays", paragraphs: ["Comp usually lands between strong engineering pay and strong sales-engineering pay."] },
      { id: "how-to-break-in", title: "How to break in", paragraphs: ["This is a strong move for implementation engineers, sales engineers, and technically strong CSMs."] },
      { id: "where-its-headed", title: "Where this role is headed", paragraphs: ["As AI buying matures, solutions talent will remain a critical adoption lever."] }
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
    subtitle: "The most accessible entry point into AI, and still one of the most quietly important.",
    salaryRange: "$50K – $120K",
    growth: "High demand",
    updatedAt: "Mar 2026",
    experienceBand: "Entry to Mid",
    cardDescription: "The entry point role closest to evaluation, labeling, and model quality.",
    mustHave: ["Attention to detail", "Consistency", "Written clarity"],
    niceToHave: ["Domain knowledge", "Quality assurance habits", "Spreadsheet fluency"],
    hiringByTier: [
      { tier: "VC-backed startup", companies: ["Scale AI", "Labelbox"] },
      { tier: "High-revenue business", companies: ["Databricks"] },
      { tier: "Fortune 500", companies: ["Large consulting and outsourcing firms"] }
    ],
    sections: [
      { id: "what-the-role-is", title: "What the role is", paragraphs: ["Data Annotation Specialists label, review, and evaluate data used to train or audit AI systems."] },
      { id: "day-to-day", title: "What you actually do day-to-day", paragraphs: ["The work can be repetitive, but the valuable version of it rewards careful judgment, not speed alone."] },
      { id: "whos-hiring", title: "Who's hiring", paragraphs: ["Labs, vendors, and data-platform businesses all need this work, especially around evaluation and RLHF."] },
      { id: "what-you-need", title: "What you need to know", paragraphs: ["You need consistency, attention, and the ability to follow complex labeling criteria."] },
      { id: "what-it-pays", title: "What it pays", paragraphs: ["Comp is lower than engineering tracks, but the barrier to entry is lower as well."] },
      { id: "how-to-break-in", title: "How to break in", paragraphs: ["For career changers, this is a practical way into the AI labor market. Strong performers can move toward evaluation, QA, or operations roles."] },
      { id: "where-its-headed", title: "Where this role is headed", paragraphs: ["As models get more capable, the need for better evaluation quality, not just more data, is rising."] }
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
      { id: "transitions", title: "Transitions are the real story", paragraphs: ["The most practical pattern is transition, not replacement. A software engineer becomes an AI Engineer. An SDR becomes a GTM Engineer. A support operator becomes an AI operations specialist or evaluator. That does not mean the transition is automatic. It means the labor market is reorganizing around a new set of leverage points.", "The people who do best in that shift are usually the ones who stop arguing with the direction of travel early and start learning the adjacent systems around it."] },
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
    description: "The most plausible AI career transition for commercial operators who want leverage.",
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
