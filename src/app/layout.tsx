import type { Metadata } from "next";
import { env } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(env.APP_URL),
  title: { default: "Digastore", template: "%s | Digastore" },
  description: "Toko produk digital terpercaya dengan proses cepat dan aman.",
  openGraph: {
    title: "Digastore",
    description: "Toko produk digital terpercaya dengan proses cepat dan aman.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}