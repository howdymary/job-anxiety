"use client";

import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";

import { ResearchChartFrame } from "@/components/research/research-chart-frame";
import type { VerifiedOccupationOutlook } from "@/lib/types";

type ResearchBlsOutlookChartProps = {
  data: VerifiedOccupationOutlook[];
};

export function ResearchBlsOutlookChart({ data }: ResearchBlsOutlookChartProps) {
  const hasData = data.length > 0;

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
      <div className="h-[24rem]" role="img" aria-label="Scatter plot comparing BLS projected growth and median annual pay across selected occupations.">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%" debounce={150}>
            <ScatterChart margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="rgba(74, 80, 96, 0.12)" />
              <XAxis
                type="number"
                dataKey="projectedGrowthPct"
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
                type="number"
                dataKey="medianWage2024"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) => `$${Math.round(value / 1000)}k`}
                width={64}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                label={{
                  value: "Median annual pay, 2024",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#4A5060",
                  fontSize: 12
                }}
              />
              <ZAxis type="number" dataKey="employment2024" range={[90, 420]} />
              <Tooltip content={<BlsOutlookTooltip />} />
              <Scatter data={data} shape={<BlsOutlookDot />} />
            </ScatterChart>
          </ResponsiveContainer>
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
    </ResearchChartFrame>
  );
}

function BlsOutlookDot(props: {
  cx?: number;
  cy?: number;
  payload?: VerifiedOccupationOutlook;
}) {
  const { cx = 0, cy = 0, payload } = props;

  if (!payload) {
    return null;
  }

  const fill = payload.projectedGrowthPct < 0 ? "var(--ja-coral)" : "var(--ja-teal)";
  const radius = Math.max(6, Math.min(14, Math.sqrt(payload.employment2024 / 16000)));

  return (
    <g>
      <circle cx={cx} cy={cy} r={radius} fill={fill} fillOpacity={0.9} stroke="rgba(250,250,249,0.95)" strokeWidth={1.5} />
      <text x={cx + radius + 4} y={cy - radius - 2} fontSize="11" fontFamily="var(--ja-font-body)" fill="var(--ja-slate)">
        {payload.occupation}
      </text>
    </g>
  );
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
