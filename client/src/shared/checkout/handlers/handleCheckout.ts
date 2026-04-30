import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import CartItemInterface from "../../../pages/cart/components/cart_item/interface/CartItemInterface";

export const handleCheckoutRequest = async (
  navigate: NavigateFunction,
  orderTotal: number,
  cartItems: CartItemInterface[],
) => {
  if (orderTotal <= 9) {
    toast.error("Cart is empty, please add items");
    return;
  }

  const res = await axios
    .post(
      `http://localhost:4996/api/checkout/add`,
      { total: orderTotal, items: cartItems },
      { withCredentials: true },
    )
    .then((res) => {
      navigate("/checkout", { state: { clientSecret: res.data.clientSecret } });
    })
    .catch((err) => console.error(err));

  toast.success("Checkout in process!");
};
