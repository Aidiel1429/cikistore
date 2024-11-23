"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/loadingButton";

type HutangProps = {
  id: number;
  namaPelanggan: string;
  pendapatan: number;
  transaksiTb: { nama: string };
  createdAt: Date;
  updatedAt: Date;
};

const ITEMS_PER_PAGE = 5;

const Hutang = () => {
  const [hutang, setHutang] = useState<HutangProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [pesanError, setPesanError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/hutang`);
      const data: HutangProps[] = res.data;

      console.log("Data sebelum penggabungan:", data); // Debugging line

      // Proses penggabungan data berdasarkan namaPelanggan dan transaksiTb.nama
      const mergedData: HutangProps[] = [];

      data.forEach((item) => {
        // Pastikan nama pelanggan dan nama transaksi dalam format yang konsisten
        const namaPelangganTrimmed = item.namaPelanggan.trim().toLowerCase();
        const transaksiNamaTrimmed = item.transaksiTb.nama.trim().toLowerCase();

        const existing = mergedData.find(
          (d) =>
            d.namaPelanggan.trim().toLowerCase() === namaPelangganTrimmed &&
            d.transaksiTb.nama.trim().toLowerCase() === transaksiNamaTrimmed
        );

        if (existing) {
          console.log(
            `Menggabungkan data: ${item.namaPelanggan} - ${item.transaksiTb.nama}`
          );
          existing.pendapatan += item.pendapatan; // Gabungkan pendapatan
        } else {
          mergedData.push({ ...item }); // Jika belum ada, tambahkan item baru
        }
      });

      console.log("Data setelah penggabungan:", mergedData); // Debugging line

      setHutang(mergedData);
    } catch (error) {
      setPesanError("Gagal terhubung ke server.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    const totalHutang = hutang.reduce((sum, item) => sum + item.pendapatan, 0);
    return {
      total: hutang.length,
      totalHutang: totalHutang,
    };
  };

  const { total, totalHutang } = calculateTotals();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = hutang.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(hutang.length / ITEMS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-2 mb-5 gap-3">
        <div className="bg-white p-5 rounded-lg shadow-md w-full">
          <h1 className="font-semibold text-base text-slate-600">
            Jumlah Hutang
          </h1>
          <p className="font-semibold text-xl mt-3">{total}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md w-full">
          <h1 className="font-semibold text-base text-slate-600">
            Total Hutang
          </h1>
          <p className="font-semibold text-xl mt-3 text-red-500">
            Rp {totalHutang.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
      <div className="p-5 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold">Halaman Hutang</h1>
        <div className="mt-5">
          {loading ? (
            <div className="text-center">
              <Loading />
            </div>
          ) : pesanError ? (
            <div>
              <p className="text-red-500 text-center">{pesanError}</p>
            </div>
          ) : hutang.length === 0 ? (
            <div>
              <p className="text-center">Belum ada Hutang.</p>
            </div>
          ) : (
            <div>
              {paginatedData.map((item, index) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center px-5 font-semibold text-slate-500 my-5"
                >
                  <p>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</p>
                  <p>{item.namaPelanggan}</p>
                  <p>Rp {item.pendapatan.toLocaleString("id-ID")}</p>
                  <p>{item.transaksiTb.nama}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center items-center mt-5">
          <div className="join">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`join-item btn ${
                  currentPage === index + 1 ? "btn-active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hutang;
