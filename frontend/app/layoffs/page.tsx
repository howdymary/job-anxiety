import type { Metadata } from "next";
import Link from "next/link";

import { ContextPanel } from "@/components/context-panel";
import { LayoffConfidenceBadge } from "@/components/layoff-confidence-badge";
import { LayoffsTimeline } from "@/components/layoffs/layoffs-timeline";
import { SectionHeading } from "@/components/section-heading";
import { getPublishedLayoffsFeed } from "@/lib/layoffs-api";
import { methodologyMeta } from "@/lib/platform-data";

export const metadata: Metadata = {
  title: "Layoff Log",
  description:
    "Tracked layoff disclosures and high-confidence reports monitored by jobanxiety.ai, with clear confidence labeling and source links.",
  robots: {
    index: false,
    follow: true
  }
};

export default async function LayoffsPage() {
  const feed = await getPublishedLayoffsFeed();
  const totalAffected = feed.stats.totalAffected;

  return (
    <div className="page-grid-wide grid gap-12">
      <SectionHeading
        eyebrow="Layoffs"
        title="Tracked workforce reductions"
        description="This page publishes confirmed disclosures from SEC filings or official company investor-relations releases, plus clearly labeled high-confidence reported events when a primary document has not surfaced yet. The timeline below lets you inspect the current tracked record at a glance."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard label="Confirmed disclosures" value={feed.stats.confirmedDisclosures.toString()} note="Entries backed by a filing-grade or direct company source" />
        <SummaryCard label="Workers affected" value={totalAffected.toLocaleString("en-US")} note="Confirmed-source totals only; approximate language stays labeled" />
        <SummaryCard label="Reported events" value={feed.stats.reportedDisclosures.toString()} note="High-confidence media reports awaiting a primary company or SEC document" />
      </section>

      <LayoffsTimeline events={feed.events} generatedAt={feed.generatedAt} />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
        <section className="grid gap-4">
          {feed.events.length ? (
            feed.events.map((event) => (
              <article key={event.slug} className="editorial-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">{event.sourceType}</p>
                    <h2 className="section-title mt-3 text-[1.45rem]">
                      {event.company} · {event.affectedCountLabel}
                    </h2>
                    <p className="fine-print mt-3">
                      Announced {event.announcedLabel}
                      {typeof event.affectedPercent === "number" ? ` · ${event.affectedPercent}% of workforce` : ""}
                      {event.isApproximate ? " · approximate count" : ""}
                    </p>
                  </div>
                  <LayoffConfidenceBadge confidence={event.confidence} />
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_18rem]">
                  <div className="grid gap-4">
                    <p className="body-copy muted-copy">{event.summary}</p>
                    <p className="body-copy">
                      <strong>AI signal:</strong>{" "}
                      {event.aiAttribution
                        ? event.aiAttribution
                        : event.aiSignal === "Cited"
                          ? "AI appears in the tracked source text."
                          : event.confidence === "Reported"
                            ? "The tracked report does not explicitly attribute the cut to AI."
                            : "The primary source does not attribute the cut to AI."}
                    </p>
                    {event.confidence === "Reported" ? (
                      <p className="body-copy muted-copy">
                        This entry is sourced to a trusted reporting outlet and stays separate from the confirmed totals until a
                        filing, WARN notice, or direct company release appears.
                      </p>
                    ) : null}
                  </div>

                  <div className="grid gap-3">
                    <p className="eyebrow">{event.confidence === "Confirmed" ? "Primary source" : "Tracked report"}</p>
                    {event.reportingOutlet ? <p className="fine-print">Trusted outlet: {event.reportingOutlet}</p> : null}
                    <a href={event.sourceUrl} target="_blank" rel="noreferrer" className="inline-link body-copy">
                      {event.sourceLabel}
                    </a>
                    <Link href="/methodology" className="arrow-link mt-2">
                      <span>Read the sourcing rules</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <article className="editorial-card p-5">
              <p className="section-title text-[1.25rem]">No tracked layoff events were fetchable in this refresh.</p>
              <p className="body-copy muted-copy mt-3">
                The page does not backfill with synthetic events. Try again later or use the methodology page to review the publication rules.
              </p>
            </article>
          )}
        </section>

        <div className="grid gap-4">
          <ContextPanel
            title="How this page is constrained"
            body={
              <>
                <p>Confirmed events still require a filing-grade or direct company source. Reported events can appear only when the report comes from a trusted reporting outlet such as Reuters, Bloomberg, The Wall Street Journal, Financial Times, or The Information and stays clearly labeled as Reported.</p>
                <p>The monitor is broader than it was before, but it is still not a comprehensive market census. Every published figure still traces back to a still-live tracked source.</p>
              </>
            }
            footer={
              <Link href="/methodology" className="arrow-link">
                <span>Methodology</span>
                <span>→</span>
              </Link>
            }
          />

          <ContextPanel
            title="Current status"
            body={
              <>
                <p>{methodologyMeta.status}</p>
                <p>
                  {feed.sourceHealth.filter((item) => item.status === "live").length} of {feed.sourceHealth.length} monitored tracked
                  sources responded live in this refresh.
                </p>
                <p>
                  Last refreshed{" "}
                  {new Date(feed.generatedAt).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    timeZoneName: "short"
                  })}
                  .
                </p>
                {feed.errors.length ? <p>One or more monitored sources fell back to the last verified fetch.</p> : null}
                <p>The public tracker is still intentionally narrower than the full market. Confirmed entries clear the primary-document bar; reported entries stay labeled until a stronger document appears.</p>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <article className="editorial-card p-5">
      <p className="eyebrow">{label}</p>
      <p className="mt-3 font-[var(--ja-font-data)] text-[2rem] leading-tight text-[var(--ja-ink)]">{value}</p>
      <p className="fine-print mt-3">{note}</p>
    </article>
  );
}
