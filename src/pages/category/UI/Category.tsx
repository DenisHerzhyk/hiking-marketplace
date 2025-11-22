import React from "react";
import ProductCard from "../../../shared/components/product-card/UI/ProductCard";
import { IoIosArrowUp } from "react-icons/io";
import product_sample from "../../../assets/images/products/1.png";

const Category = () => {
  return (
    <>
      <div className="Category px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)] mt-[77px] mobile:mt-[118px]">
        <div className="upper-category flex flex-row flex-wrap gap-[7px] justify-between items-center w-full pb-[10px] mobile:pb-[16px] laptop:pb-[20px] border-b border-[var(--light-gray)]">
          <div className="flex flex-row flex-wrap items-center gap-[10px]">
            <h1 className="leading-none font-extrabold text-[22px] mobile:text-[28px] laptop:text-[32px] ">
              WOMENS CLOTHING
            </h1>
            <p className="font-light mobile:text-base text-[var(--light-gray)]">
              (10 results)
            </p>
          </div>
          <nav className="category-nav flex items-center">
            <ul className="flex flex-row gap-[5px] font-light text-xs">
              <li>ALL</li>
              <p>/</p>
              <li>MENS</li>
              <p>/</p>
              <li className="font-bold">WOMENS</li>
              <p>/</p>
              <li>BOOTS</li>
              <p>/</p>
              <li>DEALS</li>
            </ul>
          </nav>
        </div>
        <div className="content mt-[45px] flex flex-row justify-between gap-[10px] laptop:gap-[25px]">
          <div className="sidebar hidden tablet:flex flex-row flex-grow min-w-[120px] max-w-[240px]">
            <div className="w-full flex flex-col gap-[25px]">
              <div className="w-full">
                <div className="flex flex-row w-full items-center justify-between">
                  <p className="font-medium text-base laptop:text-[20px]">
                    PRODUCT TYPE
                  </p>
                  <IoIosArrowUp className="text-black" />
                </div>
                <div className="flex flex-col gap-[5px] laptop:gap-[1px] mt-[25px]">
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="hoodie"
                      id="hoodie"
                      value="hoodie"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">
                      HOODIE
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="pants"
                      id="pants"
                      value="patns"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">
                      PANTS
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="jackets"
                      id="jackets"
                      value="jackets"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">
                      JACKETS
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="sweaters"
                      id="sweaters"
                      value="sweaters"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">
                      SWEATERS
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full border-t border-[var(--primary-border-color)] pt-[10px]">
                <div className="flex flex-row w-full items-center justify-between">
                  <p className="font-medium text-base laptop:text-[20px]">
                    SIZES
                  </p>
                  <IoIosArrowUp className="text-black" />
                </div>
                <div className="flex flex-col gap-[5px] laptop:gap-[1px] mt-[25px]">
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="XS"
                      id="XS"
                      value="XS"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">XS</p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="S"
                      id="S"
                      value="S"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">S</p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="M"
                      id="M"
                      value="M"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">M</p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="L"
                      id="L"
                      value="L"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">L</p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="XL"
                      id="XL"
                      value="XL"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">XL</p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="XXL"
                      id="XXL"
                      value="XXL"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">
                      XXL
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full border-t border-[var(--primary-border-color)] pt-[10px]">
                <div className="flex flex-row w-full items-center justify-between">
                  <p className="font-medium text-base laptop:text-[20px]">
                    BRAND
                  </p>
                  <IoIosArrowUp className="text-black" />
                </div>
                <div className="flex flex-col gap-[5px] laptop:gap-[1px] mt-[25px]">
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="nike"
                      id="nike"
                      value="nike"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">
                      NIKE
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="NORTH FACE"
                      id="NORTH FACE"
                      value="NORTH FACE"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">
                      NORTH FACE
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="NEW BALANCE"
                      id="NEW BALANCE"
                      value="NEW BALANCE"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">
                      NEW BALANCE
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="PATAGONIA"
                      id="PATAGONIA"
                      value="PATAGONIA"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold break-words text-base laptop:text-lg">
                      PATAGONIA
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="COLUMBIA"
                      id="COLUMBIA"
                      value="COLUMBIA"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">
                      COLUMBIA
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full border-t border-[var(--primary-border-color)] pt-[10px]">
                <div className="flex flex-row w-full items-center justify-between">
                  <p className="font-medium text-base laptop:text-[20px]">
                    PRICE
                  </p>
                  <IoIosArrowUp className="text-black" />
                </div>
                <div className="flex flex-col gap-[5px] laptop:gap-[1px] mt-[25px]">
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="under50"
                      id="under50"
                      value="under50"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">
                      UNDER 50$
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="50-100"
                      id="50-100"
                      value="50-100"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">
                      50$ - 100$
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="100-200"
                      id="100-200"
                      value="100-200"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">
                      100$ - 200$
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <input
                      type="radio"
                      name="over-200"
                      id="over-200"
                      value="over-200"
                      className="appearance-none w-[20px] h-[20px] border-2 border-black rounded-md cursor-pointer"
                    />
                    <p className="font-semibold text-base laptop:text-lg">
                      OVER 200$
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="products grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-[20px] laptop:gap-[40px] justify-between tablet:justity-center">
            <ProductCard
              img={product_sample}
              title={"Men's Quandary Joggers".toUpperCase()}
              price={119}
            />
            <ProductCard
              img={product_sample}
              title={"Men's Quandary Joggers".toUpperCase()}
              price={119}
            />
            <ProductCard
              img={product_sample}
              title={"Men's Quandary Joggers".toUpperCase()}
              price={119}
            />
            <ProductCard
              img={product_sample}
              title={"Men's Quandary Joggers".toUpperCase()}
              price={119}
            />
            <ProductCard
              img={product_sample}
              title={"Men's Quandary Joggers".toUpperCase()}
              price={119}
            />
            <ProductCard
              img={product_sample}
              title={"Men's Quandary Joggers".toUpperCase()}
              price={119}
            />
            <ProductCard
              img={product_sample}
              title={"Men's Quandary Joggers".toUpperCase()}
              price={119}
            />
            <ProductCard
              img={product_sample}
              title={"Men's Quandary Joggers".toUpperCase()}
              price={119}
            />
            <ProductCard
              img={product_sample}
              title={"Men's Quandary Joggers".toUpperCase()}
              price={119}
            />
            <ProductCard
              img={product_sample}
              title={"Men's Quandary Joggers".toUpperCase()}
              price={119}
            />
            <ProductCard
              img={product_sample}
              title={"Men's Quandary Joggers".toUpperCase()}
              price={119}
            />
            <ProductCard
              img={product_sample}
              title={"Men's Quandary Joggers".toUpperCase()}
              price={119}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
