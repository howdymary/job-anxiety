"""Optional LLM-assisted classification fallback."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Protocol

from ..models import JobCategory


class CompletionClient(Protocol):
    def complete(self, prompt: str) -> str:  # pragma: no cover - integration hook
        ...


@dataclass
class LLMClassificationResult:
    category: JobCategory
    confidence: float
    raw_response: str


def build_classification_prompt(title: str, description: str) -> str:
    snippet = description[:500]
    return (
        "Classify this job into one of: ai_engineer, ai_research_engineer, vibe_coder, "
        "gtm_engineer, prompt_engineer, ai_product_manager, ai_safety, ml_ops, "
        "data_annotation, ai_solutions_engineer, other.\n"
        f"Title: {title}\n"
        f"Description: {snippet}\n"
        "Return only the category name."
    )


def parse_llm_category(response: str) -> JobCategory:
    normalized = response.strip().lower()
    for category in JobCategory:
        if category.value == normalized:
            return category
    return JobCategory.OTHER


def classify_with_llm(title: str, description: str, client: CompletionClient | None = None) -> LLMClassificationResult:
    prompt = build_classification_prompt(title, description)
    if client is None:
        return LLMClassificationResult(category=JobCategory.OTHER, confidence=0.0, raw_response="no-client")

    response = client.complete(prompt)
    category = parse_llm_category(response)
    confidence = 0.85 if category is not JobCategory.OTHER else 0.15
    return LLMClassificationResult(category=category, confidence=confidence, raw_response=response)
