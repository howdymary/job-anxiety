# Job Anxiety

Job Anxiety is a full-stack platform for people anxious about AI job displacement. It surfaces the job categories AI is creating, explains how to break into them, and keeps the data fresh through a scraper + enrichment pipeline.

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

## Deploying To Render

This repo includes a Render Blueprint at `render.yaml`.

### Services

- `jobanxiety-web`: Next.js frontend from `frontend/`
- `jobanxiety-api`: Hono backend from `backend/`

The frontend talks to the backend over Render's private network via `JOBANXIETY_API_HOSTPORT`, so you do not need a public API domain for the current stack.

### Render Setup

1. Push this repo to GitHub.
2. In Render, create a new Blueprint and point it at the repo.
3. Let Render create both web services from `render.yaml`.
4. Wait for the first deploy to finish.
5. Open `jobanxiety-web` in Render and confirm the custom domain listed there is `jobanxiety.ai`.

### Cloudflare DNS

Create these DNS records in the `jobanxiety.ai` zone:

- `CNAME` `@` → the `jobanxiety-web` Render hostname
- `CNAME` `www` → the same `jobanxiety-web` Render hostname

Cloudflare supports apex-domain CNAME flattening, so using `@` is valid.

For first verification, set both records to `DNS only`. After Render issues the TLS certificate and the domain is live, you can switch them back to `Proxied` if you want Cloudflare in front.

### Recommended Cloudflare SSL Setting

- SSL/TLS mode: `Full`

### Current Production Notes

- The backend is still backed by mock data, so no Postgres or Redis service is required for this first production deploy.
- Newsletter signup syncs to Buttondown when `BUTTONDOWN_API_KEY` is set on `jobanxiety-api`. Without that secret, the UI still falls back to the current pending-confirmation stub.

## Newsletter Automation

The easiest cheap setup for `jobanxiety.ai` is:

1. Use Buttondown for subscriber management and delivery.
2. Keep the site signup form on `jobanxiety.ai/newsletter`.
3. Let the backend forward signups to Buttondown.
4. Use the GitHub Actions workflow at `.github/workflows/newsletter-draft.yml` to create a draft of the weekly Market Brief every Monday.
5. Review the draft in Buttondown before sending while the published dataset is still intentionally narrower than the full product vision.

### Setup Steps

1. Create a Buttondown newsletter and verify `brief@jobanxiety.ai` as the sending address.
2. Add `BUTTONDOWN_API_KEY` to the `jobanxiety-api` Render service so new site subscribers are written to Buttondown.
3. Add the same `BUTTONDOWN_API_KEY` as a GitHub Actions secret in the `howdymary/job-anxiety` repository.
4. Leave `BUTTONDOWN_EMAIL_STATUS=draft` until you are comfortable automating the final send.
5. Run the `Newsletter Draft` workflow manually once to confirm the subject line and body format look right in Buttondown.

### Local Preview

To preview the generated issue body without creating anything in Buttondown:

```bash
cd /Users/maryliu/job-anxiety
node scripts/create-market-brief-draft.mjs --dry-run
```
