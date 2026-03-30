import type { Metadata } from "next";

import { SectionHeading } from "@/components/section-heading";
import { apiEndpoints } from "@/lib/platform-data";

export const metadata: Metadata = {
  title: "API",
  description: "Current public API surface for jobanxiety.ai. Only live, source-backed endpoints are listed here.",
  robots: {
    index: false,
    follow: true
  }
};

export default function ApiPage() {
  return (
    <div className="page-grid-wide grid gap-10">
      <SectionHeading
        eyebrow="API"
        title="Public API"
        description="Only currently published endpoints are documented here. Mock or withheld data surfaces are intentionally excluded until their backing datasets are audit-ready."
      />

      <section className="editorial-card p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <div>
            <h2 className="section-title text-[1.4rem]">Endpoint surface</h2>
            <table className="data-table mt-5">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Path</th>
                  <th>Description</th>
                  <th>Auth</th>
                </tr>
              </thead>
              <tbody>
                {apiEndpoints.map((endpoint) => (
                  <tr key={`${endpoint.method}-${endpoint.path}`}>
                    <td>{endpoint.method}</td>
                    <td>{endpoint.path}</td>
                    <td>{endpoint.description}</td>
                    <td>{endpoint.auth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4">
            <div>
              <p className="eyebrow">Auth model</p>
              <p className="body-copy mt-3">Anonymous requests stay rate limited and read-only. Additional newsroom or research access can be layered in later once those datasets are live and audited.</p>
            </div>
            <div>
              <p className="eyebrow">Current state</p>
              <p className="body-copy mt-3">
                The documented surface is deliberately small. Occupation search, the sourced occupation brief, the official-source layoff
                feed, and subscriber signup are live. Jobs, companies, and trends remain undocumented until those APIs are published with
                the same audit trail.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
