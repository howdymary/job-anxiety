"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import type { ResearchFootprintPoint } from "@/lib/research-content";

type ResearchFootprintChartProps = {
  data: ResearchFootprintPoint[];
};

export function ResearchFootprintChart({ data }: ResearchFootprintChartProps) {
  return (
    <article className="editorial-card p-6">
      <div className="mb-5">
        <p className="eyebrow">Research footprint</p>
        <h2 className="section-title mt-3 text-[1.4rem]">How large is the study footprint?</h2>
        <p className="fine-print mt-3">Question this chart answers: how broad is the protocol&apos;s geographic and occupation-level scope?</p>
      </div>

      <div className="h-[20rem]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
            <CartesianGrid horizontal={false} stroke="rgba(74, 80, 96, 0.14)" />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6B7280", fontSize: 12, fontFamily: "var(--ja-font-data)" }}
            />
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              axisLine={false}
              width={118}
              tick={{ fill: "#4A5060", fontSize: 12, fontFamily: "var(--ja-font-body)" }}
            />
            <Tooltip
              cursor={{ fill: "rgba(99, 102, 241, 0.06)" }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid rgba(229, 231, 235, 1)",
                background: "rgba(250, 250, 249, 0.98)",
                boxShadow: "var(--ja-shadow-md)"
              }}
              formatter={(value: number, _name, payload) => [
                `${new Intl.NumberFormat("en-US").format(value)}`,
                payload?.payload?.note ?? "Coverage"
              ]}
            />
            <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={32}>
              {data.map((entry) => (
                <Cell key={entry.label} fill="#4A5060" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="fine-print">Source: Research Protocol v1.0</p>
        <a href="/methodology" className="inline-link fine-print">
          Methodology
        </a>
      </div>
    </article>
  );
}
