import "server-only";
import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import type { Logger } from "pino";
import { logger } from "@/lib/logger";
import { AppError, ValidationError } from "@/lib/errors";

type HandlerContext = { requestId: string; log: Logger };
type Handler = (req: NextRequest, ctx: HandlerContext) => Promise<Response>;

export function apiHandler(handler: Handler) {
  return async (req: NextRequest): Promise<Response> => {
    const requestId = req.headers.get("x-request-id") ?? crypto.randomUUID();
    const log = logger.child({
      requestId,
      method: req.method,
      path: req.nextUrl.pathname,
    });

    try {
      const res = await handler(req, { requestId, log });
      res.headers.set("x-request-id", requestId);
      return res;
    } catch (err) {
      const appError =
        err instanceof ZodError
          ? new ValidationError(err.flatten().fieldErrors)
          : err instanceof AppError
            ? err
            : null;

      if (appError) {
        // Error yang diharapkan (validasi, 404, dll.): warn saja.
        log.warn({ code: appError.code, details: appError.details }, appError.message);
        return NextResponse.json(
          {
            error: {
              code: appError.code,
              message: appError.publicMessage,
              // Detail field hanya untuk error validasi (aman ditampilkan).
              ...(appError instanceof ValidationError && { details: appError.details }),
              requestId,
            },
          },
          { status: appError.httpStatus, headers: { "x-request-id": requestId } },
        );
      }

      // Error tak terduga: detail masuk log, customer hanya lihat pesan umum.
      log.error({ err }, "unhandled error");
      return NextResponse.json(
        {
          error: {
            code: "INTERNAL_ERROR",
            message: "Terjadi kesalahan saat memproses transaksi.",
            requestId,
          },
        },
        { status: 500, headers: { "x-request-id": requestId } },
      );
    }
  };
}