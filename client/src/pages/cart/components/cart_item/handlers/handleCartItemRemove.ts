import api from "../../../../../axios.ts";

export const handleCartItemDelete = async (
  productId: number,
  id: number,
  onDelete: (id: number) => void,
) => {
  await api
    .delete(`/api/cart/remove/${productId}`, {
      withCredentials: true,
    })
    .then(() => {
      onDelete(id);
    })
    .catch((err) =>
      console.error("Error. Item was not deleted: ", err.message),
    );
};
