import { prisma } from "../server/config/db.js";
import menData from "../public/json/products/men/products-men.json" with { type: "json" };
import womenData from "../public/json/products/women/products-women.json" with { type: "json" };

const main = async () => {
  const productsMen = menData.products.map((product) => ({
    id: product.id,
    title: product.title,
    discount: product.discount ?? null,
    price: product.price,
    availableSizes: product.availableSizes,
    category: product.category,
    gender: product.gender,
    fit: product.fit,
    color: product.color,
    sizeGuide: product.sizeGuide,
    details: product.details,
    productImages: product.productImages,
    description: product.description,
    inStock: product.inStock,
    stock: product.stock,
  }));

  const productsWomen = womenData.products.map((product) => ({
    id: product.id,
    title: product.title,
    discount: product.discount ?? null,
    price: product.price,
    availableSizes: product.availableSizes,
    category: product.category,
    gender: product.gender,
    fit: product.fit,
    color: product.color,
    sizeGuide: product.sizeGuide,
    details: product.details,
    productImages: product.productImages,
    description: product.description,
    inStock: product.inStock,
    stock: product.stock,
  }));

  await prisma.product.createMany({ data: [...productsMen, ...productsWomen] });
  console.log(`Seeded ${products.length} products`);
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
