"""Company tier enrichment and overrides."""

from __future__ import annotations

import json
from dataclasses import replace
from datetime import datetime, timezone
from functools import lru_cache
from pathlib import Path

from ..models import CompanyRecord, CompanyTier, slugify
from .fortune500 import load_fortune_500


DATA_PATH = Path(__file__).resolve().parents[3] / "data" / "company_overrides.json"


@lru_cache(maxsize=1)
def load_company_overrides() -> dict[str, dict[str, object]]:
    if not DATA_PATH.exists():
        return {}

    raw = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    return {entry["name"].lower(): entry for entry in raw}


def classify_company(company: dict[str, object]) -> CompanyTier | None:
    name = str(company.get("name", "")).strip().lower()
    if not name:
        return None

    fortune_rank = load_fortune_500().get(name)
    if fortune_rank is not None:
        return CompanyTier.FORTUNE_500

    funding = int(company.get("total_funding") or 0)
    founded_year = int(company.get("founded_year") or 0)
    estimated_revenue = int(company.get("estimated_revenue") or 0)
    current_year = datetime.now(tz=timezone.utc).year

    if funding > 0 and founded_year and founded_year > (current_year - 10):
        return CompanyTier.VC_BACKED

    if estimated_revenue > 50_000_000_00:
        return CompanyTier.HIGH_REVENUE

    return None


def enrich_company(company: dict[str, object]) -> CompanyRecord:
    name = str(company.get("name", "")).strip()
    overrides = load_company_overrides().get(name.lower(), {})
    merged: dict[str, object] = {**overrides, **company}
    explicit_tier = merged.get("tier")
    tier = classify_company(merged)
    if explicit_tier:
        try:
            tier = CompanyTier(str(explicit_tier))
        except ValueError:
            pass

    record = CompanyRecord(
        name=name,
        slug=str(merged.get("slug") or slugify(name)),
        domain=merged.get("domain") or None,
        tier=tier,
        fortune_500_rank=load_fortune_500().get(name.lower()),
        total_funding=int(merged.get("total_funding") or 0) or None,
        last_funding_round=merged.get("last_funding_round") or None,
        estimated_revenue=int(merged.get("estimated_revenue") or 0) or None,
        employee_count=int(merged.get("employee_count") or 0) or None,
        industry=merged.get("industry") or None,
        hq_location=merged.get("hq_location") or None,
        logo_url=merged.get("logo_url") or None,
        description=merged.get("description") or None,
        enrichment_source=str(merged.get("enrichment_source") or "manual"),
        enrichment_date=datetime.now(tz=timezone.utc),
    )
    return record


def with_tier(company: CompanyRecord, tier: CompanyTier | None) -> CompanyRecord:
    return replace(company, tier=tier)
