import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { SalaryRange } from "@/components/market/salary-range";
import { TimeAgo } from "@/components/market/time-ago";
import { SectionHeading } from "@/components/section-heading";
import { getLiveJobsSnapshot, getLiveJobSlug } from "@/lib/live-homepage";

type CompanyPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: CompanyPageProps): Promise<Metadata> {
  const snapshot = await getLiveJobsSnapshot();
  const company = snapshot.hiringCompanies.find((item) => item.companySlug === params.slug);

  if (!company) {
    return {
      title: "Company not found"
    };
  }

  return {
    title: `${company.company} live roles`,
    description: `Live roles currently visible on ${company.company}'s tracked ATS board.`
  };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const snapshot = await getLiveJobsSnapshot();
  const company = snapshot.hiringCompanies.find((item) => item.companySlug === params.slug);

  if (!company) {
    notFound();
  }

  const companyJobs = snapshot.jobs.filter((job) => job.companySlug === company.companySlug);
  const boards = Array.from(new Set(companyJobs.map((job) => job.sourceLabel))).join(", ");
  const workplaceMix = Array.from(new Set(companyJobs.map((job) => job.workplaceLabel).filter(Boolean))).join(", ");

  return (
    <div className="page-grid-wide grid gap-10">
      <SectionHeading
        eyebrow="Company profile"
        title={company.company}
        description={`Live roles currently visible on ${company.company}'s tracked public board${boards ? ` via ${boards}` : ""}.`}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_20rem]">
        <section className="grid gap-4">
          <div className="editorial-card p-5">
            <p className="eyebrow">Tracking status</p>
            <p className="body-copy mt-4">
              {company.openRoles.toLocaleString("en-US")} live roles are currently visible for this company. The freshest posting landed{" "}
              <TimeAgo value={company.freshestAt} />.
            </p>
            <p className="fine-print mt-3">
              Company pages link out to the public layoff log, but layoff records are not yet merged inline here because that join still needs a fuller provenance pass.
            </p>
          </div>

          <div className="grid gap-4">
            {companyJobs.map((job) => (
              <article key={job.id} className="editorial-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <a href={job.applyUrl} target="_blank" rel="noreferrer" className="section-title text-[1.2rem] inline-link">
                      {job.title}
                    </a>
                    <p className="body-copy muted-copy mt-3">
                      {job.location}
                      {job.workplaceLabel ? ` · ${job.workplaceLabel}` : ""} · {job.familyLabel}
                    </p>
                  </div>
                  <p className="fine-print whitespace-nowrap">
                    <TimeAgo value={job.postedAt} />
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-[0.84rem] text-[var(--ja-slate)]">
                  <span className="rounded-full border border-[var(--ja-fog)] px-3 py-1.5">{job.sourceLabel}</span>
                  <span className="rounded-full border border-[var(--ja-fog)] px-3 py-1.5">
                    {job.salaryMin && job.salaryMax ? <SalaryRange min={job.salaryMin} max={job.salaryMax} /> : "Salary not listed"}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                  <a href={job.applyUrl} target="_blank" rel="noreferrer" className="arrow-link">
                    <span>Open original posting</span>
                    <span>→</span>
                  </a>
                  {job.sourceUrl !== job.applyUrl ? (
                    <a href={job.sourceUrl} target="_blank" rel="noreferrer" className="arrow-link">
                      <span>Source board entry</span>
                      <span>→</span>
                    </a>
                  ) : null}
                  <Link href={`/jobs/${getLiveJobSlug(job)}`} className="arrow-link">
                    <span>Role brief</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="editorial-card h-fit p-5 lg:sticky lg:top-24">
          <p className="eyebrow">Company snapshot</p>
          <div className="mt-4 grid gap-4 body-copy text-[0.95rem]">
            <p>
              <strong>Tracked roles:</strong> {company.openRoles.toLocaleString("en-US")}
            </p>
            <p>
              <strong>Boards:</strong> {boards || "Not specified"}
            </p>
            <p>
              <strong>Workplace mix:</strong> {workplaceMix || "Not specified"}
            </p>
            <a href={company.careersUrl} target="_blank" rel="noreferrer" className="arrow-link">
              <span>Visit company careers page</span>
              <span>→</span>
            </a>
            <Link href="/layoffs" className="arrow-link">
              <span>Open layoff log</span>
              <span>→</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
