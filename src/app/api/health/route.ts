import { NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const GET = apiHandler(async (_req, { log }) => {
  let db: "ok" | "down" = "ok";

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (err) {
    db = "down";
    log.error({ err }, "database health check failed");
  }

  return NextResponse.json(
    {
      status: db === "ok" ? "ok" : "degraded",
      db,
      env: env.APP_ENV,
      time: new Date().toISOString(),
    },
    { status: db === "ok" ? 200 : 503 },
  );
});