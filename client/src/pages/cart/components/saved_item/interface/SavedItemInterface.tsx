import { ProductInterface } from "../../../../../shared/components/product-card/interface/ProductInterface";

interface WishlistItemInterface {
  id: number;
  wishlistId: number;
  productId: number;
  product: ProductInterface;
  size: string;
  color: string;
  onDelete: (id: Number) => void;
}

export default WishlistItemInterface;
