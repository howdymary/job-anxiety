"use client";

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { DisplacementPoint } from "@/lib/types";

type DisplacementRatioChartProps = {
  data: DisplacementPoint[];
};

export function DisplacementRatioChart({ data }: DisplacementRatioChartProps) {
  return (
    <section className="editorial-card p-5">
      <div className="mb-5">
        <p className="eyebrow">Signature chart</p>
        <h2 className="section-title mt-3">Jobs created versus AI-cited layoff language</h2>
        <p className="fine-print mt-3">Development sample. Frozen monthly so the visual shape stays comparable over time.</p>
      </div>
      <div className="h-[22rem]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid vertical={false} stroke="rgba(24,21,27,0.08)" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#665D63", fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#665D63", fontSize: 12 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="jobsCreated" name="AI jobs created" stroke="#1F7A5C" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="aiLayoffs" name="AI-cited layoffs" stroke="#BD3F2B" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
