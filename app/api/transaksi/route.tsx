import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  await prisma.transaksiTb.create({
    data: {
      nama: String(formData.get("nama")),
    },
  });

  return NextResponse.json({ pesan: "sukses" });
}

export async function GET() {
  const res = await prisma.transaksiTb.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      penjualan: true,
    },
  });

  return NextResponse.json(res);
}
