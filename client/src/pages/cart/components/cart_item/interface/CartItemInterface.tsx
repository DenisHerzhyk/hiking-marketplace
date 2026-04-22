import { ProductInterface } from "../../../../../shared/components/product-card/interface/ProductInterface";
import WishlistItemInterface from "../../saved_item/interface/SavedItemInterface";

interface CartItemInterface {
  id: number;
  cartId: number;
  productId: number;
  product: ProductInterface;
  quantity: number;
  size: string;
  color: string;
  onDelete: (id: number) => void;
  onWishlistAdd: (item: WishlistItemInterface) => void;
}

export default CartItemInterface;
