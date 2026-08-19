import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import MainProductCard from "../../../shared/components/product-card/UI/MainProductCard";
import ProductInterface from "../../../shared/components/product-card/interface/ProductInterface";
import { IoMdArrowDown } from "react-icons/io";
import MainProductCardSkeleton from "../../../shared/loading/MainProductCardSkeleton";
import { IoOptionsOutline } from "react-icons/io5";
type Section = "product" | "sizes" | "price" | "shoes";
import { Link, useParams } from "react-router-dom";
import api from "../../../axios.ts";
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
  const [showFilters, setShowFilters] = useState(false);
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

  const sales_img =
    "https://res.cloudinary.com/dlrft9pjb/image/upload/hiking_category-3.png";

  useEffect(() => {
    setSelectedTypes([]);
    setSelectedSizes([]);
    setSelectedPrice(null);
    setSelectedGender(null);
  }, [type]);

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        toast.error(err.message);
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
      <div className="Category">
        {category !== "deals" ? (
          <div className="main-category relative w-full h-[100dvh] overflow-hidden">
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
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <video
                preload="auto"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-top brightness-90"
              >
                <source
                  src="https://res.cloudinary.com/dlrft9pjb/video/upload/category_all.mp4"
                  type="video/mp4"
                />
              </video>
            )}

            <div className="absolute top-1/2 -translate-y-1/2 left-[var(--mobile-x-padding)] laptop:left-[var(--desktop-x-padding)] tablet:left-[var(--laptop-x-padding)]">
              <h2 className="text-wrap font-semibold text-2xl tablet:text-4xl laptop:text-6xl text-white mb-[40px]">
                Hiking gear made
                <br />
                to match your pace
              </h2>
              <Link
                className="home__button flex gap-2 items-center text-stone-700 font-bold text-base tablet:text-xl bg-white border border-stone-300 py-3 px-12 w-fit rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                to={`/category/${category}#shop`}
              >
                <span>SHOP NOW</span>
                <IoMdArrowDown className="text-2xl" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="deals-hero relative w-full min-h-[100dvh] h-auto flex items-center justify-center px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] pt-[70px] tablet:pt-[85px] pb-[40px]">
            <div className="flex flex-col w-full gap-10 items-center">
              <div className="text-center">
                <h1 className="font-bold text-3xl tablet:text-5xl text-stone-800">
                  Special Prices
                </h1>
                <p className="text-stone-400 text-sm mt-2 tracking-wide uppercase">
                  Limited time offers
                </p>
              </div>

              <div className="flex flex-row justify-center gap-6 flex-wrap">
                <button
                  onClick={handleMenDealsFiltering}
                  className="group relative cursor-pointer w-full mobile:w-[280px] h-[260px] mobile:h-[360px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                  <img
                    src={sales_img}
                    alt="Men"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 flex flex-col items-start gap-2">
                    <h2 className="font-bold text-3xl text-white">Men</h2>
                    <span className="text-xs text-white/80 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      Shop deals →
                    </span>
                  </div>
                </button>

                <button
                  onClick={handleWomenDealsFiltering}
                  className="group relative cursor-pointer w-[280px] h-[360px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                  <img
                    src={sales_img}
                    alt="Women"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 flex flex-col items-start gap-2">
                    <h2 className="font-bold text-3xl text-white">Women</h2>
                    <span className="text-xs text-white/80 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      Shop deals →
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          id="shop"
          className="categories mt-[30px] tablet:mt-[40px] flex flex-row flex-wrap gap-[7px] justify-between items-center w-full pb-[15px] laptop:pb-[20px] border-b border-[var(--normal-gray)] px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)]"
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
            <button
              onClick={() => setShowFilters(true)}
              className="laptop:hidden flex items-center gap-1.5 text-xs font-medium border border-stone-300 px-3 py-1.5 rounded-lg text-stone-600 hover:bg-stone-50 transition-colors"
            >
              <IoOptionsOutline className="text-base" />
              Filters
            </button>
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
        <div className="content mt-[25px] tablet:mt-[30px] flex flex-row justify-center laptop:justify-between gap-[10px] laptop:gap-[40px] px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)]">
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
                        <IoIosArrowDown className="hover:bg-gray-200 rounded-full w-[22px] h-[22px] p-1 transition-transform duration-300 ease-out" />
                      ) : (
                        <IoIosArrowUp className="hover:bg-gray-200 rounded-full w-[22px] h-[22px] p-1 transition-all ease-out" />
                      )}
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${openSections.shoes ? "max-h-[200px] opacity-100 mt-[10px]" : "max-h-0 opacity-0 mt-0"} gap-[5px] laptop:gap-[1px]`}
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
                        <span className="w-[15px] h-[15px] border border-stone-500 rounded-sm flex-shrink-0 peer-checked:bg-stone-600" />
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
                        <span className="w-[15px] h-[15px] border border-stone-500 rounded-sm flex-shrink-0 peer-checked:bg-stone-600" />
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
                      <IoIosArrowDown className="hover:bg-gray-200 rounded-full w-[22px] h-[22px] p-1 transition-transform duration-300 ease-out" />
                    ) : (
                      <IoIosArrowUp className="hover:bg-gray-200 rounded-full w-[22px] h-[22px] p-1 transition-all ease-out" />
                    )}
                  </div>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${openSections.product ? "max-h-[300px] opacity-100 mt-[10px]" : "max-h-0 opacity-0 mt-0"} gap-[5px] laptop:gap-[1px]`}
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
                        <span className="w-[15px] h-[15px] border border-stone-500 rounded-sm flex-shrink-0 peer-checked:bg-stone-600" />
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
                      <IoIosArrowDown className="hover:bg-gray-200 rounded-full w-[22px] h-[22px] p-1 transition-transform duration-300 ease-out" />
                    ) : (
                      <IoIosArrowUp className="hover:bg-gray-200 rounded-full w-[22px] h-[22px] p-1 transition-all ease-out" />
                    )}
                  </div>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${openSections.sizes ? "max-h-[300px] opacity-100 mt-[10px]" : "max-h-0 opacity-0 mt-0"} gap-[5px] laptop:gap-[1px]`}
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
                        <span className="w-[15px] h-[15px] border border-stone-500 rounded-sm flex-shrink-0 peer-checked:bg-stone-600" />
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
                      <IoIosArrowDown className="hover:bg-gray-200 rounded-full w-[22px] h-[22px] p-1 transition-transform duration-300 ease-out" />
                    ) : (
                      <IoIosArrowUp className="hover:bg-gray-200 rounded-full w-[22px] h-[22px] p-1 transition-all ease-out" />
                    )}
                  </div>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${openSections.price ? "max-h-[300px] opacity-100 mt-[10px]" : "max-h-0 opacity-0 mt-0"} gap-[5px] laptop:gap-[1px]`}
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
                        <span className="w-[15px] h-[15px] border border-stone-500 rounded-sm flex-shrink-0 peer-checked:bg-stone-600" />
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
          {showFilters && (
            <>
              <div
                className="fixed inset-0 bg-black/30 z-40 laptop:hidden"
                onClick={() => setShowFilters(false)}
              />
              <div className="fixed top-0 left-0 bottom-0 w-[300px] max-w-[85vw] bg-white z-50 laptop:hidden shadow-2xl overflow-y-auto animate-slide-in-left px-6 py-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-base">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-black text-xl leading-none"
                  >
                    ✕
                  </button>
                </div>
                <div className="sidebar-content w-full flex flex-col gap-[25px]">
                  {category === "shoes" && (
                    <div className="w-full">
                      <div className="flex flex-row w-full justify-between">
                        <p className="font-medium text-sm text-nowrap">SHOES</p>
                      </div>
                      <div className="flex flex-col gap-[5px] mt-[10px]">
                        <div className="flex flex-row items-center gap-[10px]">
                          <label className="flex items-center gap-[10px] cursor-pointer text-xs">
                            <input
                              type="radio"
                              name="mobileProductGender"
                              value="men"
                              className="peer hidden"
                              onChange={() => setSelectedGender("men")}
                            />
                            <span className="w-[15px] h-[15px] border border-stone-500 rounded-sm flex-shrink-0 peer-checked:bg-stone-600" />
                            For Men
                          </label>
                        </div>
                        <div className="flex flex-row items-center gap-[10px]">
                          <label className="flex items-center gap-[10px] cursor-pointer text-xs">
                            <input
                              type="radio"
                              name="mobileProductGender"
                              value="women"
                              className="peer hidden"
                              onChange={() => setSelectedGender("women")}
                            />
                            <span className="w-[15px] h-[15px] border border-stone-500 rounded-sm flex-shrink-0 peer-checked:bg-stone-600" />
                            For Women
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="w-full border-t border-[var(--primary-border-color)] pt-[10px]">
                    <p className="font-medium text-sm text-nowrap mb-[10px]">
                      PRODUCT TYPE
                    </p>
                    {clothesTypeByCategory.map((cat) => (
                      <div
                        className="flex flex-row items-center gap-[10px]"
                        key={cat}
                      >
                        <label className="flex items-center gap-[10px] cursor-pointer text-xs">
                          <input
                            type="checkbox"
                            name="mobileProductType"
                            value={cat}
                            checked={selectedTypes.includes(cat)}
                            className="peer hidden"
                            onChange={() => handleTypeChange(cat)}
                          />
                          <span className="w-[15px] h-[15px] border border-stone-500 rounded-sm flex-shrink-0 peer-checked:bg-stone-600" />
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="w-full border-t border-[var(--primary-border-color)] pt-[10px]">
                    <p className="font-medium text-sm text-nowrap mb-[10px]">
                      SIZES
                    </p>
                    {visibleSizes.map((value) => (
                      <div key={value}>
                        <label className="flex items-center gap-[10px] cursor-pointer text-xs">
                          <input
                            type="checkbox"
                            name="mobileSize"
                            value={value}
                            checked={selectedSizes.includes(value)}
                            onChange={() => handleSizeChange(value)}
                            className="peer hidden"
                          />
                          <span className="w-[15px] h-[15px] border border-stone-500 rounded-sm flex-shrink-0 peer-checked:bg-stone-600" />
                          {value}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="w-full border-t border-[var(--primary-border-color)] pt-[10px]">
                    <p className="font-medium text-sm text-nowrap mb-[10px]">
                      PRICE
                    </p>
                    {priceByCategory.map((priceOpt) => (
                      <div
                        className="flex flex-row items-center gap-[10px]"
                        key={priceOpt}
                      >
                        <label className="flex items-center gap-[10px] cursor-pointer text-xs">
                          <input
                            type="radio"
                            name="mobilePrice"
                            value={priceOpt}
                            onChange={() => setSelectedPrice(priceOpt)}
                            className="peer hidden"
                          />
                          <span className="w-[15px] h-[15px] border border-stone-500 rounded-sm flex-shrink-0 peer-checked:bg-stone-600" />
                          {priceOpt === "under50"
                            ? "under 50€"
                            : priceOpt === "50to100"
                              ? "50€ - 100€"
                              : priceOpt === "100to200"
                                ? "100€ - 200€"
                                : priceOpt === "over200"
                                  ? "over 200€"
                                  : "all"}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="products flex-1 w-full overflow-x-hidden">
            <div
              className="grid justify-center gap-[30px]"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 320px))",
              }}
            >
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
