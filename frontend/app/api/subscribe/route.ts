import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const defaultProductionApiBaseUrl = "https://jobanxiety-api.onrender.com";

function getApiBaseUrl() {
  const rawApiBaseUrl =
    process.env.JOBANXIETY_API_BASE_URL ??
    process.env.JOBANXIETY_API_HOSTPORT ??
    (process.env.NODE_ENV === "production" ? defaultProductionApiBaseUrl : "http://localhost:8080");

  return /^https?:\/\//i.test(rawApiBaseUrl) ? rawApiBaseUrl : `http://${rawApiBaseUrl}`;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string } | null;
  const email = body?.email?.trim();

  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/v1/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(request.headers.get("user-agent") ? { "User-Agent": request.headers.get("user-agent") as string } : {}),
        ...(request.headers.get("referer") ? { Referer: request.headers.get("referer") as string } : {})
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
          code: payload?.error?.code
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      accepted: true,
      provider: payload?.provider ?? "database",
      status: payload?.status ?? "active"
    });
  } catch {
    return NextResponse.json(
      { error: "Newsletter signup is unavailable until the backend is running." },
      { status: 503 }
    );
  }
}
