import { NextResponse } from "next/server";

import { searchOccupationRisk } from "@/lib/occupation-risk-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (query.length < 2 || query.length > 100) {
    return NextResponse.json({ error: "Query must be between 2 and 100 characters." }, { status: 400 });
  }

  const results = await searchOccupationRisk(query);

  return NextResponse.json(
    {
      query,
      count: results.length,
      results: results.map((result) => ({
        soc_code: result.socCode,
        title: result.title,
        employment_2024: result.employment2024
      }))
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600"
      }
    }
  );
}
