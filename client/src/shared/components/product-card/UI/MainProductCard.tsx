import React from "react";
import ProductCardInterface from "../interface/ProductCardInterface";
import "../../../../styles/main.scss";
import { FaP, FaPlus } from "react-icons/fa6";

const MainProductCard = ({ id, img, title, price }: ProductCardInterface) => {
  return (
    <>
      <div
        className="MainProductCard flex-shrink-0 w-[250px] laptop:flex-shrink laptop:flex-1 laptop:w-auto"
        key={id}
      >
        <div className="productcard__image relative w-full h-[240px] tablet:h-[350px]">
          <img className="w-full h-full object-cover" src={img} alt="img" />
          <p className="font-medium text-white bg-black text-xs px-[21.5px] py-[5.5px] rounded-[8px] absolute top-2 left-2">
            NEW
          </p>
        </div>
        <div className="content flex flex-col mt-[24px]">
          <h1 className="productcard__title font-medium text-base inline-block max-w-[250px] overflow-hidden truncate">
            {title}
          </h1>
          <p className="productcard__price text-sm mt-[12px]">${price}</p>
          <button className="flex flex-row gap-[8px] mt-[15px] items-center py-[6.5px] px-[22.5px] hover:bg-black text-black hover:text-white border border-black rounded-full w-fit">
            <FaPlus className="w-[15px] h-[15px]" />
            <span className="text-sm font-semibold">ADD</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MainProductCard;
