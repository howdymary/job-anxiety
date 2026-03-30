import { ResearchChartFrame } from "@/components/research/research-chart-frame";
import type { LiveWeeklyOpeningsPoint } from "@/lib/live-market-analytics";

type ResearchLiveOpeningsChartProps = {
  data: LiveWeeklyOpeningsPoint[];
  source: string;
};

const SVG_WIDTH = 800;
const SVG_HEIGHT = 320;
const CHART_PADDING = { top: 18, right: 18, bottom: 46, left: 54 };

export function ResearchLiveOpeningsChart({ data, source }: ResearchLiveOpeningsChartProps) {
  const latest = data[data.length - 1];
  const hasData = data.some((point) => point.openings > 0);
  const maxOpenings = Math.max(...data.map((point) => point.openings), 1);
  const chartWidth = SVG_WIDTH - CHART_PADDING.left - CHART_PADDING.right;
  const chartHeight = SVG_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => Math.round(maxOpenings * ratio));
  const normalizedTicks = Array.from(new Set(yTicks)).sort((left, right) => right - left);
  const points = data.map((point, index) => {
    const x = CHART_PADDING.left + (data.length <= 1 ? chartWidth / 2 : (chartWidth / (data.length - 1)) * index);
    const y = CHART_PADDING.top + chartHeight - (point.openings / maxOpenings) * chartHeight;

    return { ...point, x, y };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" ");
  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${(CHART_PADDING.top + chartHeight).toFixed(1)} L ${points[0].x.toFixed(1)} ${(CHART_PADDING.top + chartHeight).toFixed(1)} Z`
    : "";

  return (
    <ResearchChartFrame
      eyebrow="Live ATS feed"
      title="Current open roles by original posting week"
      question="How is the current live inventory distributed by original post week across the boards we monitor?"
      description="This chart is built from the current open snapshot, then bucketed by original posted date. It is not a frozen historical series, so older weeks can shrink as roles close."
      statusLabel="Source-backed"
      source={source}
      methodologyLabel="Methodology v1.1"
      legend={[{ label: "Openings posted", tone: "teal", style: "solid" }]}
    >
      <div className="grid gap-4 rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div>
          <p className="eyebrow">Latest week in view</p>
          <p className="data-copy mt-3 text-[1.35rem] font-semibold text-[var(--ja-ink)]">
            {latest ? latest.openings.toLocaleString("en-US") : "No live rows"} currently open roles
          </p>
        </div>
        <p className="fine-print md:text-right">
          {hasData ? "Current live inventory by original post week." : "No live ATS rows were returned for this refresh."}
        </p>
      </div>

      <div className="mt-5 min-h-[22rem]">
        {hasData ? (
          <div
            role="img"
            aria-label="Area chart showing the current open-role inventory bucketed by original posting week across tracked company career boards."
            className="rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-4"
          >
            <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="h-auto w-full" aria-hidden="true">
              {normalizedTicks.map((tick) => {
                const y = CHART_PADDING.top + chartHeight - (tick / maxOpenings) * chartHeight;

                return (
                  <g key={tick}>
                    <line x1={CHART_PADDING.left} x2={SVG_WIDTH - CHART_PADDING.right} y1={y} y2={y} stroke="rgba(74, 80, 96, 0.12)" />
                    <text
                      x={CHART_PADDING.left - 12}
                      y={y + 4}
                      textAnchor="end"
                      fontSize="12"
                      fill="#6B7280"
                      fontFamily="var(--ja-font-body)"
                    >
                      {tick.toLocaleString("en-US")}
                    </text>
                  </g>
                );
              })}

              <path d={areaPath} fill="rgba(13, 148, 136, 0.14)" />
              <path d={linePath} fill="none" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

              {points.map((point) => (
                <g key={point.label}>
                  <circle cx={point.x} cy={point.y} r="4.5" fill="#0D9488" />
                  <text
                    x={point.x}
                    y={SVG_HEIGHT - 16}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#4A5060"
                    fontFamily="var(--ja-font-body)"
                  >
                    {point.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        ) : (
          <div className="flex h-full min-h-[22rem] items-center justify-center rounded-[var(--ja-radius-md)] border border-dashed border-[var(--ja-fog)] bg-[var(--ja-cloud)] px-6 text-center">
            <div className="max-w-md">
              <p className="eyebrow">No live rows</p>
              <p className="body-copy muted-copy mt-3">
                The feed returned no opening data for this refresh, so the chart stays explicit rather than blank.
              </p>
            </div>
          </div>
        )}
      </div>
    </ResearchChartFrame>
  );
}
