import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string } | null;
  const email = body?.email?.trim();

  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const rawApiBaseUrl =
    process.env.JOBANXIETY_API_BASE_URL ??
    process.env.JOBANXIETY_API_HOSTPORT ??
    (process.env.NODE_ENV === "production" ? "https://jobanxiety-api.onrender.com" : "http://localhost:8080");
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
      return NextResponse.json({ error: "The backend rejected the signup request." }, { status: response.status });
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
