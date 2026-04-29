import axios from "axios";
import CartItemInterface from "../components/cart_item/interface/CartItemInterface";

export const handleCartAdd = (
  setCartItems: React.Dispatch<React.SetStateAction<CartItemInterface[]>>,
) => {
  axios
    .get("http://localhost:4996/api/cart", { withCredentials: true })
    .then((res) => {
      setCartItems(res.data.data);
    })
    .catch((err) => {
      console.error(err);
    });
};
