-- CreateTable
CREATE TABLE "transaksiTb" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaksiTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "penjualanTb" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "pendapatan" INTEGER NOT NULL,
    "modal" INTEGER NOT NULL,
    "namaPelanggan" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "transaksiId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "penjualanTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hutangTb" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "hutang" TEXT NOT NULL,
    "penjualanId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hutangTb_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "penjualanTb" ADD CONSTRAINT "penjualanTb_transaksiId_fkey" FOREIGN KEY ("transaksiId") REFERENCES "transaksiTb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hutangTb" ADD CONSTRAINT "hutangTb_penjualanId_fkey" FOREIGN KEY ("penjualanId") REFERENCES "penjualanTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;
