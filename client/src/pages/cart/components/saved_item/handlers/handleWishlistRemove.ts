import api from "../../../../../axios.ts";

export const handleWishlistRemove = async (
  productId: number,
  id: number,
  onDelete: (id: number) => void,
) => {
  await api
    .delete(`/api/wishlist/remove/${productId}`, {
      withCredentials: true,
    })
    .then(() => {
      onDelete(id);
    })
    .catch((err) =>
      console.error("Error. Item was not deleted: ", err.message),
    );
};
