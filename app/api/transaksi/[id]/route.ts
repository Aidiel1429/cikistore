import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  await prisma.transaksiTb.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ pesan: "sukses" });
}
