"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ResearchChartFrame } from "@/components/research/research-chart-frame";
import type { LiveRoleFamilyPoint } from "@/lib/live-market-analytics";

type ResearchRoleFamilyChartProps = {
  data: LiveRoleFamilyPoint[];
  source: string;
};

export function ResearchRoleFamilyChart({ data, source }: ResearchRoleFamilyChartProps) {
  const hasData = data.length > 0;

  return (
    <ResearchChartFrame
      eyebrow="Live ATS feed"
      title="Current openings by role family"
      question="Which role families account for the largest share of current openings on the tracked company boards?"
      description="Families are grouped from live job titles on the tracked boards. This chart shows the current open inventory rather than a modeled trend."
      statusLabel="Source-backed"
      source={source}
      methodologyLabel="Methodology v1.1"
      legend={[{ label: "Open roles", tone: "indigo", style: "solid" }]}
    >
      <div className="h-[24rem]" role="img" aria-label="Horizontal bar chart showing current live openings by role family.">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%" debounce={150}>
            <BarChart data={[...data].reverse()} layout="vertical" margin={{ top: 8, right: 12, left: 32, bottom: 0 }}>
              <CartesianGrid horizontal={false} stroke="rgba(74, 80, 96, 0.1)" />
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="familyLabel"
                tickLine={false}
                axisLine={false}
                width={144}
                tick={{ fill: "#4A5060", fontSize: 12 }}
              />
              <Tooltip formatter={(value: number, _name, payload: { payload?: LiveRoleFamilyPoint }) => [`${value} openings`, `${payload.payload?.companies ?? 0} companies`]} />
              <Bar dataKey="openings" fill="var(--ja-chart-2)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-[var(--ja-radius-md)] border border-dashed border-[var(--ja-fog)] bg-[var(--ja-cloud)] px-6 text-center">
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
