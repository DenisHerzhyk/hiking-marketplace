import api from "../../../../../axios.ts";

export const handleWishlistAdd = async (
  id: number,
  availableQuantity: number,
  size: string,
  color: string,
) => {
  await api
    .post(
      `/api/wishlist/add/${id}`,
      {
        size: size,
        color: color,
        availableQuantity,
        orderQuantity: 1,
      },
      { withCredentials: true },
    )
    .then((res) => console.log("Item was added. Check the wishlist"))
    .catch((err) => console.log(err));
};
