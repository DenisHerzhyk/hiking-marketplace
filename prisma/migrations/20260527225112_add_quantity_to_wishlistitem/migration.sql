/*
  Warnings:

  - Added the required column `orderQuantity` to the `WishlistItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WishlistItem" ADD COLUMN     "orderQuantity" INTEGER NOT NULL;
