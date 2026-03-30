import { ResearchChartFrame } from "@/components/research/research-chart-frame";
import type { VerifiedOccupationOutlook } from "@/lib/types";

type ResearchBlsOutlookChartProps = {
  data: VerifiedOccupationOutlook[];
};

export function ResearchBlsOutlookChart({ data }: ResearchBlsOutlookChartProps) {
  const hasData = data.length > 0;
  const chartData = [...data].sort((left, right) => right.projectedGrowthPct - left.projectedGrowthPct);
  const maxMagnitude = hasData ? Math.max(...chartData.map((point) => Math.abs(point.projectedGrowthPct)), 1) : 1;

  return (
    <ResearchChartFrame
      eyebrow="BLS occupation outlook"
      title="Verified occupation outlook across selected exposed roles"
      question="How do current BLS growth projections and median pay compare across a small set of occupations relevant to the AI labor-market debate?"
      description="Every row on this comparison chart comes from the current BLS Occupational Outlook Handbook. It favors mobile readability and explicit values over a modeled visual abstraction."
      statusLabel="Source-backed"
      source="U.S. Bureau of Labor Statistics Occupational Outlook Handbook, current pages accessed March 2026"
      methodologyLabel="Methodology v1.1"
      legend={[
        { label: "Positive growth outlook", tone: "teal", style: "dot" },
        { label: "Declining outlook", tone: "coral", style: "dot" }
      ]}
    >
      {hasData ? (
        <div
          role="img"
          aria-label="Ranked comparison chart showing BLS projected growth across selected occupations, with median pay, employment, and annual openings listed in each row."
          className="grid gap-4"
        >
          {chartData.map((point) => {
            const isDeclining = point.projectedGrowthPct < 0;
            const widthPct = Math.max(10, Math.round((Math.abs(point.projectedGrowthPct) / maxMagnitude) * 100));

            return (
              <article
                key={point.socCode}
                className="rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{point.occupation}</p>
                    <p className="fine-print mt-1">
                      {point.socCode} · {point.majorGroup}
                    </p>
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em]"
                    style={{
                      backgroundColor: isDeclining ? "rgba(220, 38, 38, 0.12)" : "rgba(13, 148, 136, 0.12)",
                      color: isDeclining ? "#991B1B" : "#0F766E"
                    }}
                  >
                    {point.projectedGrowthPct > 0 ? "+" : ""}
                    {point.projectedGrowthPct}%
                  </span>
                </div>

                <div className="mt-4">
                  <div className="h-2 overflow-hidden rounded-full bg-[var(--ja-cloud)]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${widthPct}%`,
                        backgroundColor: isDeclining ? "#DC2626" : "#0D9488"
                      }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p className="fine-print">
                      {isDeclining ? "Projected decline over 2024–2034" : "Projected growth over 2024–2034"}
                    </p>
                    <p className="fine-print">
                      BLS annual openings: {typeof point.annualOpenings === "number" ? point.annualOpenings.toLocaleString("en-US") : "Not listed"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <MetricCard label="Median pay" value={`$${point.medianWage2024.toLocaleString("en-US")}`} />
                  <MetricCard label="Employment" value={point.employment2024.toLocaleString("en-US")} />
                  <MetricCard
                    label="Projected change"
                    value={`${point.projectedGrowthAbs > 0 ? "+" : ""}${point.projectedGrowthAbs.toLocaleString("en-US")}`}
                  />
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-[18rem] items-center justify-center rounded-[var(--ja-radius-md)] border border-dashed border-[var(--ja-fog)] bg-[var(--ja-cloud)] px-6 text-center">
          <div className="max-w-md">
            <p className="eyebrow">No selected occupations</p>
            <p className="body-copy muted-copy mt-3">
              The comparison chart needs a current BLS set before it can compare growth against pay.
            </p>
          </div>
        </div>
      )}
    </ResearchChartFrame>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--ja-radius-sm)] border border-[var(--ja-fog)] bg-[var(--ja-cloud)] px-3 py-2.5">
      <p className="eyebrow">{label}</p>
      <p className="mt-2 text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{value}</p>
    </div>
  );
}
