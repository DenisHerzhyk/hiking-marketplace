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
      toast.success("Quantity updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update cart");
    }
  };

  const finalPrice = product?.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <div className="bg-white border-b border-gray-200 py-6 last:border-b-0">
      <div className="flex gap-4">
        <Link to={`/product/${productId}`} className="flex-shrink-0 group">
          <div className="relative w-24 h-32 sm:w-32 sm:h-40 md:w-36 md:h-44 overflow-hidden rounded-md bg-gray-50">
            <img
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              src={product.productImages[0]}
              alt={product.title}
            />
            {product?.discount && (
              <div className="absolute top-1 right-1 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded">
                -{product.discount}%
              </div>
            )}
          </div>
        </Link>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex justify-between gap-3 mb-2">
            <Link
              to={`/product/${productId}`}
              className="flex-1 min-w-0 hover:underline"
            >
              <h2 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2">
                {product.title}
              </h2>
            </Link>

            <div className="flex flex-col items-end flex-shrink-0">
              {product?.discount && (
                <span className="text-xs text-gray-400 line-through">
                  €{(product.price * orderQuantity).toFixed(2)}
                </span>
              )}
              <span className="text-base sm:text-lg font-bold text-gray-900">
                €{(finalPrice * orderQuantity).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium ${
                product.inStock
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
            {availableQuantity <= 9 && (
              <span className="text-[10px] sm:text-xs font-medium text-red-600">
                Only {availableQuantity} left
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 mb-3">
            <span>
              <span className="font-medium text-gray-700">Size:</span>{" "}
              <span className="font-semibold text-gray-900">{size}</span>
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1.5">
              <span className="font-medium text-gray-700">Color:</span>
              <span
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300 flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="text-gray-900">
                {colorNames[color] ?? "Custom"}
              </span>
            </span>
          </div>

          <div className="mt-auto pt-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <label
                htmlFor={`quantity-${id}`}
                className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap"
              >
                Qty:
              </label>
              <select
                id={`quantity-${id}`}
                className="rounded border border-gray-300 bg-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-gray-900 hover:border-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors cursor-pointer"
                value={orderQuantity}
                onChange={(e) => {
                  handleCartItemUpdateReq(Number(e.target.value));
                }}
              >
                {Array.from(
                  { length: Math.min(9, availableQuantity) },
                  (_, i) => i + 1,
                ).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() =>
                  handleMoveToWishlist(
                    productId,
                    id,
                    size,
                    color,
                    availableQuantity,
                    orderQuantity,
                    onDelete,
                    onWishlistAdd,
                  )
                }
                className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-700 hover:text-black transition-colors"
                title="Save for Later"
              >
                <FaRegHeart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Save</span>
              </button>

              <button
                onClick={() => handleCartItemDelete(productId, id, onDelete)}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                title="Remove"
              >
                <FaRegTrashAlt className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Remove</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
