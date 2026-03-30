import { NextResponse } from "next/server";

import { getOccupationRiskAssessment } from "@/lib/occupation-risk-api";

type RouteContext = {
  params: {
    soc: string;
  };
};

export async function GET(_: Request, { params }: RouteContext) {
  const assessment = await getOccupationRiskAssessment(params.soc);

  if (!assessment) {
    return NextResponse.json({ error: "Occupation not found." }, { status: 404 });
  }

  return NextResponse.json(assessment, {
    headers: {
      "Cache-Control": "public, max-age=3600"
    }
  });
}
