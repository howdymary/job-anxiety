import Link from "next/link";
import type { ReactNode } from "react";

import { NewsletterForm } from "@/components/newsletter-form";
import { SalaryRange } from "@/components/market/salary-range";
import { TimeAgo } from "@/components/market/time-ago";
import type {
  HomepageFeed,
  LiveHiringCompany,
  LiveHomepageJob,
  LiveNewsItem,
  LiveRoleMomentum,
  LiveTrendingJob
} from "@/lib/live-homepage";

type HomepageStreamProps = {
  feed: HomepageFeed;
};

const HOURS_48 = 48 * 60 * 60 * 1000;

export function HomepageStream({ feed }: HomepageStreamProps) {
  const totalOpenRoles = feed.stats.totalOpenRoles;
  const newestTopRail = feed.newestJobs.slice(0, 4);

  const intentCards = [
    {
      title: "I got laid off",
      description: "Current hiring signals, official-source layoff disclosures, and a next step that does not waste your time.",
      accent: "var(--ja-coral)",
      links: [
        { href: "/layoffs", label: "Official-source layoff log" },
        { href: "/jobs", label: `Browse ${formatWholeNumber(totalOpenRoles)} live AI roles` },
        { href: "/check-your-occupation", label: "Check your occupation" }
      ]
    },
    {
      title: "I want to pivot into AI",
      description: "Skills that transfer, roles that are active, and field guides for making a practical transition.",
      accent: "var(--ja-teal)",
      links: [
        { href: "/career-notes/ai-career-paths", label: "Career transition roadmap" },
        { href: "/trends", label: "Most-demanded AI role families" },
        { href: "/career-notes", label: "Field guides by role" }
      ]
    },
    {
      title: "I'm tracking the market",
      description: "Tracked live signals, a weekly market brief, and clear paths into methodology and source notes.",
      accent: "var(--ja-chart-2)",
      links: [
        { href: "/trends", label: "Trends dashboard" },
        { href: "/newsletter", label: "Weekly market brief" },
        { href: "/press", label: "Press and API status" }
      ]
    }
  ];

  return (
    <div className="grid gap-[var(--ja-space-16)]">
      <section className="page-grid-wide grid gap-[var(--ja-space-6)] xl:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)]">
        <div className="grid gap-[var(--ja-space-6)]">
          <section className="editorial-card p-[var(--ja-space-6)] md:p-[var(--ja-space-8)]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--ja-teal)] animate-pulse" aria-hidden="true" />
              <p className="eyebrow">Live job market desk</p>
              <p className="fine-print">Updated <TimeAgo value={feed.generatedAt} /></p>
            </div>

            <div className="mt-[var(--ja-space-5)] grid gap-[var(--ja-space-5)] lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.78fr)]">
              <div className="max-w-[40rem]">
                <h1 className="display-title">AI is changing work. Know where you stand.</h1>
                <p className="body-copy muted-copy mt-[var(--ja-space-4)] max-w-[34rem] text-[var(--ja-text-lg)] leading-[var(--ja-leading-relaxed)]">
                  Track AI job openings, monitor official-source layoff disclosures, and find your next move with live
                  hiring signals, clear sourcing, and honest guidance.
                </p>

                <div className="mt-[var(--ja-space-6)] flex flex-wrap gap-x-[var(--ja-space-5)] gap-y-[var(--ja-space-3)]">
                  <Link href="/jobs" className="arrow-link">
                    <span>Browse live jobs</span>
                    <span>→</span>
                  </Link>
                  <Link href="/check-your-occupation" className="arrow-link">
                    <span>Check your occupation</span>
                    <span>→</span>
                  </Link>
                  <Link href="/layoffs" className="arrow-link">
                    <span>Open layoff log</span>
                    <span>→</span>
                  </Link>
                  <Link href="/methodology" className="arrow-link">
                    <span>Read the methodology</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              <article className="rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[var(--ja-cloud)] p-[var(--ja-space-5)]">
                <p className="eyebrow">Latest market-moving headline</p>
                {feed.leadStory ? (
                  <>
                    <a href={feed.leadStory.url} target="_blank" rel="noreferrer" className="mt-[var(--ja-space-4)] block">
                      <h2 className="font-[var(--ja-font-editorial)] text-[clamp(1.3rem,3vw,1.85rem)] leading-[1.15] tracking-[-0.01em] text-[var(--ja-ink)]">
                        {feed.leadStory.title}
                      </h2>
                    </a>
                    <div className="mt-[var(--ja-space-4)] flex flex-wrap items-center gap-3 text-[var(--ja-text-xs)] uppercase tracking-[0.06em] text-[var(--ja-slate)]">
                      <span>{feed.leadStory.category}</span>
                      <span className="normal-case tracking-normal text-[var(--ja-steel)]">{feed.leadStory.source}</span>
                      <span className="normal-case tracking-normal text-[var(--ja-steel)]">
                        <TimeAgo value={feed.leadStory.publishedAt} />
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="body-copy muted-copy mt-[var(--ja-space-4)]">The headline rail fills from the live jobs and labor-market news feeds when fresh coverage is available.</p>
                )}
              </article>
            </div>
          </section>

          <MarketPulseBar feed={feed} />
        </div>

        <aside className="grid gap-[var(--ja-space-4)] self-start xl:sticky xl:top-[5.5rem]">
          <NewestRail jobs={newestTopRail} totalOpenRoles={totalOpenRoles} />
          <SupportPanel title="Tracking now">
            <div className="grid gap-[var(--ja-space-3)]">
              <div className="flex items-start justify-between gap-3 border-b border-[var(--ja-fog)] pb-[var(--ja-space-3)]">
                <div>
                  <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">
                    {formatWholeNumber(feed.stats.companiesHiring)} companies hiring
                  </p>
                  <p className="fine-print mt-1">
                    Tracking {feed.stats.liveJobSources} live job boards and {feed.stats.liveNewsSources} current news feeds this cycle.
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{feed.stats.trendingRole}</p>
                <p className="fine-print mt-1">Current role family with the strongest posting velocity across the live feed.</p>
              </div>
            </div>
          </SupportPanel>
        </aside>
      </section>

      <section className="page-grid-wide grid gap-[var(--ja-space-4)] md:grid-cols-3">
        {intentCards.map((card) => (
          <IntentCard key={card.title} title={card.title} description={card.description} accent={card.accent}>
            {card.links.map((link) => (
              <Link key={`${card.title}-${link.href}`} href={link.href} className="arrow-link">
                <span>{link.label}</span>
                <span>→</span>
              </Link>
            ))}
          </IntentCard>
        ))}
      </section>

      <section id="newest-jobs" className="page-grid-wide grid gap-[var(--ja-space-6)] xl:grid-cols-[minmax(0,1.2fr)_minmax(21rem,0.8fr)]">
        <div className="editorial-card p-[var(--ja-space-6)]">
          <div className="flex flex-wrap items-end justify-between gap-[var(--ja-space-4)] border-b border-[var(--ja-fog)] pb-[var(--ja-space-4)]">
            <div>
              <p className="eyebrow">Newest jobs first</p>
              <h2 className="section-title mt-[var(--ja-space-3)]">Fresh openings from tracked company boards</h2>
            </div>
            <p className="fine-print max-w-[18rem] text-left md:text-right">
              {formatWholeNumber(totalOpenRoles)} live openings are currently in the feed. Listings stay visible when the
              source board is still publishing them.
            </p>
          </div>

          <div className="mt-[var(--ja-space-5)] grid gap-[var(--ja-space-4)] lg:grid-cols-2">
            {feed.newestJobs.length > 0 ? (
              feed.newestJobs.map((job) => <NewestJobCard key={job.id} job={job} />)
            ) : (
              <EmptyState message="The live boards did not return recent openings this cycle. When the feed is thin, we show less rather than inventing momentum." />
            )}
          </div>
        </div>

        <aside className="grid gap-[var(--ja-space-4)] self-start xl:sticky xl:top-[5.5rem]">
          <HiringCompaniesCard companies={feed.hiringCompanies} />
          <RoleMomentumCard roles={feed.roleMomentum} />
        </aside>
      </section>

      <section className="page-grid-wide">
        <div className="rounded-[var(--ja-radius-xl)] border border-[var(--ja-fog)] bg-[linear-gradient(180deg,rgba(243,244,246,0.96),rgba(250,250,249,0.96))] p-[var(--ja-space-6)] md:p-[var(--ja-space-8)]">
          <div className="flex flex-wrap items-end justify-between gap-[var(--ja-space-4)] border-b border-[var(--ja-fog)] pb-[var(--ja-space-4)]">
            <div>
              <p className="eyebrow">Trending jobs</p>
              <h2 className="section-title mt-[var(--ja-space-3)]">Roles with fresh posting velocity</h2>
            </div>
            <p className="fine-print max-w-[19rem] text-left md:text-right">
              Trending is based on repeated recent postings across tracked live company boards. We do not fabricate saves,
              applies, or clicks.
            </p>
          </div>

          <div className="mt-[var(--ja-space-5)] grid gap-[var(--ja-space-4)] md:grid-cols-2 xl:grid-cols-3">
            {feed.trendingJobs.length > 0 ? (
              feed.trendingJobs.map((job) => <TrendingJobCard key={job.id} job={job} />)
            ) : (
              <EmptyState message="Not enough recent live activity is available yet to compute a clean trend list." />
            )}
          </div>
        </div>
      </section>

      <section id="latest-jobs-news" className="page-grid-wide grid gap-[var(--ja-space-6)] xl:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)]">
        <div className="editorial-card p-[var(--ja-space-6)]">
          <div className="flex flex-wrap items-end justify-between gap-[var(--ja-space-4)] border-b border-[var(--ja-fog)] pb-[var(--ja-space-4)]">
            <div>
              <p className="eyebrow">Latest jobs news</p>
              <h2 className="section-title mt-[var(--ja-space-3)]">What is moving hiring, layoffs, wages, and workplace policy</h2>
            </div>
            <p className="fine-print max-w-[18rem] text-left md:text-right">
              News links open the reporting item returned by the live Google News feed. If the feeds go quiet, this desk simply thins out.
            </p>
          </div>

          <div className="mt-[var(--ja-space-3)] grid gap-0">
            {feed.news.length > 0 ? (
              feed.news.map((item) => <NewsRow key={item.id} item={item} />)
            ) : (
              <EmptyState message="The news feeds did not return fresh jobs-market coverage this cycle." />
            )}
          </div>
        </div>

        <aside className="grid gap-[var(--ja-space-4)] self-start xl:sticky xl:top-[5.5rem]">
          <NewsletterPanel />
          <SourceHealthCard feed={feed} />
        </aside>
      </section>
    </div>
  );
}

