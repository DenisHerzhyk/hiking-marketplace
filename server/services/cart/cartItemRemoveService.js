import { prisma } from "../../config/db.js";

export const removeCartItem = async (cartId, productId) => {
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cartId,
      productId: Number(productId),
    },
  });

  if (!cartItem) throw new Error("Cart Item not found");

  await prisma.cartItem.delete({
    where: {
      id: cartItem.id,
    },
  });
};
