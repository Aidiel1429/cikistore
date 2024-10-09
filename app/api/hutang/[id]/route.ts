import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  try {
    const hutang = await prisma.hutangTb.findMany({
      where: { penjualanId: id },
      include: {
        penjualanTb: true,
      },
    });

    if (!hutang || hutang.length === 0) {
      return NextResponse.json(
        { message: "Hutang tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(hutang);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Error saat mengambil data hutang" },
      { status: 500 }
    );
  }
}
