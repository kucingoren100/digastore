import Image from "next/image";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Digastore</h1>
      <p className="text-slate-500 dark:text-slate-400">
        Toko produk digital. Segera hadir.
      </p>
    </main>
  );
}
