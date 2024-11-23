"use client";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import Link from "next/link";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-[70px] relative">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-3xl font-semibold">Cikistore</h1>
        {isSidebarOpen ? (
          <MdOutlineClose
            className="text-2xl lg:hidden"
            onClick={toggleSidebar}
          />
        ) : (
          <FaBars className="text-2xl lg:hidden" onClick={toggleSidebar} />
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-[340px] bg-white text-slate-800 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-20`}
      >
        <div className="h-32 flex justify-center items-center ">
          <Link href="/">
            <h1 className="text-3xl font-semibold">CikiStore</h1>
          </Link>
        </div>
        <div className="mx-3 mt-5">
          <Link href="/">
            <div
              className="border hover:border-slate-500 p-3 rounded-md w-full my-3 transition-all"
              onClick={toggleSidebar}
            >
              <h2 className="text-xl font-semibold">Dashboard</h2>
            </div>
          </Link>
          <Link href="/transaksi">
            <div
              className="border hover:border-slate-500 p-3 rounded-md w-full my-3 transition-all"
              onClick={toggleSidebar}
            >
              <h2 className="text-xl font-semibold">Transaksi</h2>
            </div>
          </Link>
          <Link href="/hutang">
            <div
              className="border hover:border-slate-500 p-3 rounded-md w-full my-3 transition-all"
              onClick={toggleSidebar}
            >
              <h2 className="text-xl font-semibold">Hutang</h2>
            </div>
          </Link>
        </div>
      </div>

      {/* Overlay behind the Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Header;
