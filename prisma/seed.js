import { prisma } from "../server/config/db.js";
import data from "../public/json/products-all.json" with { type: "json" };

const main = async () => {
  const products = data.products.map((product) => ({
    title: product.title,
    price: product.price,
    availableSizes: product.availableSizes,
    category: product.category,
    gender: product.gender,
    productImages: product.productImages,
    description: product.description,
    inStock: product.inStock,
  }));

  await prisma.product.createMany({ data: products });
  console.log(`Seeded ${products.length} products`);
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
