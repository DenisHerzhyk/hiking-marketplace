import api from "../../../../../axios.ts";
import CartItemInterface from "../../cart_item/interface/CartItemInterface";
import toast from "react-hot-toast";
export const handleMoveToCart = async (
  productId: number,
  id: number,
  size: string,
  color: string,
  availableQuantity: number,
  orderQuantity: number,
  onDelete: (id: number) => void,
  onCartAdd: (item: CartItemInterface) => void,
) => {
  await api
    .post(
      `/api/wishlist/movecart/${id}`,
      { productId, size, color, availableQuantity, orderQuantity },
      {
        withCredentials: true,
      },
    )
    .then((res) => {
      onDelete(id);
      onCartAdd(res.data.cartItem);
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message);
      return;
    });
};
