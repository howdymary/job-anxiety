/**
 * Basic API security headers and body-size guardrail.
 */

import { createMiddleware } from "hono/factory";
import { secureHeaders } from "hono/secure-headers";

const MAX_BODY_BYTES = 1024 * 1024;

const headersMiddleware = secureHeaders({
  xFrameOptions: "DENY",
  xContentTypeOptions: "nosniff",
  referrerPolicy: "strict-origin-when-cross-origin"
});

export const securityMiddleware = createMiddleware(async (c, next) => {
  const contentLength = c.req.header("content-length");
  if (contentLength && Number.parseInt(contentLength, 10) > MAX_BODY_BYTES) {
    return c.json(
      {
        error: {
          code: "PAYLOAD_TOO_LARGE",
          message: "Request body exceeds the 1MB limit."
        }
      },
      413
    );
  }

  return headersMiddleware(c, next);
});
