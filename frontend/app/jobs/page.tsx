import type { Metadata } from "next";
import Link from "next/link";

import { SalaryRange } from "@/components/market/salary-range";
import { TimeAgo } from "@/components/market/time-ago";
import { SectionHeading } from "@/components/section-heading";
import { getLiveJobsSnapshot, getLiveJobSlug } from "@/lib/live-homepage";

type JobsPageProps = {
  searchParams?: {
    q?: string;
    company?: string;
    workplace?: string;
    posted?: string;
  };
};

export const metadata: Metadata = {
  title: "Tracked AI Jobs",
  description:
    "Browse live AI job postings pulled directly from tracked company ATS boards. Every role card links back to the original source posting."
};

function withinWindow(postedAt: string, posted?: string) {
  if (!posted || posted === "any") {
    return true;
  }

  const ageMs = Date.now() - new Date(postedAt).getTime();
  const windows: Record<string, number> = {
    "24h": 24 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
    "30d": 30 * 24 * 60 * 60 * 1000
  };

  return ageMs <= (windows[posted] ?? Number.POSITIVE_INFINITY);
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const snapshot = await getLiveJobsSnapshot();
  const query = searchParams?.q?.trim().toLowerCase() ?? "";
  const company = searchParams?.company ?? "";
  const workplace = searchParams?.workplace ?? "";
  const posted = searchParams?.posted ?? "any";

  const companies = snapshot.hiringCompanies;
  const filteredJobs = snapshot.jobs.filter((job) => {
    if (query) {
      const haystack = `${job.title} ${job.company} ${job.location} ${job.familyLabel}`.toLowerCase();
      if (!haystack.includes(query)) {
        return false;
      }
    }

    if (company && job.companySlug !== company) {
      return false;
    }

    if (workplace && (job.workplaceLabel ?? "Unspecified") !== workplace) {
      return false;
    }

    return withinWindow(job.postedAt, posted);
  });

  return (
    <div className="page-grid-wide grid gap-10">
      <SectionHeading
        eyebrow="Jobs"
        title="Tracked AI jobs from live company boards"
        description="This board only shows roles pulled from tracked ATS sources. Every listing below links to the original posting or application page."
      />

      <section className="editorial-card p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <p className="eyebrow">Current feed status</p>
            <p className="body-copy mt-4 max-w-[44rem]">
              Updated <TimeAgo value={snapshot.generatedAt} />. Tracking {snapshot.sourceHealth.filter((item) => item.status === "live").length}{" "}
              live job boards across {companies.length} hiring companies. When a source board goes quiet, the page gets thinner rather
              than falling back to fabricated inventory.
            </p>
            {snapshot.errors.length ? (
              <p className="fine-print mt-3">
                Some tracked boards did not respond in the latest cycle, so counts may understate the full live inventory.
              </p>
            ) : null}
          </div>

          <div className="rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[var(--ja-cloud)] p-5">
            <p className="eyebrow">Live board rules</p>
            <div className="mt-4 grid gap-2">
              <p className="fine-print">No hand-entered jobs.</p>
              <p className="fine-print">No generic careers-hub links as the primary CTA.</p>
              <p className="fine-print">No topline counts presented as audited market totals.</p>
            </div>
          </div>
        </div>
      </section>

      <form className="editorial-card grid gap-4 p-5 md:grid-cols-[minmax(0,1.4fr)_minmax(12rem,0.9fr)_minmax(12rem,0.9fr)_minmax(10rem,0.8fr)_auto]">
        <label className="grid gap-2">
          <span className="eyebrow">Search</span>
          <input
            type="search"
            name="q"
            defaultValue={searchParams?.q ?? ""}
            placeholder="Software engineer, research, remote"
            className="text-input"
          />
        </label>

        <label className="grid gap-2">
          <span className="eyebrow">Company</span>
          <select name="company" defaultValue={company} className="text-input">
            <option value="">All tracked companies</option>
            {companies.map((item) => (
              <option key={item.companySlug} value={item.companySlug}>
                {item.company}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="eyebrow">Workplace</span>
          <select name="workplace" defaultValue={workplace} className="text-input">
            <option value="">Any</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
            <option value="Unspecified">Unspecified</option>
          </select>
        </label>

        <label className="grid gap-2">
          <span className="eyebrow">Posted</span>
          <select name="posted" defaultValue={posted} className="text-input">
            <option value="any">Any time</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </label>

        <div className="flex items-end gap-3">
          <button
            type="submit"
            className="inline-flex min-h-[2.75rem] items-center rounded-[var(--ja-radius-md)] bg-[var(--ja-teal)] px-4 text-[0.9rem] font-semibold text-white transition hover:bg-[var(--ja-teal-dark)]"
          >
            Apply
          </button>
          <Link href="/jobs" className="arrow-link">
            <span>Reset</span>
            <span>→</span>
          </Link>
        </div>
      </form>

      <section className="grid gap-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Live postings</p>
            <h2 className="section-title mt-3 text-[1.5rem]">{filteredJobs.length.toLocaleString("en-US")} roles in the current view</h2>
          </div>
          <p className="fine-print max-w-[24rem] text-left md:text-right">
            Cards link out to the original posting. Company pages summarize only the roles still visible on each source board.
          </p>
        </div>

        {filteredJobs.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {filteredJobs.map((job) => (
              <article key={job.id} className="editorial-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <a href={job.applyUrl} target="_blank" rel="noreferrer" className="section-title text-[1.25rem] inline-link">
                      {job.title}
                    </a>
                    <p className="body-copy muted-copy mt-3">
                      <Link href={`/companies/${job.companySlug}`} className="inline-link">
                        {job.company}
                      </Link>{" "}
                      · {job.location}
                      {job.workplaceLabel ? ` · ${job.workplaceLabel}` : ""}
                    </p>
                  </div>
                  <p className="fine-print whitespace-nowrap">
                    <TimeAgo value={job.postedAt} />
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-[0.84rem] text-[var(--ja-slate)]">
                  <span className="rounded-full border border-[var(--ja-fog)] px-3 py-1.5">{job.familyLabel}</span>
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
        ) : (
          <section className="editorial-card p-6">
            <p className="section-title text-[1.2rem]">No live roles match these filters right now.</p>
            <p className="body-copy muted-copy mt-3">
              Broaden the search, clear the company filter, or widen the posting window. The board shows less rather than padding the results.
            </p>
          </section>
        )}
      </section>
    </div>
  );
}
