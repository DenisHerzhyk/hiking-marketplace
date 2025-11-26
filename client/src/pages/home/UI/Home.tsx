import React from "react";
import welcome from "../../../assets/images/welcome.svg";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import trail_v from "../../../assets/videos/trail.mp4";
import hike_signup from "../../../assets/videos/hike-form.mp4";
import Card from "../components/card/UI/Card";
import Benefits from "../../../shared/benefits/UI/Benefits";
import category_women from "../../../assets/images/category-women.jpg";
import category_men from "../../../assets/images/category-men.jpg";
import category_boots from "../../../assets/images/category-boots.jpg";
import category_deals from "../../../assets/images/category-deals.jpg";
import MainProductCard from "../../../shared/components/product-card/UI/MainProductCard";
import product_sample from "../../../assets/images/products/1.png";
import axios from "axios";

const Home = () => {
  document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:5000/api/test")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  });
  return (
    <>
      <div className="home">
        <main className="main h-[calc[100vh-103.4px]] tablet:h-[calc(100vh-122.6px)] overflow-hidden relative">
          <div className="content text-white w-full">
            <video
              src={trail_v}
              autoPlay
              loop
              muted
              playsInline
              className="inset-0 relative h-screen w-screen object-cover -z-20 bg-black"
            />
            <div className="absolute inset-0 bg-black opacity-20 -z-10"></div>
            <div className="main__content absolute top-0 left-0 h-full flex flex-col justify-center px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)]">
              <h1 className="home__title font-extrabold text-5xl leading-tight text-left max-w-full break-words tablet:text-6xl mobile:text-5xl">
                30–60% OFF
                <br />
                MID SEASON SALE
                <br />
                FOR MEMBERS
              </h1>
              <p className="home__description-mini text-base mobile:text-xl font-bold mt-6">
                EMRACE THE ELEMENTS
              </p>
              <p className="home__description text-xs mobile:text-base mt-4 leading-5 font-medium mb-6">
                FOR THE MOUNTAINS, THE RAIN
                <br />& EVERYTHING IN BETWEEN
              </p>
              <a
                className="home__button text-black font-bold text-base mobile:text-xl bg-[var(--secondary-color)] py-3 px-12 w-fit"
                href="/"
              >
                SHOP NOW
              </a>
            </div>
            <div className="main-section__shop-stick absolute bottom-0 left-[calc(100vw/2-34px)] mobile:left-[calc(100vw/2-42.5px)] flex flex-col items-center justify-center gap-2 bg-black p-2">
              <p className="main-section__shop-stick__content text-[9px] mobile:text-xs">
                SHOW NOW
              </p>
              <IoIosArrowDown />
            </div>
          </div>
        </main>
        <section className="categories overflow-x-auto flex flex-nowrap gap-[28px] mobile:gap-[48px] items-center px-[var(--mobile-x-padding)] tablet:px-[var(--laptop-x-padding)] laptop:px-[var(--desktop-x-padding)] mt-[70px]">
          <Card title="MEN'S" image={category_men} />
          <Card title="WOMEN'S" image={category_women} />
          <Card title="BOOTS" image={category_boots} />
          <Card title="DEALS" image={category_deals} />
        </section>
        <section className="catalogs flex flex-col gap-[53px] mobile:gap-[95px] px-[var(--mobile-x-padding)] tablet:px-[var(--laptop-x-padding)] laptop:px-[var(--desktop-x-padding)] mt-[118px]">
          <div className="catalog flex flex-col">
            <div className="flex flex-col ">
              <h1 className="font-extrabold leading-none text-[24px] mobile:text-[30px] laptop:text-[36px] mb-[1px]">
                HIKING PANTS
              </h1>
              <p className="text-sm mobile:text-lg">
                BUILT TO HANDLE EVERYTHING
              </p>
            </div>
            <div className="flex flex-row overflow-x-auto flex-nowrap items-center mt-[21px] gap-[26.6px] laptop:gap-[61px]">
              <MainProductCard
                img={product_sample}
                title={"Men's Quandary Joggers".toUpperCase()}
                price={119}
              />
              <MainProductCard
                img={product_sample}
                title={"Men's Quandary Joggers".toUpperCase()}
                price={119}
              />
              <MainProductCard
                img={product_sample}
                title={"Men's Quandary Joggers".toUpperCase()}
                price={119}
              />
              <MainProductCard
                img={product_sample}
                title={"Men's Quandary Joggers".toUpperCase()}
                price={119}
              />
              <MainProductCard
                img={product_sample}
                title={"Men's Quandary Joggers".toUpperCase()}
                price={119}
              />
            </div>
          </div>
          <div className="catalog flex flex-col">
            <div className="flex flex-col ">
              <h1 className="font-extrabold leading-none text-[24px] mobile:text-[30px] laptop:text-[36px] mb-[1px]">
                HIKING PANTS
              </h1>
              <p className="text-sm mobile:text-lg">
                BUILT TO HANDLE EVERYTHING
              </p>
            </div>
            <div className="flex flex-row overflow-x-auto flex-nowrap items-center mt-[21px] gap-[26.6px] laptop:gap-[61px]">
              <MainProductCard
                img={product_sample}
                title={"Men's Quandary Joggers".toUpperCase()}
                price={119}
              />
              <MainProductCard
                img={product_sample}
                title={"Men's Quandary Joggers".toUpperCase()}
                price={119}
              />
              <MainProductCard
                img={product_sample}
                title={"Men's Quandary Joggers".toUpperCase()}
                price={119}
              />
              <MainProductCard
                img={product_sample}
                title={"Men's Quandary Joggers".toUpperCase()}
                price={119}
              />
              <MainProductCard
                img={product_sample}
                title={"Men's Quandary Joggers".toUpperCase()}
                price={119}
              />
            </div>
          </div>
          <div className="catalog flex flex-col">
            <div className="flex flex-col ">
              <h1 className="font-extrabold leading-none text-[24px] mobile:text-[30px] laptop:text-[36px] mb-[1px]">
                HIKING PANTS
              </h1>
              <p className="text-sm mobile:text-lg">
                BUILT TO HANDLE EVERYTHING
              </p>
            </div>
            <div className="flex flex-row overflow-x-auto flex-nowrap items-center mt-[21px] gap-[26.6px] laptop:gap-[61px]">
              <MainProductCard
                img={product_sample}
                title={"Men's Quandary Joggers".toUpperCase()}
                price={119}
              />
              <MainProductCard
                img={product_sample}
                title={"Men's Quandary Joggers".toUpperCase()}
                price={119}
              />
              <MainProductCard
                img={product_sample}
                title={"Men's Quandary Joggers".toUpperCase()}
                price={119}
              />
              <MainProductCard
                img={product_sample}
                title={"Men's Quandary Joggers".toUpperCase()}
                price={119}
              />
              <MainProductCard
                img={product_sample}
                title={"Men's Quandary Joggers".toUpperCase()}
                price={119}
              />
            </div>
          </div>
        </section>
        <section className="signup-hike relative h-[600px] flex flex-col items-center justify-center px-[var(--mobile-x-padding)] tablet:px-[var(--laptop-x-padding)] laptop:px-[var(--desktop-x-padding)] mt-[76px] mobile:mt-[100px]">
          <h2 className="font-semibold text-center text-white text-[36px] mobile:text-[60px] mb-[16px]">
            Find your outside
          </h2>
          <div className="flex flex-row rounded-full relative overflow-hidden">
            <input
              type="text"
              className="text-[14px] w-full tablet:w-[555px] mobile:text-[20px] pl-[40px] mobile:pl-[47px] py-[13.3px] mobile:py-[19px] border border-[var(--primary-border-color)]"
              placeholder="Search by city, park or trail..."
            />
            <IoIosSearch className="search-section__icon text-[14px] mobile:text-[20px] text-[var(--light-gray)] absolute top-1/2 left-3 mobile:left-4 w-[20px] h-[20px] tablet:w-auto transform -translate-y-1/2" />
            <button className="bg-black text-white font-bold text-sm mobile:text-[20px] px-[20.7px] mobile:px-[31px]">
              GO
            </button>
          </div>
          <video
            src={hike_signup}
            autoPlay
            loop
            muted
            playsInline
            className="inset-0 absolute h-full w-screen object-cover -z-20"
          />
          <div className="absolute inset-0 bg-black opacity-20 -z-10"></div>
        </section>
        <Benefits />
      </div>
    </>
  );
};

export default Home;
