/*
  Warnings:

  - You are about to drop the column `createdAt` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `drivers` table. All the data in the column will be lost.
  - Added the required column `price_per_kilometer` to the `drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "drivers" DROP COLUMN "value",
ADD COLUMN     "price_per_kilometer" DECIMAL(65,30) NOT NULL;
