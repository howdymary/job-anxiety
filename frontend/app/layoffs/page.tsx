import type { Metadata } from "next";
import Link from "next/link";

import { ContextPanel } from "@/components/context-panel";
import { LayoffConfidenceBadge } from "@/components/layoff-confidence-badge";
import { SectionHeading } from "@/components/section-heading";
import { auditedLayoffEvents, methodologyMeta } from "@/lib/platform-data";

export const metadata: Metadata = {
  title: "Layoff Log",
  description:
    "Official-source layoff disclosures tracked by jobanxiety.ai. This page publishes only confirmed company or SEC documents.",
  robots: {
    index: false,
    follow: true
  }
};

export default function LayoffsPage() {
  const totalAffected = auditedLayoffEvents.reduce((sum, event) => sum + event.affectedCount, 0);
  const aiCitedEvents = auditedLayoffEvents.filter((event) => event.aiSignal === "Cited").length;

  return (
    <div className="page-grid-wide grid gap-12">
      <SectionHeading
        eyebrow="Layoffs"
        title="Official-source workforce reductions"
        description="This public page now publishes only confirmed disclosures from SEC filings, annual reports, or company investor-relations releases. Broader layoff tracking returns only after the provenance pipeline is fully audited."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard label="Confirmed disclosures" value={auditedLayoffEvents.length.toString()} note="Current entries on the public page" />
        <SummaryCard label="Workers affected" value={totalAffected.toLocaleString("en-US")} note="Includes one approximate figure derived from a disclosed workforce percentage" />
        <SummaryCard label="AI cited in source text" value={aiCitedEvents.toString()} note="Events where the primary source itself mentions AI in the restructuring context" />
      </section>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
        <section className="grid gap-4">
          {auditedLayoffEvents.map((event) => (
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
                  <p className="body-copy muted-copy">{event.macroContext}</p>
                  <p className="body-copy">
                    <strong>AI signal:</strong>{" "}
                    {event.aiAttribution
                      ? event.aiAttribution
                      : event.aiSignal === "Cited"
                        ? "AI appears in the source text."
                        : "The primary source does not attribute the cut to AI."}
                  </p>
                  {event.secondarySources?.length ? (
                    <div className="grid gap-2">
                      {event.secondarySources.map((item) => (
                        <p key={item} className="fine-print">
                          {item}
                        </p>
                      ))}
                    </div>
                  ) : null}
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
          ))}
        </section>

        <div className="grid gap-4">
          <ContextPanel
            title="How this page is constrained"
            body={
              <>
                <p>Only confirmed official-source disclosures are published here right now. If an event depends on a generic roundup, an unattributed report, or a weak source chain, it stays off the page.</p>
                <p>That makes the log incomplete in the short term, but it keeps the published counts defensible.</p>
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
