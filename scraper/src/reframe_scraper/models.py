"""Typed models used across the scraper and enrichment pipeline."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from typing import Any


class CompanyTier(str, Enum):
    FORTUNE_500 = "fortune_500"
    VC_BACKED = "vc_backed"
    HIGH_REVENUE = "high_revenue"


class ExperienceLevel(str, Enum):
    ENTRY = "entry"
    MID = "mid"
    SENIOR = "senior"
    LEAD = "lead"
    EXECUTIVE = "executive"


class LocationType(str, Enum):
    REMOTE = "remote"
    HYBRID = "hybrid"
    ONSITE = "onsite"


class JobCategory(str, Enum):
    AI_ENGINEER = "ai_engineer"
    AI_RESEARCH_ENGINEER = "ai_research_engineer"
    VIBE_CODER = "vibe_coder"
    GTM_ENGINEER = "gtm_engineer"
    PROMPT_ENGINEER = "prompt_engineer"
    AI_PRODUCT_MANAGER = "ai_product_manager"
    AI_SAFETY = "ai_safety"
    MLOPS = "ml_ops"
    DATA_ANNOTATION = "data_annotation"
    AI_SOLUTIONS_ENGINEER = "ai_solutions_engineer"
    OTHER = "other"


@dataclass
class RawJob:
    source: str
    source_url: str
    payload: dict[str, Any]
    source_id: str | None = None


@dataclass
class ParsedJob:
    title: str
    raw_title: str
    description: str
    company_name: str
    company_domain: str | None
    category: JobCategory
    source: str
    source_url: str
    source_id: str | None = None
    experience_level: ExperienceLevel | None = None
    salary_min: int | None = None
    salary_max: int | None = None
    salary_currency: str = "USD"
    equity: bool = False
    location_type: LocationType | None = None
    location_city: str | None = None
    location_state: str | None = None
    location_country: str = "US"
    posted_at: datetime | None = None
    expires_at: datetime | None = None
    tags: list[str] = field(default_factory=list)


@dataclass
class CompanyRecord:
    name: str
    slug: str
    domain: str | None = None
    tier: CompanyTier | None = None
    fortune_500_rank: int | None = None
    total_funding: int | None = None
    last_funding_round: str | None = None
    estimated_revenue: int | None = None
    employee_count: int | None = None
    industry: str | None = None
    hq_location: str | None = None
    logo_url: str | None = None
    description: str | None = None
    enrichment_source: str | None = None
    enrichment_date: datetime | None = None


@dataclass
class ScraperRun:
    source: str
    started_at: datetime
    finished_at: datetime | None = None
    jobs_found: int = 0
    jobs_new: int = 0
    jobs_updated: int = 0
    errors: list[str] = field(default_factory=list)
    status: str = "running"


def slugify(value: str) -> str:
    normalized = "".join(char.lower() if char.isalnum() else "-" for char in value).strip("-")
    while "--" in normalized:
        normalized = normalized.replace("--", "-")
    return normalized
