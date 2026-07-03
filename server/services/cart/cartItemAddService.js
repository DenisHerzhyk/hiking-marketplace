import { prisma } from "../../config/db.js";

export const addCartItem = async (
  cartId,
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

  if (!product) throw new Error("Product not found ");

  return await prisma.cartItem.create({
    data: {
      cartId,
      productId: Number(productId),
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
