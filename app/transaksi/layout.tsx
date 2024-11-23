import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cikistore | Penjualan",
  description: "Halaman Penjualan Cikistore untuk mengelola data penjualan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
