"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ResearchChartFrame } from "@/components/research/research-chart-frame";
import type { LiveWeeklyOpeningsPoint } from "@/lib/live-market-analytics";

type ResearchLiveOpeningsChartProps = {
  data: LiveWeeklyOpeningsPoint[];
  source: string;
};

export function ResearchLiveOpeningsChart({ data, source }: ResearchLiveOpeningsChartProps) {
  const latest = data[data.length - 1];

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
      <div className="rounded-[var(--ja-radius-md)] border border-[var(--ja-fog)] bg-[var(--ja-paper)] p-4">
        <p className="eyebrow">Latest week in view</p>
        <p className="data-copy mt-3 text-[1.35rem] font-semibold text-[var(--ja-ink)]">
          {latest ? latest.openings.toLocaleString("en-US") : "—"} currently open roles
        </p>
      </div>

      <div className="mt-5 h-[22rem]" role="img" aria-label="Area chart showing the current open-role inventory bucketed by original posting week across tracked company career boards.">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="live-openings-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="var(--ja-teal)" stopOpacity={0.22} />
                <stop offset="95%" stopColor="var(--ja-teal)" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(74, 80, 96, 0.12)" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} width={60} tick={{ fill: "#6B7280", fontSize: 12 }} />
            <Tooltip />
            <Area type="monotone" dataKey="openings" stroke="var(--ja-teal)" strokeWidth={2.5} fill="url(#live-openings-fill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ResearchChartFrame>
  );
}
