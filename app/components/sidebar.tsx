"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  // Fungsi untuk mengecek apakah link aktif
  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-[350px]">
      <div className="h-32 flex justify-center items-center">
        <Link href="/">
          <h1 className="text-3xl font-semibold">CikiStore</h1>
        </Link>
      </div>
      <div className="mx-3 mt-5">
        <Link href="/">
          <div
            className={`border p-3 rounded-md w-full my-3 transition-all ${
              isActive("/") ? "border-slate-500" : "hover:border-slate-500"
            }`}
          >
            <h2 className="text-xl font-semibold">Dashboard</h2>
          </div>
        </Link>
        <Link href="/transaksi">
          <div
            className={`border p-3 rounded-md w-full my-3 transition-all ${
              isActive("/transaksi")
                ? "border-slate-500"
                : "hover:border-slate-500"
            }`}
          >
            <h2 className="text-xl font-semibold">Transaksi</h2>
          </div>
        </Link>
        <Link href="/hutang">
          <div
            className={`border p-3 rounded-md w-full my-3 transition-all ${
              isActive("/hutang")
                ? "border-slate-500"
                : "hover:border-slate-500"
            }`}
          >
            <h2 className="text-xl font-semibold">Hutang</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
