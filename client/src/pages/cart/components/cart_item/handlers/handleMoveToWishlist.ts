import axios from "axios";
import WishlistItemInterface from "../../saved_item/interface/SavedItemInterface";

export const handleMoveToWishlist = async (
  productId: number,
  id: number,
  onDelete: (id: number) => void,
  onWishlistAdd: (item: WishlistItemInterface) => void,
) => {
  await axios
    .post(
      `http://localhost:4996/api/cart/movewishlist/${productId}`,
      {},
      {
        withCredentials: true,
      },
    )
    .then((res) => {
      onDelete(id);
      onWishlistAdd(res.data.wishlistItem);
    })
    .catch((err) => console.log(err));
};
