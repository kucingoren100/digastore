import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

config({ path: ".env.local" }); // dipakai Next.js di lokal
config(); // fallback ke .env (mis. di server/CI)

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: env("DATABASE_URL") },
});