function MarketPulseBar({ feed }: { feed: HomepageFeed }) {
  const items = [
    {
      label: "Live openings",
      value: formatWholeNumber(feed.stats.totalOpenRoles),
      note: "Current roles across tracked boards"
    },
    {
      label: "Posted in 24h",
      value: formatWholeNumber(feed.stats.jobsPostedToday),
      note: "Fresh jobs added during the last day"
    },
    {
      label: "Companies hiring",
      value: formatWholeNumber(feed.stats.companiesHiring),
      note: "Distinct companies with active live roles"
    },
    {
      label: "Trending role family",
      value: feed.stats.trendingRole,
      note: "Strongest current posting velocity"
    }
  ];

  return (
    <section className="overflow-hidden rounded-[var(--ja-radius-xl)] bg-[var(--ja-charcoal)] text-white shadow-[var(--ja-shadow-lg)]">
      <div className="grid gap-[var(--ja-space-4)] p-[var(--ja-space-6)] md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="border-b border-white/10 pb-[var(--ja-space-4)] last:border-b-0 md:border-b-0 md:border-r md:pr-[var(--ja-space-4)] xl:last:border-r-0">
            <p className="text-[var(--ja-text-xs)] font-medium uppercase tracking-[0.08em] text-white/62">{item.label}</p>
            <p className="mt-[var(--ja-space-3)] font-[var(--ja-font-data)] text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-white">
              {item.value}
            </p>
            <p className="mt-[var(--ja-space-2)] text-[var(--ja-text-sm)] leading-[1.55] text-white/70">{item.note}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-[var(--ja-space-4)] gap-y-[var(--ja-space-2)] border-t border-white/10 px-[var(--ja-space-6)] py-[var(--ja-space-4)] text-[var(--ja-text-xs)] text-white/62">
        <span>Updated <TimeAgo value={feed.generatedAt} /></span>
        <span>
          Tracking {feed.stats.companiesHiring} companies across {feed.stats.liveJobSources} live job boards
        </span>
        <Link href="/methodology" className="text-[var(--ja-teal-light)] underline underline-offset-[0.2em]">
          How we calculate this
        </Link>
      </div>
    </section>
  );
}

