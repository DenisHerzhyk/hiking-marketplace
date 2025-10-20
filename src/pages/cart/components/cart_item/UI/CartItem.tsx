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
      <div className="CartItem flex flex-row gap-[15px] mobile:gap-[4px] tablet:gap-[25px] max-w-full tablet:max-w-[728px]">
        <div className="nav-menu flex flex-col gap-[10px]">
          <img
            className="cartitem__image w-[100px] h-[120px] tablet:w-[120px] tablet:h-[140px]"
            src={img}
            alt="img"
          />
          <div className="product-amount flex flex-row font-medium text-sm w-[100px] mobile:w-[120px]">
            <div className="flex justify-center items-center border-2 border-[var(--secondary-color)] h-[30px] w-[30px] tablet:h-[35px] tablet:w-[35px]">
              <FaRegTrashAlt />
            </div>
            <div className="flex justify-center items-center border-t-2 border-b-2 border-[var(--secondary-color)] h-[30px] w-[40px] tablet:h-[35px] tablet:w-[50px]">
              1
            </div>
            <div className="flex justify-center items-center border-2 border-[var(--secondary-color)] h-[30px] w-[30px] tablet:h-[35px] tablet:w-[35px]">
              <FaPlus />
            </div>
          </div>
        </div>
        <div className="cartitem__content flex flex-col w-full">
          <div className="flex flex-row flex-wrap w-full justify-between items-start mb-[2px]">
            <h2 className="font-medium break-words text-sm mobile:text-base">
              {title.toUpperCase()}
            </h2>
            {/* Design discounts */}
            <p className="text-sm mobile:text-lg">${price.toFixed(2)}</p>
          </div>
          <p className="font-light text-[var(--green-color)] text-[10px] mobile:text-xs mb-[7px] tablet:mb-[17px]">
            {inStock ? "IN STOCK" : "OUT OF STOCK"}
          </p>
          <p className="text-xs mobile:text-[13px]">
            {category}/{size}/{color}
          </p>
          <div className="flex flex-row justify-center items-end gap-[8px] h-full">
            <p className="text-sm leading-none">SAVE FOR LATER</p>
            <FaRegHeart className="w-[14px] h-[14px]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
