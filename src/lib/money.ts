export type MarginResult = {
  supplierCost: number;
  sellingPrice: number;
  profit: number;
  marginPercent: number;
};

/** Dihitung SERVER-SIDE. Margin = profit / harga jual. */
export function calculateMargin(supplierCost: number, sellingPrice: number): MarginResult {
  if (!Number.isInteger(supplierCost) || !Number.isInteger(sellingPrice)) {
    throw new Error("Harga harus berupa bilangan bulat (rupiah).");
  }
  if (supplierCost < 0 || sellingPrice < 0) {
    throw new Error("Harga tidak boleh negatif.");
  }

  const profit = sellingPrice - supplierCost;
  const marginPercent =
    sellingPrice === 0 ? 0 : Math.round((profit / sellingPrice) * 10000) / 100;

  return { supplierCost, sellingPrice, profit, marginPercent };
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}