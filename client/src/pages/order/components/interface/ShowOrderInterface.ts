import CartItemInterface from "../../../cart/components/cart_item/interface/CartItemInterface";

interface ShowOrderInterface {
  id: number;
  userId: number;
  total: number;
  status: string;
  paymentId: number;
  createdAt: string;
  items: CartItemInterface[];
}

export default ShowOrderInterface;
