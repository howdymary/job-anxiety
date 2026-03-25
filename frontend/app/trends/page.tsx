import type { Metadata } from "next";

import { TrendChart } from "@/components/market/trend-chart";
import { SectionHeading } from "@/components/section-heading";
import { landingStats, topHiringCompanies, trendPoints } from "@/lib/market-data";

export const metadata: Metadata = {
  title: "Trends",
  description: "Market data on emerging AI roles, salaries, and the companies staffing up first."
};

export default function TrendsPage() {
  return (
    <div className="page-grid-wide grid gap-12">
      <SectionHeading
        eyebrow="Trends"
        title="Market data, not motivational content"
        description="The aim here is not to predict the future with a flourish. It is to show what is already happening in hiring, compensation, and category formation."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {landingStats.map((stat) => (
          <article key={stat.label} className="editorial-card p-5">
            <p className="data-copy text-[2.5rem]">{stat.value}</p>
            <p className="body-copy mt-4">{stat.label}</p>
            <p className="fine-print mt-3">{stat.context}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
        <TrendChart data={trendPoints} />
        <section className="editorial-card p-5">
          <p className="eyebrow">Top hiring companies</p>
          <div className="mt-5 grid gap-4">
            {topHiringCompanies.map((company) => (
              <div key={company.name} className="border-b border-[var(--color-border)] pb-3 last:border-b-0 last:pb-0">
                <p className="font-[var(--font-ui)] text-[1rem] font-semibold">{company.name}</p>
                <p className="data-copy mt-2 text-[0.8rem] text-[var(--color-text-muted)]">{company.roles} live roles in the current sample</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
