import { prisma } from "../config/db.js";

export const addSizeAmount = async (req, res) => {
  const { productId } = req.params;
  const { size, quantity } = req.body;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(productId),
    },
  });

  if (!product) {
    return res.status(404).send({
      message: "Product was not found",
    });
  }

  const amount = Number.isInteger(quantity) && quantity > 0 ? quantity : 1;

  const currentStock = product.stock;

  const updatedStock = {
    ...currentStock,
    [size]: (currentStock[size] || 0) + amount,
  };

  await prisma.product.update({
    where: {
      id: Number(productId),
    },
    data: {
      stock: updatedStock,
    },
  });

  return res.json({ message: "Stock Added", stock: updatedStock });
};

export const decreaseSizeAmount = async (req, res) => {
  const { productId } = req.params;
  const { size } = req.body;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(productId),
    },
  });

  if (!product) {
    return res.status(404).send({
      message: "Product was not found",
    });
  }

  const currentStock = product.stock;

  if (!currentStock[size] || currentStock[size] <= 0)
    return res
      .status(400)
      .send("No more stock left for this size, please change the size");

  const newStockSize = currentStock[size] - 1;
  const updatedStock = { ...currentStock };

  // The size is dropped from the copy that gets persisted. Deleting from
  // currentStock instead would leave the stale value in updatedStock, so the
  // last unit of a size could never be sold out.
  if (newStockSize <= 0) {
    delete updatedStock[size];
  } else {
    updatedStock[size] = newStockSize;
  }

  await prisma.product.update({
    where: {
      id: Number(productId),
    },
    data: {
      stock: updatedStock,
    },
  });

  return res.json({ message: "Stock Decreased", stock: updatedStock });
};

export const removeSize = async (req, res) => {
  const { productId, size } = req.params;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(productId),
    },
  });

  if (!product) {
    return res.status(404).send({
      message: "Product was not found",
    });
  }

  const currentStock = product.stock;
  delete currentStock[size];
  const updatedStock = {
    ...currentStock,
  };

  await prisma.product.update({
    where: {
      id: Number(productId),
    },
    data: {
      stock: updatedStock,
    },
  });

  return res.json({ message: "Stock Removed", stock: updatedStock });
};
