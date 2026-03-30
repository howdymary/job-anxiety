import type { Metadata } from "next";
import Link from "next/link";

import { TimeAgo } from "@/components/market/time-ago";
import { SectionHeading } from "@/components/section-heading";
import { getLiveJobsSnapshot } from "@/lib/live-homepage";

export const metadata: Metadata = {
  title: "Tracked Companies",
  description: "Companies with live AI-related roles on tracked ATS boards."
};

export default async function CompaniesPage() {
  const snapshot = await getLiveJobsSnapshot();

  return (
    <div className="page-grid-wide grid gap-10">
      <SectionHeading
        eyebrow="Companies"
        title="Tracked companies with live AI-related openings"
        description="This directory reflects only companies whose public ATS boards are currently returning live roles in the tracked feed."
      />

      <section className="editorial-card p-6">
        <p className="body-copy max-w-[48rem]">
          The directory no longer uses hand-written company profiles on public pages. Every company below is present because its live board
          returned current roles in the latest crawl window.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {snapshot.hiringCompanies.map((company) => {
          const companyJobs = snapshot.jobs.filter((job) => job.companySlug === company.companySlug);
          const workplaceMix = Array.from(new Set(companyJobs.map((job) => job.workplaceLabel).filter(Boolean))).join(", ");

          return (
            <Link
              key={company.companySlug}
              href={`/companies/${company.companySlug}`}
              className="editorial-card flex flex-col justify-between gap-4 p-5 transition hover:-translate-y-px hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-sm)]"
            >
              <div>
                <p className="eyebrow">Tracked board</p>
                <h2 className="section-title mt-3 text-[1.55rem]">{company.company}</h2>
                <p className="body-copy muted-copy mt-4 text-[0.97rem]">
                  {company.openRoles.toLocaleString("en-US")} live roles currently visible from the company&apos;s public ATS board.
                </p>
              </div>
              <div className="grid gap-2 text-[0.86rem] text-[var(--color-text-muted)]">
                <p>Freshest role <TimeAgo value={company.freshestAt} /></p>
                <p>{workplaceMix || "Workplace mix not specified"}</p>
                <p className="data-copy text-[0.76rem] uppercase text-[var(--color-text-faint)]">{company.openRoles} open roles tracked</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
