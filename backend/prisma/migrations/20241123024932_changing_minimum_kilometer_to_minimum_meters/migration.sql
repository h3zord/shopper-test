/*
  Warnings:

  - You are about to drop the column `minimum_kilometers` on the `drivers` table. All the data in the column will be lost.
  - Added the required column `minimum_meters` to the `drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drivers" DROP COLUMN "minimum_kilometers",
ADD COLUMN     "minimum_meters" INTEGER NOT NULL;
