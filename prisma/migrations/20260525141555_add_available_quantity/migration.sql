/*
  Warnings:

  - You are about to drop the column `quantity` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `availableQuantity` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderQuantity` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availableQuantity` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderQuantity` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availableQuantity` to the `WishlistItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "quantity",
ADD COLUMN     "availableQuantity" INTEGER NOT NULL,
ADD COLUMN     "orderQuantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "quantity",
ADD COLUMN     "availableQuantity" INTEGER NOT NULL,
ADD COLUMN     "orderQuantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WishlistItem" ADD COLUMN     "availableQuantity" INTEGER NOT NULL;
