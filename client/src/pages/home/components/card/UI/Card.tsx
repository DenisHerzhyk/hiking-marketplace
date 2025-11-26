import React from "react";
import CardInterface from "../interface/CardInterface";

const Card = ({ title, image }: CardInterface) => {
  return (
    <>
      <div className="card flex-shrink-0">
        <div className="image">
          <img
            src={image}
            alt="image"
            className="block w-[200px] h-[200px] mobile:w-[400px] mobile:h-[500px] object-cover"
          />
        </div>
        <div className="content mt-[10px] flex flex-col tems-start">
          <h1 className="card__title text-[20px] font-semibold">{title}</h1>
          <button className="card__button text-base w-fit text-white bg-black py-1 px-6 rounded-full font-medium mt-[21px]">
            SHOP
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
