import api from "../../../axios.ts";
import CartItemInterface from "../components/cart_item/interface/CartItemInterface";

export const handleCartAdd = (
  setCartItems: React.Dispatch<React.SetStateAction<CartItemInterface[]>>,
) => {
  api
    .get("/api/cart", { withCredentials: true })
    .then((res) => {
      setCartItems(res.data.data);
    })
    .catch((err) => {
      console.error(err);
    });
};
