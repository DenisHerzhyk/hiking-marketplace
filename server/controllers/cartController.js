import { prisma } from "../config/db.js";
import { addCartItem } from "../services/cart/cartItemAddService.js";
import { removeCartItem } from "../services/cart/cartItemRemoveService.js";
import { addWishlistItem } from "../services/wishlist/wishlistItemAddService.js";

export const getCart = async (req, res) => {
  const userId = req.user.id;
  const cart = await prisma.cart.findUnique({
    where: {
      userId: userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    return res.status(404).send({
      message: "The operation went wrong. We were not able to find the cart",
    });
  }

  return res.status(200).send({ data: cart.items, userId });
};

export const cartAdd = async (req, res) => {
  const { productId } = req.params;
  const { size, color, availableQuantity, orderQuantity } = req.body;

  try {
    const cart = await prisma.cart.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!cart) {
      return res.status(404).send({
        message: "The operation went wrong. We were not able to find the cart",
      });
    }

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: Number(productId),
        size,
        color,
      },
    });

    if (existingCartItem) {
      return res.status(409).send({
        message: "This item is already in your wishlist for the selected size.",
      });
    }

    const cartItem = await addCartItem(
      cart.id,
      Number(productId),
      size,
      color,
      availableQuantity,
      orderQuantity,
    );

    return res
      .status(201)
      .send({ message: "Item was added to cart", cartItem: cartItem });
  } catch (err) {
    console.error("CartAdd error: ", err);
    return res
      .status(500)
      .send({ message: "Product was not added to the cart!" });
  }
};

export const cartRemove = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await prisma.cart.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!cart) {
      return res.status(404).send({
        message: "The operation went wrong. We were not able to find the cart",
      });
    }

    await removeCartItem(cart.id, Number(productId));

    return res.status(200).send({ message: "Item was removed from the cart" });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Product was not removed to the cart! Error: " + err });
  }
};

export const moveCartItemToWishlist = async (req, res) => {
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

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: Number(productId),
        size,
        color,
      },
      include: {
        product: true,
      },
    });

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
        .send({
          message:
            "This item is already in your wishlist for the selected size.",
        });
    }

    const stock = cartItem.product.stock;

    const wishlistItem = await addWishlistItem(
      wishlist.id,
      Number(productId),
      size,
      color,
      Number(availableQuantity),
      orderQuantity,
    );

    await removeCartItem(cart.id, Number(productId));

    return res
      .status(201)
      .send({ message: "Item moved to wishlist", wishlistItem });
  } catch (err) {
    return res.status(500).send({ message: "Error: " + err.message });
  }
};

export const updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { availableQuantity, orderQuantity } = req.body;

  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!cartItem)
    return res.status(404).json({ message: "Cart Item not found" });

  const updated = await prisma.cartItem.update({
    where: {
      id: Number(id),
    },
    data: {
      availableQuantity,
      orderQuantity,
    },
  });
  return res.status(200).json({ data: updated });
};
