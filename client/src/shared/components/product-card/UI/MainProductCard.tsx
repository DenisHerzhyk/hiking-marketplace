import React from "react";
import ProductCardInterface from "../interface/ProductCardInterface";
import "../../../../styles/main.scss";
import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";
import { FaP, FaPlus } from "react-icons/fa6";
import axios from "axios";
import { quality } from "@cloudinary/url-gen/actions/delivery";

const MainProductCard = ({
  id,
  img,
  title,
  price,
  size,
}: ProductCardInterface) => {
  const handleCartAdd = async () => {
    await axios
      .post(
        `http://localhost:4996/api/cart/add/${id}`,
        {
          quantity: 1,
          size: size,
          color: "green",
        },
        { withCredentials: true },
      )
      .then((res) => console.log("Item was added. Check the cart"))
      .catch((err) => console.error(err));
  };
  const handleWishlistAdd = async () => {
    await axios
      .post(
        `http://localhost:4996/api/wishlist/add/${id}`,
        {
          size: size,
          color: "green",
        },
        { withCredentials: true },
      )
      .then((res) => console.log("Item was added. Check the wishlist"))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div
        className="MainProductCard relative flex-shrink-0 min-w-[270px] laptop:flex-shrink laptop:flex-1 laptop:w-auto"
        key={id}
      >
        <div className="productcard__image group relative w-full h-[280px] tablet:h-[350px]">
          <img
            className="w-full h-full object-center object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
            src={img}
            alt="img"
          />
          <p className="font-medium text-white bg-black text-xs px-[21.5px] py-[5.5px] rounded-[8px] absolute top-2 left-2">
            NEW
          </p>
          <button
            className="absolute top-2 right-2 z-10 text-3xl group/save cursor-pointer"
            onClick={handleWishlistAdd}
          >
            <VscHeart className="transition-opacity duration-300 ease-in opacity-100 group-hover:opacity-0" />
            <VscHeartFilled className="absolute top-0 right-0 transition-opacity duration-300 ease-in opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="content flex flex-col mt-[24px]">
          <h1 className="productcard__title font-medium text-sm inline-block max-w-[250px] overflow-hidden truncate">
            {title}
          </h1>
          <p className="productcard__price font-medium text-sm mt-[5px]">
            ${price}
          </p>
          <button
            className="mt-[10px] flex flex-row w-fit gap-[3px] items-center py-[6px] px-[18px] border border-black bg-white hover:bg-black text-black hover:text-white transition-all duration-300 ease-out rounded-full"
            onClick={handleCartAdd}
          >
            <FaPlus className="text-sm" />
            <span className="text-sm text-nowrap">Add</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MainProductCard;