function NewestRail({
  jobs,
  totalOpenRoles
}: {
  jobs: LiveHomepageJob[];
  totalOpenRoles: number;
}) {
  return (
    <section className="editorial-card p-[var(--ja-space-5)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Newest right now</p>
          <p className="fine-print mt-1">{formatWholeNumber(totalOpenRoles)} live roles in the current feed</p>
        </div>
        <Link href="/jobs" className="arrow-link">
          <span>All jobs</span>
          <span>→</span>
        </Link>
      </div>

      <div className="mt-[var(--ja-space-4)] grid gap-[var(--ja-space-3)]">
        {jobs.length > 0 ? jobs.map((job) => <CompactJobRow key={job.id} job={job} />) : <EmptyState message="Fresh openings will appear here as tracked boards update." compact />}
      </div>
    </section>
  );
}

function CompactJobRow({ job }: { job: LiveHomepageJob }) {
  return (
    <a
      href={job.applyUrl}
      target="_blank"
      rel="noreferrer"
      className="rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-[var(--ja-space-4)] transition hover:border-[var(--ja-teal)] hover:shadow-[var(--ja-shadow-md)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[var(--ja-text-sm)] font-semibold leading-[1.35] text-[var(--ja-ink)]">{job.title}</p>
          <p className="mt-1 text-[var(--ja-text-sm)] text-[var(--ja-slate)]">
            {job.company} · {job.location}
          </p>
        </div>
        {isNewJob(job.postedAt) ? <Chip tone="teal">New</Chip> : null}
      </div>
      <div className="mt-[var(--ja-space-3)] flex flex-wrap items-center gap-[var(--ja-space-2)] text-[var(--ja-text-xs)] text-[var(--ja-steel)]">
        <span>
          <TimeAgo value={job.postedAt} />
        </span>
        {typeof job.salaryMin === "number" && typeof job.salaryMax === "number" ? (
          <span className="font-[var(--ja-font-data)] text-[var(--ja-ink)]">
            <SalaryRange min={job.salaryMin} max={job.salaryMax} />
          </span>
        ) : null}
      </div>
    </a>
  );
}

