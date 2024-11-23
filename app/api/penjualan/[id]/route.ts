import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await prisma.penjualanTb.findMany({
      where: {
        transaksiId: Number(params.id),
      },
      orderBy: {
        id: "desc",
      },
      include: {
        transaksiTb: true,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await prisma.penjualanTb.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json({ pesan: "berhasil" });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {
      pendapatan,
      modal,
      nama,
      namaPelanggan,
      kategori,
      tanggal,
      status,
    } = await request.json();

    await prisma.penjualanTb.update({
      where: {
        id: Number(params.id),
      },
      data: {
        pendapatan: Number(pendapatan),
        modal: Number(modal),
        nama: String(nama),
        namaPelanggan: String(namaPelanggan),
        kategori: String(kategori),
        tanggal: new Date(tanggal),
        status: String(status),
      },
    });

    return NextResponse.json({ pesan: "berhasil" });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { error: "Failed to update data" },
      { status: 500 }
    );
  }
}
