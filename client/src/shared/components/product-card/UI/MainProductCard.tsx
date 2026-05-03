import React, { useState } from "react";
import ProductInterface from "../interface/ProductInterface.js";
import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";
import { FaP, FaPlus } from "react-icons/fa6";
import { handleCartItemAdd } from "../../../../pages/cart/components/cart_item/handlers/handleCartItemAdd.js";
import { handleWishlistAdd } from "../../../../pages/cart/components/saved_item/handlers/handleWishlistAdd.js";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { colorNames } from "../../../../pages/cart/components/cart_item/components/color.js";

const MainProductCard = ({
  id,
  title,
  discount,
  price,
  availableSizes,
  category,
  gender,
  fit,
  color,
  sizeGuide,
  details,
  productImages,
  description,
  inStock,
}: ProductInterface) => {
  const [openSection, setOpenSection] = useState(false);
  const [selColor, setSelColor] = useState<string | null>(null);
  const [selSize, setSelSize] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (!selColor) {
      toast.error("Please select a color");
      return;
    }

    if (!selSize) {
      toast.error("Please select a size");
      return;
    }

    handleCartItemAdd(id, selSize, selColor);
    toast.success("Item added to cart!");
  };

  const handleAddToWishlist = () => {
    if (!selColor) {
      toast.error("Please select a color");
      return;
    }

    if (!selSize) {
      toast.error("Please select a size");
      return;
    }

    handleWishlistAdd(id, selSize, selColor);
    toast.success("Item added to wishlist");
  };

  const handleColorSelect = (color: string) => {
    setSelColor(color);
    setOpenSection(true);
  };

  const handleSizeSelect = (size: string) => {
    setSelSize(size);
    setOpenSection(true);
  };
  return (
    <div
      className="MainProductCard relative flex-shrink-0 min-w-[270px] laptop:flex-shrink laptop:flex-1 laptop:w-auto"
      key={id}
      onMouseLeave={() => setOpenSection(false)}
    >
      {/* <div className="fixed inset-0 bg-black/20 z-40"></div> */}
      <div className="productcard__image group relative w-full h-[280px] tablet:h-[350px]">
        <Link to={`/product/${id}`}>
          <div className="overflow-hidden rounded-md h-full">
            <img
              className="w-full h-full object-center object-cover transition-transform duration-300 group-hover:scale-105"
              src={productImages[0]}
              alt="img"
            />
          </div>
        </Link>
        <p className="font-medium text-white bg-black text-xs px-[21.5px] py-[5.5px] rounded-[8px] absolute top-2 left-2">
          NEW
        </p>
        <ul
          className={`w-full ${openSection ? "opacity-100" : "opacity-0"} absolute bottom-0 left-0 right-0 flex flex-row gap-2 px-3 py-6 bg-white bg-opacity-80 transition-opacity duration-200 ease-in-out`}
        >
          {availableSizes.map((size) => (
            <li
              key={size}
              className={`py-3 flex-1 text-center px-auto rounded-lg cursor-pointer transition-all duration-200 ease-in
    ${selSize === size ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              onClick={() => handleSizeSelect(size)}
            >
              {size}
            </li>
          ))}
        </ul>
        <button
          className="absolute top-2 right-2 z-10 text-3xl group/save cursor-pointer"
          onClick={() => handleAddToWishlist()}
        >
          <VscHeart className="transition-opacity duration-300 ease-in opacity-100 group-hover:opacity-0" />
          <VscHeartFilled className="absolute top-0 right-0 transition-opacity duration-300 ease-in opacity-0 group-hover:opacity-100" />
        </button>
      </div>
      <div className="content flex flex-col mt-[15px]">
        <div className="flex flex-row flex-wrap gap-2">
          <button
            title={colorNames[color] ?? color}
            key={color}
            style={{ backgroundColor: color }}
            className="w-[25px] h-[25px] rounded-full border-2 border-transparent hover:border-black transition-all duration-200 cursor-pointer"
            onClick={() => handleColorSelect(color)}
          />
        </div>
        <h1 className="productcard__title font-medium text-base inline-block max-w-[250px] overflow-hidden truncate mt-[20px]">
          {title}
        </h1>
        <div
          className={`productcard__price font-medium text-base mt-[5px] ${discount && "flex flex-row gap-2"}`}
        >
          <span className={`${discount && "line-through text-gray-600"}`}>
            ${price}
          </span>

          {discount && (
            <span className="text-red-700 no-de">
              ${(price - (price * discount) / 100).toFixed(0)}
            </span>
          )}
        </div>
        <button
          className="mt-[10px] flex flex-row w-fit gap-[3px] items-center py-[6px] px-[18px] border border-black bg-white hover:bg-black text-black hover:text-white transition-all duration-300 ease-out rounded-full"
          onClick={() => handleAddToCart()}
        >
          <FaPlus className="text-sm" />
          <span className="text-sm text-nowrap">Add</span>
        </button>
      </div>
    </div>
  );
};

export default MainProductCard;
