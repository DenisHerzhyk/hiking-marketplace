import React, { useEffect, useState } from "react";
import ProductCard from "../../../shared/components/product-card/UI/ProductCard";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import MainProductCard from "../../../shared/components/product-card/UI/MainProductCard";
import { ProductInterface } from "../../../shared/components/product-card/interface/ProductInterface";
import w_img from "/images/categories/w.jpeg";
import m_img from "/images/categories/m.jpeg";
import s_img from "/images/categories/s.jpeg";
type Section = "product" | "sizes" | "price" | "shoes";
import { Link, useNavigate, useParams } from "react-router-dom";

type CategoryType = "men" | "women" | "shoes" | "deals";

const Category = () => {
  const { type } = useParams<{ type: string }>();
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [openSections, setOpenSections] = useState<Record<Section, boolean>>({
    product: true,
    sizes: true,
    price: true,
    shoes: true,
  });

  useEffect(() => {
    fetch("/json/products-all.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  });

  const toggleSection = (section: Section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const validateCategory: CategoryType[] = ["men", "women", "shoes", "deals"];
  const category = validateCategory.includes(type as CategoryType)
    ? (type as CategoryType)
    : null;

  if (!category) {
    return (
      <div className="mt-[250px] text-center">
        <h1>Category was not found!</h1>
        <Link to="/" className="underline text-blue-700">
          Return to Home page
        </Link>
      </div>
    );
  }

  const filteredProducts =
    category === "men" || category === "women"
      ? products.filter((item) => item.gender === category)
      : products.filter((item) => item.category === category);

  return (
    <>
      <div className="Category justify-center px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)]">
        {category !== "deals" ? (
          <div className="main-category flex justify-center items-center h-[calc[100vh]] tablet:h-[calc(100vh)] relative">
            <img
              src={
                category === "men"
                  ? m_img
                  : category === "women"
                    ? w_img
                    : category === "shoes"
                      ? s_img
                      : ""
              }
              alt="img"
              className="rounded-md h-[700px] w-full object-cover object-center"
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-10">
              <h2 className="text-wrap font-semibold text-2xl tablet:text-4xl laptop:text-6xl text-white mb-[40px]">
                Hiking gear made
                <br />
                to match your pace
              </h2>
              <Link
                className="home__button text-black font-bold text-base tablet:text-xl bg-white py-3 px-12 w-fit border border-black shadow-[4px_4px_0_#000,5px_5px_0_#fff]"
                to="/"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <h1>Change</h1>
          </div>
        )}

        <div className="categories mt-[100px] tablet:mt-[20px] flex flex-row flex-wrap gap-[7px] justify-between items-center w-full pb-[10px] mobile:pb-[16px] laptop:pb-[20px] border-b border-[var(--light-gray)]">
          <div className="flex flex-row flex-wrap items-center gap-[10px]">
            <h1 className="leading-none font-semibold text-[22px] mobile:text-[28px] laptop:text-[32px] ">
              {type?.toUpperCase()} CLOTHING
            </h1>
            <p className="font-light mobile:text-base text-[var(--light-gray)]">
              ({products.length} results)
            </p>
          </div>
          <nav className="category-nav flex items-center">
            <ul className="flex flex-row gap-[5px] font-light text-xs">
              <Link
                className={category === "men" ? "font-bold" : ""}
                to="/category/men"
              >
                MENS
              </Link>
              <p>/</p>
              <Link
                className={category === "women" ? "font-bold" : ""}
                to="/category/women"
              >
                WOMEN
              </Link>
              <p>/</p>
              <Link
                className={category === "shoes" ? "font-bold" : ""}
                to="/category/shoes"
              >
                SHOES
              </Link>
              <p>/</p>
              <Link
                className={category === "deals" ? "font-bold" : ""}
                to="/category/deals"
              >
                DEALS
              </Link>
            </ul>
          </nav>
        </div>
        <div className="content mt-[45px] flex flex-row justify-center laptop:justify-between gap-[10px] laptop:gap-[40px]">
          <div className="sidebar hidden laptop:flex flex-col flex-grow min-w-[160px] max-w-[160px] w-full">
            <div className="w-full flex flex-col gap-[25px]">
              <div className="w-full">
                <div className="flex flex-row w-full justify-between">
                  <p className="font-medium laptop:text-base text-nowrap">
                    SHOES{" "}
                  </p>
                  <div
                    onClick={() => toggleSection("shoes")}
                    className="cursor-pointer text-black"
                  >
                    {openSections.shoes ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </div>
                </div>
                <div
                  className={`${openSections.shoes ? "flex flex-col" : "hidden"} gap-[5px] laptop:gap-[1px] mt-[10px]`}
                >
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="hoodie"
                      id="hoodie"
                      value="hoodie"
                      className="appearance-none w-[15px] h-[15px] border border-black rounded-sm cursor-pointer"
                    />
                    <p className="text-xs laptop:text-sm">For Men</p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="hoodie"
                      id="hoodie"
                      value="hoodie"
                      className="appearance-none w-[15px] h-[15px] border border-black rounded-sm cursor-pointer"
                    />
                    <p className="text-xs laptop:text-sm">For Women</p>
                  </div>
                </div>
              </div>

              <div className="w-full border-t border-[var(--primary-border-color)] pt-[10px]">
                <div className="flex flex-row w-full justify-between">
                  <p className="font-medium laptop:text-base text-nowrap">
                    PRODUCT TYPE
                  </p>
                  <div
                    onClick={() => toggleSection("product")}
                    className="cursor-pointer text-black"
                  >
                    {openSections.product ? (
                      <IoIosArrowDown />
                    ) : (
                      <IoIosArrowUp />
                    )}
                  </div>
                </div>
                <div
                  className={`${openSections.product ? "flex flex-col" : "hidden"} gap-[5px] laptop:gap-[1px] mt-[10px]`}
                >
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="hoodie"
                      id="hoodie"
                      value="hoodie"
                      className="appearance-none w-[15px] h-[15px] border border-black rounded-sm cursor-pointer"
                    />
                    <p className="text-xs laptop:text-sm">Hoodie</p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="hoodie"
                      id="hoodie"
                      value="hoodie"
                      className="appearance-none w-[15px] h-[15px] border border-black rounded-sm cursor-pointer"
                    />
                    <p className="text-xs laptop:text-sm">Pants</p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="hoodie"
                      id="hoodie"
                      value="hoodie"
                      className="appearance-none w-[15px] h-[15px] border border-black rounded-sm cursor-pointer"
                    />
                    <p className="text-xs laptop:text-sm">Jackets</p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="hoodie"
                      id="hoodie"
                      value="hoodie"
                      className="appearance-none w-[15px] h-[15px] border border-black rounded-sm cursor-pointer"
                    />
                    <p className="text-xs laptop:text-sm">Sweaters</p>
                  </div>
                </div>
              </div>
              <div className="w-full border-t border-[var(--primary-border-color)] pt-[10px]">
                <div className="flex flex-row w-full justify-between">
                  <p className="font-medium laptop:text-base">SIZES</p>
                  <div
                    onClick={() => toggleSection("sizes")}
                    className="cursor-pointer text-black"
                  >
                    {openSections.sizes ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </div>
                </div>
                <div
                  className={`${openSections.sizes ? "flex flex-col" : "hidden"} gap-[5px] laptop:gap-[1px] mt-[10px]`}
                >
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="hoodie"
                      id="hoodie"
                      value="hoodie"
                      className="appearance-none w-[15px] h-[15px] border border-black rounded-sm cursor-pointer"
                    />
                    <p className="text-xs laptop:text-sm">XS</p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="hoodie"
                      id="hoodie"
                      value="hoodie"
                      className="appearance-none w-[15px] h-[15px] border border-black rounded-sm cursor-pointer"
                    />
                    <p className="text-xs laptop:text-sm">S</p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="hoodie"
                      id="hoodie"
                      value="hoodie"
                      className="appearance-none w-[15px] h-[15px] border border-black rounded-sm cursor-pointer"
                    />
                    <p className="text-xs laptop:text-sm">M</p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="hoodie"
                      id="hoodie"
                      value="hoodie"
                      className="appearance-none w-[15px] h-[15px] border border-black rounded-sm cursor-pointer"
                    />
                    <p className="text-xs laptop:text-sm">L</p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="hoodie"
                      id="hoodie"
                      value="hoodie"
                      className="appearance-none w-[15px] h-[15px] border border-black rounded-sm cursor-pointer"
                    />
                    <p className="text-xs laptop:text-sm">XL</p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="hoodie"
                      id="hoodie"
                      value="hoodie"
                      className="appearance-none w-[15px] h-[15px] border border-black rounded-sm cursor-pointer"
                    />
                    <p className="text-xs laptop:text-sm">XXL</p>
                  </div>
                </div>
              </div>
              <div className="w-full border-t border-[var(--primary-border-color)] pt-[10px]">
                <div className="flex flex-row w-full justify-between">
                  <p className="font-medium laptop:text-base">PRICE</p>
                  <div
                    className="cursor-pointer text-black"
                    onClick={() => toggleSection("price")}
                  >
                    {openSections.price ? (
                      <IoIosArrowDown />
                    ) : (
                      <IoIosArrowUp />
                    )}{" "}
                  </div>
                </div>
                <div
                  className={`${openSections.price ? "flex flex-col" : "hidden"} gap-[5px] laptop:gap-[1px] mt-[10px]`}
                >
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="hoodie"
                      id="hoodie"
                      value="hoodie"
                      className="appearance-none w-[15px] h-[15px] border border-black rounded-sm cursor-pointer"
                    />
                    <p className="text-xs laptop:text-sm">Under 50$</p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="hoodie"
                      id="hoodie"
                      value="hoodie"
                      className="appearance-none w-[15px] h-[15px] border border-black rounded-sm cursor-pointer"
                    />
                    <p className="text-xs laptop:text-sm">50$ - 100$</p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="hoodie"
                      id="hoodie"
                      value="hoodie"
                      className="appearance-none w-[15px] h-[15px] border border-black rounded-sm cursor-pointer"
                    />
                    <p className="text-xs laptop:text-sm">100$ - 200$</p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="hoodie"
                      id="hoodie"
                      value="hoodie"
                      className="appearance-none w-[15px] h-[15px] border border-black rounded-sm cursor-pointer"
                    />
                    <p className="text-xs laptop:text-sm">Over 200$</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="products flex-1 w-full grid auto-cols-auto gap-10 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] justify-items-center">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <MainProductCard
                  key={item.id}
                  id={item.id}
                  img={item.product_images[0]}
                  title={item.title.toUpperCase()}
                  price={item.price}
                />
              ))
            ) : (
              <h1>No items available for this category</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
