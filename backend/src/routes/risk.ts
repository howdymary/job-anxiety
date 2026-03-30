import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { getOccupationRiskRecord, toOccupationRiskApiResponse } from "../../../shared/occupation-risk";
import { occupationSocParamsSchema } from "../lib/validation";
import { createRateLimitMiddleware } from "../middleware/rateLimit";

export const riskRoutes = new Hono();

riskRoutes.use("*", createRateLimitMiddleware({ keyPrefix: "risk:read", limit: 10, windowMs: 60_000 }));

riskRoutes.get("/:soc", zValidator("param", occupationSocParamsSchema), (c) => {
  const params = c.req.valid("param");
  const record = getOccupationRiskRecord(params.soc);

  if (!record) {
    return c.json(
      {
        error: {
          code: "NOT_FOUND",
          message: "Occupation not found."
        }
      },
      404
    );
  }

  c.header("Cache-Control", "public, max-age=3600");

  return c.json(toOccupationRiskApiResponse(record));
});
