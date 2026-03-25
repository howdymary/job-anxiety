/**
 * Subscriber route scaffolds.
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createRateLimitMiddleware } from "../middleware/rateLimit";
import { subscriberConfirmSchema, subscriberCreateSchema } from "../lib/validation";

export const subscribersRoutes = new Hono();

subscribersRoutes.use("*", createRateLimitMiddleware({ keyPrefix: "subscribers:write", limit: 10, windowMs: 60_000 }));

subscribersRoutes.post("/", zValidator("json", subscriberCreateSchema), (c) => {
  const payload = c.req.valid("json");

  return c.json(
    {
      accepted: true,
      email: payload.email,
      status: "pending_confirmation"
    },
    201
  );
});

subscribersRoutes.post("/confirm", zValidator("json", subscriberConfirmSchema), (c) => {
  const payload = c.req.valid("json");

  return c.json({
    confirmed: true,
    email: payload.email
  });
});
