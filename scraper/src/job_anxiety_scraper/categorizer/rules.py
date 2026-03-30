"""Keyword-first job category classification."""

from __future__ import annotations

import re
from dataclasses import dataclass

from ..models import JobCategory


@dataclass
class CategoryDecision:
    category: JobCategory
    confidence: float
    reason: str


CATEGORY_RULES: dict[JobCategory, dict[str, list[str]]] = {
    JobCategory.AI_ENGINEER: {
        "must_contain_any": ["ai engineer", "artificial intelligence engineer", "ml engineer", "machine learning engineer"],
        "boost_keywords": ["llm", "transformer", "fine-tuning", "inference", "model deployment"],
        "exclude_if": ["sales", "recruiter", "marketing"],
    },
    JobCategory.AI_RESEARCH_ENGINEER: {
        "must_contain_any": ["research engineer", "research scientist", "ai researcher"],
        "boost_keywords": ["publications", "arxiv", "novel architectures", "rlhf", "alignment"],
        "exclude_if": ["market research", "user research"],
    },
    JobCategory.VIBE_CODER: {
        "must_contain_any": ["vibe cod", "ai-assisted develop", "ai-native develop", "copilot-native"],
        "boost_keywords": ["cursor", "copilot", "claude", "ai tools", "prompt-driven development"],
        "exclude_if": [],
    },
    JobCategory.GTM_ENGINEER: {
        "must_contain_any": ["gtm engineer", "go-to-market engineer", "growth engineer"],
        "boost_keywords": ["sales automation", "outbound automation", "clay", "apollo", "ai-powered gtm"],
        "exclude_if": [],
    },
    JobCategory.PROMPT_ENGINEER: {
        "must_contain_any": ["prompt engineer", "prompt designer", "llm engineer"],
        "boost_keywords": ["prompt optimization", "few-shot", "chain-of-thought", "evaluation"],
        "exclude_if": [],
    },
    JobCategory.AI_PRODUCT_MANAGER: {
        "must_contain_any": ["ai product manager", "ml product manager", "ai pm"],
        "boost_keywords": ["model evaluation", "ai roadmap", "responsible ai"],
        "exclude_if": [],
    },
    JobCategory.AI_SAFETY: {
        "must_contain_any": ["ai safety", "alignment", "responsible ai", "ai ethics"],
        "boost_keywords": ["red teaming", "guardrails", "rlhf", "constitutional ai"],
        "exclude_if": [],
    },
    JobCategory.MLOPS: {
        "must_contain_any": ["mlops", "ml ops", "ml platform", "ml infrastructure"],
        "boost_keywords": ["model serving", "feature store", "model monitoring", "kubeflow", "mlflow"],
        "exclude_if": [],
    },
    JobCategory.DATA_ANNOTATION: {
        "must_contain_any": ["data annotation", "data labeling", "ai trainer", "rlhf annotator"],
        "boost_keywords": ["training data", "annotation pipeline", "quality assurance"],
        "exclude_if": [],
    },
    JobCategory.AI_SOLUTIONS_ENGINEER: {
        "must_contain_any": ["ai solutions engineer", "ml solutions", "ai integration"],
        "boost_keywords": ["customer-facing", "implementation", "api integration"],
        "exclude_if": [],
    },
}


def classify_job(title: str, description: str = "") -> CategoryDecision:
    haystack = f"{title} {description}".lower()
    best = CategoryDecision(category=JobCategory.OTHER, confidence=0.2, reason="fallback")

    for category, rules in CATEGORY_RULES.items():
        if any(excluded in haystack for excluded in rules["exclude_if"]):
            continue

        title_matches = sum(1 for keyword in rules["must_contain_any"] if keyword in title.lower())
        boost_matches = sum(1 for keyword in rules["boost_keywords"] if keyword in haystack)

        if title_matches == 0 and boost_matches == 0:
            continue

        confidence = min(0.95, 0.45 + (title_matches * 0.2) + (boost_matches * 0.08))
        reason = f"title_matches={title_matches}, boost_matches={boost_matches}"
        if confidence > best.confidence:
            best = CategoryDecision(category=category, confidence=confidence, reason=reason)

    return best


def normalize_category(raw_category: str | JobCategory) -> JobCategory:
    if isinstance(raw_category, JobCategory):
        return raw_category

    candidate = raw_category.strip().lower()
    for category in JobCategory:
        if category.value == candidate:
            return category
    return JobCategory.OTHER


def has_ai_job_signal(text: str) -> bool:
    return bool(re.search(r"\b(ai|ml|llm|prompt|alignment|fine[- ]tuning)\b", text, re.I))
