import React from "react";
import ProductCardInterface from "./ProductCardInterface";
import "../../../../styles/main.scss";

const ProductCard = ({ img, title, price }: ProductCardInterface) => {
  return (
    <>
      <div className="product-card min-w-[132px] min-h-[231px] mobile:min-w-[270px] mobile:min-h-[398px] laptop:min-w-[300px] laptop:min-h-[457px] relative">
        <div className="image relative">
          <div className="image__sticker absolute top-0 left-0">
            <p className="text-[8px] mobile:text-xs mobile:px-[22px] py-[2px] px-[13px] mobile:py-[5px] bg-black text-white">
              NEW
            </p>
          </div>
          <img
            src={img}
            alt="img"
            className="w-[132px] h-[156px] mobile:w-[270px] mobile:h-[320px] tablet:w-[300px] tablet:h-[375px] object-cover"
          />
          <div className="action-buttons absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col font-light text-[8px] mobile:text-sm gap-3 ">
            {/* TODO when we click on tablet or mobile block should appear, otherwise no. Instead of text, icons should appear*/}
            <button className="product-card__button-save bg-black hover:bg-[var(--secondary-color)] text-white hover:text-black py-2 px-4 mobile:py-2 mobile:px-5 rounded-full min-w-[95px] min-h-[25px]">
              SAVE TO CART
            </button>
            <button className="product-card__button-buy bg-black hover:bg-[var(--secondary-color)] text-white hover:text-black py-2 px-4  mobile:py-2 mobile:px-5 rounded-full">
              BUY NOW
            </button>
          </div>
        </div>
        <h1 className="product-card__title text-[10px] mobile:text-base font-medium mt-9 mobile:mt-4 laptop:mt-6">
          {title}
        </h1>
        <p className="product-card__price text-xs mobile:text-sm absolute bottom-0">
          {price}
        </p>
      </div>
    </>
  );
};

export default ProductCard;
