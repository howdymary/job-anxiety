/**
 * Minimal CORS guardrail for the first backend pass.
 * Defaults to localhost frontend origins and can be overridden via ALLOWED_ORIGINS.
 */

import { cors } from "hono/cors";

const allowedOrigins = (
  process.env.ALLOWED_ORIGINS ??
  process.env.CORS_ORIGIN ??
  "http://localhost:3000,http://127.0.0.1:3000"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const corsMiddleware = cors({
  origin: (origin) => {
    if (!origin) {
      return allowedOrigins[0] ?? "http://localhost:3000";
    }

    return allowedOrigins.includes(origin) ? origin : allowedOrigins[0] ?? "http://localhost:3000";
  },
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true
});
