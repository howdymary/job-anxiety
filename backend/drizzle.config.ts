/**
 * Drizzle configuration for local schema generation.
 * Keep this aligned with DATABASE_URL from the project root `.env`.
 */

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgresql://reframe:reframe_password@localhost:5432/reframe"
  }
});
