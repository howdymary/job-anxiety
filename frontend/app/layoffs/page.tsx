import type { Metadata } from "next";
import Link from "next/link";

import { ContextPanel } from "@/components/context-panel";
import { LayoffConfidenceBadge } from "@/components/layoff-confidence-badge";
import { SectionHeading } from "@/components/section-heading";
import { getPublishedLayoffsFeed } from "@/lib/layoffs-api";
import { methodologyMeta } from "@/lib/platform-data";

export const metadata: Metadata = {
  title: "Layoff Log",
  description:
    "Official-source layoff disclosures tracked by jobanxiety.ai. This page publishes only confirmed company or SEC documents.",
  robots: {
    index: false,
    follow: true
  }
};

export default async function LayoffsPage() {
  const feed = await getPublishedLayoffsFeed();
  const totalAffected = feed.stats.totalAffected;
  const aiCitedEvents = feed.stats.aiCitedEvents;

  return (
    <div className="page-grid-wide grid gap-12">
      <SectionHeading
        eyebrow="Layoffs"
        title="Official-source workforce reductions"
        description="This public page now publishes only confirmed disclosures from SEC filings or official company investor-relations releases that can still be fetched from their original source URLs."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard label="Confirmed disclosures" value={feed.stats.confirmedDisclosures.toString()} note="Current monitored entries on the public page" />
        <SummaryCard label="Workers affected" value={totalAffected.toLocaleString("en-US")} note="Counts come from the source documents; some disclosures use approximate language" />
        <SummaryCard label="AI cited in source text" value={aiCitedEvents.toString()} note="Events where the primary source itself mentions AI in the restructuring context" />
      </section>

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
                          ? "AI appears in the source text."
                          : "The primary source does not attribute the cut to AI."}
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <p className="eyebrow">Primary source</p>
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
              <p className="section-title text-[1.25rem]">No confirmed official-source disclosures were fetchable in this refresh.</p>
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
                <p>Only confirmed official-source disclosures are published here right now. If an event depends on a generic roundup, an unattributed report, or a weak source chain, it stays off the page.</p>
                <p>That keeps the public counts narrow, but it also means every published figure traces back to a still-live original document.</p>
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
                  {feed.sourceHealth.filter((item) => item.status === "live").length} of {feed.sourceHealth.length} monitored official
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
                <p>The broader layoff tracker remains intentionally narrower than the product brief until the full provenance pipeline is live.</p>
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
