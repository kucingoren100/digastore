import { describe, expect, it } from "vitest";
import { calculateMargin } from "@/lib/money";

describe("calculateMargin", () => {
  it("menghitung profit dan margin dengan benar", () => {
    expect(calculateMargin(10000, 13000)).toEqual({
      supplierCost: 10000,
      sellingPrice: 13000,
      profit: 3000,
      marginPercent: 23.08,
    });
  });

  it("menolak harga desimal", () => {
    expect(() => calculateMargin(10000.5, 13000)).toThrow();
  });

  it("menolak harga negatif", () => {
    expect(() => calculateMargin(-1, 13000)).toThrow();
  });

  it("tidak error saat harga jual 0", () => {
    expect(calculateMargin(0, 0).marginPercent).toBe(0);
  });
});