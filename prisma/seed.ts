import { config } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

config({ path: ".env.local" });
config();

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL belum di-set");

  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

  try {
    const streaming = await prisma.category.upsert({
      where: { slug: "streaming" },
      update: {},
      create: { name: "Streaming", slug: "streaming", description: "Layanan streaming" },
    });

    const voucher = await prisma.category.upsert({
      where: { slug: "voucher" },
      update: {},
      create: { name: "Voucher", slug: "voucher", description: "Voucher digital" },
    });

    const samples = [
      { name: "Produk Contoh A", slug: "produk-contoh-a", sku: "SAMPLE-A", cost: 10000, price: 13000, categoryId: streaming.id },
      { name: "Produk Contoh B", slug: "produk-contoh-b", sku: "SAMPLE-B", cost: 25000, price: 30000, categoryId: streaming.id },
      { name: "Voucher Contoh C", slug: "voucher-contoh-c", sku: "SAMPLE-C", cost: 48000, price: 52000, categoryId: voucher.id },
    ];

    for (const p of samples) {
      await prisma.product.upsert({
        where: { sku: p.sku },
        update: {},
        create: {
          name: p.name,
          slug: p.slug,
          sku: p.sku,
          description: "Data contoh untuk development.",
          supplierCost: p.cost,
          sellingPrice: p.price,
          supplierCode: "mock",
          supplierSku: `MOCK-${p.sku}`,
          categoryId: p.categoryId,
        },
      });
    }

    console.log("Seed selesai: 2 kategori, 3 produk contoh.");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});