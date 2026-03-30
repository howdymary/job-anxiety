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
        title="How jobanxiety.ai decides what belongs in the numbers"
        description="The trust model comes before the scale. That means clear source rules, conservative attribution, frozen methodology versions, and a public record of what is still mocked in the current build."
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
    </div>
  );
}
