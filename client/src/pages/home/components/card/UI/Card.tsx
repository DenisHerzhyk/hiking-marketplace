import React from "react";
import CardInterface from "../interface/CardInterface";

const Card = ({ title, image }: CardInterface) => {
  return (
    <>
      <div className="card relative flex-shrink-0 w-full tablet:w-full laptop:w-[300px] tablet:flex-shrink tablet:flex-1">
        <div className="overflow absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-25 -z-8 rounded-[8px]"></div>
        <div className="image">
          <img
            src={image}
            alt="image"
            className="block w-full h-[200px] laptop:h-[500px] object-cover object-center rounded-[8px] -z-9"
          />
        </div>
        <div className="content flex flex-col items-start z-10">
          <h1 className="card__title text-[24px] text-white font-semibold absolute top-1/2 left-5">
            {title}
          </h1>
          <button className="card__button absolute bottom-4 laptop:bottom-10 left-5 text-base w-fit text-white bg-opacity-0 border-2 border-white py-1 px-6 rounded-full font-medium">
            SHOP
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
