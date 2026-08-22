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

  const currentStock = product.stock;

  const updatedStock = {
    ...currentStock,
    [size]: (currentStock[size] || 0) + 1,
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

  if (newStockSize <= 0) {
    delete currentStock[size];
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
