export type SupplierTransactionStatus =
  | "PENDING"
  | "PROCESSING"
  | "SUCCESS"
  | "FAILED"
  | "UNKNOWN";

export interface SupplierProduct {
  supplierSku: string;
  name: string;
  cost: number; // rupiah
  available: boolean;
}

export interface CreateSupplierTransactionInput {
  /** Kunci unik dari sistem kita, mencegah transaksi ganda ke supplier. */
  idempotencyKey: string;
  supplierSku: string;
  quantity: number;
}

export interface SupplierTransactionResult {
  supplierRef: string | null;
  status: SupplierTransactionStatus;
  /** Data pengiriman (kredensial/voucher) kalau sudah tersedia. */
  delivery?: Record<string, string>;
}

// Bentuk final akan disesuaikan dengan dokumentasi resmi Melostore (Phase 9).
export interface SupplierService {
  readonly name: string;
  getProducts(): Promise<SupplierProduct[]>;
  checkBalance(): Promise<{ balance: number }>;
  createTransaction(input: CreateSupplierTransactionInput): Promise<SupplierTransactionResult>;
  checkTransaction(idempotencyKey: string): Promise<SupplierTransactionResult>;
}