import React from "react";
import ship_icon from "../../../assets/images/icons/ex-ship.svg";
import disc_icon from "../../../assets/images/icons/ex-disc.svg";
import "../../../styles/main.scss";

const Benefits = () => {
  return (
    <>
      <section className="benefits mt-[100px] flex flex-row flex-wrap items-center justify-center laptop:justify-between gap-[61px] py-[67px] bg-[var(--primary-border-color)] px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)]">
        <div className="register-member flex flex-col items-center text-center tablet:items-start tablet:text-left">
          <h1 className="benefits__title text-[30px] mobile:text-5xl font-bold">
            FREEDOM BENEFITS
          </h1>
          <p className="benefits__description text-sm mobile:text-[20px] mt-[8px]">
            The adventure starts here. Join the club and reap the rewards
          </p>
          <a
            href="/"
            className="benefits__button inline-block w-fit text-sm mobile:text-[20px] font-bold mt-[20px] px-[42px] py-[8px] mobile:px-[60px] mobile:py-[15px] bg-[var(--secondary-color)]"
          >
            SIGN UP
          </a>
        </div>
        <div className="bonuses flex flex-row flex-wrap justify-center tablet:justify-between tablet:flex-nowrap gap-[60px] tablet:gap-[140px] w-full tablet:w-fit">
          <div className="bonuses__item w-[170px] flex flex-col items-center mobile:items-start text-center mobile:text-start">
            <img
              src={ship_icon}
              alt="ship"
              className="w-[98px] h-[65px] mobile:w-fit mobile:h-fit"
            />
            <h2 className="bonuses__item__title text-[18px] mobile:text-[22px] tablet:text-2xl font-semibold mt-[12px]">
              FREE SHIPPING
            </h2>
            <p className="bonuses__item__description text-xs mobile:text-base w-fit">
              Enjoy free shipping on all orders
            </p>
          </div>
          <div className="bonuses__item w-[220px] flex flex-col items-center mobile:items-start text-center mobile:text-start">
            <img
              src={disc_icon}
              alt="disc"
              className="w-[65px] h-[65px] mobile:w-fit mobile:h-fit"
            />
            <h2 className="bonuses__item__title text-[18px] mobile:text-[22px] tablet:text-2xl font-semibold mt-[12px]">
              EXCLUSIVE OFFERS
            </h2>
            <p className="bonuses__item__description text-xs mobile:text-base w-fit">
              Members-only promos, experiences and offers
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Benefits;
