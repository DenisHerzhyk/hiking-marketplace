import React from "react";
import SavedItemInterface from "../interface/SavedItemInterface";

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
      <div className="SavedItem flex flex-row gap-[15px] mobile:gap-[4px] tablet:gap-[25px] max-w-full tablet:max-w-[728px]">
        <div className="nav-menu flex flex-col gap-[10px]">
          <img
            className="cartitem__image w-[100px] h-[120px] tablet:w-[120px] tablet:h-[140px]"
            src={img}
            alt="img"
          />
          <div className="w-[100px] mobile:w-[120px]">
            <button className="w-full font-semibold bg-white border border-black rounded-full text-xs py-[6px] tablet:py-[8.5px]">
              ADD TO CART
            </button>
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
          <div className="flex flex-row justify-end items-end h-full">
            <p className="text-sm leading-none underline">REMOVE</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedItem;
