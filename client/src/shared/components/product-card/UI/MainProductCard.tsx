import React from "react";
import ProductCardInterface from "../interface/ProductCardInterface";
import "../../../../styles/main.scss";
import { FaP, FaPlus } from "react-icons/fa6";

const MainProductCard = ({ id, img, title, price }: ProductCardInterface) => {
  return (
    <>
      <div
        className="MainProductCard relative group flex-shrink-0 w-[250px] laptop:flex-shrink laptop:flex-1 laptop:w-auto"
        key={id}
      >
        <div className="productcard__image relative w-full h-[240px] tablet:h-[350px]">
          <img
            className="w-full h-full object-cover rounded-md"
            src={img}
            alt="img"
          />
          <p className="font-medium text-white bg-black text-xs px-[21.5px] py-[5.5px] rounded-[8px] absolute top-2 left-2">
            NEW
          </p>
        </div>
        <div className="content flex flex-col mt-[24px]">
          <h1 className="productcard__title font-medium text-base inline-block max-w-[250px] overflow-hidden truncate">
            {title}
          </h1>
          <p className="productcard__price text-sm mt-[12px]">${price}</p>
          <button className="absolute z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 flex flex-row gap-[8px] items-center py-[6.5px] px-[22.5px] shadow-md bg-white text-black rounded-full">
            <FaPlus className="w-[15px] h-[15px]" />
            <span className="text-sm font-medium text-nowrap">ADD TO CART</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MainProductCard;
