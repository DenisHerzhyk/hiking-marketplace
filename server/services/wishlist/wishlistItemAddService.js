import { prisma } from "../../config/db.js";

export const addWishlistItem = async (
  wishlistId,
  productId,
  size,
  color,
  availableQuantity,
  orderQuantity,
) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) throw new Error("Product not found");

  return await prisma.wishlistItem.create({
    data: {
      wishlistId,
      productId,
      size,
      color,
      availableQuantity,
      orderQuantity: 1,
    },
    include: {
      product: true,
    },
  });
};
