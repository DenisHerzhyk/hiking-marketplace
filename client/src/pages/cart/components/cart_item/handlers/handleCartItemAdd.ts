import axios from "axios";

export const handleCartItemAdd = async (id: Number, size: string) => {
  await axios
    .post(
      `http://localhost:4996/api/cart/add/${id}`,
      {
        quantity: 1,
        size: size,
        color: "green",
      },
      { withCredentials: true },
    )
    .then((res) => console.log("Item was added. Check the cart"))
    .catch((err) => console.error(err));
};
