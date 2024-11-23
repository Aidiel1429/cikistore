import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const formData = await request.formData();
  await prisma.penjualanTb.create({
    data: {
      pendapatan: Number(formData.get("pendapatan")),
      modal: Number(formData.get("modal")),
      nama: String(formData.get("nama")),
      namaPelanggan: String(formData.get("namaPelanggan")),
      kategori: String(formData.get("kategori")),
      tanggal: formData.get("tanggal") as string,
      status: String(formData.get("status")),
      transaksiId: Number(formData.get("transaksiId")),
      updatedAt: new Date(), // Add this line
    },
  });

  return NextResponse.json({ pesan: "berhasil" });
}
