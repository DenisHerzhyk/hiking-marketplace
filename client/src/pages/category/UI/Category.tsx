import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import MainProductCard from "../../../shared/components/product-card/UI/MainProductCard";
import ProductInterface from "../../../shared/components/product-card/interface/ProductInterface";
import { IoMdArrowDown } from "react-icons/io";
import MainProductCardSkeleton from "../../../shared/loading/MainProductCardSkeleton";
type Section = "product" | "sizes" | "price" | "shoes";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

type CategoryType = "all" | "men" | "women" | "shoes" | "deals";

const Category = () => {
  const { type } = useParams<{ type: string }>();
  const [productLoading, setProductLoading] = useState(true);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [openSections, setOpenSections] = useState<Record<Section, boolean>>({
    product: true,
    sizes: true,
    price: true,
    shoes: true,
  });
  const [dealGender, setDealGender] = useState<"men" | "women" | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const sizesByCategory = {
    clothing: ["XS", "S", "M", "L", "XL"],
    pants: ["30", "32", "34", "36"],
    shoes: ["8", "9", "10", "11", "12"],
  };
  const clothesTypeByCategory = ["hoodie", "pants", "jacket", "sweater"];
  const priceByCategory = ["all", "under50", "50to100", "100to200", "over200"];

  const m_img =
    "https://res.cloudinary.com/dlrft9pjb/image/upload/hiking_category.jpg";
  const w_img =
    "https://res.cloudinary.com/dlrft9pjb/image/upload/hiking_category-4.jpg";
  const s_img =
    "https://res.cloudinary.com/dlrft9pjb/image/upload/hiking_category-2.jpg";
  const all_video =
    "https://res.cloudinary.com/dlrft9pjb/video/upload/category_all.mp4";
  const sales_img =
    "https://res.cloudinary.com/dlrft9pjb/image/upload/hiking_category-3.png";

  useEffect(() => {
    setSelectedTypes([]);
    setSelectedSizes([]);
    setSelectedPrice(null);
    setSelectedGender(null);
  }, [type]);

  useEffect(() => {
    axios
      .get("http://localhost:4996/api/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => setProductLoading(false));
  }, []);

  const toggleSection = (section: Section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  ("");

  const validateCategory: CategoryType[] = [
    "all",
    "men",
    "women",
    "shoes",
    "deals",
  ];
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

  const filteredProducts = (() => {
    let filtered = products;

    if (selectedTypes.length > 0)
      filtered = filtered.filter((item) =>
        selectedTypes.includes(item.category),
      );
    if (selectedSizes.length > 0)
      filtered = filtered.filter((item) =>
        item.availableSizes.some((size) => selectedSizes.includes(size)),
      );
    if (selectedPrice) {
      filtered = filtered.filter((item) => {
        const price = item.discount
          ? item.price * (1 - item.discount / 100)
          : item.price;
        if (selectedPrice === "under50") return price < 50;
        if (selectedPrice === "50to100") return price >= 50 && price <= 100;
        if (selectedPrice === "100to200") return price >= 100 && price <= 200;
        if (selectedPrice === "over200") return price > 200;
        return true;
      });
    }
    if (selectedGender)
      filtered = filtered.filter((item) => item.gender === selectedGender);
    if (category === "all") {
      return filtered;
    }
    if (category === "men" || category === "women") {
      return filtered.filter(
        (item) => item.gender === category && item.category !== "shoes",
      );
    }
    if (category === "deals") {
      return filtered.filter(
        (item) =>
          item.discount && (dealGender ? item.gender === dealGender : true),
      );
    }
    if (category === "shoes") {
      return filtered.filter((item) => item.category === category);
    }

    return filtered;
  })();

  const visibleSizes =
    category === "shoes"
      ? sizesByCategory.shoes
      : category === "deals"
        ? ["XS", "S", "M", "L", "XL", "30", "32", "34", "36"].concat(
            sizesByCategory.shoes,
          )
        : ["XS", "S", "M", "L", "XL", "30", "32", "34", "36"];

  const handleTypeChange = (category: string) => {
    setSelectedTypes((prev) =>
      prev.includes(category)
        ? prev.filter((s) => s !== category)
        : [...prev, category],
    );
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const handleMenDealsFiltering = () => {
    setDealGender("men");
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWomenDealsFiltering = () => {
    setDealGender("women");
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className="Category justify-center px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] ">
        {category !== "deals" ? (
          <div className="main-category flex justify-center relative">
            {category !== "all" ? (
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
                className="rounded-sm max-h-[700px] h-full py-[70px] tablet:py-[0px] w-full object-cover object-center"
              />
            ) : (
              <video
                src={all_video}
                preload="none"
                autoPlay
                loop
                muted
                playsInline
                className="rounded-sm max-h-[700px] h-full py-[70px] tablet:py-[0px] w-full object-cover object-top brightness-90"
              />
            )}

            <div className="absolute top-1/2 -translate-y-1/2 left-10">
              <h2 className="text-wrap font-semibold text-2xl tablet:text-4xl laptop:text-6xl text-white mb-[40px]">
                Hiking gear made
                <br />
                to match your pace
              </h2>
              <Link
                className="home__button flex gap-2 items-center text-black font-bold text-base tablet:text-xl bg-white py-3 px-12 w-fit border border-black shadow-[4px_4px_0_#000,5px_5px_0_#fff]"
                to={`/category/${category}#shop`}
              >
                <span>SHOP NOW</span>
                <IoMdArrowDown className="text-2xl" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="main-category relative w-full flex flex-col gap-2 items-center">
            <div className="flex flex-col w-full gap-10 items-center h-full justify-center">
              <h1 className="text-start w-full font-medium text-3xl">
                Special Prices
              </h1>

              <div className="flex flex-row overflow-x-auto laptop:overflow-x-visible gap-3 items-center">
                <button
                  onClick={handleMenDealsFiltering}
                  className="relative cursor-pointer w-full min-w-[300px]"
                >
                  <img
                    src={sales_img}
                    alt="img"
                    className="w-full flex-1 min-w-0 h-[200px] laptop:h-[300px] object-cover object-center"
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <h2 className="text-wrap font-semibold text-xl tablet:text-2xl text-white">
                      Men
                    </h2>
                  </div>
                </button>

                <button
                  onClick={handleWomenDealsFiltering}
                  className="relative cursor-pointer w-full min-w-[300px]"
                >
                  <img
                    src={sales_img}
                    alt="img"
                    className="w-full flex-1 min-w-0 h-[200px] laptop:h-[300px] object-cover object-center"
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <h2 className="text-wrap font-semibold text-xl tablet:text-2xl text-white">
                      Women
                    </h2>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          id="shop"
          className="categories mt-[50px] tablet:mt-[100px] flex flex-row flex-wrap gap-[7px] justify-between items-center w-full pb-[15px] laptop:pb-[20px] border-b border-[var(--normal-gray)]"
        >
          <div className="flex flex-row flex-wrap items-center gap-[10px]">
            <h1 className="leading-none font-semibold text-[22px] mobile:text-[28px] laptop:text-[32px] ">
              {category === "deals"
                ? "DEALS"
                : category === "shoes"
                  ? "Shoes"
                  : category === "all"
                    ? "New"
                    : `${category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()} Clothing`}
            </h1>
            <p className="font-light mobile:text-base text-[var(--light-gray)]">
              ({filteredProducts.length} results)
            </p>
          </div>
          <nav className="category-nav flex items-center">
            <ul className="flex flex-row gap-[5px] font-light text-xs">
              <Link
                className={category === "all" ? "font-bold" : ""}
                to="/category/all"
              >
                ALL
              </Link>
              <p>/</p>
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
                WOMENS
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
              {category === "shoes" ? (
                <div className="w-full">
                  <div className="flex flex-row w-full justify-between">
                    <p className="font-medium laptop:text-base text-nowrap">
                      SHOES{" "}
                    </p>
                    <div
                      onClick={() => toggleSection("shoes")}
                      className="cursor-pointer text-black"
                    >
                      {openSections.shoes ? (
                        <IoIosArrowDown className="hover:bg-gray-200 rounded-full w-[22px] h-[22px] p-1 transition-all ease-out" />
                      ) : (
                        <IoIosArrowUp className="hover:bg-gray-200 rounded-full w-[22px] h-[22px] p-1 transition-all ease-out" />
                      )}
                    </div>
                  </div>
                  <div
                    className={`${openSections.shoes ? "flex flex-col" : "hidden"} gap-[5px] laptop:gap-[1px] mt-[10px]`}
                  >
                    <div className="flex flex-row items-center gap-[10px]">
                      <label className="flex items-center gap-[10px] cursor-pointer text-xs laptop:text-sm">
                        <input
                          type="radio"
                          name="productGender"
                          value="men"
                          className="peer hidden"
                          onChange={() => setSelectedGender("men")}
                        />
                        <span className="w-[15px] h-[15px] border border-black rounded-sm flex-shrink-0 peer-checked:bg-black" />
                        For Men
                      </label>
                    </div>
                    <div className="flex flex-row items-center gap-[10px]">
                      <label className="flex items-center gap-[10px] cursor-pointer text-xs laptop:text-sm">
                        <input
                          type="radio"
                          name="productGender"
                          value="women"
                          className="peer hidden"
                          onChange={() => setSelectedGender("women")}
                        />
                        <span className="w-[15px] h-[15px] border border-black rounded-sm flex-shrink-0 peer-checked:bg-black" />
                        For Women
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden"></div>
              )}

              <div
                className={`${category === "shoes" ? "hidden" : "flex flex-col"} w-full border-t border-[var(--primary-border-color)] pt-[10px]`}
              >
                <div className="flex flex-row w-full justify-between">
                  <p className="font-medium laptop:text-base text-nowrap">
                    PRODUCT TYPE
                  </p>
                  <div
                    onClick={() => toggleSection("product")}
                    className="cursor-pointer text-black"
                  >
                    {openSections.product ? (
                      <IoIosArrowDown className="hover:bg-gray-200 rounded-full w-[22px] h-[22px] p-1 transition-all ease-out" />
                    ) : (
                      <IoIosArrowUp className="hover:bg-gray-200 rounded-full w-[22px] h-[22px] p-1 transition-all ease-out" />
                    )}
                  </div>
                </div>
                <div
                  className={`${openSections.product ? "flex flex-col" : "hidden"} gap-[5px] laptop:gap-[1px] mt-[10px]`}
                >
                  {clothesTypeByCategory.map((cat) => (
                    <div
                      className="flex flex-row items-center gap-[10px]"
                      key={cat}
                    >
                      <label className="flex items-center gap-[10px] cursor-pointer text-xs laptop:text-sm">
                        <input
                          type="checkbox"
                          name="productType"
                          value="hoodie"
                          checked={selectedTypes.includes(cat)}
                          className="peer hidden"
                          onChange={() => handleTypeChange(cat)}
                        />
                        <span className="w-[15px] h-[15px] border border-black rounded-sm flex-shrink-0 peer-checked:bg-black" />
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full border-t border-[var(--primary-border-color)] pt-[10px]">
                <div className="flex flex-row w-full justify-between">
                  <p className="font-medium laptop:text-base">SIZES</p>
                  <div
                    onClick={() => toggleSection("sizes")}
                    className="cursor-pointer text-black"
                  >
                    {openSections.sizes ? (
                      <IoIosArrowDown className="hover:bg-gray-200 rounded-full w-[22px] h-[22px] p-1 transition-all ease-out" />
                    ) : (
                      <IoIosArrowUp className="hover:bg-gray-200 rounded-full w-[22px] h-[22px] p-1 transition-all ease-out" />
                    )}
                  </div>
                </div>
                <div
                  className={`${openSections.sizes ? "flex flex-col" : "hidden"} gap-[5px] laptop:gap-[1px] mt-[10px]`}
                >
                  {visibleSizes.map((value) => (
                    <div key={value}>
                      <label className="flex items-center gap-[10px] cursor-pointer text-xs laptop:text-sm">
                        <input
                          type="checkbox"
                          name="productSize"
                          value={value}
                          checked={selectedSizes.includes(value)}
                          onChange={() => handleSizeChange(value)}
                          className="peer hidden"
                        />
                        <span className="w-[15px] h-[15px] border border-black rounded-sm flex-shrink-0 peer-checked:bg-black" />
                        {value}
                      </label>
                    </div>
                  ))}
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
                      <IoIosArrowDown className="hover:bg-gray-200 rounded-full w-[22px] h-[22px] p-1 transition-all ease-out" />
                    ) : (
                      <IoIosArrowUp className="hover:bg-gray-200 rounded-full w-[22px] h-[22px] p-1 transition-all ease-out" />
                    )}
                  </div>
                </div>
                <div
                  className={`${openSections.price ? "flex flex-col" : "hidden"} gap-[5px] laptop:gap-[1px] mt-[10px]`}
                >
                  {priceByCategory.map((price) => (
                    <div
                      className="flex flex-row items-center gap-[10px]"
                      key={price}
                    >
                      <label className="flex items-center gap-[10px] cursor-pointer text-xs laptop:text-sm">
                        <input
                          type="radio"
                          name="productPrice"
                          value={price}
                          onChange={() => setSelectedPrice(price)}
                          className="peer hidden"
                        />
                        <span className="w-[15px] h-[15px] border border-black rounded-sm flex-shrink-0 peer-checked:bg-black" />
                        {price === "under50"
                          ? "under 50€"
                          : price === "50to100"
                            ? "50€ - 100€"
                            : price === "100to200"
                              ? "100€ - 200€"
                              : price === "over200"
                                ? "over 200€"
                                : "all"}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="products flex-1 w-full">
            <div className="grid auto-cols-auto gap-[30px] [grid-template-columns:repeat(auto-fill,minmax(270px,1fr))]">
              {productLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <MainProductCardSkeleton key={i} />
                  ))
                : filteredProducts.map(
                    (item) =>
                      item.availableSizes.length >= 1 && (
                        <MainProductCard
                          key={item.id}
                          id={item.id}
                          title={item.title.toUpperCase()}
                          discount={item.discount}
                          price={item.price}
                          availableSizes={item.availableSizes}
                          category={item.category}
                          gender={item.gender}
                          fit={item.fit}
                          color={item.color}
                          sizeGuide={item.sizeGuide}
                          details={item.details}
                          productImages={item.productImages}
                          description={item.description}
                          inStock={item.inStock}
                          stock={item.stock}
                        />
                      ),
                  )}
            </div>
            <p></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
