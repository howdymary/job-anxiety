import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { JobCard } from "@/components/market/job-row";
import { SectionHeading } from "@/components/section-heading";
import { companies, jobs } from "@/lib/market-data";
import { layoffEvents } from "@/lib/platform-data";

type CompanyPageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: CompanyPageProps): Metadata {
  const company = companies.find((item) => item.slug === params.slug);
  if (!company) {
    return {
      title: "Company not found"
    };
  }

  return {
    title: `${company.name}`,
    description: company.description
  };
}

export default function CompanyPage({ params }: CompanyPageProps) {
  const company = companies.find((item) => item.slug === params.slug);
  if (!company) {
    notFound();
  }

  const companyJobs = jobs.filter((job) => job.companySlug === company.slug);
  const companyLayoffs = layoffEvents.filter((event) => event.companySlug === company.slug);

  return (
    <div className="page-grid-wide grid gap-10">
      <SectionHeading eyebrow={company.stageLabel} title={company.name} description={company.description} />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_20rem]">
        <section className="grid gap-4">
          <div className="editorial-card p-5">
            <p className="eyebrow">Why it matters</p>
            <p className="body-copy mt-4">{company.hiringFocus}</p>
          </div>
          <div className="grid gap-4">
            {companyJobs.map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </div>
          <div className="editorial-card p-5">
            <p className="eyebrow">Layoff history</p>
            {companyLayoffs.length ? (
              <div className="mt-4 grid gap-4">
                {companyLayoffs.map((event) => (
                  <div key={event.slug} className="border-b border-[var(--color-border)] pb-4 last:border-b-0 last:pb-0">
                    <p className="section-title text-[1.1rem]">
                      {new Date(event.announcedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                    <p className="body-copy mt-2">{event.affectedCount.toLocaleString()} affected · {event.confidence} · {event.aiSignal}</p>
                    <p className="fine-print mt-2">{event.macroContext}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="body-copy muted-copy mt-4">No layoff events are attached to this company in the current sample set.</p>
            )}
          </div>
        </section>

        <aside className="editorial-card h-fit p-5 lg:sticky lg:top-24">
          <p className="eyebrow">Company profile</p>
          <div className="mt-4 grid gap-4 body-copy text-[0.95rem]">
            <p>
              <strong>Tier:</strong> {company.tier}
            </p>
            <p>
              <strong>HQ:</strong> {company.headquarters}
            </p>
            <p>
              <strong>Site:</strong>{" "}
              <a href={company.website} target="_blank" rel="noreferrer" className="inline-link">
                {company.website.replace(/^https?:\/\//, "")}
              </a>
            </p>
            <Link href={company.careersUrl} className="arrow-link">
              <span>Visit company careers page</span>
              <span>→</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
