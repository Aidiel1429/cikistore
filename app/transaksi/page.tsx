"use client";
import React, { useEffect, useState } from "react";
import Tambah from "./aksi/tambah";
import axios from "axios";
import Loading from "../components/loadingButton";
import Hapus from "./aksi/hapus";
import Edit from "./aksi/edit";
import Link from "next/link";

type Transaksi = {
  id: number;
  nama: string;
};

const ITEMS_PER_PAGE = 10;

const Transaksi = () => {
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  const [loading, setLoading] = useState(false);
  const [pesanError, setPesanError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [sukses, setSukses] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (sukses || error) {
      const timeout = setTimeout(() => {
        setSukses(false);
        setError(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [sukses, error]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Transaksi[]>("/api/transaksi"); // Sesuaikan tipe response
      setTransaksi(res.data);
    } catch (error) {
      setPesanError("Gagal terhubung ke server.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = transaksi.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(transaksi.length / ITEMS_PER_PAGE);

  return (
    <div className="p-2">
      <div className="bg-white rounded-md shadow-md p-4">
        <h1 className="text-3xl font-semibold">Halaman Transaksi</h1>
        <div>
          <Tambah
            setSukses={setSukses}
            setError={setError}
            setMessage={setMessage}
            reload={fetchData}
          />
        </div>
        {sukses && (
          <div
            role="alert"
            className="alert alert-success text-white flex items-center justify-between"
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
            className="alert alert-error text-white flex items-center justify-between"
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
        <div className="mt-5">
          {loading ? (
            <div className="text-center">
              <Loading />
            </div>
          ) : pesanError ? (
            <div>
              <p className="text-red-500 text-center">{pesanError}</p>
            </div>
          ) : transaksi.length === 0 ? (
            <div>
              <p className="text-center">Belum ada Transaksi.</p>
            </div>
          ) : (
            <div>
              {paginatedData.map((item, index) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center px-5 font-semibold text-slate-500 my-5"
                >
                  <p>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</p>
                  <Link href={`/penjualan/${item.id}`}>
                    <p>{item.nama}</p>
                  </Link>

                  <div className="flex items-center gap-2">
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
                      id={item.id}
                      nama={item.nama}
                    />
                  </div>
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
    </div>
  );
};

export default Transaksi;
