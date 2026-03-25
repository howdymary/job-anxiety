"""Crunchbase API client stub."""

from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Any

import httpx


@dataclass
class CrunchbaseClient:
    api_key: str
    base_url: str = "https://api.crunchbase.com/api/v4"

    @classmethod
    def from_env(cls) -> "CrunchbaseClient | None":
        api_key = os.getenv("CRUNCHBASE_API_KEY")
        if not api_key:
            return None
        return cls(api_key=api_key)

    async def lookup_company(self, name: str) -> dict[str, Any]:
        headers = {"X-cb-user-key": self.api_key}
        async with httpx.AsyncClient(timeout=30.0, headers=headers) as client:
            response = await client.get(f"{self.base_url}/entities/organizations/{name}")
            response.raise_for_status()
            return response.json()
