import React from "react";
import SavedItemInterface from "../interface/SavedItemInterface";
import { GoMoveToTop } from "react-icons/go";

const SavedItem: React.FC<SavedItemInterface> = ({
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
      <div className="SavedItem flex flex-row gap-[30px] items-stretch min-h-[150px] max-w-full  tablet:max-w-[800px]">
        <div className="nav-menu flex flex-col gap-[10px] w-[150px]">
          <img
            className="cartitem__image object-cover object-center w-full flex-1 rounded-[2px]"
            src={img}
            alt="img"
          />
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
            <p className="text-sm leading-none">MOVE TO CART</p>
            <GoMoveToTop className="w-[14px] h-[14px]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedItem;
