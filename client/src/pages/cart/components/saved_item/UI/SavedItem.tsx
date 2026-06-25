import React from "react";
import WishlistItemInterface from "../interface/SavedItemInterface";
import { Link } from "react-router-dom";
import { handleWishlistRemove } from "../handlers/handleWishlistRemove.ts";
import { handleMoveToCart } from "../handlers/handleMoveToCart.ts";
import { colorNames } from "../../cart_item/components/color.ts";
import { FaRegTrashAlt } from "react-icons/fa";

const WishlistItem: React.FC<WishlistItemInterface> = ({
  id,
  wishlistId,
  productId,
  product,
  stock,
  size,
  color,
  orderQuantity,
  onDelete,
  onCartAdd,
}) => {
  const finalPrice = product?.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <div className="bg-white border-b border-gray-200 py-5 px-4 last:border-b-0">
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-[100px] flex flex-col gap-2.5">
          <Link to={`/product/${productId}`}>
            <div className="w-[100px] h-[130px] rounded-md overflow-hidden bg-gray-50">
              <img
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                src={product.productImages[0]}
                alt={product.title}
              />
            </div>
          </Link>
          <button
            onClick={() =>
              handleMoveToCart(
                productId,
                id,
                size,
                color,
                stock[size],
                orderQuantity,
                onDelete,
                onCartAdd,
              )
            }
            className="w-full text-xs py-2 border border-gray-900 rounded-full hover:bg-black hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!stock[size]}
          >
            Add to cart
          </button>
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <div className="flex justify-between items-start gap-3">
            <Link
              to={`/product/${productId}`}
              className="hover:underline flex-1 min-w-0"
            >
              <p className="text-sm font-medium text-gray-900 leading-snug">
                {product.title}
              </p>
            </Link>
            <div className="text-right flex-shrink-0">
              {product?.discount && (
                <p className="text-xs text-gray-400 line-through">
                  €{product.price.toFixed(2)}
                </p>
              )}
              <p
                className={`text-sm font-medium ${product?.discount ? "text-red-600" : "text-gray-900"}`}
              >
                €{finalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            {product.category} · {size} · {colorNames[color] ?? color}
          </p>

          {stock[size] === 0 ? (
            <span className="text-[11px] font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full w-fit">
              Out of stock
            </span>
          ) : (
            stock[size] <= 9 && (
              <span className="text-[11px] font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full w-fit">
                Only {stock[size]} left
              </span>
            )
          )}

          <div className="mt-auto flex justify-end pt-3">
            <button
              onClick={() => handleWishlistRemove(productId, id, onDelete)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-600 transition-colors"
            >
              <FaRegTrashAlt className="w-3 h-3" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
