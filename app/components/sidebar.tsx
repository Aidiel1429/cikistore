import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="hidden lg:block lg:bg-slate-400/15 lg:p-5 lg:rounded-lg lg:w-96 lg:text-white lg:h-full">
      <Link href={"/"}>
        <h1 className="text-xl font-bold text-center">CikiStore</h1>
      </Link>
      <div className="mt-10">
        <div className="mb-3">
          <p className="text-sm text-slate-400 mb-2">Dashboard</p>
          <Link href={"/"}>
            <div className="hover:bg-slate-400/25 p-3 rounded-lg transition-all cursor-pointer">
              <p>Dashboard</p>
            </div>
          </Link>
        </div>
        <div>
          <p className="text-sm text-slate-400 mb-2">Master</p>
          <Link href={"/Transaksi"}>
            <div className="hover:bg-slate-400/25 p-3 rounded-lg transition-all cursor-pointer">
              <p>Transaksi</p>
            </div>
          </Link>
          <Link href={"/Hutang"}>
            <div className="hover:bg-slate-400/25 p-3 rounded-lg transition-all cursor-pointer">
              <p>Hutang</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
