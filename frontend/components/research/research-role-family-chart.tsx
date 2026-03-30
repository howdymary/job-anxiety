import { ResearchChartFrame } from "@/components/research/research-chart-frame";
import type { LiveRoleFamilyPoint } from "@/lib/live-market-analytics";

type ResearchRoleFamilyChartProps = {
  data: LiveRoleFamilyPoint[];
  source: string;
};

export function ResearchRoleFamilyChart({ data, source }: ResearchRoleFamilyChartProps) {
  const hasData = data.length > 0;
  const maxOpenings = Math.max(...data.map((point) => point.openings), 1);

  return (
    <ResearchChartFrame
      eyebrow="Live ATS feed"
      title="Current openings by role family"
      question="Which role families account for the largest share of current openings on the tracked company boards?"
      description="Families are grouped from live job titles on the tracked boards. This view emphasizes ranking, company breadth, and readable counts instead of relying on a client-side chart runtime."
      statusLabel="Source-backed"
      source={source}
      methodologyLabel="Methodology v1.1"
      legend={[{ label: "Open roles", tone: "indigo", style: "solid" }]}
    >
      <div className="min-h-[24rem]">
        {hasData ? (
          <div
            role="img"
            aria-label="Ranked bar list showing current live openings by role family."
            className="grid gap-3"
          >
            {data.map((point) => {
              const widthPct = Math.max(10, Math.round((point.openings / maxOpenings) * 100));

              return (
                <article key={point.familyLabel} className="rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{point.familyLabel}</p>
                      <p className="fine-print mt-1">{point.companies.toLocaleString("en-US")} companies hiring in this family</p>
                    </div>
                    <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{point.openings.toLocaleString("en-US")}</p>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--ja-cloud)]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${widthPct}%`,
                        backgroundColor: "#6366F1"
                      }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex h-full min-h-[24rem] items-center justify-center rounded-[var(--ja-radius-md)] border border-dashed border-[var(--ja-fog)] bg-[var(--ja-cloud)] px-6 text-center">
            <div className="max-w-md">
              <p className="eyebrow">No live rows</p>
              <p className="body-copy muted-copy mt-3">Role family aggregation waits for the ATS feed to return current jobs.</p>
            </div>
          </div>
        )}
      </div>
    </ResearchChartFrame>
  );
}
