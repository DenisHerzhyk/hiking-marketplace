import axios from "axios";
import CartItemInterface from "../../cart_item/interface/CartItemInterface";

export const handleMoveToCart = async (
  productId: number,
  id: number,
  size: string,
  color: string,
  availableQuantity: number,
  onDelete: (id: number) => void,
  onCartAdd: (item: CartItemInterface) => void,
) => {
  await axios
    .post(
      `http://localhost:4996/api/wishlist/movecart/${productId}`,
      { size, color, availableQuantity },
      {
        withCredentials: true,
      },
    )
    .then((res) => {
      onDelete(id);
      onCartAdd(res.data.cartItem);
    })
    .catch((err) => console.log(err));
};
