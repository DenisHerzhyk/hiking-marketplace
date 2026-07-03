import { prisma } from "../config/db.js";
import { addCartItem } from "../services/cart/cartItemAddService.js";
import { addWishlistItem } from "../services/wishlist/wishlistItemAddService.js";
import { removeWishlistItem } from "../services/wishlist/wishlistItemRemoveService.js";
import { cartAdd } from "./cartController.js";

export const getWishlist = async (req, res) => {
  const userId = req.user.id;

  const wishlist = await prisma.wishlist.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!wishlist) {
    return res.status(404).send({
      message:
        "The operation went wrong. We were not able to find the wishlist",
    });
  }

  return res.status(200).send({ data: wishlist.items, userId });
};

export const wishlistAdd = async (req, res) => {
  const { productId } = req.params;
  const { size, color, availableQuantity, orderQuantity } = req.body;

  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!wishlist) {
      return res.status(404).send({
        message: "The operation went wrong. We were not able to find the cart",
      });
    }

    const existingWishlistItem = await prisma.wishlistItem.findFirst({
      where: {
        wishlistId: wishlist.id,
        productId: Number(productId),
        size,
        color,
      },
    });

    if (existingWishlistItem) {
      return res
        .status(409)
        .send({ message: "Item with this size is already in your wishlist" });
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    const stock = product.stock;
    const availableQuantity = stock[size] || 0;

    const wishlistItem = await addWishlistItem(
      wishlist.id,
      Number(productId),
      size,
      color,
      availableQuantity,
      orderQuantity,
    );

    return res.status(200).send({
      message: "Item was added to wishlist",
      wishlistItem: wishlistItem,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Product was not added to the wishlist!" });
  }
};

export const wishlistRemove = async (req, res) => {
  const { productId } = req.params;

  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!wishlist) {
      return res.status(404).send({
        message:
          "The operation went wrong. We were not able to find the wishlist",
      });
    }

    await removeWishlistItem(wishlist.id, Number(productId));

    return res
      .status(200)
      .send({ message: "Item was removed from the wishlist" });
  } catch (err) {
    return res.status(500).send({ message: "Error: " + err.message });
  }
};

export const moveWishlistItemToCart = async (req, res) => {
  const { id } = req.params;
  const { productId, size, color, availableQuantity, orderQuantity } = req.body;

  try {
    const [cart, wishlist] = await Promise.all([
      prisma.cart.findUnique({ where: { userId: req.user.id } }),
      prisma.wishlist.findUnique({ where: { userId: req.user.id } }),
    ]);

    if (!cart) return res.status(404).send({ message: "Cart not found" });
    if (!wishlist)
      return res.status(404).send({ message: "Wishlist not found" });

    const wishlistItem = await prisma.wishlistItem.findFirst({
      where: {
        wishlistId: wishlist.id,
        productId: Number(productId),
        size,
        color,
      },
    });

    if (!wishlistItem)
      return res.status(404).send({ message: "Wishlist item not found" });

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: Number(productId),
        size,
        color,
      },
    });

    if (existingCartItem) {
      return res
        .status(409)
        .send({
          message: "This item is already in your cart for the selected size.",
        });
    }

    const cartItem = await addCartItem(
      cart.id,
      Number(productId),
      size,
      color,
      Number(availableQuantity),
      orderQuantity,
    );

    await removeWishlistItem(wishlist.id, Number(productId));

    return res.status(201).send({ message: "Item moved to cart", cartItem });
  } catch (err) {
    return res.status(500).send({ message: "Error: " + err.message });
  }
};
