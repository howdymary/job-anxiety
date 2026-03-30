import { sql } from "drizzle-orm";
import { getDatabase, hasDatabaseConnection } from "../db/client";
import { subscribers } from "../db/schema";

type NewsletterSubscribeInput = {
  email: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  source?: string | null;
  preferences?: Record<string, unknown>;
};

type NewsletterSubscribeResult = {
  accepted: true;
  provider: "database" | "stub";
  status: "active";
};

let subscriberTableReady = false;
let subscriberTableReadyPromise: Promise<void> | null = null;

async function ensureSubscriberTable() {
  if (subscriberTableReady) {
    return;
  }

  if (subscriberTableReadyPromise) {
    await subscriberTableReadyPromise;
    return;
  }

  subscriberTableReadyPromise = (async () => {
    const db = getDatabase();

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id uuid PRIMARY KEY,
        email text NOT NULL UNIQUE,
        confirmed boolean NOT NULL DEFAULT true,
        confirm_token text,
        preferences jsonb NOT NULL DEFAULT '{}'::jsonb,
        created_at timestamptz NOT NULL DEFAULT now(),
        unsubscribed_at timestamptz
      )
    `);

    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_subscribers_created_at
      ON subscribers (created_at DESC)
    `);

    subscriberTableReady = true;
  })();

  try {
    await subscriberTableReadyPromise;
  } finally {
    subscriberTableReadyPromise = null;
  }
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function buildPreferences({
  preferences,
  source,
  userAgent
}: Pick<NewsletterSubscribeInput, "preferences" | "source" | "userAgent">) {
  return {
    ...(preferences ?? {}),
    signupSource: source ?? "website",
    ...(userAgent ? { signupUserAgent: userAgent } : {})
  };
}

export async function subscribeToNewsletter({
  email,
  ipAddress,
  userAgent,
  source,
  preferences
}: NewsletterSubscribeInput): Promise<NewsletterSubscribeResult> {
  if (!hasDatabaseConnection()) {
    return {
      accepted: true,
      provider: "stub",
      status: "active"
    };
  }

  await ensureSubscriberTable();

  const db = getDatabase();
  const normalizedEmail = normalizeEmail(email);

  await db
    .insert(subscribers)
    .values({
      id: crypto.randomUUID(),
      email: normalizedEmail,
      confirmed: true,
        preferences: buildPreferences({
          preferences,
          source,
          userAgent
        }),
        unsubscribedAt: null
      })
    .onConflictDoUpdate({
      target: subscribers.email,
      set: {
        confirmed: true,
        preferences: buildPreferences({
          preferences,
          source,
          userAgent
        }),
        unsubscribedAt: null
      }
    });

  return {
    accepted: true,
    provider: "database",
    status: "active"
  };
}
