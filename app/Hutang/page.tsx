"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface HutangItem {
  id: number;
  namaPelanggan: string;
  pendapatan: number;
}

const Hutang = () => {
  const [hutang, setHutang] = useState<HutangItem[]>([]);

  useEffect(() => {
    loadHutang();
  }, []);

  const loadHutang = async () => {
    const res = await axios.get("/api/hutang");
    const hasil: HutangItem[] = res.data;
    setHutang(hasil);
  };

  return (
    <>
      <div className="bg-slate-400/15 p-5 rounded-lg w-full lg:h-20 flex items-center mb-4 text-white font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-xl font-semibold">Hutang</h1>
      </div>
      <div className="bg-slate-400/15 p-5 rounded-lg w-full text-white font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-lg font-semibold">Daftar Hutang</h1>
        <div className="overflow-x-auto mt-5">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Jumlah Hutang</th>
              </tr>
            </thead>
            <tbody>
              {hutang.map((item, index) => (
                <tr key={item.id}>
                  <th>{index + 1}</th>
                  <td>{item.namaPelanggan}</td>
                  <td>Rp {item.pendapatan.toLocaleString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Hutang;
