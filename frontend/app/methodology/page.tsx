import type { Metadata } from "next";

import { SectionHeading } from "@/components/section-heading";
import { methodologyMeta, methodologySections, sourceHierarchy } from "@/lib/platform-data";

export const metadata: Metadata = {
  title: "Methodology",
  description: "How jobanxiety.ai classifies jobs, scores layoff confidence, and treats AI attribution."
};

export default function MethodologyPage() {
  return (
    <div className="page-grid-prose grid gap-10">
      <SectionHeading
        eyebrow="Methodology"
        title="Methodology and publication scope"
        description="This page explains the source rules, attribution standards, refresh logic, and exclusion criteria behind the public site."
      />

      <section className="editorial-card p-6">
        <p className="eyebrow">Version</p>
        <h2 className="section-title mt-3">{methodologyMeta.version}</h2>
        <p className="body-copy muted-copy mt-4">Updated {methodologyMeta.updatedAt}</p>
        <p className="body-copy mt-4">{methodologyMeta.status}</p>
      </section>

      {methodologySections.map((section) => (
        <section key={section.title} className="editorial-card p-6">
          <h2 className="section-title text-[1.5rem]">{section.title}</h2>
          <div className="prose-block mt-5">
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}

      <section className="editorial-card p-6">
        <h2 className="section-title text-[1.5rem]">Source hierarchy</h2>
        <ol className="body-copy mt-5 grid gap-3 pl-5">
          {sourceHierarchy.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="editorial-card p-6">
        <h2 className="section-title text-[1.5rem]">Citation format</h2>
        <pre className="mt-5 overflow-x-auto border border-[var(--color-border)] bg-[var(--color-bg-sunken)] p-4 text-[0.84rem] leading-6 text-[var(--color-text)]">
{`jobanxiety.ai AI Labor Market Tracker. "[Dataset or page title], Month Year."
Accessed [date]. https://jobanxiety.ai/[path]
Methodology: https://jobanxiety.ai/methodology (${methodologyMeta.version}).`}
        </pre>
      </section>

      <section className="editorial-card p-6">
        <h2 className="section-title text-[1.5rem]">Occupation page scope</h2>
        <div className="prose-block mt-5">
          <p>
            The public occupation page publishes only directly sourced BLS fields: employment, wage levels, wage
            percentiles when available, projected growth, and annual openings. Those numbers come from the Occupational
            Outlook Handbook and related BLS release tables.
          </p>
          <p>
            AI-exposure mappings, task-overlap estimates, posting-direction models, and transition guidance remain off
            the public calculator until their provenance, methodology, and reproduction steps can be audited to the same
            standard as the BLS inputs.
          </p>
        </div>
      </section>

      <section className="editorial-card p-6">
        <h2 className="section-title text-[1.5rem]">Publication rule</h2>
        <div className="prose-block mt-5">
          <p>
            The public research and trends pages publish BLS occupation values and live ATS aggregates. The layoff page
            publishes confirmed disclosures from official company or SEC documents, plus a small number of clearly labeled
            high-confidence reported events when a primary document has not surfaced yet. If a series cannot clear that bar,
            it is removed from the charts rather than published with a weaker standard.
          </p>
          <p>
            The same rule now applies to the occupation page. If a modeled layer cannot be reproduced from audited public
            inputs, it stays off the public site until that work is complete.
          </p>
        </div>
      </section>
    </div>
  );
}
