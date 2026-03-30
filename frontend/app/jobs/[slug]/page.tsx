import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { SalaryRange } from "@/components/market/salary-range";
import { TimeAgo } from "@/components/market/time-ago";
import { getLiveJobBySlug } from "@/lib/live-homepage";

type JobPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const job = await getLiveJobBySlug(params.slug);

  if (!job) {
    return {
      title: "Job not found"
    };
  }

  return {
    title: `${job.title} at ${job.company}`,
    description: `Live job brief for ${job.title} at ${job.company}. Links go back to the original ${job.sourceLabel} posting.`
  };
}

export default async function JobDetailPage({ params }: JobPageProps) {
  const job = await getLiveJobBySlug(params.slug);

  if (!job) {
    notFound();
  }

  return (
    <article className="page-grid-prose grid gap-8">
      <div>
        <p className="eyebrow">Live role brief</p>
        <h1 className="display-subtitle mt-4">{job.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-[0.9rem] text-[var(--ja-slate)]">
          <Link href={`/companies/${job.companySlug}`} className="inline-link">
            {job.company}
          </Link>
          <span>·</span>
          <span>{job.sourceLabel}</span>
          <span>·</span>
          <TimeAgo value={job.postedAt} />
        </div>
        <p className="body-copy mt-5">
          {job.salaryMin && job.salaryMax ? <SalaryRange min={job.salaryMin} max={job.salaryMax} /> : "Salary not listed"} ·{" "}
          {job.location}
          {job.workplaceLabel ? ` · ${job.workplaceLabel}` : ""} · {job.familyLabel}
        </p>
      </div>

      <section className="rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[var(--ja-cloud)] p-5">
        <p className="eyebrow">Source integrity</p>
        <p className="body-copy mt-3">
          This page is generated from the tracked company board entry itself. The primary action below goes back to the original
          posting or application URL surfaced from that board.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="editorial-card p-5">
          <p className="eyebrow">Posting source</p>
          <p className="body-copy mt-4">{job.sourceLabel}</p>
          <p className="fine-print mt-2">Direct board URL and application URL are both preserved when the source exposes them.</p>
        </div>
        <div className="editorial-card p-5">
          <p className="eyebrow">Tracked family</p>
          <p className="body-copy mt-4">{job.familyLabel}</p>
          <p className="fine-print mt-2">
            Family labels are a lightweight grouping aid for browsing and are not a formal occupational taxonomy.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <a href={job.applyUrl} target="_blank" rel="noreferrer" className="arrow-link">
          <span>Open original posting</span>
          <span>→</span>
        </a>
        {job.sourceUrl !== job.applyUrl ? (
          <a href={job.sourceUrl} target="_blank" rel="noreferrer" className="arrow-link">
            <span>View source board entry</span>
            <span>→</span>
          </a>
        ) : null}
        <Link href={`/companies/${job.companySlug}`} className="arrow-link">
          <span>Company profile</span>
          <span>→</span>
        </Link>
      </div>
    </article>
  );
}
