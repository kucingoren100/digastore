import "server-only";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_ENV: z.enum(["development", "staging", "production"]).default("development"),
  APP_URL: z.string().url(),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  DATABASE_URL: z.string().url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // Tampilkan NAMA variabel yang salah saja, tidak pernah menampilkan nilainya.
  const fields = Object.keys(parsed.error.flatten().fieldErrors).join(", ");
  throw new Error(`Environment variable tidak valid: ${fields}`);
}

export const env = parsed.data;