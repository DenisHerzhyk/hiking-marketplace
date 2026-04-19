import React from "react";
import WishlistItemInterface from "../interface/SavedItemInterface";
import { GoMoveToTop } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";

const WishlistItem: React.FC<WishlistItemInterface> = ({
  id,
  wishlistId,
  productId,
  product,
  size,
  color,
  onDelete,
}) => {
  const handleSavedRemove = async () => {
    await axios
      .delete(`http://localhost:4996/api/wishlist/remove/${productId}`, {
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
      <div className="SavedItem flex flex-row gap-[30px] items-stretch min-h-[150px] max-w-full  tablet:max-w-[800px]">
        <div className="nav-menu flex flex-col gap-[10px] w-[150px] relative group">
          <img
            className="cartitem__image object-cover object-center w-full flex-1 rounded-[2px]"
            src={product.productImages[0]}
            alt="img"
          />
          <FaRegTrashAlt
            onClick={handleSavedRemove}
            className="absolute z-10 text-[45px] opacity-0 group-hover:opacity-100 transition delay-75 duration-200 ease-in text-red-500 bg-white border border-gray rounded-sm p-3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
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
          <button
            className="flex flex-row text-gray-400 items-end justify-end text-base mt-[20px] gap-[8px] h-full focus:outline-none underline"
            onClick={handleSavedRemove}
          >
            <p>Remove</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default WishlistItem;
