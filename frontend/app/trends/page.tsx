import type { Metadata } from "next";
import Link from "next/link";

import { ResearchCompanyHiringChart } from "@/components/research/research-company-hiring-chart";
import { ResearchLiveOpeningsChart } from "@/components/research/research-live-openings-chart";
import { ResearchRoleFamilyChart } from "@/components/research/research-role-family-chart";
import { SectionHeading } from "@/components/section-heading";
import { getLiveMarketAnalytics } from "@/lib/live-market-analytics";

export const metadata: Metadata = {
  title: "Trends",
  description:
    "Source-backed live job-market trends built from tracked public AI company boards. No synthetic displacement series are published on this page.",
  robots: {
    index: false,
    follow: true
  }
};

const ATS_SOURCE_LABEL =
  "Tracked public Greenhouse and Ashby boards for OpenAI, Cursor, Perplexity, LangChain, Scale AI, Runway, Figure, and Together AI.";

export default async function TrendsPage() {
  const analytics = await getLiveMarketAnalytics();

  return (
    <div className="page-grid-wide grid gap-12">
      <SectionHeading
        eyebrow="Trends"
        title="Live job-market signals from tracked company boards"
        description="This page now publishes only source-backed ATS aggregates. Layoff ratios, modeled displacement series, and inferred posting trends stay off the public surface until their provenance is fully auditable."
      />

      <section className="editorial-card p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <div>
            <p className="eyebrow">Current publication scope</p>
            <p className="body-copy mt-4">
              These charts are computed from live public company boards. They show open-role inventory, posting recency,
              company concentration, and role-family mix. They do not infer layoffs, applications, or demand beyond what the
              boards themselves publish.
            </p>
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
            <p className="fine-print mt-3">{ATS_SOURCE_LABEL}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Open roles" value={analytics.stats.totalOpenRoles.toLocaleString("en-US")} note="Current inventory across tracked boards" />
        <StatCard label="Posted in 7 days" value={analytics.stats.postedLast7Days.toLocaleString("en-US")} note="Recent additions to the live board set" />
        <StatCard label="Companies hiring" value={analytics.stats.companiesHiring.toLocaleString("en-US")} note="Distinct companies with active roles" />
        <StatCard label="Live boards" value={`${analytics.stats.liveBoards}/${analytics.stats.totalBoards}`} note="Board fetches succeeding this cycle" />
        <StatCard label="Salary coverage" value={`${analytics.stats.salaryCoveragePct}%`} note="Listings exposing salary ranges" />
      </section>

      <ResearchLiveOpeningsChart data={analytics.weeklyOpenings} source={ATS_SOURCE_LABEL} />

      <section className="grid gap-6 xl:grid-cols-2">
        <ResearchRoleFamilyChart data={analytics.roleFamilies} source={ATS_SOURCE_LABEL} />
        <ResearchCompanyHiringChart data={analytics.companies} source={ATS_SOURCE_LABEL} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.9fr)]">
        <article className="editorial-card p-6">
          <p className="eyebrow">Workplace mix</p>
          <h2 className="section-title mt-3 text-[1.35rem]">How current openings are labeled</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {analytics.workplaceMix.map((item) => (
              <div key={item.label} className="rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-4">
                <p className="eyebrow">{item.label}</p>
                <p className="data-copy mt-3 text-[1.2rem] font-semibold text-[var(--ja-ink)]">{item.count.toLocaleString("en-US")}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="editorial-card p-6">
          <p className="eyebrow">Source health</p>
          <h2 className="section-title mt-3 text-[1.35rem]">Board-by-board fetch status</h2>
          <div className="mt-5 grid gap-3">
            {analytics.sourceHealth.map((source) => (
              <div key={source.key} className="flex items-center justify-between gap-4 border-b border-[var(--ja-fog)] pb-3 last:border-b-0 last:pb-0">
                <div>
                  <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{source.company}</p>
                  <p className="fine-print mt-1">
                    {source.provider === "greenhouse" ? "Greenhouse" : "Ashby"} · {source.jobCount.toLocaleString("en-US")} jobs this cycle
                  </p>
                </div>
                <p className="fine-print uppercase tracking-[0.08em] text-[var(--ja-slate)]">{source.status}</p>
              </div>
            ))}
          </div>
          {analytics.errors.length > 0 ? (
            <p className="fine-print mt-4">
              Some feeds were unavailable during this refresh. The page shows only what the live boards returned rather than backfilling with stale or synthetic values.
            </p>
          ) : null}
        </article>
      </section>

      <section className="editorial-card p-6">
        <p className="eyebrow">What is withheld</p>
        <p className="body-copy mt-4 max-w-[48rem]">
          Layoff ratios, occupation-level displacement estimates, and model-generated trend series are not published on
          this page until the underlying pipeline is source-audited. If you need official-source layoff disclosures, use the
          <Link href="/layoffs" className="inline-link">
            {" "}layoff log
          </Link>
          . If you need BLS-backed occupation outlook data, use the
          <Link href="/research" className="inline-link">
            {" "}research brief
          </Link>
          .
        </p>
      </section>
    </div>
  );
}

function StatCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <article className="editorial-card p-5">
      <p className="eyebrow">{label}</p>
      <p className="mt-3 font-[var(--ja-font-data)] text-[2rem] leading-tight text-[var(--ja-ink)]">{value}</p>
      <p className="fine-print mt-3">{note}</p>
    </article>
  );
}
