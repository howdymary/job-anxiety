"""Fortune 500 lookup helpers."""

from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path


DATA_PATH = Path(__file__).resolve().parents[3] / "data" / "fortune500.json"


@lru_cache(maxsize=1)
def load_fortune_500() -> dict[str, int]:
    if not DATA_PATH.exists():
        return {}

    raw = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    return {entry["name"].lower(): int(entry["rank"]) for entry in raw}
