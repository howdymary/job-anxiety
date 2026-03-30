import type { OccupationRiskApiResponse, OccupationRiskSearchResult } from "@shared/occupation-risk";
import {
  getOccupationRiskRecord,
  getPopularOccupations,
  searchOccupations,
  toOccupationRiskApiResponse
} from "@shared/occupation-risk";

type OccupationSearchApiResponse = {
  query: string;
  count: number;
  results: Array<{
    soc_code: string;
    title: string;
    employment_2024: number;
  }>;
};

function getRawApiBaseUrl() {
  return (
    process.env.JOBANXIETY_API_BASE_URL ??
    process.env.JOBANXIETY_API_HOSTPORT ??
    (process.env.NODE_ENV === "production" ? "https://jobanxiety-api.onrender.com" : "http://localhost:8080")
  );
}

function withProtocol(value: string) {
  return /^https?:\/\//i.test(value) ? value : `http://${value}`;
}

function mapSearchResults(results: OccupationSearchApiResponse["results"]): OccupationRiskSearchResult[] {
  return results.map((result) => ({
    socCode: result.soc_code,
    title: result.title,
    employment2024: result.employment_2024
  }));
}

export async function getOccupationRiskAssessment(socCode: string): Promise<OccupationRiskApiResponse | null> {
  const normalized = socCode.trim();
  if (!/^\d{2}-\d{4}$/.test(normalized)) {
    return null;
  }

  try {
    const response = await fetch(`${withProtocol(getRawApiBaseUrl())}/api/v1/risk/${normalized}`, {
      next: { revalidate: 3600 }
    });

    if (response.ok) {
      return (await response.json()) as OccupationRiskApiResponse;
    }
  } catch {
    // Fall back to the local research layer during frontend-only development.
  }

  const record = getOccupationRiskRecord(normalized);
  return record ? toOccupationRiskApiResponse(record) : null;
}

export async function searchOccupationRisk(query: string): Promise<OccupationRiskSearchResult[]> {
  const normalized = query.trim();
  if (normalized.length < 2) {
    return [];
  }

  try {
    const response = await fetch(
      `${withProtocol(getRawApiBaseUrl())}/api/v1/occupations/search?q=${encodeURIComponent(normalized)}`,
      { next: { revalidate: 3600 } }
    );

    if (response.ok) {
      const payload = (await response.json()) as OccupationSearchApiResponse;
      return mapSearchResults(payload.results);
    }
  } catch {
    // Fall back to the local research layer during frontend-only development.
  }

  return searchOccupations(normalized);
}

export function getPopularOccupationResults(): OccupationRiskSearchResult[] {
  return getPopularOccupations().map((record) => ({
    socCode: record.socCode,
    title: record.title,
    employment2024: record.employment2024
  }));
}