function IntentCard({
  title,
  description,
  accent,
  children
}: {
  title: string;
  description: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <article className="editorial-card border-l-[3px] p-[var(--ja-space-5)]" style={{ borderLeftColor: accent }}>
      <h2 className="font-[var(--ja-font-body)] text-[var(--ja-text-xl)] font-semibold leading-[1.3] text-[var(--ja-ink)]">{title}</h2>
      <p className="body-copy muted-copy mt-[var(--ja-space-3)] text-[var(--ja-text-sm)]">{description}</p>
      <div className="mt-[var(--ja-space-5)] grid gap-[var(--ja-space-3)]">{children}</div>
    </article>
  );
}

function NewestJobCard({ job }: { job: LiveHomepageJob }) {
  return (
    <a
      href={job.applyUrl}
      target="_blank"
      rel="noreferrer"
      className="rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-[var(--ja-space-5)] transition hover:border-[var(--ja-teal)] hover:shadow-[var(--ja-shadow-md)]"
    >
      <div className="flex items-start justify-between gap-[var(--ja-space-4)]">
        <div className="grid gap-[var(--ja-space-2)]">
          <div className="flex flex-wrap items-center gap-[var(--ja-space-2)]">
            <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{job.company}</p>
            {job.workplaceLabel ? <Chip tone="neutral">{job.workplaceLabel}</Chip> : null}
            {isNewJob(job.postedAt) ? <Chip tone="teal">New</Chip> : null}
          </div>
          <h3 className="text-[var(--ja-text-lg)] font-semibold leading-[1.3] text-[var(--ja-ink)]">{job.title}</h3>
          <p className="text-[var(--ja-text-sm)] text-[var(--ja-slate)]">{job.location}</p>
        </div>
        <div className="text-right">
          <p className="font-[var(--ja-font-data)] text-[var(--ja-text-xs)] text-[var(--ja-steel)]">
            <TimeAgo value={job.postedAt} />
          </p>
        </div>
      </div>

      <div className="mt-[var(--ja-space-4)] flex flex-wrap items-center gap-x-[var(--ja-space-3)] gap-y-[var(--ja-space-2)] border-t border-[var(--ja-fog)] pt-[var(--ja-space-4)]">
        <span className="text-[var(--ja-text-xs)] uppercase tracking-[0.08em] text-[var(--ja-slate)]">{job.sourceLabel}</span>
        <span className="text-[var(--ja-text-xs)] text-[var(--ja-steel)]">{job.familyLabel}</span>
        {typeof job.salaryMin === "number" && typeof job.salaryMax === "number" ? (
          <span className="font-[var(--ja-font-data)] text-[var(--ja-text-sm)] text-[var(--ja-ink)]">
            <SalaryRange min={job.salaryMin} max={job.salaryMax} />
          </span>
        ) : (
          <span className="text-[var(--ja-text-xs)] text-[var(--ja-steel)]">Compensation not listed</span>
        )}
      </div>
    </a>
  );
}

