import React from "react";
import WishlistItemInterface from "../interface/SavedItemInterface";
import { Link } from "react-router-dom";
import { handleWishlistRemove } from "../handlers/handleWishlistRemove.ts";
import { handleMoveToCart } from "../handlers/handleMoveToCart.ts";
import { colorNames } from "../../cart_item/components/color.ts";

const WishlistItem: React.FC<WishlistItemInterface> = ({
  id,
  wishlistId,
  productId,
  product,
  size,
  color,
  orderQuantity,
  availableQuantity,
  onDelete,
  onCartAdd,
}) => {
  return (
    <>
      <div className="SavedItem flex flex-row gap-[30px] items-stretch min-h-[150px] max-w-full  tablet:max-w-[800px]">
        <div className="nav-menu flex flex-col gap-[20px] min-w-[100px] w-[150px] relative">
          <Link to={`/product/${productId}`}>
            <img
              className="cartitem__image object-cover object-center w-full flex-1 rounded-[2px]"
              src={product.productImages[0]}
              alt="img"
            />
          </Link>
          <button
            onClick={() =>
              handleMoveToCart(
                productId,
                id,
                size,
                color,
                availableQuantity,
                orderQuantity,
                onDelete,
                onCartAdd,
              )
            }
            className="w-full min-w-[90px] border border-black hover:text-white hover:bg-black transition-all duration-300 ease-in-out rounded-full py-4 text-sm tablet:text-[15px] whitespace-nowrap"
          >
            Add to Cart
          </button>
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
                  €{product.price.toFixed(2)}
                </p>
                {product?.discount && (
                  <span className="text-red-700">
                    €
                    {(
                      product.price -
                      (product.price * product.discount) / 100
                    ).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {availableQuantity <= 9 && (
                <span className="text-[10px] sm:text-xs font-medium text-red-600">
                  Only {availableQuantity} left
                </span>
              )}
            </div>
            <p className="text-xs mobile:text-[13px]">
              {product.category.toUpperCase()}/{size}/
              {colorNames[color].toUpperCase()}
            </p>
          </div>
          <button
            className="flex flex-row text-gray-400 items-end justify-end text-base mt-[20px] gap-[8px] h-full focus:outline-none underline"
            onClick={() => handleWishlistRemove(productId, id, onDelete)}
          >
            <p>Remove</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default WishlistItem;
