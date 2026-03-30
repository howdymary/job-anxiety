import type { Metadata } from "next";
import Link from "next/link";

import { ContextPanel } from "@/components/context-panel";
import { LayoffConfidenceBadge } from "@/components/layoff-confidence-badge";
import { SectionHeading } from "@/components/section-heading";
import { layoffEvents, marketPulseStats, methodologyMeta } from "@/lib/platform-data";

export const metadata: Metadata = {
  title: "Layoff Tracker",
  description: "Track recent layoff events with confidence labels, source classes, and plain-language context."
};

export default function LayoffsPage() {
  return (
    <div className="page-grid-wide grid gap-12">
      <SectionHeading
        eyebrow="Layoffs"
        title="A layoff tracker built for verification, not spectacle"
        description="Every event carries a confidence label, a source class, and plain-language context. The public build currently uses curated sample records while the production pipeline is being wired."
      />

      <div className="grid gap-4 md:grid-cols-4">
        {marketPulseStats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="editorial-card p-5 transition hover:-translate-y-px hover:border-[var(--color-border-hover)]">
            <p className="eyebrow">{stat.label}</p>
            <p className="data-copy mt-4 text-[2rem]">{stat.value}</p>
            <p className="fine-print mt-3">{stat.context}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.6fr)]">
        <section className="grid gap-4">
          {layoffEvents.map((event) => (
            <article key={event.slug} className="editorial-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">{event.sourceType}</p>
                  <h2 className="section-title mt-3 text-[1.45rem]">
                    {event.company} · {event.affectedCount.toLocaleString()} affected
                  </h2>
                  <p className="fine-print mt-3">
                    Announced {new Date(event.announcedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    {typeof event.affectedPercent === "number" ? ` · ${event.affectedPercent}% of staff` : ""}
                  </p>
                </div>
                <LayoffConfidenceBadge confidence={event.confidence} />
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_18rem]">
                <div className="grid gap-4">
                  <p className="body-copy muted-copy">{event.macroContext}</p>
                  {event.aiAttribution ? (
                    <p className="body-copy">
                      <strong>AI language:</strong> {event.aiAttribution}
                    </p>
                  ) : (
                    <p className="body-copy">
                      <strong>AI signal:</strong> {event.aiSignal}
                    </p>
                  )}
                  {event.departments?.length ? (
                    <p className="fine-print">Departments: {event.departments.join(", ")}.</p>
                  ) : null}
                </div>

                <div className="grid gap-3">
                  <p className="eyebrow">Sources</p>
                  <a href={event.sourceUrl} target="_blank" rel="noreferrer" className="inline-link body-copy">
                    {event.sourceLabel}
                  </a>
                  {event.secondarySources?.map((item) => (
                    <p key={item} className="fine-print">
                      {item}
                    </p>
                  ))}
                  {event.companySlug ? (
                    <Link href={`/companies/${event.companySlug}`} className="arrow-link mt-2">
                      <span>Open company profile</span>
                      <span>→</span>
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </section>

        <div className="grid gap-4">
          <ContextPanel
            title="How the confidence labels work"
            body={
              <>
                <p>Confirmed means filing-grade or two-source verification. Reported means a single credible source. Rumored stays out of headline totals.</p>
                <p>AI-related language is handled conservatively. The point is to separate direct attribution from soft context, not blur them together for drama.</p>
              </>
            }
            footer={
              <Link href="/methodology" className="arrow-link">
                <span>Read the methodology</span>
                <span>→</span>
              </Link>
            }
          />

          <ContextPanel
            title="Current build status"
            body={
              <>
                <p>{methodologyMeta.status}</p>
                <p>That means this page is useful as a product and editorial prototype, but it is not yet the live, audit-backed tracker described in the production spec.</p>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
