import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const formData = await request.formData();

  // Konversi tanggal dari string ke objek Date
  const tanggal = new Date(String(formData.get("tanggal")));

  await prisma.penjualanTb.create({
    data: {
      nama: String(formData.get("nama")),
      kategori: String(formData.get("kategori")),
      tanggal: tanggal, // Masukkan objek Date
      pendapatan: Number(formData.get("pendapatan")),
      modal: Number(formData.get("modal")),
      namaPelanggan: String(formData.get("namaPelanggan")),
      status: String(formData.get("status")),
      transaksiId: Number(formData.get("transaksiId")),
    },
  });

  return NextResponse.json({ pesan: "sukses" });
}
