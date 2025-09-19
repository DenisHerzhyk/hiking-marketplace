import React from "react";
import CardInterface from "./CardInterface";

const Card = ({ title, image }: CardInterface) => {
  return (
    <>
      <div className="card">
        <div className="image">
          <img
            src={image}
            alt="image"
            className="w-[152px] h-[200px] mobile:w-[276px] mobile:h-[260px] tablet:w-[275px] tablet:h-[350px] latop:w-[320px] laptop:h-[390px] object-cover"
          />
        </div>
        <div className="content flex flex-col items-center tablet:items-start border border-gray tablet:border-none py-3 tablet:py-0">
          <h1 className="card__title text-base mobile:text-xl font-semibold mt-0 tablet:mt-5">
            {title}
          </h1>
          <button className="card__button text-sm mobile:text-base w-fit text-white bg-black py-1 px-6 rounded-full font-medium mt-2 tablet:mt-7">
            SHOP
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
