import api from "../../../axios.ts";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import CartItemInterface from "../../../pages/cart/components/cart_item/interface/CartItemInterface";

export const handleCheckoutRequest = async (
  navigate: NavigateFunction,
  orderTotal: number,
  cartItems: CartItemInterface[],
  form: {
    firstName: string;
    lastName: string;
    phone: string;
    address1: string;
    address2: string;
    city: string;
    postalCode: string;
    country: string;
    saveAddress: boolean;
  },
) => {
  if (orderTotal <= 9) {
    toast.error("Cart is empty, please add items");
    return;
  }

  await api
    .post(
      `/api/checkout/add`,
      { total: orderTotal, items: cartItems, form: form },
      { withCredentials: true },
    )
    .then((res) => {
      navigate("/checkout", { state: { clientSecret: res.data.clientSecret } });
    })
    .catch((err) => console.error(err));
};
