import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CompanyBadge } from "@/components/market/company-badge";
import { SalaryRange } from "@/components/market/salary-range";
import { TimeAgo } from "@/components/market/time-ago";
import { jobs } from "@/lib/market-data";

type JobPageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: JobPageProps): Metadata {
  const job = jobs.find((item) => item.slug === params.slug);
  if (!job) {
    return {
      title: "Job not found"
    };
  }

  return {
    title: `${job.title} — ${job.company}`,
    description: job.excerpt
  };
}

export default function JobDetailPage({ params }: JobPageProps) {
  const job = jobs.find((item) => item.slug === params.slug);
  if (!job) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    datePosted: job.postedAt.slice(0, 10),
    hiringOrganization: {
      "@type": "Organization",
      name: job.company
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salaryMin,
        maxValue: job.salaryMax,
        unitText: "YEAR"
      }
    }
  };

  return (
    <article className="page-grid-prose">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <p className="eyebrow">Job detail</p>
      <h1 className="display-subtitle mt-4">{job.title}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-[0.9rem] text-[var(--color-text-muted)]">
        <span>{job.company}</span>
        <span>·</span>
        <CompanyBadge stageLabel={job.companyStageLabel} tier={job.companyTier} />
        <span>·</span>
        <TimeAgo value={job.postedAt} />
      </div>
      <p className="body-copy mt-5">
        <SalaryRange min={job.salaryMin} max={job.salaryMax} /> · {job.location} · {job.experience} · {job.categoryLabel}
      </p>
      <div className="prose-block mt-10">
        {job.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-8">
        <a href={job.applyUrl} target="_blank" rel="noreferrer" className="arrow-link">
          <span>Apply on company site</span>
          <span>→</span>
        </a>
        <Link href={`/career-notes/${job.category}`} className="arrow-link">
          <span>Read the {job.categoryLabel} guide</span>
          <span>→</span>
        </Link>
      </div>
    </article>
  );
}
