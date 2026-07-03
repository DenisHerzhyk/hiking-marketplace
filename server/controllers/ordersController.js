import Stripe from "stripe";
import { prisma } from "../config/db.js";
import { scheduleOrderUpdates } from "../services/order/scheduleOrderUpdates.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getDefaultAddress = async (req, res) => {
  try {
    const info = await prisma.deliveryAddress.findFirst({
      where: {
        userId: req.user.id,
        isDefault: true,
      },
    });
    return res.status(200).json({ info });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch address" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: req.user.id,
      },
      include: { items: { include: { product: true } }, deliveryAddress: true },
    });

    if (orders.length === 0) {
      return res.status(404).json({ error: "The Orders were not found" });
    }
    return res.status(200).send({ orders });
  } catch (err) {
    return res.status(500).send({ error: "Order get failed" });
  }
};

export const orderConfirm = async (req, res) => {
  const { paymentIntentId } = req.body;

  try {
    const existingOrder = await prisma.order.findFirst({
      where: { paymentId: paymentIntentId },
      include: { items: { include: { product: true } }, deliveryAddress: true },
    });

    if (existingOrder) return res.status(200).json({ order: existingOrder });

    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (intent.status !== "succeeded") {
      return res
        .status(400)
        .json({ error: "Payment not completed. Wrong status" });
    }

    const items = JSON.parse(intent.metadata.items);
    const form = JSON.parse(intent.metadata.form);
    const userId = parseInt(intent.metadata.userId);
    let deliveryAddress = null;

    if (!items || !form || !userId) {
      return res
        .status(400)
        .json({ error: "Missing metadata from Stripe PaymentIntent" });
    }

    const saveAddress =
      form.saveAddress === true || form.saveAddress === "true";

    if (saveAddress) {
      const existingDefault = await prisma.deliveryAddress.findFirst({
        where: {
          userId,
          isDefault: true,
        },
      });

      if (existingDefault) {
        deliveryAddress = await prisma.deliveryAddress.update({
          where: {
            id: existingDefault.id,
          },
          data: {
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            address1: form.address1,
            address2: form.address2,
            city: form.city,
            postalCode: form.postalCode,
            country: form.country,
          },
        });
      } else {
        deliveryAddress = await prisma.deliveryAddress.create({
          data: {
            userId,
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            address1: form.address1,
            address2: form.address2,
            city: form.city,
            postalCode: form.postalCode,
            country: form.country,
            isDefault: true,
          },
        });
      }
    } else {
      deliveryAddress = await prisma.deliveryAddress.findFirst({
        where: {
          userId,
          address1: form.address1,
          address2: form.address2,
          postalCode: form.postalCode,
        },
      });

      if (!deliveryAddress) {
        deliveryAddress = await prisma.deliveryAddress.create({
          data: {
            userId,
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            address1: form.address1,
            address2: form.address2,
            city: form.city,
            postalCode: form.postalCode,
            country: form.country,
            isDefault: false,
          },
        });
      }
    }

    const order = await prisma.order.create({
      data: {
        userId,
        total: intent.amount / 100,
        status: "Processing",
        paymentId: paymentIntentId,
        deliveryAddressId: deliveryAddress.id,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            orderQuantity: item.orderQuantity,
            size: item.size,
            color: item.color,
            price: item.price,
          })),
        },
      },
      include: {
        items: { include: { product: true } },
        deliveryAddress: true,
      },
    });

    const products = await prisma.product.findMany({
      where: {
        id: { in: items.map((item) => item.productId) },
      },
    });

    await Promise.all(
      products.map((product) => {
        const cartItem = items.find((item) => item.productId === product.id);
        if (!cartItem) return Promise.resolve();
        const stock = product.stock;
        const availableSizes = product.availableSizes;

        stock[cartItem.size] =
          (stock[cartItem.size] ?? 0) - cartItem.orderQuantity;

        if (stock[cartItem.size] < 1) {
          const index = availableSizes.indexOf(cartItem.size);
          if (index > -1) availableSizes.splice(index, 1);
        }

        return prisma.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock,
            availableSizes,
          },
        });
      }),
    );

    await prisma.cartItem.deleteMany({
      where: { cart: { userId } },
    });

    scheduleOrderUpdates(Number(order.id));

    return res.status(200).json({ order });
  } catch (err) {
    console.error("❌ FULL ERROR:", err);
    return res.status(500).send({ error: "Order Confirm failed" });
  }
};
