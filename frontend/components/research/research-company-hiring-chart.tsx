import { ResearchChartFrame } from "@/components/research/research-chart-frame";
import type { LiveCompanyHiringPoint } from "@/lib/live-market-analytics";

type ResearchCompanyHiringChartProps = {
  data: LiveCompanyHiringPoint[];
  source: string;
};

export function ResearchCompanyHiringChart({ data, source }: ResearchCompanyHiringChartProps) {
  const hasData = data.length > 0;
  const maxOpenings = Math.max(...data.map((point) => point.openings), 1);

  return (
    <ResearchChartFrame
      eyebrow="Live ATS feed"
      title="Open roles by tracked company"
      question="Which tracked company boards hold the largest current inventory of open roles?"
      description="This view is a direct count of currently published jobs on the boards we poll. It uses a ranked list so company concentration stays readable on both desktop and smaller screens."
      statusLabel="Source-backed"
      source={source}
      methodologyLabel="Methodology v1.1"
      legend={[{ label: "Open roles", tone: "teal", style: "solid" }]}
    >
      <div className="min-h-[24rem]">
        {hasData ? (
          <div
            role="img"
            aria-label="Ranked bar list showing current open roles by tracked company board."
            className="grid gap-3"
          >
            {data.map((point) => {
              const widthPct = Math.max(10, Math.round((point.openings / maxOpenings) * 100));

              return (
                <article key={point.company} className="rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{point.company}</p>
                      <p className="fine-print mt-1">Current inventory on the tracked public board</p>
                    </div>
                    <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{point.openings.toLocaleString("en-US")}</p>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--ja-cloud)]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${widthPct}%`,
                        backgroundColor: "#0D9488"
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
              <p className="body-copy muted-copy mt-3">Company concentration appears once the ATS feed returns active roles again.</p>
            </div>
          </div>
        )}
      </div>
    </ResearchChartFrame>
  );
}
