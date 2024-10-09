"use client";
import React, { useEffect, useState } from "react";
import Tambah from "./action/tambah";
import axios from "axios";
import Link from "next/link";
import Loading from "../components/loading";
import { penjualanTb } from "@prisma/client";
import Hapus from "./action/hapus";

// Definisikan tipe untuk transaksi
interface Transaksi {
  id: string;
  nama: string;
  penjualan: penjualanTb[];
}

const Transaksi = () => {
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("api/transaksi");
      const data = res.data;
      setTransaksi(data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk menghitung keuntungan
  const hitungKeuntungan = (penjualan: penjualanTb[]): number => {
    let totalPendapatan = 0;
    let totalModal = 0;

    penjualan.forEach((item) => {
      totalPendapatan += item.pendapatan || 0;
      totalModal += item.modal || 0;
    });

    return totalPendapatan - totalModal; // Keuntungan = Pendapatan - Modal
  };

  return (
    <>
      <div className="bg-slate-400/15 p-5 rounded-lg w-full lg:h-20 flex items-center text-white mb-4">
        <h1 className="text-xl font-semibold">Transaksi</h1>
      </div>
      <div className="bg-slate-400/15 p-5 rounded-lg w-full text-white">
        <div className="md:flex justify-between items-center mb-5">
          <h1 className="text-xl font-semibold">Daftar Transaksi</h1>
          <Tambah reload={loadData} />
        </div>
        <div className="w-full text-center">{isLoading && <Loading />}</div>
        {transaksi.length === 0 ? (
          <div className="text-center">
            <p>Tidak Ada Transaksi</p>
          </div>
        ) : (
          <table className="min-w-full text-center table-auto">
            <tbody>
              {transaksi.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-400/25 transition-all"
                >
                  <td className="px-4 py-2">
                    <Link href={`/penjualan/${item.id}`}>{item.nama}</Link>
                  </td>
                  <td className="px-4 py-2 text-blue-400 font-semibold">
                    Rp{" "}
                    {hitungKeuntungan(item.penjualan).toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-2">
                    <Hapus id={Number(item.id)} reload={loadData} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Transaksi;
