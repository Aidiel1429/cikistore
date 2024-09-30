import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const penjualan = await prisma.penjualanTb.findMany({
    where: {
      transaksiId: Number(id),
    },
  });

  return NextResponse.json({ penjualan });
}
