"""Lever jobs API scraper."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any

from ..categorizer.rules import classify_job
from ..models import JobCategory, LocationType, ParsedJob, RawJob
from .base import BaseScraper


class LeverScraper(BaseScraper):
    def __init__(self, company: str, *, client=None) -> None:
        super().__init__(client=client)
        self.company = company

    async def fetch_jobs(self) -> list[RawJob]:
        url = f"https://api.lever.co/v0/postings/{self.company}?mode=json"
        response = await self._polite_get(url, source_name="lever")
        payload = response.json()
        jobs: list[RawJob] = []
        for item in payload:
            jobs.append(
                RawJob(
                    source="lever",
                    source_url=item.get("hostedUrl") or item.get("applyUrl") or url,
                    source_id=str(item.get("id") or ""),
                    payload=item,
                )
            )
        return jobs

    def parse_job(self, raw_job: RawJob) -> ParsedJob:
        payload: dict[str, Any] = raw_job.payload
        title = str(payload.get("text") or payload.get("title") or "").strip()
        description = str(payload.get("descriptionPlain") or payload.get("description") or "")
        company_name = str(payload.get("company") or self.company.replace("-", " ").title())
        decision = classify_job(title, description)
        category = decision.category if decision.category is not JobCategory.OTHER else (JobCategory.VIBE_CODER if "ai" in title.lower() else JobCategory.AI_ENGINEER)
        return ParsedJob(
            title=title,
            raw_title=title,
            description=description,
            company_name=company_name,
            company_domain=None,
            category=category,
            source="lever",
            source_url=raw_job.source_url,
            source_id=raw_job.source_id,
            location_type=_location_type(payload),
            location_city=_location_city(payload),
            posted_at=_parse_datetime(payload.get("createdAt") or payload.get("listedAt")),
        )


def _location_type(payload: dict[str, Any]) -> LocationType | None:
    text = f"{payload.get('location') or ''} {payload.get('workplaceType') or ''}".lower()
    if "remote" in text:
        return LocationType.REMOTE
    if "hybrid" in text:
        return LocationType.HYBRID
    if text:
        return LocationType.ONSITE
    return None


def _location_city(payload: dict[str, Any]) -> str | None:
    location = payload.get("location")
    if isinstance(location, dict):
        return location.get("name")
    if isinstance(location, str):
        return location
    return None


def _parse_datetime(value: Any) -> datetime | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00")).astimezone(timezone.utc)
    except ValueError:
        return None
