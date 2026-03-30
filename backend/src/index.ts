/**
 * Job Anxiety backend entrypoint.
 * Wires the Hono application, core middleware, and versioned route modules.
 */

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { companiesRoutes } from "./routes/companies";
import { jobsRoutes } from "./routes/jobs";
import { occupationsRoutes } from "./routes/occupations";
import { riskRoutes } from "./routes/risk";
import { subscribersRoutes } from "./routes/subscribers";
import { trendsRoutes } from "./routes/trends";
import { corsMiddleware } from "./middleware/cors";
import { securityMiddleware } from "./middleware/security";

const app = new Hono();

app.use("*", securityMiddleware);
app.use("/api/*", corsMiddleware);

app.get("/health", (c) =>
  c.json({
    ok: true,
    service: "job-anxiety-backend",
    version: "0.1.0"
  })
);

app.route("/api/v1/jobs", jobsRoutes);
app.route("/api/v1/companies", companiesRoutes);
app.route("/api/v1/occupations", occupationsRoutes);
app.route("/api/v1/risk", riskRoutes);
app.route("/api/v1/trends", trendsRoutes);
app.route("/api/v1/subscribers", subscribersRoutes);

app.notFound((c) => {
  return c.json(
    {
      error: {
        code: "NOT_FOUND",
        message: "Route not found."
      }
    },
    404
  );
});

app.onError((error, c) => {
  console.error("[job-anxiety-backend]", error);

  return c.json(
    {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong."
      }
    },
    500
  );
});

const port = Number.parseInt(process.env.PORT ?? "8080", 10);

serve(
  {
    fetch: app.fetch,
    port
  },
  () => {
    console.log(`[job-anxiety-backend] listening on http://localhost:${port}`);
  }
);
