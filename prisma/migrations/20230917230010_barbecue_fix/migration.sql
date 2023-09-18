/*
  Warnings:

  - Added the required column `valueWithAlcohol` to the `Barbecue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueWithoutAlcohol` to the `Barbecue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barbecue" ADD COLUMN     "valueWithAlcohol" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valueWithoutAlcohol" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "totalValue" DROP NOT NULL;
