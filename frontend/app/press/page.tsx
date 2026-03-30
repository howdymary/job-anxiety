import type { Metadata } from "next";

import { SectionHeading } from "@/components/section-heading";
import { pressResources } from "@/lib/platform-data";

export const metadata: Metadata = {
  title: "Press",
  description: "Press resources, citation guidance, and reusable jobanxiety.ai data assets."
};

export default function PressPage() {
  return (
    <div className="page-grid grid gap-10">
      <SectionHeading
        eyebrow="Press"
        title="Resources for reporters, editors, and researchers"
        description="The value here is not a quote about the future. It is a clean source trail, reusable charts, and a methodology page you can read quickly under deadline."
      />

      <section className="editorial-card p-6">
        <h2 className="section-title text-[1.5rem]">What you can cite</h2>
        <div className="mt-5 grid gap-4">
          {pressResources.map((resource) => (
            <a key={resource.title} href={resource.href} className="grid gap-2 border-b border-[var(--color-border)] pb-4 last:border-b-0 last:pb-0">
              <p className="eyebrow">{resource.format}</p>
              <p className="section-title text-[1.2rem]">{resource.title}</p>
              <p className="body-copy muted-copy text-[0.96rem]">{resource.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="editorial-card p-6">
        <h2 className="section-title text-[1.5rem]">Embed format</h2>
        <pre className="mt-5 overflow-x-auto border border-[var(--color-border)] bg-[var(--color-bg-sunken)] p-4 text-[0.84rem] leading-6 text-[var(--color-text)]">
{`<iframe
  src="https://jobanxiety.ai/embed/displacement-ratio?period=90d"
  width="100%"
  height="420"
  frameborder="0"
  title="jobanxiety.ai displacement ratio"
></iframe>`}
        </pre>
      </section>

      <section className="editorial-card p-6">
        <h2 className="section-title text-[1.5rem]">Editorial contact</h2>
        <p className="body-copy mt-5">For citation questions, methodology clarifications, or data access requests, route inquiries through the future press inbox and attach the page or dataset URL you are referencing.</p>
      </section>
    </div>
  );
}
