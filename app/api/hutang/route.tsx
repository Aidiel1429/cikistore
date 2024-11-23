import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.penjualanTb.findMany({
    where: {
      status: "Belum Lunas",
    },
    orderBy: {
      status: "asc",
    },
    include: {
      transaksiTb: true,
    },
  });

  return NextResponse.json(data);
}
