// app/api/dashboard/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const data = await prisma.penjualanTb.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        transaksiTb: true,
      },
    });

    // Hitung statistik tambahan
    const totalPenjualan = data.length;
    const totalPendapatan = data.reduce(
      (total, item) => total + item.pendapatan,
      0
    );
    const totalModal = data.reduce((total, item) => total + item.modal, 0);
    const totalKeuntungan = totalPendapatan - totalModal;

    return NextResponse.json({
      penjualan: data,
      statistik: {
        totalPenjualan,
        totalPendapatan,
        totalModal,
        totalKeuntungan,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data dashboard" },
      { status: 500 }
    );
  }
}
