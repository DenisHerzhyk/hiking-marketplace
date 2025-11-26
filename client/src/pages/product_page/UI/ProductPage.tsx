import React from "react";
import Benefits from "../../../shared/benefits/UI/Benefits";
import ProductPageInterface from "../interface/ProductPageInterface";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import "../../../styles/main.scss";

const ProductPage: React.FC<ProductPageInterface> = ({
  img,
  category,
  type,
  title,
  price,
  availabe_sizes,
  description,
}) => {
  return (
    <>
      <div className="product-page flex flex-col px-[var(--mobile-x-padding)]">
        <section className="product-main flex items-center justify-center py-[calc[100vh-103.4px]] tablet:h-[calc(100vh-122.6px)]">
          <div className="flex flex-col justify-center tablet:flex-row gap-[22px] mobile:gap-[30px] laptop:gap-[150.2px]">
            <img
              src={img}
              alt="img"
              className="w-[320px] h-[320px] mobile:w-[450px] mobile:h-[450px] laptop:w-[600px] laptop:h-[600px] object-cover"
            />
            <div className="product-content flex flex-col flex-wrap">
              <nav className="category-nav">
                <ul className="flex flex-row gap-[5px] font-light text-xs mb-[9px] mobile:mb-[11px]">
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
              <div className="flex flex-col mobile:flex-row tablet:flex-col mobile:justify-between tablet:justify-start">
                <h1 className="product-content__title text-wrap text-base mobile:text-lg tablet:text-[24px] font-semibold mb-[10px] mobile:mb-0 tablet:mb-[18px]">
                  {title.toUpperCase()}
                </h1>
                <p className="product-page__pric text-base mb-[15px] mobile:[25px] tablet:mb-[35px]">
                  ${price}
                </p>
              </div>

              <div className="sizes">
                <h2 className="sizes__title text-sm mb-[11px] mobile:mb-[10px]">
                  SIZE
                </h2>
                <form action="">
                  <div className="size-blocks flex flex-row justify-between w-[150px] mobile:w-[190px] tablet:w-[230px] mb-[24px] tablet:mb-[45px]">
                    {availabe_sizes.map((item) => (
                      <p className="font-medium text-sm border border-black mobile:text-base flex items-center justify-center w-[30px] h-[30px] mobile:w-[40px] mobile:h-[40px]">
                        {item}
                      </p>
                    ))}
                  </div>
                  <button className="product-page__button-buy font-semibold mobile:text-lg w-full h-[40px] mobile:h-[50px] mobile:w-[190px] tablet:w-[230px] bg-[var(--secondary-color)] mb-[10px] mobile:mb-[20px]">
                    ADD TO CART
                  </button>
                </form>
                <section className="buttons-section">
                  <button className="product-page__button-size-guide text-sm border border-black w-full h-[30px] mobile:h-[40px] mobile:w-[190px] tablet:w-[230px] mb-[9px]">
                    SIZE GUIDE
                  </button>
                  <p className="text-[8px] mobile:text-[10px] text-center mobile:text-justify">
                    FAST AND SECURE GLOBAL SHIPPING
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
        <section className="product-parameters flex flex-col justify-center gap-[10px]">
          <section className="grid grid-cols-1 tablet:grid-cols-2 justify-items-center tablet:justify-items-start gap-[50px] tablet:gap-[18px] laptop:gap-0 w-full mobile:w-auto max-w-[450px] tablet:max-w-[918px] laptop:max-w-[1188px] mx-auto">
            <div className="w-full max-w-full tablet:max-w-[440px]">
              <div className="description flex flex-col py-[9px] border-b border-black">
                <div className="flex flex-row justify-between mb-[7px] items-center pr-[14px]">
                  <h3 className="text-xs mobile:text-sm">DESCRIPTION</h3>
                  <FaMinus className="w-[8px]" />
                </div>
                <p className="text-[10px] mobile:text-xs uppercase break-words tracking-wider">
                  Eleven years after its initial introduction, we reintroduce
                  our classic Low Top in the shape of the Low Top Bianco. The
                  Low Top Bianco features perforated side panels, new eye stays
                  with white eyelets and the signature padded heel. A premium
                  classic reinvented, the Low Top Bianco still has the
                  recognizable elongated tongue and upper while standing on our
                  striking Fundament Bicolor outsole.
                </p>
              </div>
              <div className="details flex flex-col py-[9px] border-b border-black">
                <div className="flex flex-row justify-between items-center pr-[14px]">
                  <h3 className="text-xs mobile:text-sm">DETAILS</h3>
                  <FaPlus className="w-[8px] h-[8px]" />
                </div>
              </div>
              <div className="size_fit flex flex-col py-[9px] border-b border-black">
                <div className="flex flex-row justify-between items-center pr-[14px]">
                  <h3 className="text-xs mobile:text-sm">SIZE & FIT</h3>
                  <FaPlus className="w-[8px] h-[8px]" />
                </div>
              </div>
              <div className="delivery_return flex flex-col py-[9px] border-b border-black">
                <div className="flex flex-row justify-between items-center pr-[14px]">
                  <h3 className="text-xs mobile:text-sm">DELIVERY & RETURN</h3>
                  <FaPlus className="w-[8px] h-[8px]" />
                </div>
              </div>
            </div>
            <div className="photo-1 flex justify-center max-w-[320px] mobile:max-w-[450px] laptop:max-w-[600px]">
              <img
                src={img}
                alt="img"
                className="w-[320px] h-[320px] mobile:w-[450px] mobile:h-[450px] laptop:w-[600px] laptop:h-[600px] object-cover"
              />
            </div>
          </section>
          <section className="grid grid-cols-1 tablet:grid-cols-2 justify-items-center tablet:justify-items-start gap-[10px] tablet:gap-[18px] laptop:gap-0 w-full mobile:w-auto max-w-[450px] tablet:max-w-[918px] laptop:max-w-[1188px] mx-auto">
            <div className="photo-2 flex justify-center max-w-[320px] mobile:max-w-[450px] laptop:max-w-[578px]">
              <img
                src={img}
                alt="img"
                className="w-[320px] h-[320px] mobile:w-[450px] mobile:h-[450px] laptop:w-[578px] laptop:h-[600px] object-cover"
              />
            </div>
            <div className="photo-3 flex justify-center max-w-[320px] mobile:max-w-[450px] laptop:max-w-[600px]">
              <img
                src={img}
                alt="img"
                className="w-[320px] h-[320px] mobile:w-[450px] mobile:h-[450px] laptop:w-[600px] laptop:h-[600px] object-cover"
              />
            </div>
          </section>
          <section className="grid grid-cols-1 tablet:grid-cols-2 justify-items-center tablet:justify-items-start gap-[10px] tablet:gap-[18px] laptop:gap-0 w-full mobile:w-auto max-w-[450px] tablet:max-w-[918px] laptop:max-w-[1188px] mx-auto">
            <div className="photo-2 flex justify-center max-w-[320px] mobile:max-w-[450px] laptop:max-w-[578px]">
              <img
                src={img}
                alt="img"
                className="w-[320px] h-[320px] mobile:w-[450px] mobile:h-[450px] laptop:w-[578px] laptop:h-[600px] object-cover"
              />
            </div>
            <div className="photo-3 flex justify-center max-w-[320px] mobile:max-w-[450px] laptop:max-w-[600px]">
              <img
                src={img}
                alt="img"
                className="w-[320px] h-[320px] mobile:w-[450px] mobile:h-[450px] laptop:w-[600px] laptop:h-[600px] object-cover"
              />
            </div>
          </section>
        </section>
      </div>
      <Benefits />
    </>
  );
};

export default ProductPage;
