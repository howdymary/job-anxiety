import type { Metadata } from "next";

import { SectionHeading } from "@/components/section-heading";
import { pressResources } from "@/lib/platform-data";

export const metadata: Metadata = {
  title: "Press",
  description: "Press resources and citation guidance for jobanxiety.ai. Public resources listed here are limited to source-backed pages.",
  robots: {
    index: false,
    follow: true
  }
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
        <h2 className="section-title text-[1.5rem]">What is currently public</h2>
        <p className="body-copy mt-4">
          The items below are the source-backed public surfaces we are comfortable pointing reporters to today. Sample
          charts, provisional datasets, and unaudited model output have been removed from the public pages.
        </p>
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
        <p className="body-copy mt-5">
          Public iframe widgets are not live yet. Until they are, reporters should cite the page URL directly and rely on
          the methodology page for sourcing and version language.
        </p>
      </section>

      <section className="editorial-card p-6">
        <h2 className="section-title text-[1.5rem]">Editorial contact</h2>
        <p className="body-copy mt-5">For citation questions, methodology clarifications, or data access requests, route inquiries through the future press inbox and attach the page or dataset URL you are referencing.</p>
      </section>
    </div>
  );
}
