import type { Metadata } from "next";

import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for jobanxiety.ai."
};

export default function PrivacyPage() {
  return (
    <div className="page-grid-prose grid gap-10">
      <SectionHeading
        eyebrow="Privacy"
        title="Privacy policy"
        description="The product should not ask for more data than it needs. That applies doubly to a site built around career anxiety."
      />

      <section className="editorial-card p-6 prose-block">
        <p>We collect as little personal data as we can. Newsletter signup currently asks for an email address. Anonymous interaction data may be used for aggregate product metrics such as views, saves, and apply clicks.</p>
        <p>We do not sell personal data. We do not build individual behavioral dossiers. Public market and company data is kept separate from subscriber data.</p>
        <p>When the production pipeline is fully live, this page should expand to include retention windows, deletion workflows, subprocessors, and contact details.</p>
      </section>
    </div>
  );
}
