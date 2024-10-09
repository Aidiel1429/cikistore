import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const formData = await req.formData();

  await prisma.penjualanTb.update({
    where: { id: Number(id) },
    data: {
      nama: String(formData.get("nama")),
      kategori: String(formData.get("kategori")),
      pendapatan: Number(formData.get("pendapatan")),
      modal: Number(formData.get("modal")),
      namaPelanggan: String(formData.get("namaPelanggan")),
      status: String(formData.get("status")),
    },
  });

  return NextResponse.json({ pesan: "sukses" });
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const penjualanDetail = await prisma.transaksiTb.findUnique({
    where: { id: Number(id) },
    include: {
      penjualan: true,
    },
  });

  return NextResponse.json(penjualanDetail);
}
