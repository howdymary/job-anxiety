import Link from "next/link";

import { CompanyBadge } from "@/components/market/company-badge";
import { SalaryRange } from "@/components/market/salary-range";
import { TimeAgo } from "@/components/market/time-ago";
import type { JobRecord } from "@/lib/types";

type JobRowProps = {
  job: JobRecord;
  onSelect?: (job: JobRecord) => void;
};

export function JobRow({ job, onSelect }: JobRowProps) {
  const content = (
    <>
      <div>
        <p className="font-[var(--font-ui)] text-[1rem] font-semibold text-[var(--color-text)]">{job.title}</p>
        <p className="mt-1 body-copy muted-copy text-[0.98rem]">
          {job.company} · {job.location}
        </p>
      </div>
      <div className="body-copy muted-copy text-[0.95rem]">{job.company}</div>
      <div className="data-copy text-[0.82rem] text-[var(--color-text)]">
        <SalaryRange min={job.salaryMin} max={job.salaryMax} />
      </div>
      <div className="body-copy muted-copy text-[0.95rem]">{job.locationType}</div>
      <div className="data-copy text-[0.78rem] text-[var(--color-text-faint)]">
        <TimeAgo value={job.postedAt} />
      </div>
    </>
  );

  if (onSelect) {
    return (
      <button type="button" onClick={() => onSelect(job)} className="row-link w-full text-left">
        {content}
      </button>
    );
  }

  return (
    <Link href={`/jobs/${job.slug}`} className="row-link">
      {content}
    </Link>
  );
}

export function JobCard({ job, onSelect }: JobRowProps) {
  return (
    <article className="editorial-card p-5 transition hover:-translate-y-px hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-sm)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-[var(--font-ui)] text-[1rem] font-semibold">{job.title}</p>
          <p className="mt-1 body-copy muted-copy text-[0.95rem]">
            {job.company} · {job.location}
          </p>
        </div>
        <div className="data-copy text-[0.76rem] text-[var(--color-text-faint)]">
          <TimeAgo value={job.postedAt} />
        </div>
      </div>
      <div className="mt-3">
        <CompanyBadge stageLabel={job.companyStageLabel} tier={job.companyTier} />
      </div>
      <p className="body-copy muted-copy mt-4 line-clamp-2 text-[0.96rem]">{job.excerpt}</p>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-[0.82rem] text-[var(--color-text-muted)]">
        <span className="data-copy">
          <SalaryRange min={job.salaryMin} max={job.salaryMax} />
        </span>
        <span>{job.experience}</span>
        <span>{job.categoryLabel}</span>
      </div>
      {onSelect ? (
        <button type="button" onClick={() => onSelect(job)} className="arrow-link mt-5">
          <span>Read the brief</span>
          <span>→</span>
        </button>
      ) : (
        <Link href={`/jobs/${job.slug}`} className="arrow-link mt-5">
          <span>Read the brief</span>
          <span>→</span>
        </Link>
      )}
    </article>
  );
}
