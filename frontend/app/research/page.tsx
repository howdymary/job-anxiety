import type { Metadata } from "next";
import Link from "next/link";

import { ResearchBlsOutlookChart } from "@/components/research/research-bls-outlook-chart";
import { ResearchCompanyHiringChart } from "@/components/research/research-company-hiring-chart";
import { ResearchLiveOpeningsChart } from "@/components/research/research-live-openings-chart";
import { ResearchRoleFamilyChart } from "@/components/research/research-role-family-chart";
import { SectionHeading } from "@/components/section-heading";
import { getLiveMarketAnalytics } from "@/lib/live-market-analytics";
import { auditedLayoffEvents, verifiedOccupationOutlook } from "@/lib/platform-data";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Source-backed research brief using current BLS occupation outlook data, live public ATS boards, and official-source layoff disclosures.",
  robots: {
    index: false,
    follow: true
  }
};

const ATS_SOURCE_LABEL =
  "Tracked public Greenhouse and Ashby boards for OpenAI, Cursor, Perplexity, LangChain, Scale AI, Runway, Figure, and Together AI.";

export default async function ResearchPage() {
  const analytics = await getLiveMarketAnalytics();
  const totalPublishedLayoffCount = auditedLayoffEvents.reduce((sum, event) => sum + event.affectedCount, 0);
  const aiCitedLayoffs = auditedLayoffEvents
    .filter((event) => event.aiSignal === "Cited")
    .reduce((sum, event) => sum + event.affectedCount, 0);

  return (
    <div className="page-grid-wide grid gap-10">
      <SectionHeading
        eyebrow="Research"
        title="The Great Reallocation"
        description="A source-backed research brief on AI, labor demand, and workforce restructuring. Public charts on this page now run only on current BLS occupation data, live ATS board aggregates, and official-source layoff disclosures."
      />

      <section className="editorial-card p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
          <div>
            <p className="eyebrow">Publication standard</p>
            <p className="body-copy mt-4">
              This page no longer publishes protocol samples, synthetic displacement curves, or placeholder geography
              layers. What remains is narrower but auditable: BLS occupation outlook, live public hiring boards, and a
              small confirmed layoff log with direct source links.
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
              <Link href="/methodology" className="arrow-link">
                <span>Methodology</span>
                <span>→</span>
              </Link>
              <Link href="/layoffs" className="arrow-link">
                <span>Official-source layoff log</span>
                <span>→</span>
              </Link>
              <Link href="/jobs" className="arrow-link">
                <span>Live jobs board</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[var(--ja-cloud)] p-5">
            <p className="eyebrow">Updated</p>
            <p className="body-copy mt-4">
              {new Date(analytics.generatedAt).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                timeZoneName: "short"
              })}
            </p>
            <p className="fine-print mt-3">BLS pages accessed March 2026. ATS aggregates refresh every 10 minutes.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="BLS occupations in view" value={verifiedOccupationOutlook.length.toString()} note="Current occupation pages used in the published comparison chart" />
        <StatCard label="Live ATS boards tracked" value={`${analytics.stats.liveBoards}/${analytics.stats.totalBoards}`} note="Successful board fetches in the current cycle" />
        <StatCard label="Official-source layoffs published" value={auditedLayoffEvents.length.toString()} note="Confirmed disclosures with direct company or SEC links" />
        <StatCard label="Workers affected in published log" value={`~${totalPublishedLayoffCount.toLocaleString("en-US")}`} note={`${aiCitedLayoffs.toLocaleString("en-US")} in events where AI is cited in the source text`} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ResearchBlsOutlookChart data={verifiedOccupationOutlook} />
        <ResearchLiveOpeningsChart data={analytics.weeklyOpenings} source={ATS_SOURCE_LABEL} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ResearchRoleFamilyChart data={analytics.roleFamilies} source={ATS_SOURCE_LABEL} />
        <ResearchCompanyHiringChart data={analytics.companies} source={ATS_SOURCE_LABEL} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
        <article className="editorial-card p-6">
          <p className="eyebrow">What this brief can support</p>
          <ul className="body-copy mt-5 grid gap-3 pl-5">
            <li>Current BLS baseline facts for selected occupations: employment, pay, and projected growth.</li>
            <li>Current hiring-board aggregates across a disclosed set of AI-company career pages.</li>
            <li>Confirmed workforce reductions when the source document is a filing or an official company release.</li>
          </ul>
        </article>

        <article className="editorial-card p-6">
          <p className="eyebrow">What is still withheld</p>
          <ul className="body-copy mt-5 grid gap-3 pl-5">
            <li>Modeled displacement ratios and velocity curves.</li>
            <li>Geographic heat maps built from unaudited model output.</li>
            <li>Posting-trend and seniority estimates that do not yet have a public provenance trail.</li>
          </ul>
        </article>
      </section>

      <section className="editorial-card p-6">
        <p className="eyebrow">Scope note</p>
        <p className="body-copy mt-4 max-w-[48rem]">
          This is a public research brief, not a claim of peer-reviewed publication. When the broader displacement,
          geography, and sector models are rebuilt on audited datasets, they can return here. Until then, this page stays
          limited to what can be sourced directly today.
        </p>
      </section>
    </div>
  );
}

function StatCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <article className="editorial-card min-w-0 p-5">
      <p className="eyebrow">{label}</p>
      <p className="mt-3 font-[var(--ja-font-data)] text-[2rem] leading-tight tracking-[-0.02em] text-[var(--ja-ink)]">{value}</p>
      <p className="fine-print mt-3 text-pretty">{note}</p>
    </article>
  );
}