function TrendingJobCard({ job }: { job: LiveTrendingJob }) {
  return (
    <a
      href={job.applyUrl}
      target="_blank"
      rel="noreferrer"
      className="rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-[var(--ja-space-5)] transition hover:border-[var(--ja-teal)] hover:shadow-[var(--ja-shadow-md)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-[var(--ja-space-3)]">
        <div>
          <div className="flex flex-wrap items-center gap-[var(--ja-space-2)]">
            <Chip tone="coral">Trending</Chip>
            <span className="text-[var(--ja-text-xs)] uppercase tracking-[0.08em] text-[var(--ja-slate)]">{job.familyLabel}</span>
          </div>
          <h3 className="mt-[var(--ja-space-3)] text-[var(--ja-text-lg)] font-semibold leading-[1.3] text-[var(--ja-ink)]">{job.title}</h3>
        </div>
        <p className="font-[var(--ja-font-data)] text-[var(--ja-text-xs)] text-[var(--ja-steel)]">
          <TimeAgo value={job.postedAt} />
        </p>
      </div>

      <p className="mt-[var(--ja-space-3)] text-[var(--ja-text-sm)] text-[var(--ja-slate)]">
        {job.company} · {job.location}
      </p>
      <p className="mt-[var(--ja-space-4)] text-[var(--ja-text-sm)] leading-[1.55] text-[var(--ja-ink)]">{job.velocityLabel}</p>

      <div className="mt-[var(--ja-space-4)] flex flex-wrap items-center gap-[var(--ja-space-3)] border-t border-[var(--ja-fog)] pt-[var(--ja-space-4)] text-[var(--ja-text-xs)] text-[var(--ja-steel)]">
        {typeof job.salaryMin === "number" && typeof job.salaryMax === "number" ? (
          <span className="font-[var(--ja-font-data)] text-[var(--ja-text-sm)] text-[var(--ja-ink)]">
            <SalaryRange min={job.salaryMin} max={job.salaryMax} />
          </span>
        ) : (
          <span>Compensation not listed</span>
        )}
        {job.workplaceLabel ? <span>{job.workplaceLabel}</span> : null}
      </div>
    </a>
  );
}

function HiringCompaniesCard({ companies }: { companies: LiveHiringCompany[] }) {
  return (
    <SupportPanel title="Hiring now">
      {companies.length > 0 ? (
        <div className="grid gap-[var(--ja-space-3)]">
          {companies.map((company) => (
            <a
              key={company.company}
              href={company.careersUrl}
              target="_blank"
              rel="noreferrer"
              className="grid gap-1 rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] px-[var(--ja-space-4)] py-[var(--ja-space-3)] transition hover:border-[var(--ja-teal)]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{company.company}</p>
                <p className="font-[var(--ja-font-data)] text-[var(--ja-text-sm)] text-[var(--ja-ink)]">{company.openRoles}</p>
              </div>
              <p className="fine-print">
                {company.openRoles === 1 ? "1 live role" : `${company.openRoles} live roles`} · <TimeAgo value={company.freshestAt} />
              </p>
            </a>
          ))}
        </div>
      ) : (
        <EmptyState message="Company hiring concentration will show up here once the feed has enough fresh inventory." compact />
      )}
    </SupportPanel>
  );
}

