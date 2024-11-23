"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Loading from "@/app/components/loadingButton";
import Tambah from "./aksi/tambah";
import Hapus from "./aksi/hapus";
import Edit from "./aksi/edit";

interface PenjualanProps {
  id: number;
  nama: string;
  kategori: string;
  tanggal: string;
  pendapatan: number;
  modal: number;
  namaPelanggan: string;
  status: string;
  transaksiTb: {
    nama: string;
  };
}

const ITEMS_PER_PAGE = 5;

const Penjualan = () => {
  const params = useParams();
  const id = params.id;
  const [penjualan, setPenjualan] = useState<PenjualanProps[]>([]);
  const [pesanError, setPesanError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [sukses, setSukses] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setPesanError("");
    try {
      const res = await axios.get(`/api/penjualan/${id}`);
      setPenjualan(res.data);
    } catch (error) {
      console.error(error);
      setPesanError("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]); // Tambahkan id ke dependency array

  useEffect(() => {
    if (sukses || error) {
      const timeout = setTimeout(() => {
        setSukses(false);
        setError(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [sukses, error]);

  const calculateTotals = () => {
    const totalPendapatan = penjualan.reduce(
      (sum, item) => sum + item.pendapatan,
      0
    );
    const totalModal = penjualan.reduce((sum, item) => sum + item.modal, 0);
    const totalUntung = totalPendapatan - totalModal;
    return {
      totalPenjualan: penjualan.length,
      totalPendapatan,
      totalModal,
      totalUntung,
    };
  };

  const { totalPenjualan, totalPendapatan, totalModal, totalUntung } =
    calculateTotals();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = penjualan.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(penjualan.length / ITEMS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5 w-full">
        <div className="bg-white p-5 rounded-lg shadow-md w-full">
          <h1 className="font-semibold text-base text-slate-600">
            Total Penjualan
          </h1>
          <p className="font-semibold text-xl mt-3">{totalPenjualan}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md w-full">
          <h1 className="font-semibold text-base text-slate-600">
            Total Pendapatan
          </h1>
          <p className="font-semibold text-xl mt-3 text-green-500">
            Rp. {totalPendapatan.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md w-full">
          <h1 className="font-semibold text-base text-slate-600">
            Total Modal
          </h1>
          <p className="font-semibold text-xl mt-3 text-red-500">
            Rp. {totalModal.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md w-full">
          <h1 className="font-semibold text-base text-slate-600">
            Total Untung
          </h1>
          <p className="font-semibold text-xl mt-3 text-blue-500">
            Rp. {totalUntung.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h1 className="font-semibold text-xl">
          Halaman Penjualan {penjualan[0]?.transaksiTb.nama}
        </h1>
        <Tambah
          setSukses={setSukses}
          setError={setError}
          setMessage={setMessage}
          reload={fetchData}
        />
        {sukses && (
          <div
            role="alert"
            className="alert alert-success text-white flex items-center justify-between mb-5"
          >
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm md:text-base">{message}</span>
            </div>
          </div>
        )}
        {error && (
          <div
            role="alert"
            className="alert alert-error text-white flex items-center justify-between mb-5"
          >
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm md:text-base">{message}</span>
            </div>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : pesanError ? (
          <div className="flex justify-center items-center font-semibold text-red-500">
            <p>{pesanError}</p>
          </div>
        ) : penjualan.length === 0 ? (
          <div className="flex justify-center items-center font-semibold">
            <p>Belum Ada penjualan</p>
          </div>
        ) : (
          <div>
            <div className="overflow-x-auto mt-5">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nama Produk</th>
                    <th>Kategori</th>
                    <th>Nama Pelanggan</th>
                    <th>Status</th>
                    <th>Pendapatan (Rp)</th>
                    <th>Modal (Rp)</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr
                      key={item.id}
                      className={
                        item.status.toLowerCase() === "belum lunas"
                          ? "bg-red-200/10"
                          : ""
                      }
                    >
                      <th>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</th>
                      <td>{item.nama}</td>
                      <td>{item.kategori}</td>
                      <td>{item.namaPelanggan}</td>
                      <td>{item.status}</td>
                      <td>
                        <p className="text-green-700 text-center">
                          {item.pendapatan.toLocaleString()}
                        </p>
                      </td>
                      <td width={300}>
                        <p className="text-red-600 text-center">
                          {item.modal.toLocaleString()}
                        </p>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Hapus
                            setSukses={setSukses}
                            setError={setError}
                            setMessage={setMessage}
                            reload={fetchData}
                            id={item.id}
                          />
                          <Edit
                            setSukses={setSukses}
                            setError={setError}
                            setMessage={setMessage}
                            reload={fetchData}
                            data={{
                              pendapatan: item.pendapatan.toString(),
                              modal: item.modal.toString(),
                              nama: item.nama,
                              namaPelanggan: item.namaPelanggan,
                              kategori: item.kategori,
                              tanggal: item.tanggal,
                              status: item.status,
                              id: item.id,
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
        )}
      </div>
    </>
  );
};

export default Penjualan;
