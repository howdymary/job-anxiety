import { writeFile } from "node:fs/promises";

const DEFAULT_SITE_URL = "https://jobanxiety.ai";
const BUTTONDOWN_EMAILS_URL = "https://api.buttondown.com/v1/emails";

function normalizeSiteUrl(value) {
  return (value || DEFAULT_SITE_URL).replace(/\/+$/, "");
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatTimestamp(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
    timeZoneName: "short"
  }).format(new Date(value));
}

function buildSubject(feed) {
  return `${formatNumber(feed.stats.totalOpenRoles)} live AI roles · ${formatNumber(feed.stats.companiesHiring)} companies hiring · The Market Brief`;
}

function buildRoleBullet(role) {
  return `- **${role.familyLabel}** leads with **${formatNumber(role.totalOpenings)}** openings across **${formatNumber(role.companyCount)}** companies.`;
}

function buildCompanyBullet(company) {
  return `- **${company.company}** currently has **${formatNumber(company.openRoles)}** open roles.`;
}

function buildJobBullet(siteUrl, job) {
  const locationParts = [job.location, job.workplaceLabel]
    .filter(Boolean)
    .filter((value, index, values) => values.findIndex((entry) => entry.toLowerCase() === value.toLowerCase()) === index);
  const location = locationParts.join(" · ");
  return `- [${job.title} — ${job.company}](${siteUrl}/jobs/${job.slug}) · ${location}`;
}

function buildBody(siteUrl, feed) {
  const topRoles = Array.isArray(feed.roleMomentum) ? feed.roleMomentum.slice(0, 3) : [];
  const topCompanies = Array.isArray(feed.hiringCompanies) ? feed.hiringCompanies.slice(0, 3) : [];
  const topJobs = Array.isArray(feed.trendingJobs) && feed.trendingJobs.length > 0 ? feed.trendingJobs.slice(0, 5) : [];

  return [
    "Hi,",
    `Here is the current monitored hiring snapshot from JobAnxiety.ai as of ${formatTimestamp(feed.generatedAt)}.`,
    "## The number",
    `**${formatNumber(feed.stats.totalOpenRoles)}** live AI roles are currently tracked across **${formatNumber(feed.stats.companiesHiring)}** hiring companies in the monitored set.`,
    "## What moved",
    `- ${feed.headline}`,
    `- **${formatNumber(feed.stats.companiesHiring)}** companies are actively hiring across the monitored board set.`,
    `- **${formatNumber(feed.stats.liveJobSources)}/${formatNumber(feed.stats.totalJobSources)}** live job sources refreshed successfully in the latest cycle.`,
    "## Role momentum",
    ...(topRoles.length > 0 ? topRoles.map(buildRoleBullet) : ["- Add the three strongest role families from the live board this week."]),
    "## Companies to watch",
    ...(topCompanies.length > 0
      ? topCompanies.map(buildCompanyBullet)
      : ["- Add the hiring companies drawing the most attention this week."]),
    "## Roles to watch",
    ...(topJobs.length > 0
      ? topJobs.map((job) => buildJobBullet(siteUrl, job))
      : ["- Add the top live roles you want readers to click through to this week."]),
    "## One guide",
    `- [Check your occupation](${siteUrl}/check-your-occupation?soc=15-1252) for the public occupation brief.`,
    `- [Will AI replace software engineers?](${siteUrl}/career-notes/will-ai-replace-software-engineers) for the flagship career note.`,
    "## Trust note",
    `Everything above is sourced from the monitored public board set exposed on [Research](${siteUrl}/research), with the sourcing approach published on [Methodology](${siteUrl}/methodology).`,
    "Until next week,",
    "The Market Brief"
  ].join("\n\n");
}

async function fetchHomepageFeed(siteUrl) {
  const response = await fetch(`${siteUrl}/api/homepage-feed`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "jobanxiety-newsletter-bot/1.0 (+https://jobanxiety.ai)"
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Homepage feed request failed with ${response.status}: ${body.slice(0, 240)}`);
  }

  return response.json();
}

async function createButtondownDraft({ apiKey, subject, body, status }) {
  const response = await fetch(BUTTONDOWN_EMAILS_URL, {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      subject,
      body,
      status
    })
  });

  if (!response.ok) {
    const payload = await response.text();
    throw new Error(`Buttondown email create failed with ${response.status}: ${payload.slice(0, 240)}`);
  }

  return response.json();
}

async function writeStepSummary(subject, body, mode) {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryPath) {
    return;
  }

  const preview = [
    `# Newsletter ${mode === "draft" ? "draft" : "run"}`,
    "",
    `**Subject:** ${subject}`,
    "",
    "```md",
    body,
    "```"
  ].join("\n");

  await writeFile(summaryPath, preview, "utf8");
}

async function main() {
  const siteUrl = normalizeSiteUrl(process.env.JOBANXIETY_SITE_URL);
  const mode = process.env.BUTTONDOWN_EMAIL_STATUS?.trim() || "draft";
  const dryRun = process.argv.includes("--dry-run");
  const feed = await fetchHomepageFeed(siteUrl);
  const subject = buildSubject(feed);
  const body = buildBody(siteUrl, feed);

  await writeStepSummary(subject, body, mode);

  if (dryRun || !process.env.BUTTONDOWN_API_KEY) {
    console.log(`Subject: ${subject}\n`);
    console.log(body);
    return;
  }

  const payload = await createButtondownDraft({
    apiKey: process.env.BUTTONDOWN_API_KEY,
    subject,
    body,
    status: mode
  });

  console.log(
    `Created Buttondown ${mode} for "${subject}"${payload?.id ? ` (id: ${payload.id})` : ""}.`
  );
}

main().catch((error) => {
  console.error("[newsletter-draft]", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
