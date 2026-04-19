import React from "react";
import CartItemInterface from "../interface/CartItemInterface.ts";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";

const CartItem: React.FC<CartItemInterface> = ({
  id,
  cartId,
  productId,
  product,
  quantity,
  size,
  color,
  onDelete,
}) => {
  const handleDelete = async () => {
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
  return (
    <>
      <div className="CartItem flex flex-row gap-[30px] items -stretch min-h-[150px] max-w-full  tablet:max-w-[800px]">
        <div className="nav-menu flex flex-col gap-[10px]">
          <img
            className="cartitem__image object-cover object-center w-[150px] flex-1 rounded-[2px]"
            src={product.productImages[0]}
            alt="img"
          />
          <form className="product-amount flex flex-row font-medium text-sm border-b border-black w-auto self-start">
            <select
              name="sizes"
              id="sizes"
              className="focus:outline-none pr-4 pl-2 py-2"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </form>
        </div>
        <div className="flex flex-col w-full justify-between">
          <div className="cartitem__content flex flex-col w-full">
            <div className="flex flex-row flex-wrap w-full justify-between items-start">
              <h2 className="font-medium break-words text-base">
                {product.title.toUpperCase()}
              </h2>
              {/* Design discounts */}
              <p className="text-lg">${product.price.toFixed(2)}</p>
            </div>
            <p
              className={`font-light ${product.inStock ? "text-green-800" : "text-red-800"} text-[10px] mobile:text-xs mb-[10px]`}
            >
              {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
            </p>
            <p className="text-xs mobile:text-[13px]">
              {product.category.toUpperCase()}/{size}/{color.toUpperCase()}
            </p>
          </div>
          <div className="flex flex-row items-end justify-start mt-[20px] laptop:justify-center gap-[8px] h-full">
            <p className="text-sm leading-none">SAVE FOR LATER</p>
            <FaRegHeart className="w-[14px] h-[14px]" />
            <FaRegTrashAlt
              className="w-[14px] h-[14px] cursor-pointer"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
