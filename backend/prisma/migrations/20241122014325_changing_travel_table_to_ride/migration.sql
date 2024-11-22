/*
  Warnings:

  - You are about to drop the `travels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "travels" DROP CONSTRAINT "travels_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "travels" DROP CONSTRAINT "travels_driver_id_fkey";

-- DropTable
DROP TABLE "travels";

-- CreateTable
CREATE TABLE "rides" (
    "id" TEXT NOT NULL,
    "origin_latitude" DECIMAL(65,30) NOT NULL,
    "origin_longitude" DECIMAL(65,30) NOT NULL,
    "destination_latitude" DECIMAL(65,30) NOT NULL,
    "destination_longitude" DECIMAL(65,30) NOT NULL,
    "distance_in_meters" DECIMAL(65,30) NOT NULL,
    "duration_in_seconds" INTEGER NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "customer_id" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rides_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
