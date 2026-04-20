import axios from "axios";

export const handleCartItemDelete = async (
  productId: number,
  id: number,
  onDelete: (id: number) => void,
) => {
  await axios
    .delete(`http://localhost:4996/api/cart/remove/${productId}`, {
      withCredentials: true,
    })
    .then(() => {
      onDelete(id);
    })
    .catch((err) =>
      console.error("Error. Item was not deleted: ", err.message),
    );
};
