import { prisma } from "../config/db.js";

export const getProducts = async (req, res) => {
  const products = await prisma.product.findMany();

  if (!products) {
    return res.status(404).send({
      message: "Operation went wront. We were not able to find products",
    });
  }

  return res.status(200).send({ data: products });
};

export const getProduct = async (req, res) => {
  const { productId } = req.params;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(productId),
    },
  });

  if (!product) {
    return res.status(404).send({
      message: "Operation went wront. We were not able to find products",
    });
  }

  return res.status(200).send({ data: product });
};
