export type ErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "EXTERNAL_SERVICE_ERROR"
  | "INTERNAL_ERROR";

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    public readonly httpStatus: number,
    /** Pesan aman yang boleh dilihat customer. */
    public readonly publicMessage: string,
    /** Detail teknis, hanya untuk log server. */
    message?: string,
    public readonly details?: unknown,
  ) {
    super(message ?? publicMessage);
    this.name = new.target.name;
  }
}

export class ValidationError extends AppError {
  constructor(details?: unknown) {
    super("VALIDATION_ERROR", 400, "Data yang dikirim tidak valid.", undefined, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor() {
    super("UNAUTHORIZED", 401, "Silakan login terlebih dahulu.");
  }
}

export class ForbiddenError extends AppError {
  constructor() {
    super("FORBIDDEN", 403, "Anda tidak memiliki akses.");
  }
}

export class NotFoundError extends AppError {
  constructor(what = "Data") {
    super("NOT_FOUND", 404, `${what} tidak ditemukan.`);
  }
}

export class ConflictError extends AppError {
  constructor(publicMessage = "Data sudah ada.") {
    super("CONFLICT", 409, publicMessage);
  }
}

export class ExternalServiceError extends AppError {
  constructor(internalMessage: string, details?: unknown) {
    super(
      "EXTERNAL_SERVICE_ERROR",
      502,
      "Terjadi kesalahan saat memproses transaksi.",
      internalMessage,
      details,
    );
  }
}