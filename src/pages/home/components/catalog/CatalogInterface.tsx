import ProductCardInterface from "../product-card/ProductCardInterface";

interface CatalogInterface {
  title: string;
  p: string;
  cards: [ProductCardInterface, ProductCardInterface, ProductCardInterface];
}

export default CatalogInterface;
