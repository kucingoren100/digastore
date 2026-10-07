import { describe, expect, it } from "vitest";
import { AppError, ExternalServiceError, ForbiddenError } from "@/lib/errors";

describe("AppError", () => {
  it("ForbiddenError punya status 403", () => {
    const err = new ForbiddenError();
    expect(err).toBeInstanceOf(AppError);
    expect(err.httpStatus).toBe(403);
  });

  it("detail teknis tidak bocor ke publicMessage", () => {
    const err = new ExternalServiceError("Melostore timeout di 10.0.0.5:443");
    expect(err.message).toContain("Melostore");
    expect(err.publicMessage).not.toContain("Melostore");
    expect(err.publicMessage).toBe("Terjadi kesalahan saat memproses transaksi.");
  });
});