import { ProductInterface } from "../../../../../shared/components/product-card/interface/ProductInterface";

interface CartItemInterface {
  id: number;
  cartId: number;
  productId: number;
  product: ProductInterface;
  quantity: number;
  size: string;
  color: string;
  onDelete: (id: Number) => void;
}

export default CartItemInterface;
