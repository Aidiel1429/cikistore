import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await prisma.transaksiTb.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({ pesan: "berhasil" });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { nama } = await request.json();
  const { id } = params;

  await prisma.transaksiTb.update({
    where: {
      id: Number(id),
    },
    data: {
      nama: String(nama),
      updatedAt: new Date(),
    },
  });

  return NextResponse.json({ pesan: "berhasil" });
}
