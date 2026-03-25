import type { Metadata } from "next";

import { CompanyCard } from "@/components/market/company-card";
import { SectionHeading } from "@/components/section-heading";
import { companies, jobs } from "@/lib/market-data";

export const metadata: Metadata = {
  title: "Companies",
  description: "A directory of the companies quietly building serious AI teams."
};

export default function CompaniesPage() {
  return (
    <div className="page-grid-wide">
      <SectionHeading
        eyebrow="Companies"
        title="The employers building the new job map"
        description="A simple directory grouped by what kind of business is hiring. The question is not just who has jobs. It is who is staffing the future on purpose."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {companies.map((company) => (
          <CompanyCard key={company.slug} company={company} openRoles={jobs.filter((job) => job.companySlug === company.slug).length} />
        ))}
      </div>
    </div>
  );
}
