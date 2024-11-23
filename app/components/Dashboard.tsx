"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define interfaces
interface Penjualan {
  id: number;
  tanggal: string;
  pendapatan: number;
  modal: number;
  nama: string;
  namaPelanggan: string;
}

interface DashboardStatistik {
  totalPenjualan: number;
  totalPendapatan: number;
  totalModal: number;
  totalKeuntungan: number;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<Penjualan[]>([]);
  const [statistik, setStatistik] = useState<DashboardStatistik>({
    totalPenjualan: 0,
    totalPendapatan: 0,
    totalModal: 0,
    totalKeuntungan: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/dashboard");

      setData(response.data.penjualan);
      setStatistik(response.data.statistik);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Gagal memuat data dashboard");
      setLoading(false);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Penjualan */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="card-title text-primary">Total Penjualan</h2>
                <p className="text-2xl font-bold">
                  {statistik.totalPenjualan} Transaksi
                </p>
              </div>
              <div className="badge badge-primary p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Total Pendapatan */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="card-title text-success">Total Pendapatan</h2>
                <p className="text-2xl font-bold text-success">
                  Rp {statistik.totalPendapatan.toLocaleString()}
                </p>
              </div>
              <div className="badge badge-success p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Total Modal */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="card-title text-error">Total Modal</h2>
                <p className="text-2xl font-bold text-error">
                  Rp {statistik.totalModal.toLocaleString()}
                </p>
              </div>
              <div className="badge badge-error p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Total Keuntungan */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="card-title text-info">Total Keuntungan</h2>
                <p className="text-2xl font-bold text-info">
                  Rp {statistik.totalKeuntungan.toLocaleString()}
                </p>
              </div>
              <div className="badge badge-info p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
