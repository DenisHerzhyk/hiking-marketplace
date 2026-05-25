import React from "react";
import CartItemInterface from "../interface/CartItemInterface.ts";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { handleCartItemDelete } from "../handlers/handleCartItemRemove.ts";
import { handleMoveToWishlist } from "../handlers/handleMoveToWishlist.ts";
import { colorNames } from "../components/color.ts";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const CartItem: React.FC<CartItemInterface> = ({
  id,
  cartId,
  productId,
  product,
  orderQuantity,
  availableQuantity,
  onQuantityChange,
  size,
  color,
  onDelete,
  onWishlistAdd,
}) => {
  const handleCartItemUpdateReq = async (newQuantity: number) => {
    if (newQuantity > availableQuantity) {
      toast.error(
        `Only ${availableQuantity} item${availableQuantity === 1 ? "" : "s"} left in size ${size}`,
      );
      return;
    }
    try {
      await axios.post(
        `http://localhost:4996/api/cart/update/${id}`,
        { availableQuantity, orderQuantity: newQuantity },
        {
          withCredentials: true,
        },
      );
      onQuantityChange(newQuantity);
      toast.success("Quantity updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update cart");
    }
  };
  return (
    <>
      <div className="CartItem flex flex-row gap-[30px] items -stretch min-h-[150px] max-w-full  tablet:max-w-[800px]">
        <div className="nav-menu flex flex-col gap-[10px]">
          <Link to={`/product/${productId}`}>
            <img
              className="cartitem__image object-cover object-center w-[150px] flex-1 rounded-[2px]"
              src={product.productImages[0]}
              alt="img"
            />
          </Link>
          <form className="product-amount flex flex-row font-medium text-sm border-b border-black w-auto self-start">
            <select
              name="sizes"
              id="sizes"
              className="focus:outline-none pr-4 pl-2 py-2"
              value={orderQuantity}
              onChange={(e) => {
                handleCartItemUpdateReq(Number(e.target.value));
              }}
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
                <Link to={`/product/${productId}`}>
                  {product.title.toUpperCase()}
                </Link>
              </h2>
              <div className={`text-lg`}>
                <p
                  className={`${product?.discount && "line-through text-gray-600"}`}
                >
                  €{(product.price * orderQuantity).toFixed(2)}
                </p>
                {product?.discount && (
                  <span className="text-red-700">
                    €
                    {(
                      (product.price -
                        (product.price * product.discount) / 100) *
                      orderQuantity
                    ).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            <p
              className={`font-light ${product.inStock ? "text-green-800" : "text-red-800"} text-[10px] mobile:text-xs mb-[10px]`}
            >
              {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
            </p>
            <div className="text-xs mobile:text-[13px]">
              <span>
                {product.category.toUpperCase()}/{size}/
                {colorNames[color] ?? color}
              </span>
              {availableQuantity <= 9 && (
                <div>
                  <br />
                  <span className="text-[13px] text-red-700">
                    {availableQuantity} left
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center justify-start mt-[20px] laptop:justify-center gap-[15px] h-full">
            <button
              onClick={() =>
                handleMoveToWishlist(productId, id, onDelete, onWishlistAdd)
              }
              className="flex flex-row items-center gap-[8px] focus:outline-none"
            >
              <p className="text-sm leading-none">SAVE FOR LATER</p>
              <FaRegHeart className="w-[14px] h-[14px]" />
            </button>

            <FaRegTrashAlt
              className="w-[14px] h-[14px] cursor-pointer"
              onClick={() => handleCartItemDelete(productId, id, onDelete)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
