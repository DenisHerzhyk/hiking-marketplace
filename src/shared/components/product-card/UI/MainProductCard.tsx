import React from "react";
import ProductCardInterface from "../interface/ProductCardInterface";
import "../../../../styles/main.scss";

const MainProductCard = ({ img, title, price }: ProductCardInterface) => {
  return (
    <>
      <div className="MainProductCard flex-shrink-0">
        <div className="productcard__image relative w-[220px] h-[275px] laptop:w-[300px] laptop:h-[375px]">
          <img className="w-full h-auto object-contain" src={img} alt="img" />
          <p className="font-medium text-white bg-black text-xs px-[21.5px] py-[5.5px] absolute top-0 left-0">
            NEW
          </p>
        </div>
        <div className="content flex flex-col mt-[24px]">
          <h1 className="productcard__title font-medium text-base">{title}</h1>
          <p className="productcard__price text-sm mt-[12px]">${price}</p>
        </div>
      </div>
    </>
  );
};

export default MainProductCard;
