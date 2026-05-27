import ShowOrderInterface from "./ShowOrderInterface";

interface OrderItemInterface {
  id: number;
  orderId: number;
  productId: number;
  size: string;
  color: string;
  orderQuantity: number;
  price: number;
  product: {
    id: number;
    title: string;
    productImages: string[];
    price: number;
    discount?: number;
  };
}

export default OrderItemInterface;
