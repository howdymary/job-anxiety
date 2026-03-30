"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ResearchChartFrame } from "@/components/research/research-chart-frame";
import type { LiveCompanyHiringPoint } from "@/lib/live-market-analytics";

type ResearchCompanyHiringChartProps = {
  data: LiveCompanyHiringPoint[];
  source: string;
};

export function ResearchCompanyHiringChart({ data, source }: ResearchCompanyHiringChartProps) {
  return (
    <ResearchChartFrame
      eyebrow="Live ATS feed"
      title="Open roles by tracked company"
      question="Which tracked company boards hold the largest current inventory of open roles?"
      description="This chart is a direct count of currently published jobs on the boards we poll. It is useful for concentration and board-health checks, not as a claim about the whole labor market."
      statusLabel="Source-backed"
      source={source}
      methodologyLabel="Methodology v1.1"
      legend={[{ label: "Open roles", tone: "teal", style: "solid" }]}
    >
      <div className="h-[24rem]" role="img" aria-label="Bar chart showing current open roles by tracked company board.">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 32 }}>
            <CartesianGrid vertical={false} stroke="rgba(74, 80, 96, 0.12)" />
            <XAxis
              dataKey="company"
              tickLine={false}
              axisLine={false}
              interval={0}
              angle={-24}
              textAnchor="end"
              height={64}
              tick={{ fill: "#4A5060", fontSize: 12 }}
            />
            <YAxis tickLine={false} axisLine={false} width={56} tick={{ fill: "#6B7280", fontSize: 12 }} />
            <Tooltip formatter={(value: number) => `${value} openings`} />
            <Bar dataKey="openings" fill="var(--ja-teal)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ResearchChartFrame>
  );
}
