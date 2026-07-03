import api from "../../../../../axios.ts";
export const handleCartItemAdd = async (
  id: Number,
  availableQuantity: Number,
  size: string,
  color: string,
) => {
  await api
    .post(
      `/api/cart/add/${id}`,
      {
        size,
        color,
        availableQuantity,
        orderQuantity: 1,
      },
      { withCredentials: true },
    )
    .then((res) => console.log("Item was added. Check the cart"))
    .catch((err) => console.error(err));
};
