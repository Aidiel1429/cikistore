"use client"; // Pastikan kode dijalankan di client
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Loading from "@/app/components/loading";
import { IoClose } from "react-icons/io5";
import Tambah from "./action/tambah";
import Edit from "./action/edit";

interface Penjualan {
  id: number;
  nama: string;
  kategori: string;
  tanggal: string;
  pendapatan: number;
  modal: number;
  namaPelanggan: string;
  status: string;
}

interface TransaksiDetail {
  id: number;
  nama: string;
  penjualan: Penjualan[];
}

const PenjualanDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params; // Mengambil ID dari params yang berasal dari URL
  const [transaksiDetail, setTransaksiDetail] =
    useState<TransaksiDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [actionType, setActionType] = useState<"tambah" | "edit" | null>(null); // State untuk jenis aksi

  const loadTransaksiDetail = useCallback(async () => {
    try {
      const res = await axios.get(`/api/penjualan/${id}`);
      const hasil = res.data;
      setTransaksiDetail(hasil);
    } catch (error) {
      console.log("Terjadi Kesalahan", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]); // Tambahkan id sebagai dependensi

  useEffect(() => {
    if (id) {
      loadTransaksiDetail();
    }
  }, [id, loadTransaksiDetail]); // Tambahkan loadTransaksiDetail ke dalam dependensi

  if (!transaksiDetail) {
    return (
      <div className="text-center text-white bg-slate-400/15 p-5 rounded-lg w-full">
        Penjualan tidak ditemukan.
      </div>
    );
  }

  const closeAlert = () => {
    setAlert(false);
  };

  const formatTanggal = (date: string) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };

  return (
    <>
      <div className="md:flex gap-4">
        <div className="bg-slate-400/15 p-5 rounded-lg w-full text-white mb-4 text-center">
          <h1 className="text-xl mb-2">Total Transaksi</h1>
          <p className="text-2xl font-semibold">
            {transaksiDetail.penjualan.length}
          </p>
        </div>
        <div className="bg-slate-400/15 p-5 rounded-lg w-full text-white mb-4 text-center">
          <h1 className="text-xl mb-2">Total Pendapatan</h1>
          <p className="text-green-500 text-2xl font-semibold">
            Rp{" "}
            {transaksiDetail.penjualan
              ?.reduce((a: number, b) => a + b.pendapatan, 0)
              .toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-slate-400/15 p-5 rounded-lg w-full text-white mb-4 text-center">
          <h1 className="text-xl  mb-2">Total Pengeluaran</h1>
          <p className="text-red-500 text-2xl font-semibold">
            Rp{" "}
            {transaksiDetail.penjualan
              ?.reduce((a: number, b) => a + b.modal, 0)
              .toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-slate-400/15 p-5 rounded-lg w-full text-white mb-4 text-center">
          <h1 className="text-xl  mb-2">Untung</h1>
          <p className="text-blue-500 text-2xl font-semibold">
            Rp{" "}
            {transaksiDetail.penjualan
              ?.reduce((a: number, b) => a + (b.pendapatan - b.modal), 0)
              .toLocaleString("id-ID")}
          </p>
        </div>
      </div>
      <div className="bg-slate-400/15 p-5 rounded-lg w-full text-white">
        {isLoading && <Loading />}
        <h1 className="text-2xl font-bold mb-4">
          Penjualan {transaksiDetail.nama}
        </h1>
        <div className="mb-4">
          <div className="md:flex justify-between items-center mb-5">
            <h1 className="text-xl font-semibold">Daftar Penjualan</h1>
            <Tambah
              params={{ id }}
              reload={loadTransaksiDetail}
              alert={(val: boolean) => {
                setAlert(val);
                setActionType("tambah"); // Set actionType jadi "tambah"
              }}
            />
          </div>
          {alert && (
            <div role="alert" className="alert alert-success mb-2">
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
              <span>
                {actionType === "tambah"
                  ? "Berhasil Menambahkan Data!"
                  : "Berhasil Mengedit Data!"}
              </span>
              <button
                className="hover:bg-white/15 transition-all p-1 rounded-lg"
                onClick={closeAlert}
              >
                <IoClose className="text-2xl" />
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Item</th>
                  <th>Kategori</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                  <th>Nama Pelanggan</th>
                  <th>Pendapatan</th>
                  <th>Modal</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {transaksiDetail.penjualan.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center">
                      Tidak ada penjualan untuk transaksi ini.
                    </td>
                  </tr>
                ) : (
                  transaksiDetail.penjualan.map((penjualan, index) => (
                    <tr
                      key={penjualan.id}
                      className={
                        penjualan.status === "Belum Lunas" ? "bg-red-500/5" : ""
                      }
                    >
                      <th>{index + 1}</th>
                      <td>{penjualan.nama}</td>
                      <td>{penjualan.kategori}</td>
                      <td>{penjualan.status}</td>
                      <td>{formatTanggal(penjualan.tanggal)}</td>
                      <td>{penjualan.namaPelanggan}</td>
                      <td className="text-green-500">
                        Rp {penjualan.pendapatan.toLocaleString("id-ID")}
                      </td>
                      <td className="text-red-500">
                        Rp {penjualan.modal.toLocaleString("id-ID")}
                      </td>
                      <td className="flex items-center gap-2">
                        <Edit
                          params={{ id }}
                          reload={loadTransaksiDetail}
                          alert={(val: boolean) => {
                            setAlert(val);
                            setActionType("edit"); // Set actionType jadi "edit"
                          }}
                          row={{
                            id: penjualan.id,
                            pendapatan: penjualan.pendapatan.toString(),
                            modal: penjualan.modal.toString(),
                            nama: penjualan.nama,
                            namaPelanggan: penjualan.namaPelanggan,
                            kategori: penjualan.kategori,
                            tanggal: penjualan.tanggal,
                            status: penjualan.status,
                          }}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PenjualanDetail;
