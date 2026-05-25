import axios from "axios";

export const handleCartItemAdd = async (
  id: Number,
  availableQuantity: Number,
  size: string,
  color: string,
) => {
  console.log("Sending to cart:", { id, availableQuantity, size, color }); // ← Add this

  await axios
    .post(
      `http://localhost:4996/api/cart/add/${id}`,
      {
        availableQuantity,
        orderQuantity: 1,
        size,
        color,
      },
      { withCredentials: true },
    )
    .then((res) => console.log("Item was added. Check the cart"))
    .catch((err) => console.error(err));
};
