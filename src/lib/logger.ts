import "server-only";
import pino from "pino";
import { env } from "@/lib/env";

export const logger = pino({
  level: env.LOG_LEVEL,
  base: { service: "digastore", env: env.APP_ENV },
  timestamp: pino.stdTimeFunctions.isoTime,
  // Field dengan nama ini otomatis disensor jadi [REDACTED] di log.
  redact: {
    paths: [
      "password",
      "*.password",
      "apiKey",
      "*.apiKey",
      "secret",
      "*.secret",
      "token",
      "*.token",
      "authorization",
      "headers.authorization",
      "headers.cookie",
    ],
    censor: "[REDACTED]",
  },
});