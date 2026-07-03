import { prisma } from "../../config/db.js";

export const removeWishlistItem = async (wishlistId, productId) => {
  const wishlistItem = await prisma.wishlistItem.findFirst({
    where: {
      wishlistId: wishlistId,
      productId: productId,
    },
  });

  if (!wishlistItem) throw new Error("Wishlist item not found");

  await prisma.wishlistItem.delete({ where: { id: wishlistItem.id } });
};
