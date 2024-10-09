import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const hutang = await prisma.penjualanTb.findMany({
    where: {
      status: "Belum Lunas",
    },
    include: {
      hutangTb: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(hutang);
}
