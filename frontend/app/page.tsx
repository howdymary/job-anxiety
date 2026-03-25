import Link from "next/link";

import { MarqueeStrip } from "@/components/marquee-strip";
import { JobRow } from "@/components/market/job-row";
import { SectionHeading } from "@/components/section-heading";
import { homepageNumbers, jobCategories, jobs, landingStats, landingTicker } from "@/lib/market-data";

const previewNotes = [
  {
    number: "01",
    slug: "gtm-engineer",
    title: "What is a GTM Engineer?",
    dek: "The hybrid role replacing five SDRs at SaaS companies."
  },
  {
    number: "02",
    slug: "vibe-coder",
    title: "The Vibe Coder's Toolkit",
    dek: "How AI-native developers ship faster without outsourcing judgment."
  }
];

export default function HomePage() {
  return (
    <div className="grid gap-20">
      <section className="page-grid border-b border-[var(--color-border)] py-14 lg:py-20">
        <div className="max-w-[42rem]">
          <p className="eyebrow">AI career discovery</p>
          <h1 className="display-title mt-6">
            AI didn&apos;t take your job.
            <br />
            It made a better one.
          </h1>
          <p className="body-copy muted-copy mt-6 max-w-[34rem] text-[1.125rem]">
            <span className="data-copy">{homepageNumbers.weeklyRoles.toLocaleString()}</span> new roles posted this week across{" "}
            <span className="data-copy">{homepageNumbers.trackedCompanies}</span> companies. The market is building. See what&apos;s hiring.
          </p>
          <div className="mt-10 flex flex-wrap gap-8">
            <Link href="/jobs" className="arrow-link">
              <span>Explore jobs</span>
              <span>→</span>
            </Link>
            <Link href="/career-notes" className="arrow-link">
              <span>Read the field notes</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-[var(--color-border)] pt-8 md:grid-cols-3">
          <div className="editorial-card p-4">
            <p className="eyebrow">This week</p>
            <p className="data-copy mt-3 text-[1.5rem]">{homepageNumbers.weeklyRoles.toLocaleString()}</p>
            <p className="body-copy muted-copy mt-2 text-[0.92rem]">new roles surfaced in the current market sweep.</p>
          </div>
          <div className="editorial-card p-4">
            <p className="eyebrow">Tracked companies</p>
            <p className="data-copy mt-3 text-[1.5rem]">{homepageNumbers.trackedCompanies}</p>
            <p className="body-copy muted-copy mt-2 text-[0.92rem]">Fortune 500, high-revenue software, and VC-backed builders.</p>
          </div>
          <div className="editorial-card p-4">
            <p className="eyebrow">Median comp</p>
            <p className="data-copy mt-3 text-[1.5rem]">{landingStats[2]?.value}</p>
            <p className="body-copy muted-copy mt-2 text-[0.92rem]">{landingStats[2]?.label}.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {jobCategories.slice(0, 3).map((category) => (
            <Link key={category.slug} href={`/career-notes/${category.slug}`} className="editorial-card grid gap-2 p-4">
              <p className="eyebrow">Moving fastest</p>
              <p className="font-[var(--font-ui)] text-[1rem] font-semibold text-[var(--color-text)]">{category.title}</p>
              <p className="data-copy text-[0.8rem] text-[var(--color-text-muted)]">
                {category.salaryRange} · {category.growth}
              </p>
              <p className="body-copy muted-copy text-[0.92rem]">{category.oneLiner}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-grid-wide">
        <MarqueeStrip items={landingTicker} />
      </section>

      <section className="page-grid-wide">
        <div className="flex items-end justify-between gap-6 border-b border-[var(--color-border)] pb-4">
          <SectionHeading eyebrow="Hiring now" title="Hiring now" description="A quick read on the live market, without cards pretending to be a dashboard." />
          <Link href="/jobs" className="arrow-link hidden md:inline-flex">
            <span>View all jobs</span>
            <span>→</span>
          </Link>
        </div>
        <div className="mt-4">
          {jobs.slice(0, 4).map((job) => (
            <JobRow key={job.slug} job={job} />
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-bg-inverse)] py-16 text-[var(--color-text-inverse)]">
        <div className="page-grid-wide">
          <p className="eyebrow !text-[var(--color-text-faint)]">The shift</p>
          <blockquote className="display-subtitle mt-4 max-w-[58rem] text-[var(--color-text-inverse)]">
            “In 2023, there were no vibe coders. In 2026, they earn $150K and get hired faster than many traditional developers.”
          </blockquote>
          <p className="body-copy mt-4 max-w-[34rem] text-[var(--color-text-faint)]">
            Based on market data from 12,000+ job postings and the category changes showing up across frontier labs, software companies, and the enterprise.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {landingStats.map((stat) => (
              <div key={stat.label}>
                <p className="data-copy text-[2.8rem] text-[var(--color-text-inverse)]">{stat.value}</p>
                <p className="body-copy mt-3 text-[var(--color-text-inverse)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-grid">
        <div className="border-b border-[var(--color-border)] pb-4">
          <SectionHeading eyebrow="Field notes" title="Field notes" description="Guides written like career reporting rather than course marketing." />
        </div>
        <div className="mt-4 grid gap-0">
          {previewNotes.map((note) => (
            <article key={note.number} className="grid gap-4 border-b border-[var(--color-border)] py-6 md:grid-cols-[4rem_minmax(0,1fr)]">
              <p className="data-copy text-[0.92rem] text-[var(--color-text-faint)]">{note.number}</p>
              <div>
                <h2 className="section-title text-[1.55rem]">{note.title}</h2>
                <p className="body-copy muted-copy mt-3">{note.dek}</p>
                <Link href={`/career-notes/${note.slug}`} className="arrow-link mt-4">
                  <span>Read the field note</span>
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-grid border-t border-[var(--color-border)] pt-10">
        <div className="max-w-[42rem]">
          <h2 className="display-subtitle text-[2rem]">Get the weekly brief. What&apos;s hiring, what&apos;s paying, what&apos;s new.</h2>
          <form className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end">
            <label className="flex-1">
              <span className="sr-only">Email address</span>
              <input type="email" className="text-input border-x-0 border-t-0 rounded-none bg-transparent px-0" placeholder="email@example.com" />
            </label>
            <button type="submit" className="news-button text-[1rem]">
              Subscribe
            </button>
          </form>
          <p className="fine-print mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <section className="page-grid-wide">
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
          {jobCategories.slice(0, 4).map((category) => (
            <Link key={category.slug} href={`/career-notes/${category.slug}`} className="editorial-card p-5 hover:border-[var(--color-border-hover)]">
              <p className="section-title text-[1.35rem]">{category.title}</p>
              <p className="data-copy mt-4 text-[0.84rem] text-[var(--color-text-muted)]">
                {category.salaryRange} · {category.growth}
              </p>
              <p className="body-copy muted-copy mt-4 text-[0.96rem]">{category.oneLiner}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
