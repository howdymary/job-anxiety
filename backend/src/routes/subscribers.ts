/**
 * Subscriber route scaffolds.
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createRateLimitMiddleware } from "../middleware/rateLimit";
import { subscribeToNewsletter } from "../lib/buttondown";
import { subscriberConfirmSchema, subscriberCreateSchema } from "../lib/validation";

export const subscribersRoutes = new Hono();

subscribersRoutes.use("*", createRateLimitMiddleware({ keyPrefix: "subscribers:write", limit: 10, windowMs: 60_000 }));

subscribersRoutes.post("/", zValidator("json", subscriberCreateSchema), async (c) => {
  const payload = c.req.valid("json");
  const forwardedFor = c.req.header("x-forwarded-for");
  const ipAddress = c.req.header("cf-connecting-ip") ?? forwardedFor?.split(",")[0]?.trim() ?? null;

  try {
    const result = await subscribeToNewsletter({
      email: payload.email,
      ipAddress
    });

    return c.json(
      {
        accepted: result.accepted,
        email: payload.email,
        status: result.status
      },
      201
    );
  } catch (error) {
    console.error("[newsletter-signup]", error);

    return c.json(
      {
        error: {
          code: "NEWSLETTER_PROVIDER_ERROR",
          message: "Newsletter signup is temporarily unavailable."
        }
      },
      502
    );
  }
});

subscribersRoutes.post("/confirm", zValidator("json", subscriberConfirmSchema), (c) => {
  const payload = c.req.valid("json");

  return c.json({
    confirmed: true,
    email: payload.email
  });
});
