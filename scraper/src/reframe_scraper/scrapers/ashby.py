"""Ashby jobs API scraper."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any

from ..categorizer.rules import classify_job
from ..models import JobCategory, LocationType, ParsedJob, RawJob
from .base import BaseScraper


class AshbyScraper(BaseScraper):
    def __init__(self, board: str, *, client=None) -> None:
        super().__init__(client=client)
        self.board = board

    async def fetch_jobs(self) -> list[RawJob]:
        url = f"https://api.ashbyhq.com/posting-api/job-board/{self.board}"
        response = await self._polite_get(url, source_name="ashby")
        payload = response.json()
        jobs: list[RawJob] = []
        for item in payload.get("jobs", payload.get("jobPostings", [])):
            jobs.append(
                RawJob(
                    source="ashby",
                    source_url=item.get("jobUrl") or item.get("canonicalUrl") or url,
                    source_id=str(item.get("id") or item.get("jobId") or ""),
                    payload=item,
                )
            )
        return jobs

    def parse_job(self, raw_job: RawJob) -> ParsedJob:
        payload: dict[str, Any] = raw_job.payload
        title = str(payload.get("title") or payload.get("jobTitle") or "").strip()
        description = str(payload.get("descriptionHtml") or payload.get("description") or "")
        company_name = str(payload.get("companyName") or self.board.replace("-", " ").title())
        decision = classify_job(title, description)
        return ParsedJob(
            title=title,
            raw_title=title,
            description=description,
            company_name=company_name,
            company_domain=None,
            category=decision.category if decision.category is not JobCategory.OTHER else JobCategory.AI_ENGINEER,
            source="ashby",
            source_url=raw_job.source_url,
            source_id=raw_job.source_id,
            location_type=_location_type(payload),
            location_city=_location_city(payload),
            location_state=_location_state(payload),
            posted_at=_parse_datetime(payload.get("publishedAt") or payload.get("updatedAt")),
        )


def _location_type(payload: dict[str, Any]) -> LocationType | None:
    text = f"{payload.get('locationType') or ''} {payload.get('location') or ''}".lower()
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
        return location.get("city") or location.get("name")
    if isinstance(location, str):
        return location
    return None


def _location_state(payload: dict[str, Any]) -> str | None:
    location = payload.get("location")
    if isinstance(location, dict):
        return location.get("state") or location.get("region")
    return None


def _parse_datetime(value: Any) -> datetime | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00")).astimezone(timezone.utc)
    except ValueError:
        return None
