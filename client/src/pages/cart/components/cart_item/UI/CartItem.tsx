import React from "react";
import CartItemInterface from "../interface/CartItemInterface";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const CartItem: React.FC<CartItemInterface> = ({
  img,
  title,
  price,
  discount,
  inStock,
  category,
  size,
  color,
}) => {
  return (
    <>
      <div className="CartItem flex flex-row gap-[30px] items-stretch min-h-[150px] max-w-full  tablet:max-w-[800px]">
        <div className="nav-menu flex flex-col gap-[10px] w-[150px]">
          <img
            className="cartitem__image object-cover object-center w-full flex-1 rounded-[2px]"
            src={img}
            alt="img"
          />
          <div className="product-amount flex flex-row font-medium text-sm h-[35px] w-full">
            <div className="flex justify-center items-center border-2 border-[var(--normal-gray)] h-full  w-full">
              <FaRegTrashAlt />
            </div>
            <div className="flex justify-center items-center border-t-2 border-b-2 border-[var(--normal-gray)] h-full w-full">
              1
            </div>
            <div className="flex justify-center items-center border-2 border-[var(--normal-gray)] h-full w-full">
              <FaPlus />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full justify-between">
          <div className="cartitem__content flex flex-col w-full">
            <div className="flex flex-row flex-wrap w-full justify-between items-start">
              <h2 className="font-medium break-words text-base">
                {title.toUpperCase()}
              </h2>
              {/* Design discounts */}
              <p className="text-lg">${price.toFixed(2)}</p>
            </div>
            <p
              className={`font-light ${inStock ? "text-green-800" : "text-red-800"} text-[10px] mobile:text-xs mb-[10px]`}
            >
              {inStock ? "IN STOCK" : "OUT OF STOCK"}
            </p>
            <p className="text-xs mobile:text-[13px]">
              {category}/{size}/{color}
            </p>
          </div>
          <div className="flex flex-row items-end justify-start mt-[20px] laptop:justify-center gap-[8px] h-full">
            <p className="text-sm leading-none">SAVE FOR LATER</p>
            <FaRegHeart className="w-[14px] h-[14px]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
