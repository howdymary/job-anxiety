import type { Metadata } from "next";
import Link from "next/link";

import { EditorialShell } from "@/components/editorial-shell";
import type { CareerNoteSection } from "@/lib/types";

const articleSections: CareerNoteSection[] = [
  { id: "the-scene", title: "The scene", paragraphs: [] },
  { id: "the-numbers", title: "The numbers", paragraphs: [] },
  { id: "what-the-tasks-reveal", title: "What the tasks reveal", paragraphs: [] },
  { id: "the-seniority-cliff", title: "The seniority cliff", paragraphs: [] },
  { id: "the-jevons-question", title: "The Jevons question", paragraphs: [] },
  { id: "what-to-actually-do", title: "What to actually do", paragraphs: [] },
  { id: "the-close", title: "The close", paragraphs: [] }
];

const sourceLinks = [
  {
    label: "BLS Occupational Outlook Handbook — Software Developers, Quality Assurance Analysts, and Testers",
    url: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm"
  },
  {
    label: "BLS Occupational Outlook Handbook — Computer Programmers",
    url: "https://www.bls.gov/ooh/computer-and-information-technology/computer-programmers.htm"
  },
  {
    label: "BLS Occupational Outlook Handbook — Data Scientists",
    url: "https://www.bls.gov/ooh/math/data-scientists.htm"
  },
  {
    label: "BLS Occupational Outlook Handbook — Information Security Analysts",
    url: "https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm"
  },
  {
    label: "The Budget Lab at Yale — Evaluating the Impact of AI on the Labor Market: Current State of Affairs",
    url: "https://budgetlab.yale.edu/research/evaluating-impact-ai-labor-market-current-state-affairs"
  },
  {
    label: "Brookings — Measuring U.S. Workers' Capacity to Adapt to AI-Driven Job Displacement",
    url: "https://www.brookings.edu/articles/measuring-us-workers-capacity-to-adapt-to-ai-driven-job-displacement/"
  },
  {
    label: "METR — Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity",
    url: "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/"
  },
  {
    label: "World Economic Forum — Future of Jobs Report 2025",
    url: "https://www3.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf"
  },
  {
    label: "Challenger, Gray & Christmas — December 2025 Job Cut Announcement Report",
    url: "https://www.challengergray.com/wp-content/uploads/2026/01/Challenger-Report-December-2025.pdf"
  },
  {
    label: "The New York Times — Computer Science Grads Struggle to Find Jobs in the A.I. Age",
    url: "https://www.nytimes.com/2025/08/10/technology/coding-ai-jobs-students.html"
  },
  {
    label: "Workday 8-K — restructuring plan and workforce reduction",
    url: "https://www.sec.gov/Archives/edgar/data/1327811/000132781125000030/wday-20250205.htm"
  },
  {
    label: "Klarna — Q1 2025 results and workforce update",
    url: "https://www.klarna.com/international/press/klarna-accelerates-global-momentum-in-q1-2025-and-unlocks-large-gains-from/"
  },
  {
    label: "Recruit Holdings — HR Technology segment workforce reduction",
    url: "https://recruit-holdings.com/en/newsroom/20250711_0001/"
  },
  {
    label: "Axios — Anthropic CEO warns AI could wipe out half of entry-level white-collar jobs",
    url: "https://www.axios.com/2025/05/28/anthropic-ceo-ai-jobs-unemployment"
  }
];

export const metadata: Metadata = {
  title: "Will AI Replace Software Engineers? What the Data Shows",
  description:
    "BLS still projects software-developer growth through 2034. A reported, data-driven guide to what is changing inside the field and what to do next.",
  openGraph: {
    title: "Will AI Replace Software Engineers? What the Data Shows",
    description:
      "BLS still projects software-developer growth through 2034. A reported, data-driven guide to what is changing inside the field and what to do next.",
    url: "https://jobanxiety.ai/career-notes/will-ai-replace-software-engineers"
  }
};

export default function WillAiReplaceSoftwareEngineersPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Will AI Replace Software Engineers? What the Data Shows",
    datePublished: "2026-03-29",
    dateModified: "2026-03-29",
    wordCount: 3920,
    author: {
      "@type": "Organization",
      name: "JobAnxiety.ai Research"
    },
    publisher: {
      "@type": "Organization",
      name: "JobAnxiety.ai"
    },
    description:
      "BLS still projects software-developer growth through 2034. A reported, data-driven guide to what is changing inside the field and what to do next.",
    mainEntityOfPage: "https://jobanxiety.ai/career-notes/will-ai-replace-software-engineers",
    citation: sourceLinks.map((source) => source.url)
  };

  return (
    <div className="grid gap-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <EditorialShell
        eyebrow="Career note"
        title="Will AI Replace Software Engineers?"
        subtitle="The best public data still points to growth in software work overall. The trouble is inside the category: routine coding is getting cheaper, hiring is uneven, and the value of judgment is rising."
        metaLine="18 min read · Published Mar 29, 2026 · Keyword: will AI replace software engineers"
        sections={articleSections}
        ctaHref="/check-your-occupation?soc=15-1252"
        ctaLabel="Check the sourced software-developer brief"
      >
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Software developers employed" value="1,693,800" note="BLS 15-1252, 2024" />
          <StatCard label="BLS projected growth" value="+16%" note="2024–2034 · about 115,200 openings a year" />
          <StatCard label="Computer programmers" value="-6%" note="Projected decline over the same decade" />
          <StatCard label="Data scientists" value="+33.5%" note="One of the fastest-growing adjacent roles" />
        </div>
      </EditorialShell>

      <div className="page-grid-prose prose-block">
        <section id="the-scene">
          <h2>The scene</h2>
          <p>
            By the time Zach Taylor crossed 5,700 job applications, the ritual had become mechanical. Open laptop. Tweak resume. Fill another form. Take another screening test. Wait. Taylor, who finished his computer science degree at Oregon State in 2023, told The New York Times that the effort had produced 13 interviews and no full-time offers. He had interned. He kept building side projects. He kept trying. He still ended up back home in Oregon, on unemployment, wondering how a path that was supposed to lead straight into a six-figure career had narrowed so quickly.
          </p>
          <p>
            That story would have sounded strange not long ago. For years, software engineering played a special role in the American imagination. It was hard, yes, but legible. Learn the tools. Build the projects. Get the internship. Graduate into a market that seemed permanently hungry. Even when other white-collar professions felt brittle, engineering looked like the safer bet. People repeated the advice so often it turned into doctrine: learn to code.
          </p>
          <p>
            The doctrine has not vanished. It has started to split. One part still looks true. The Bureau of Labor Statistics projects strong decade-long growth for software developers as a category, and companies are still hiring aggressively for certain kinds of technical work. The other part feels harder to deny with each passing quarter. Recent graduates are struggling. Routine coding work is getting cheaper. Executives now speak openly about AI-driven productivity as a reason to hold hiring flat or redirect headcount. The ladder is still there. Some of the lower rungs are not.
          </p>
          <p>
            That is why the question lands with so much force at night, after the workday is over and the browser tabs start multiplying: Will AI replace software engineers? It sounds like the kind of question that should have a clean answer. It does not. The category is too broad, the tools are moving too fast, and the evidence points in two directions at once. Some parts of the profession are getting more valuable. Others are being compressed, automated, or quietly redefined.
          </p>
          <p>
            The honest version of the question is less cinematic and more useful. Which engineers are under pressure? Which tasks are getting absorbed by models? Which parts of the job still depend on context, judgment, and trust? And if the work is changing faster at the bottom of the ladder than at the top, what does a rational person do with that information now, before the market settles the question for them?
          </p>
        </section>

        <section id="the-numbers">
          <h2>The numbers</h2>
          <p>
            Start with the official baseline, because it matters. For software developers specifically, the BLS projects employment to rise from 1,693,800 in 2024 to 1,961,400 in 2034, a 16% increase, with about 115,200 openings a year over the decade. The broader family that also includes software quality assurance analysts and testers is larger still: 1,895,500 jobs in 2024 and about 129,200 openings a year. For software developers specifically, the median annual wage in May 2024 was $133,080. That is not the profile of a profession in collapse.
          </p>
          <p>
            But the BLS tables also contain the reason so many engineers distrust broad reassurance. Not every job in the family is moving together. Computer programmers, the narrower occupation built around writing, modifying, and testing code, are projected to decline 6% over the same decade. Data scientists, by contrast, are projected to grow 34%. Information security analysts are projected to grow 29%. The top-line number says software work is expanding. The subcategory data says the market is rewarding some kinds of technical work and thinning out others.
          </p>
          <p>
            That split tracks the way companies are talking. When business leaders describe where AI is helping them, they rarely start with the hardest architectural decisions or the messy political work of engineering organizations. They start with the repeatable layers: documentation, support, code generation, translation, triage, content production. Klarna has said its workforce is now about 40% smaller than it was two years earlier while revenue per employee rises and AI spreads through customer-service and internal workflows. Workday disclosed in an SEC filing that it would cut about 1,750 jobs, or 8.5% of its workforce, while continuing to hire in strategic areas and invest in AI. Recruit Holdings said in July 2025 that its HR Technology segment, which operates Indeed and Glassdoor, would reduce staff by about 1,300 employees. None of those examples, on their own, proves that engineering as a profession is shrinking. Together, they do show something else. Companies increasingly treat AI as permission to redraw the boundary between labor they will keep, labor they will not replace, and labor they no longer think requires a person.
          </p>
          <p>
            The layoff data complicates the story further. Challenger, Gray &amp; Christmas counted 54,836 job cuts that employers explicitly attributed to AI in 2025, about 4.5% of the 1,206,374 announced cuts it tracked that year. That is large enough to matter and small enough to frustrate anyone looking for a clean headline. If you want to argue that AI is already a major force in job loss, you can point to the count. If you want to argue that macro conditions, overhiring, and interest rates still explain more of the current labor market than AI does, you can point to the same number.
          </p>
          <p>
            The Budget Lab at Yale leans hard in that second direction. Its October 1, 2025 review of the labor market found no clear economy-wide relationship yet between measures of AI exposure and changes in employment or unemployment. Even among unemployed workers, the researchers found no clear upward trend in exposure. On average, they wrote, unemployed workers were coming from occupations where roughly 25% to 35% of tasks could theoretically be performed by generative AI, but that share was not rising in a way that would support a clean story of AI-driven mass displacement already showing up in the unemployment data.
          </p>
          <p>
            That finding does not mean engineers are imagining things. It means the macro data is still muddy. The first-order effect may not show up as a sudden collapse in total employment. It may show up as slower junior hiring, longer job searches, flatter headcount growth, and a profession whose title stays the same while the work inside it changes. The Washington question and the kitchen-table question are different. A labor economist asks whether AI has produced a discernible economy-wide shock. A software engineer asks whether the tasks that once got a 24-year-old hired are still enough.
          </p>
          <p>
            The World Economic Forum&apos;s Future of Jobs Report 2025 makes the same argument at a global scale, though with a more optimistic frame. It projects 170 million jobs created and 92 million displaced by 2030, for a net increase of 78 million. That is a churn story, not a reassurance story. Creation and displacement can both be true. They often are. A growing occupation family can still be brutal to enter if the old entry tasks are automated away before the new roles become accessible.
          </p>
          <p>
            So the question “will AI replace software engineers?” breaks down almost immediately. Replace all of them? No public dataset supports that. Replace some categories of engineering work, especially the more routine layers? There is mounting evidence for that. Increase the value of some technical specialties even while it narrows the path into the profession? That is where the data is headed, and it is where the personal anxiety starts to make sense.
          </p>
        </section>

        <section id="what-the-tasks-reveal">
          <h2>What the tasks reveal</h2>
          <p>
            Occupation titles are blunt instruments. Tasks tell the truth more clearly. O*NET&apos;s software-developer profile includes familiar work: designing programs, documenting specifications, testing code, collaborating with users, recommending upgrades, analyzing information, and modifying software to fix errors or adapt it to new hardware. Put that list next to the behavior of current coding systems and a pattern emerges fast.
          </p>
          <p>
            Writing boilerplate code is the obvious case. So is generating test scaffolds, summarizing documentation, or translating one routine pattern into another. GitHub, Microsoft, OpenAI, Anthropic, Cursor, and every other company in the coding-assistant business are betting on the same proposition: there is a large band of programming labor that can be sped up materially when the task is local, well-specified, and close to something the model has already seen.
          </p>
          <p>
            That bet is not fantasy. It is also not the whole job. METR&apos;s randomized study of experienced open-source developers working on their own repositories found the opposite of the happy productivity story. Using early-2025 AI tools, those developers took 19% longer on average than they did without AI. That result startled people because it violated the industry narrative. It should not have. Experienced engineers do not spend their days solving toy problems in clean sandboxes. They work inside codebases full of history, custom rules, institutional memory, hidden dependencies, and political constraints that no model sees all at once.
          </p>
          <p>
            This is where the difference between work and job starts to matter. AI is already good at pieces of the work of software engineering. It is less reliable at the job of software engineering. Work is the unit of task execution. Job is everything around it: deciding what should be built, noticing what the ticket failed to say, understanding the weird edge case no one documented because only the support team hears about it, knowing which shortcut will hurt you six months from now, and carrying the responsibility when production breaks at 2 a.m.
          </p>
          <p>
            The tasks that still look stubbornly human are not mystical. They are ordinary in a way that makes them hard for models to fake. A product manager says the service feels slow. The logs are not conclusive. Marketing wants the new flow out before the next launch. Legal has concerns about retention. The infra team is already stretched. There is no single prompt that resolves that scene. Someone has to sort signal from noise, make the tradeoffs legible, win agreement, and live with the choice.
          </p>
          <p>
            That is why the strongest engineers have started talking less about writing code and more about managing ambiguity. The tools can draft. They can autocomplete. They can often repair. They are still weak at deciding which of three plausible directions is actually right for this company, this codebase, this quarter, and this mess of human constraints. That is not a minor difference. It is most of what senior engineers are paid for.
          </p>
          <p>
            The task view also explains why the profession feels so uneven right now. Junior engineers historically got paid to handle the local work: smaller tickets, test writing, component updates, bug fixing, internal tools, routine migrations. Those tasks are closer to the part of the job AI can already touch. Senior engineers spend more time on system boundaries, judgment, and review. The tools do not erase that work. If anything, they increase it. More generated code means more code to evaluate. Faster output means more pressure to decide what should ship. A team that produces 30% more code with the same headcount has not escaped management. It has created more need for supervision and taste.
          </p>
          <p>
            Put differently: AI has become exceptionally good at the parts of engineering that used to teach a person how to become an engineer. That is the part that should worry people most. Not because it means the profession disappears, but because it changes how professionals are formed.
          </p>
        </section>

        <section id="the-seniority-cliff">
          <h2>The seniority cliff</h2>
          <p>
            Dario Amodei gave the bluntest version of the warning when he told Axios that AI could wipe out half of entry-level white-collar jobs within five years. It was the kind of line that ricochets through hiring Slack channels and family group chats. It was also a useful provocation because it forced a harder look at which part of the market seems weakest right now.
          </p>
          <p>
            The junior problem is real. The causal story is not settled. That distinction matters. The period after 2021 brought a classic correction in tech. Companies that hired too quickly pulled back. Interest rates rose. Venture financing tightened. Public-market discipline returned. If junior engineering demand collapsed, AI is not the only plausible reason. Any honest account has to admit that the market would likely have cooled even without ChatGPT.
          </p>
          <p>
            Still, the anecdotes pile up in one direction, and they line up with the task logic. The New York Times described recent graduates applying to hundreds and even thousands of jobs, often getting ghosted or screened out. That is not a clean public time series. It is, however, consistent with a market that looks weaker for first-time entrants than for experienced engineers, even if the exact share of that weakness attributable to AI remains unsettled.
          </p>
          <p>
            That does not mean mid-career and senior engineers are safe in the sentimental sense of the word. It means they are safer than the headlines imply. Brookings made a useful point in February 2026: many of the white-collar workers with the highest AI exposure also have the highest adaptive capacity. They tend to have better savings, stronger networks, more transferable skills, and more options if they need to move. That is cold comfort when someone loses a job. It is still important. A 38-year-old staff engineer with a broad network and a record of shipping across teams is not in the same position as a 22-year-old trying to get a first offer.
          </p>
          <p>
            There is a cruel irony here. For a generation, telling people to study computer science was framed as practical advice, almost morally responsible advice. Learn the thing the future will need. The future arrived, and the first people asked to prove themselves in it are competing against both a tighter macro market and tools that automate the exact tasks once delegated to beginners. The old entry path is not gone. It is narrower, steeper, and less forgiving.
          </p>
          <p>
            None of this should become an excuse to romanticize seniority either. Senior engineers are not protected because they are wiser in the abstract. They are protected because organizations still need people who can be trusted with context. If AI systems get better at absorbing context, more of that moat erodes. But that is not where the public data points today. Today the first squeeze is lower down. It is happening in the zone where execution used to be enough.
          </p>
        </section>

        <section id="the-jevons-question">
          <h2>The Jevons question</h2>
          <p>
            The strongest case for optimism is older than software. When a technology makes production cheaper, demand sometimes rises enough that total employment grows rather than shrinks. Economists call this a Jevons-style effect. You can see versions of it in manufacturing, logistics, even computing itself. When it became cheaper to build digital products, the world did not run out of reasons to hire technical people. It found more.
          </p>
          <p>
            That possibility remains live for software. If AI makes building internal tools, customer-facing features, prototypes, and back-office systems dramatically cheaper, companies may decide to build a great deal more software than they do now. The BLS growth projection for software developers is one institutional expression of that bet. So is the WEF view that technological displacement and technological creation can happen at the same time.
          </p>
          <p>
            But Jevons is not a guarantee. Efficiency can also be banked. A company can use AI to keep output steady with fewer junior hires. It can route more work through a smaller number of senior engineers. It can turn a five-person team into a three-person team that ships the same roadmap and call that progress. In that world software demand rises, but payroll does not rise in lockstep. Output grows. Employment stalls.
          </p>
          <p>
            The most plausible outcome may be the least emotionally satisfying one: the occupation name survives, the total headcount might even grow, and the profession still feels harsher to enter and easier to be expelled from at the margins. Same name. Different job. Fewer people starting by writing basic code from scratch. More people reviewing AI output, designing systems, setting guardrails, securing model pipelines, and deciding which generated work deserves trust.
          </p>
          <p>
            That is why the Jevons question matters less as a debate-club exercise than as a career question. Even if software employment rises over the next decade, the composition of engineering work can shift fast enough to strand people who trained for the old mix. Net growth is a comfort to economists. It is not necessarily a comfort to the person standing at the wrong point in the transition.
          </p>
        </section>

        <section id="what-to-actually-do">
          <h2>What to actually do</h2>
          <p>
            Advice in moments like this tends to split into two bad forms. Panic talk treats the whole profession as doomed. Smoothing talk pretends nothing fundamental is changing. Neither helps. The more useful approach is to ask what kind of engineer you are now, which part of the job still depends on your judgment, and which adjacent paths still respect the skills you already have.
          </p>
          <p>
            <strong>For senior engineers,</strong> the immediate move is not to retreat from AI tools but to get better at using them where they are strongest and to spend more of your visible time where they are weakest. Architecture. prioritization. review. cross-team decision-making. production accountability. If a model can help you ship routine work faster, let it. The point is not to prove purity. The point is to preserve your time for the judgment work that still defines value. You should also get much more explicit about that value in writing. Resumes and performance reviews that still read like lists of implementation tasks will age badly.
          </p>
          <p>
            <strong>For mid-career engineers,</strong> this is the window to pivot before the market forces it. The adjacent roles with the clearest public growth signals are not far away. Data science, security, AI infrastructure, research-adjacent roles, and product-heavy applied AI teams all still need people who understand systems, debugging, and the discipline of shipping under constraint. The gap is real, but it is not a total reinvention. In most cases it looks more like six to twelve months of focused repositioning than a fresh degree and a new identity.
          </p>
          <p>
            <strong>For entry-level engineers and career changers,</strong> the hardest truth is that “I can build a React app” no longer distinguishes you the way it once did. That does not mean the market is closed. It means the bar has moved. You need to show judgment, not just output. That can mean contributing to open-source AI tooling, building smaller projects with clear constraints and explicit evaluation, writing about why one approach failed, or demonstrating that you can inspect AI-generated code and catch what is dangerous or sloppy. Companies do not need more people who can ask a model for a component. They need people who can tell whether the component should be trusted.
          </p>
          <p>
            There is also a quieter move that matters more than most people admit. Reframe your identity away from a single implementation layer. If your story about yourself is “I write code,” the tools will sound like a threat every time they get better at writing code. If your story becomes “I solve messy business and technical problems using code, models, and judgment,” the same tools start to look more like part of the job. That is not positive thinking. It is a more accurate description of how the labor market is already sorting people.
          </p>
          <p>
            If you want something more concrete than philosophy, start here. Run your occupation through the{" "}
            <Link href="/check-your-occupation?soc=15-1252" className="inline-link">
              occupation check
            </Link>{" "}
            and read the sourced BLS brief first. Compare software-developer demand with the AI-heavy roles on the{" "}
            <Link href="/trends" className="inline-link">
              trends dashboard
            </Link>
            . Browse the current AI-adjacent openings in{" "}
            <Link href="/jobs?q=software" className="inline-link">
              software
            </Link>{" "}
            and{" "}
            <Link href="/jobs?q=AI engineer" className="inline-link">
              AI engineering
            </Link>
            . Then read the{" "}
            <Link href="/methodology" className="inline-link">
              methodology
            </Link>{" "}
            so you know what is published on the public site, what is intentionally withheld pending audit, and how the BLS-facing brief is constructed. Fear gets worse when it stays abstract. It gets more manageable when it is attached to concrete next steps.
          </p>
        </section>

        <section id="the-close">
          <h2>The close</h2>
          <p>
            In the Times story, the bleakest detail was not that Zach Taylor had applied to 5,762 tech jobs. It was what came after. The effort changed how he thought about the future. Another graduate in the piece, Manasi Mishra, ended up shifting toward tech sales after failing to break through on the engineering side. That is not a fairy tale. It is not a collapse either. It is what adjustment looks like when a market changes faster than the story people were told about it.
          </p>
          <p>
            Software engineering is not disappearing. The profession is being edited in public. Some of the work is getting cheaper. Some of the judgment is getting more valuable. Some of the entry path is cracking under the strain. That is a harder sentence to live with than either doom or reassurance. It is also closer to the truth.
          </p>
          <p>
            The better question, then, is not whether AI replaces software engineers in one dramatic sweep. It is who gets trusted to direct software when writing it is no longer the scarce part.
          </p>
        </section>

        <section id="continue-reading" className="rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[var(--ja-cloud)] p-6">
          <h2>Where to go next</h2>
          <p>
            If this piece maps onto your own situation, the next step should feel smaller than a career reinvention. Use the{" "}
            <Link href="/check-your-occupation?soc=15-1252" className="inline-link">
              occupation check
            </Link>{" "}
            for a sourced BLS brief on this occupation, scan the current{" "}
            <Link href="/layoffs" className="inline-link">
              layoff log
            </Link>{" "}
            for context, and keep one eye on the{" "}
            <Link href="/newsletter" className="inline-link">
              Monday Market Brief
            </Link>
            . You do not need a slogan. You need signal.
          </p>
        </section>

        <section id="sources">
          <h2>Sources</h2>
          <ul>
            {sourceLinks.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer" className="inline-link">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function StatCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-5">
      <p className="eyebrow">{label}</p>
      <p className="data-copy mt-3 text-[1.8rem] leading-none text-[var(--ja-ink)]">{value}</p>
      <p className="fine-print mt-3">{note}</p>
    </div>
  );
}
