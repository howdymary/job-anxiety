import type { Metadata } from "next";

import { OccupationRiskCalculator } from "@/components/occupation-risk/occupation-risk-calculator";
import { getOccupationRiskAssessment, getPopularOccupationResults } from "@/lib/occupation-risk-api";

type CheckYourOccupationPageProps = {
  searchParams?: {
    soc?: string;
  };
};

export const metadata: Metadata = {
  title: "Check Your Occupation — BLS Outlook & Pay | JobAnxiety.ai",
  description:
    "Search your occupation and see the latest sourced BLS employment, wage, and outlook data used across JobAnxiety.ai."
};

export default async function CheckYourOccupationPage({ searchParams }: CheckYourOccupationPageProps) {
  const initialSoc = searchParams?.soc?.trim();
  const [popularOccupations, initialAssessment] = await Promise.all([
    Promise.resolve(getPopularOccupationResults()),
    initialSoc ? getOccupationRiskAssessment(initialSoc) : Promise.resolve(null)
  ]);

  return (
    <div className="page-grid-wide">
      <OccupationRiskCalculator
        initialAssessment={initialAssessment}
        popularOccupations={popularOccupations}
      />
    </div>
  );
}
