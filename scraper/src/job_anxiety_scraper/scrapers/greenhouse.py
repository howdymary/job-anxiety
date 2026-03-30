"""Greenhouse jobs API scraper."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any

from ..categorizer.rules import classify_job
from ..models import JobCategory, LocationType, ParsedJob, RawJob
from .base import BaseScraper


class GreenhouseScraper(BaseScraper):
    def __init__(self, board: str, *, client=None) -> None:
        super().__init__(client=client)
        self.board = board

    async def fetch_jobs(self) -> list[RawJob]:
        url = f"https://boards-api.greenhouse.io/v1/boards/{self.board}/jobs?content=true"
        response = await self._polite_get(url, source_name="greenhouse")
        payload = response.json()
        jobs: list[RawJob] = []
        for item in payload.get("jobs", []):
            jobs.append(
                RawJob(
                    source="greenhouse",
                    source_url=item.get("absolute_url") or item.get("url") or url,
                    source_id=str(item.get("id") or ""),
                    payload=item,
                )
            )
        return jobs

    def parse_job(self, raw_job: RawJob) -> ParsedJob:
        payload: dict[str, Any] = raw_job.payload
        title = str(payload.get("title") or "").strip()
        description = str(payload.get("content") or payload.get("description") or "")
        company_name = str(payload.get("company_name") or self.board.replace("-", " ").title())
        decision = classify_job(title, description)
        location = payload.get("location") or {}
        return ParsedJob(
            title=title,
            raw_title=title,
            description=description,
            company_name=company_name,
            company_domain=None,
            category=decision.category if decision.category is not JobCategory.OTHER else JobCategory.AI_ENGINEER,
            source="greenhouse",
            source_url=raw_job.source_url,
            source_id=raw_job.source_id,
            location_type=LocationType.REMOTE if "remote" in str(location).lower() else None,
            location_city=str(location.get("name")) if isinstance(location, dict) and location.get("name") else None,
            posted_at=_parse_datetime(payload.get("updated_at") or payload.get("created_at")),
            tags=_normalize_tags(payload.get("metadata") or {}),
        )


def _normalize_tags(metadata: Any) -> list[str]:
    if isinstance(metadata, dict):
        return [str(value) for value in metadata.values() if value]
    return []


def _parse_datetime(value: Any) -> datetime | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00")).astimezone(timezone.utc)
    except ValueError:
        return None
