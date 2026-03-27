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
          <h1 className="productcard__title font-medium text-sm inline-block max-w-[250px] overflow-hidden truncate">
            {title}
          </h1>
          <p className="productcard__price font-medium text-sm mt-[5px]">
            ${price}
          </p>
          <button className="mt-[10px] flex flex-row w-fit gap-[3px] items-center py-[6px] px-[18px] border border-black bg-white hover:bg-black text-black hover:text-white transition-all duration-300 ease-out rounded-full">
            <FaPlus className="text-sm" />
            <span className="text-sm text-nowrap">Add</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MainProductCard;
