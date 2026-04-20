import axios from "axios";

export const handleWishlistAdd = async (id: Number, size: string) => {
  await axios
    .post(
      `http://localhost:4996/api/wishlist/add/${id}`,
      {
        size: size,
        color: "green",
      },
      { withCredentials: true },
    )
    .then((res) => console.log("Item was added. Check the wishlist"))
    .catch((err) => console.log(err));
};
