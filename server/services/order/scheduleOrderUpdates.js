import { prisma } from "../../config/db.js";

export const scheduleOrderUpdates = (orderId) => {
  setTimeout(
    async () => {
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: { status: "Packing" },
      });
    },
    1000 * 60 * 2,
  );

  setTimeout(
    async () => {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "In Transit" },
      });
    },
    1000 * 60 * 4,
  );

  setTimeout(
    async () => {
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "Delivering",
        },
      });
    },
    1000 * 60 * 6,
  );

  setTimeout(
    async () => {
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "Delivered",
        },
      });
    },
    1000 * 60 * 8,
  );
};
