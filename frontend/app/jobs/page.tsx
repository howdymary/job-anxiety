import type { Metadata } from "next";
import { Suspense } from "react";

import { JobsBoard } from "@/components/market/jobs-board";
import { SectionHeading } from "@/components/section-heading";
import { companies, jobCategories, jobs } from "@/lib/market-data";

export const metadata: Metadata = {
  title: "AI Job Board — AI Engineer, GTM Engineer, Vibe Coder & More",
  description: "Search AI-created jobs at Anthropic, OpenAI, Google, and more. Filter by salary, location, and experience."
};

export default function JobsPage() {
  return (
    <div className="page-grid-wide">
      <SectionHeading
        eyebrow="Jobs"
        title="A cleaner view of the AI jobs market"
        description="Filter by role, company type, salary, location, and recency. The point is speed: what is hiring, where, and for how much."
      />
      <div className="mt-10">
        <Suspense fallback={<JobsBoardFallback />}>
          <JobsBoard jobs={jobs} categories={jobCategories} companies={companies} />
        </Suspense>
      </div>
    </div>
  );
}

function JobsBoardFallback() {
  return (
    <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
      <div className="editorial-card hidden p-5 lg:block">
        <p className="eyebrow">Loading filters</p>
      </div>
      <div className="grid gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="editorial-card min-h-[11rem] animate-pulse p-6" />
        ))}
      </div>
    </div>
  );
}
