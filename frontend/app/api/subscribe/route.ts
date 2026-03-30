import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const defaultProductionApiBaseUrl = "https://jobanxiety-api.onrender.com";
const defaultBeehiivPublicationUrl = "https://jobanxiety.beehiiv.com";

function decodeHtml(value: string) {
  return value
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function getBeehiivPublicationUrl() {
  return process.env.BEEHIIV_PUBLICATION_URL?.trim() || defaultBeehiivPublicationUrl;
}

async function subscribeWithBeehiiv(email: string) {
  const apiKey = process.env.BEEHIIV_API_KEY?.trim();
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID?.trim();

  if (!apiKey || !publicationId) {
    return null;
  }

  const response = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      reactivate_existing: false,
      send_welcome_email: true,
      double_opt_override: "not_set",
      utm_source: "jobanxiety.ai",
      utm_medium: "website",
      utm_campaign: "weekly_market_brief",
      referring_site: "https://jobanxiety.ai/newsletter"
    }),
    cache: "no-store"
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload?.errors?.[0]?.message ??
      payload?.message ??
      "Beehiiv rejected the signup request.";

    return NextResponse.json({ error: message }, { status: response.status });
  }

  return NextResponse.json({
    accepted: true,
    provider: "beehiiv",
    status: payload?.data?.status ?? "pending_confirmation"
  });
}

async function subscribeWithHostedBeehiivForm(email: string) {
  const publicationUrl = getBeehiivPublicationUrl();
  const signupPageResponse = await fetch(`${publicationUrl}/?modal=signup`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; JobAnxiety.ai newsletter signup)"
    },
    cache: "no-store"
  });

  if (!signupPageResponse.ok) {
    throw new Error(`Hosted signup page returned ${signupPageResponse.status}`);
  }

  const signupPage = await signupPageResponse.text();
  const formMatch = signupPage.match(/<form[^>]*action="([^"]*\/create[^"]*)"[^>]*>([\s\S]*?)<\/form>/i);

  if (!formMatch) {
    throw new Error("Hosted Beehiiv signup form was not found.");
  }

  const actionUrl = new URL(formMatch[1], publicationUrl).toString();
  const formMarkup = formMatch[2];
  const body = new URLSearchParams();
  const inputPattern = /<input\b([^>]*)>/gi;
  let inputMatch: RegExpExecArray | null = null;

  while ((inputMatch = inputPattern.exec(formMarkup)) !== null) {
    const attributes = inputMatch[1] ?? "";
    const nameMatch = attributes.match(/\bname="([^"]+)"/i);

    if (!nameMatch) {
      continue;
    }

    const name = decodeHtml(nameMatch[1]);
    if (!name) {
      continue;
    }

    const valueMatch = attributes.match(/\bvalue="([^"]*)"/i);
    const value = valueMatch ? decodeHtml(valueMatch[1]) : "";
    body.set(name, value);
  }

  body.set("email", email);

  const response = await fetch(actionUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0 (compatible; JobAnxiety.ai newsletter signup)"
    },
    body: body.toString(),
    redirect: "manual",
    cache: "no-store"
  });

  const redirectLocation = response.headers.get("location");

  if (response.status >= 300 && response.status < 400) {
    if (redirectLocation?.includes("submission_success=true")) {
      return NextResponse.json({
        accepted: true,
        provider: "beehiiv_hosted",
        status: "active"
      });
    }

    const failureMessage =
      redirectLocation?.includes("submission_failure=true") || redirectLocation?.includes("error")
        ? "Beehiiv hosted signup rejected the request."
        : "Beehiiv hosted signup redirected unexpectedly.";

    return NextResponse.json({ error: failureMessage }, { status: 502 });
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload?.toast?.message ??
      payload?.message ??
      "Beehiiv hosted signup rejected the request.";

    return NextResponse.json({ error: message }, { status: response.status });
  }

  return NextResponse.json({
    accepted: true,
    provider: "beehiiv_hosted",
    status: payload?.toast?.status === "success" ? "active" : "pending_confirmation"
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string } | null;
  const email = body?.email?.trim();

  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const beehiivResponse = await subscribeWithBeehiiv(email);
    if (beehiivResponse) {
      return beehiivResponse;
    }
  } catch {
    return NextResponse.json({ error: "Beehiiv signup is unavailable right now. Please try again in a few minutes." }, { status: 503 });
  }

  try {
    return await subscribeWithHostedBeehiivForm(email);
  } catch {
    // Fall through to the backend route if the hosted flow is unavailable.
  }

  const rawApiBaseUrl =
    process.env.JOBANXIETY_API_BASE_URL ??
    process.env.JOBANXIETY_API_HOSTPORT ??
    (process.env.NODE_ENV === "production" ? defaultProductionApiBaseUrl : "http://localhost:8080");
  const apiBaseUrl = /^https?:\/\//i.test(rawApiBaseUrl) ? rawApiBaseUrl : `http://${rawApiBaseUrl}`;

  try {
    const response = await fetch(`${apiBaseUrl}/api/v1/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        preferences: {
          categories: [],
          tiers: [],
          locationTypes: []
        }
      }),
      cache: "no-store"
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: payload?.error?.message ?? "The backend rejected the signup request.",
          code: payload?.error?.code,
          hostedSignupUrl: payload?.hostedSignupUrl
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      accepted: true,
      status: payload?.status ?? "pending_confirmation"
    });
  } catch {
    return NextResponse.json(
      { error: "Newsletter signup is unavailable until the backend is running." },
      { status: 503 }
    );
  }
}
