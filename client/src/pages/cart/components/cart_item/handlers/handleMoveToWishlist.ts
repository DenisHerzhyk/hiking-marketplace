import axios from "axios";
import WishlistItemInterface from "../../saved_item/interface/SavedItemInterface";

import toast from "react-hot-toast";
export const handleMoveToWishlist = async (
  productId: number,
  id: number,
  size: string,
  color: string,
  availableQuantity: number,
  orderQuantity: number,
  onDelete: (id: number) => void,
  onWishlistAdd: (item: WishlistItemInterface) => void,
) => {
  await axios
    .post(
      `http://localhost:4996/api/cart/movewishlist/${id}`,
      { productId, size, color, availableQuantity, orderQuantity },
      {
        withCredentials: true,
      },
    )
    .then((res) => {
      onDelete(id);
      onWishlistAdd(res.data.wishlistItem);
    })
    .catch((err) => toast.error(err?.response?.data?.message));
};
