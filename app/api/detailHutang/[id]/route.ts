import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const hutangDetail = await prisma.hutangTb.findUnique({
      where: { id: Number(id) },
      include: { penjualanTb: true },
    });

    if (!hutangDetail) {
      return NextResponse.json(
        { error: "No detail found for the provided ID" },
        { status: 404 }
      );
    }

    return NextResponse.json(hutangDetail);
  } catch (error) {
    console.error("Error fetching hutang detail:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
