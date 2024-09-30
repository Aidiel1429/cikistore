"use client";
import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="bg-slate-400/15 p-5 rounded-lg w-full lg:h-20 mb-4 flex items-center justify-between text-white">
        <Link href={"/"}>
          <h1 className="font-bold text-xl">CikiStore</h1>
        </Link>
        <div className="lg:hidden" onClick={handleShow}>
          <GiHamburgerMenu className="text-xl font-bold " />
        </div>
      </div>
      <div
        className={
          show
            ? "bg-slate-400/15 p-5 rounded-lg w-full lg:h-20 mb-4 text-white text-center lg:hidden"
            : "hidden"
        }
      >
        <Link href={"/"}>
          <div className="hover:bg-slate-400/25 p-3 rounded-lg transition-all cursor-pointer">
            <h1>Dashboard</h1>
          </div>
        </Link>
        <Link href={"/Transaksi"}>
          <div className="hover:bg-slate-400/25 p-3 rounded-lg transition-all cursor-pointer">
            <h1>Transaksi</h1>
          </div>
        </Link>
        <Link href={"/Hutang"}>
          <div className="hover:bg-slate-400/25 p-3 rounded-lg transition-all cursor-pointer">
            <h1>Hutang</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
