"use client";

import { useEffect } from "react";
import Link from "next/link";

import { CompanyBadge } from "@/components/market/company-badge";
import { SalaryRange } from "@/components/market/salary-range";
import { TimeAgo } from "@/components/market/time-ago";
import type { JobRecord } from "@/lib/types";

type SlidePanelProps = {
  job: JobRecord | null;
  similarJobs: JobRecord[];
  onClose: () => void;
};

export function SlidePanel({ job, similarJobs, onClose }: SlidePanelProps) {
  useEffect(() => {
    if (!job) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [job, onClose]);

  if (!job) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] bg-[rgba(26,26,24,0.2)]" role="presentation" onClick={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${job.title} details`}
        onClick={(event) => event.stopPropagation()}
        className="absolute inset-y-0 right-0 w-full max-w-[35rem] overflow-y-auto border-l border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 shadow-[var(--shadow-lg)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Role brief</p>
            <h2 className="display-subtitle mt-3 text-[2rem]">{job.title}</h2>
          </div>
          <button type="button" onClick={onClose} className="text-[1.4rem] text-[var(--color-text-muted)]">
            ×
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-[0.88rem] text-[var(--color-text-muted)]">
          <span>{job.company}</span>
          <span>·</span>
          <CompanyBadge stageLabel={job.companyStageLabel} tier={job.companyTier} />
          <span>·</span>
          <TimeAgo value={job.postedAt} />
        </div>

        <div className="mt-6 body-copy muted-copy grid gap-2 text-[0.98rem]">
          <p>
            <SalaryRange min={job.salaryMin} max={job.salaryMax} /> · {job.location} · {job.experience} · {job.categoryLabel}
          </p>
        </div>

        <div className="prose-block mt-8">
          {job.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <a href={job.applyUrl} target="_blank" rel="noreferrer" className="arrow-link mt-8">
          <span>Visit company careers page</span>
          <span>→</span>
        </a>

        {similarJobs.length > 0 ? (
          <div className="mt-12 border-t border-[var(--color-border)] pt-6">
            <p className="eyebrow">Similar roles at {job.company}</p>
            <div className="mt-4 grid gap-3">
              {similarJobs.map((relatedJob) => (
                <Link key={relatedJob.slug} href={`/jobs/${relatedJob.slug}`} className="editorial-card p-4 hover:border-[var(--color-border-hover)]">
                  <p className="font-[var(--font-ui)] text-[0.96rem] font-semibold">{relatedJob.title}</p>
                  <p className="body-copy muted-copy mt-2 text-[0.9rem]">{relatedJob.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
