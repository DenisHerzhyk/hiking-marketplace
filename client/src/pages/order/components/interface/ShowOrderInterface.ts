import OrderItemInterface from "./OrderItemInterace";

interface ShowOrderInterface {
  id: number;
  userId: number;
  total: number;
  status: string;
  paymentId: string;
  createdAt: string;
  deliveryAddressId: number | null;
  deliveryAddress: {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    address1: string;
    address2: string;
    city: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  } | null;
  items: OrderItemInterface[];
}

export default ShowOrderInterface;
