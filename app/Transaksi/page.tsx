"use client";
import React, { useEffect, useState } from "react";
import Tambah from "./action/tambah";
import axios from "axios";
import Link from "next/link";
import Loading from "../components/loading";

const Transaksi = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTransaksi();
  }, []);

  const loadTransaksi = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/transaksi");
      const hasil = res.data.transaksi;
      setTransaksi(hasil);
    } catch (error) {
      console.log("Terjadi Kesalahan", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-slate-400/15 p-5 rounded-lg w-full lg:h-20 flex items-center text-white mb-4">
        <h1>Transaksi</h1>
      </div>
      <div className="bg-slate-400/15 p-5 rounded-lg w-full text-white">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-semibold">Daftar Transaksi</h1>
          <Tambah reload={loadTransaksi} />
        </div>
        <div className="w-full text-center">{isLoading && <Loading />}</div>
        {transaksi.map((item: any) => (
          <div key={item.id}>
            <Link href={`/penjualan?id=${item.id}`}>
              <div className="flex justify-between p-3 hover:bg-slate-400/25 transition-all rounded-lg cursor-pointer">
                <p>{item.nama}</p>
                <p className="text-green-400 font-semibold">Rp 0</p>
              </div>
              <div className="divider"></div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Transaksi;
