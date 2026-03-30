import type { Metadata } from "next";

import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for jobanxiety.ai."
};

export default function TermsPage() {
  return (
    <div className="page-grid-prose grid gap-10">
      <SectionHeading
        eyebrow="Terms"
        title="Terms of use"
        description="The platform is designed for information and research, not employment guarantees or investment advice."
      />

      <section className="editorial-card p-6 prose-block">
        <p>jobanxiety.ai provides market information, editorial analysis, and links to third-party job listings. We do not control hiring decisions, interview processes, or the accuracy of third-party application portals.</p>
        <p>Users should verify job details and source materials independently before relying on them. Employers can close, edit, or remove listings without notice.</p>
        <p>As the product matures, this page should be expanded with standard service terms, intellectual property language, and dispute procedures.</p>
      </section>
    </div>
  );
}