function RoleMomentumCard({ roles }: { roles: LiveRoleMomentum[] }) {
  return (
    <SupportPanel title="Fastest-growing roles">
      {roles.length > 0 ? (
        <div className="grid gap-[var(--ja-space-3)]">
          {roles.map((role) => (
            <div
              key={role.familyLabel}
              className="grid gap-1 rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] px-[var(--ja-space-4)] py-[var(--ja-space-3)]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{role.familyLabel}</p>
                <p className="font-[var(--ja-font-data)] text-[var(--ja-text-sm)] text-[var(--ja-ink)]">{role.totalOpenings}</p>
              </div>
              <p className="fine-print">
                {role.companyCount} companies · <TimeAgo value={role.freshestAt} />
              </p>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="Role momentum appears when several companies start posting the same family of jobs at once." compact />
      )}
    </SupportPanel>
  );
}

function NewsRow({ item }: { item: LiveNewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="grid gap-[var(--ja-space-2)] border-b border-[var(--ja-fog)] py-[var(--ja-space-4)] transition-colors hover:bg-[rgba(204,251,241,0.12)]"
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="eyebrow">{item.category}</span>
        <span className="fine-print">{item.source}</span>
        <span className="fine-print">
          <TimeAgo value={item.publishedAt} />
        </span>
      </div>
      <h3 className="text-[var(--ja-text-lg)] font-semibold leading-[1.35] text-[var(--ja-ink)]">{item.title}</h3>
    </a>
  );
}

function NewsletterPanel() {
  return (
    <SupportPanel title="The Monday Market Brief">
      <p className="body-copy muted-copy text-[var(--ja-text-sm)]">
        Weekly: the numbers, the context, and what they mean for your career. No hype. No doom. Just the data.
      </p>
      <div className="mt-[var(--ja-space-4)]">
        <NewsletterForm />
      </div>
    </SupportPanel>
  );
}

function SourceHealthCard({ feed }: { feed: HomepageFeed }) {
  const strongestSources = [...feed.sourceHealth]
    .filter((source) => source.status === "live")
    .sort((left, right) => right.jobCount - left.jobCount)
    .slice(0, 5);

  return (
    <SupportPanel title="Feed health">
      {strongestSources.length > 0 ? (
        <div className="grid gap-[var(--ja-space-3)]">
          {strongestSources.map((source) => (
            <div
              key={source.key}
              className="grid gap-1 rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] px-[var(--ja-space-4)] py-[var(--ja-space-3)]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{source.company}</p>
                <p className="font-[var(--ja-font-data)] text-[var(--ja-text-xs)] text-[var(--ja-ink)]">{source.jobCount}</p>
              </div>
              <p className="fine-print">
                {source.provider} · {source.newestJobAt ? <TimeAgo value={source.newestJobAt} /> : "No recent publish time"}
              </p>
            </div>
          ))}
          {feed.errors.length > 0 ? (
            <p className="fine-print">
              Some tracked sources were quiet or unavailable during this cycle. The page shows less rather than substituting stale results.
            </p>
          ) : null}
        </div>
      ) : (
        <EmptyState message="No live boards responded this cycle." compact />
      )}
    </SupportPanel>
  );
}

function SupportPanel({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="editorial-card p-[var(--ja-space-5)]">
      <p className="eyebrow">{title}</p>
      <div className="mt-[var(--ja-space-4)]">{children}</div>
    </article>
  );
}

function EmptyState({
  message,
  compact = false
}: {
  message: string;
  compact?: boolean;
}) {
  return (
    <div className={`rounded-[var(--ja-radius-md)] border border-dashed border-[var(--ja-fog)] bg-[rgba(243,244,246,0.65)] ${compact ? "p-[var(--ja-space-4)]" : "p-[var(--ja-space-6)]"}`}>
      <p className="body-copy muted-copy text-[var(--ja-text-sm)]">{message}</p>
    </div>
  );
}

function Chip({
  children,
  tone
}: {
  children: ReactNode;
  tone: "teal" | "coral" | "neutral";
}) {
  const className =
    tone === "teal"
      ? "border-[var(--ja-teal)] bg-[var(--ja-teal-light)] text-[var(--ja-teal-dark)]"
      : tone === "coral"
        ? "border-[var(--ja-coral)] bg-[var(--ja-coral-light)] text-[var(--ja-coral)]"
        : "border-[var(--ja-fog)] bg-[var(--ja-cloud)] text-[var(--ja-slate)]";

  return (
    <span className={`inline-flex items-center rounded-[var(--ja-radius-full)] border px-[0.55rem] py-[0.25rem] text-[11px] font-semibold uppercase tracking-[0.06em] ${className}`}>
      {children}
    </span>
  );
}

function isNewJob(value: string) {
  const target = new Date(value).getTime();
  if (Number.isNaN(target)) {
    return false;
  }

  return Date.now() - target <= HOURS_48;
}

function formatWholeNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}
