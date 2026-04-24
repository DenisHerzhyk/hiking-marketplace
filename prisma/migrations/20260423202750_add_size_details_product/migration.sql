/*
  Warnings:

  - Added the required column `details` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fit` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeGuide` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "details" JSONB NOT NULL,
ADD COLUMN     "fit" TEXT NOT NULL,
ADD COLUMN     "sizeGuide" JSONB NOT NULL;
