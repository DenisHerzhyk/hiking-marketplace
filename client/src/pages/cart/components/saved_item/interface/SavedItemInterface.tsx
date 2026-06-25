import ProductInterface from "../../../../../shared/components/product-card/interface/ProductInterface";
import CartItemInterface from "../../cart_item/interface/CartItemInterface";

interface WishlistItemInterface {
  id: number;
  wishlistId: number;
  productId: number;
  product: ProductInterface;
  stock: Record<string, number>;
  orderQuantity: number;
  size: string;
  color: string;
  onDelete: (id: number) => void;
  onCartAdd: (item: CartItemInterface) => void;
}

export default WishlistItemInterface;
