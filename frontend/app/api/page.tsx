import type { Metadata } from "next";

import { SectionHeading } from "@/components/section-heading";
import { apiEndpoints } from "@/lib/platform-data";

export const metadata: Metadata = {
  title: "API",
  description: "Public API documentation for jobs, companies, trends, and newsletter signup."
};

export default function ApiPage() {
  return (
    <div className="page-grid-wide grid gap-10">
      <SectionHeading
        eyebrow="API"
        title="Public API"
        description="The current backend exposes a first pass on jobs, companies, trends, and subscriber signup. Layoff and summary endpoints are part of the next backend slice and are shown here as planned surface area."
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
              <p className="body-copy mt-3">Anonymous requests should stay rate limited and free. Research and newsroom access can move to API keys later, once the layoff and snapshot endpoints ship.</p>
            </div>
            <div>
              <p className="eyebrow">Rate-limit headers</p>
              <pre className="mt-3 overflow-x-auto border border-[var(--color-border)] bg-[var(--color-bg-sunken)] p-4 text-[0.8rem] leading-6 text-[var(--color-text)]">
{`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1711724400`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
