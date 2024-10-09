"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Penjualan {
  id: number;
  nama: string;
  kategori: string;
  tanggal: string;
  pendapatan: number;
  modal: number;
  transaksiId: number;
}

interface Transaksi {
  id: number;
  nama: string;
  penjualan: Penjualan[];
}

const Transaksi = () => {
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // State for loading

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true); // Set loading to true before fetching data
    try {
      const res = await axios.get("/api/transaksi");
      setTransaksi(res.data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false); // Set loading to false after data is loaded
    }
  };

  // Fungsi untuk menghitung total jumlah penjualan (berapa kali penjualan dilakukan)
  const hitungTotalJumlahPenjualan = (): number => {
    let totalJumlahPenjualan = 0;
    transaksi.forEach((trx) => {
      totalJumlahPenjualan += trx.penjualan.length; // Menghitung jumlah item penjualan di setiap transaksi
    });
    return totalJumlahPenjualan;
  };

  // Fungsi untuk menghitung total keuntungan
  const hitungTotalKeuntungan = (): number => {
    let totalKeuntungan = 0;
    transaksi.forEach((trx) => {
      trx.penjualan.forEach((penjualan) => {
        totalKeuntungan += penjualan.pendapatan - penjualan.modal;
      });
    });
    return totalKeuntungan;
  };

  // Data untuk grafik penjualan
  const generatePenjualanChartData = () => {
    const labels = transaksi.map((trx) => trx.nama); // Menggunakan nama transaksi sebagai label
    const jumlahPenjualanData = transaksi.map((trx) => {
      return trx.penjualan.length; // Total jumlah penjualan untuk transaksi tersebut
    });

    return {
      labels,
      datasets: [
        {
          label: "Jumlah Penjualan",
          data: jumlahPenjualanData, // Menggunakan jumlah item penjualan
          backgroundColor: "rgba(75, 192, 192, 0.8)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  // Data untuk grafik keuntungan
  const generateKeuntunganChartData = () => {
    const labels = transaksi.map((trx) => trx.nama); // Menggunakan nama transaksi sebagai label
    const keuntunganData = transaksi.map((trx) => {
      return trx.penjualan.reduce(
        (total, item) => total + (item.pendapatan - item.modal),
        0
      ); // Total keuntungan
    });

    return {
      labels,
      datasets: [
        {
          label: "Keuntungan",
          data: keuntunganData,
          backgroundColor: "rgba(153, 102, 255, 0.8)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <>
      <div className="bg-slate-400/15 p-6 rounded-lg w-full text-white shadow-lg">
        {isLoading ? ( // Conditional rendering for loading state
          <p>Loading...</p>
        ) : (
          <>
            {/* Total Penjualan dan Keuntungan */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-600 p-6 rounded-lg shadow-lg hover:bg-blue-500 transition-all">
                <h2 className="text-lg font-semibold">Total Penjualan</h2>
                <p className="text-3xl font-bold">
                  {hitungTotalJumlahPenjualan()}
                </p>
              </div>
              <div className="bg-green-600 p-6 rounded-lg shadow-lg hover:bg-green-500 transition-all">
                <h2 className="text-lg font-semibold">Total Keuntungan</h2>
                <p className="text-3xl font-bold">
                  Rp {hitungTotalKeuntungan().toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Grafik Jumlah Penjualan */}
              <div className=" p-6 transition-all">
                <h2 className="text-xl font-semibold mb-4">
                  Grafik Jumlah Penjualan
                </h2>
                <div
                  className="relative"
                  style={{ height: "350px", width: "100%" }}
                >
                  <Bar
                    data={generatePenjualanChartData()} // Menggunakan data jumlah penjualan
                    options={{ responsive: true }}
                  />
                </div>
              </div>

              {/* Grafik Keuntungan */}
              <div className=" p-6 transition-all">
                <h2 className="text-xl font-semibold mb-4">
                  Grafik Keuntungan
                </h2>
                <div
                  className="relative"
                  style={{ height: "350px", width: "100%" }}
                >
                  <Bar
                    data={generateKeuntunganChartData()}
                    options={{ responsive: true }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Transaksi;
