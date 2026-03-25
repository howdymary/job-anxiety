# Reframe

Reframe is a full-stack platform for people anxious about AI job displacement. It surfaces the job categories AI is creating, explains how to break into them, and keeps the data fresh through a scraper + enrichment pipeline.

## Stack

- `frontend/`: Next.js 14 App Router + TypeScript
- `backend/`: Hono API + Drizzle ORM + PostgreSQL
- `scraper/`: Python 3.12 multi-source job collector
- `shared/`: cross-app types and constants

## Local Setup

1. Copy `.env.example` to `.env`.
2. Start the stack with Docker:

```bash
docker compose up --build
```

3. Open the apps:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

## What Runs Locally

- `frontend` serves the public site and job board UX.
- `backend` exposes API endpoints for jobs, companies, trends, and subscriber signup, backed by stable mock data in the first pass.
- `db` provides PostgreSQL 16 for persistence.
- `redis` supports caching, rate limiting, and queued work.
- `scraper` is opt-in via the `scraping` profile so it can run on demand.

## Project Goals

- Index AI-related jobs from public sources.
- Classify companies into `fortune_500`, `vc_backed`, and `high_revenue`.
- Keep the experience empowering, transparent, and accessible.
- Prefer official APIs and public structured data over brittle scraping.

## Security Baseline

- Keep secrets in `.env` for local work or a hosted secret manager in production.
- Never commit API keys, database passwords, or session tokens.
- Respect `robots.txt`, rate limits, and public source terms when scraping.
- Sanitize all user-rendered content and set strict security headers.

## CI

GitHub Actions runs the root checks and then validates the frontend, backend, and scraper packages when those workspaces are present.
