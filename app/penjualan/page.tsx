"use client"; // Pastikan ini adalah komponen klien
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Impor useSearchParams
import axios from "axios";
import Loading from "../components/loading";

// Definisikan tipe untuk penjualan
interface Penjualan {
  id: string;
  nama: string;
  pendapatan: number;
}

export default function Home() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Dapatkan ID transaksi dari query
  const [penjualans, setPenjualans] = useState<Penjualan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadPenjualan();
  }, [id]); // Tambahkan id sebagai dependensi

  const loadPenjualan = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/penjualan/${id}`);
      const hasil = await res.data;

      if (Array.isArray(hasil.penjualan)) {
        setPenjualans(hasil.penjualan);
      } else {
        console.error("Data tidak sesuai:", hasil);
        setPenjualans([]); // Atur ke array kosong jika tidak sesuai
      }
    } catch (error) {
      console.error("Error fetching penjualans:", error);
      setPenjualans([]); // Atur ke array kosong jika terjadi kesalahan
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-slate-400/15 p-5 rounded-lg w-full lg:h-20 flex flex-col mb-4 items-start text-white font-[family-name:var(--font-geist-sans)]">
        <h1>Penjualan Transaksi</h1>
      </div>
      <div className="bg-slate-400/15 p-5 rounded-lg w-full text-white">
        <h2 className="text-xl font-semibold mt-4">Daftar Transaksi</h2>
        <div className="w-full text-center">{isLoading && <Loading />}</div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              {penjualans.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    Tidak Ada Transaksi
                  </td>
                </tr>
              ) : (
                penjualans.map((item: any, index) => (
                  <tr key={item.id}>
                    <th>{index + 1}</th>
                    <td>{item.nama}</td>
                    <td>{item.namaPelanggan}</td>
                    <td>{item.pendapatan}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full mt-2"></div>
      </div>
    </>
  );
}
