"use client";

import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from "recharts";

import { ChartSurface } from "@/components/charts/chart-surface";
import { ResearchChartFrame } from "@/components/research/research-chart-frame";
import type { VerifiedOccupationOutlook } from "@/lib/types";

type ResearchBlsOutlookChartProps = {
  data: VerifiedOccupationOutlook[];
};

export function ResearchBlsOutlookChart({ data }: ResearchBlsOutlookChartProps) {
  const hasData = data.length > 0;
  const chartData = [...data].sort((left, right) => right.projectedGrowthPct - left.projectedGrowthPct);
  const growthDomain = hasData
    ? [
        Math.min(...data.map((point) => point.projectedGrowthPct)) - 5,
        Math.max(...data.map((point) => point.projectedGrowthPct)) + 5
      ]
    : [-10, 10];

  return (
    <ResearchChartFrame
      eyebrow="BLS occupation outlook"
      title="Verified occupation outlook across selected exposed roles"
      question="How do current BLS growth projections and median pay compare across a small set of occupations relevant to the AI labor-market debate?"
      description="Every point on this chart comes from the current BLS Occupational Outlook Handbook. It is a compact comparison chart, not a proprietary displacement model."
      statusLabel="Source-backed"
      source="U.S. Bureau of Labor Statistics Occupational Outlook Handbook, current pages accessed March 2026"
      methodologyLabel="Methodology v1.1"
      legend={[
        { label: "Positive growth outlook", tone: "teal", style: "dot" },
        { label: "Declining outlook", tone: "coral", style: "dot" }
      ]}
    >
      <div className="h-[24rem]">
        {hasData ? (
          <div
            role="img"
            aria-label="Horizontal bar chart showing BLS projected growth across selected occupations, paired with median pay details below."
            className="h-full"
          >
            <ChartSurface>
              {({ width, height }) => (
                <BarChart width={width} height={height} data={chartData} layout="vertical" margin={{ top: 8, right: 12, left: 24, bottom: 0 }}>
                  <CartesianGrid horizontal={false} stroke="rgba(74, 80, 96, 0.12)" />
                  <XAxis
                    type="number"
                    dataKey="projectedGrowthPct"
                    domain={growthDomain}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value: number) => `${value}%`}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    label={{
                      value: "Projected growth, 2024–2034",
                      position: "insideBottom",
                      offset: -4,
                      fill: "#4A5060",
                      fontSize: 12
                    }}
                  />
                  <YAxis
                    type="category"
                    dataKey="occupation"
                    tickLine={false}
                    axisLine={false}
                    width={112}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    tickFormatter={(value: string) => shortenOccupation(value)}
                  />
                  <Tooltip content={<BlsOutlookTooltip />} />
                  <Bar dataKey="projectedGrowthPct">
                    {chartData.map((point) => (
                      <Cell
                        key={point.socCode}
                        fill={point.projectedGrowthPct < 0 ? "#DC2626" : "#0D9488"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ChartSurface>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center rounded-[var(--ja-radius-md)] border border-dashed border-[var(--ja-fog)] bg-[var(--ja-cloud)] px-6 text-center">
            <div className="max-w-md">
              <p className="eyebrow">No selected occupations</p>
              <p className="body-copy muted-copy mt-3">
                The comparison chart needs a current BLS set before it can plot growth against pay.
              </p>
            </div>
          </div>
        )}
      </div>

      {hasData ? (
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {data.map((point) => (
            <div
              key={point.socCode}
              className="flex items-start gap-3 rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-3"
            >
              <span
                aria-hidden="true"
                className="mt-1 inline-flex h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: point.projectedGrowthPct < 0 ? "#DC2626" : "#0D9488" }}
              />
              <div>
                <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{point.occupation}</p>
                <p className="fine-print mt-1">
                  {point.projectedGrowthPct > 0 ? "+" : ""}
                  {point.projectedGrowthPct}% growth · ${Math.round(point.medianWage2024 / 1000)}k median pay
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </ResearchChartFrame>
  );
}

function shortenOccupation(value: string) {
  if (value.length <= 18) {
    return value;
  }

  return `${value.slice(0, 16)}…`;
}

function BlsOutlookTooltip({
  active,
  payload
}: {
  active?: boolean;
  payload?: Array<{ payload: VerifiedOccupationOutlook }>;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0]?.payload;

  return (
    <div className="rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[rgba(250,250,249,0.98)] p-4 shadow-[var(--ja-shadow-md)]">
      <p className="text-[var(--ja-text-sm)] font-semibold text-[var(--ja-ink)]">{point.occupation}</p>
      <p className="fine-print mt-2">{point.socCode}</p>
      <div className="mt-3 grid gap-2">
        <p className="text-[var(--ja-text-sm)] text-[var(--ja-ink)]">
          <span className="font-semibold">Projected growth:</span> {point.projectedGrowthPct > 0 ? "+" : ""}
          {point.projectedGrowthPct}%
        </p>
        <p className="text-[var(--ja-text-sm)] text-[var(--ja-ink)]">
          <span className="font-semibold">Median pay:</span> ${point.medianWage2024.toLocaleString("en-US")}
        </p>
        <p className="text-[var(--ja-text-sm)] text-[var(--ja-ink)]">
          <span className="font-semibold">Employment:</span> {point.employment2024.toLocaleString("en-US")}
        </p>
      </div>
    </div>
  );
}
