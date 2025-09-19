import React from "react";
import welcome from "../../../assets/images/welcome.svg";
import down_arrow from "../../../assets/images/icons/down-arrow.svg";
import right_arrow from "../../../assets/images/icons/right-arrow.svg";
import logo from "../../../assets/images/icons/logo-apple-ar.svg";
import signup_hikes_bg from "../../../assets/videos/signup-hikes-bg.mp4";
import Card from "../components/card/Card";
import Catalog from "../components/catalog/Catalog";
import Benefits from "../../../shared/benefits/UI/Benefits";
import category_women from "../../../assets/images/category-women.jpg";
import category_men from "../../../assets/images/category-men.jpg";
import category_boots from "../../../assets/images/category-boots.jpg";
import category_deals from "../../../assets/images/category-deals.jpg";
import product_sample from "../../../assets/images/product_sample.jpg";

const Home = () => {
  return (
    <>
      <div className="home">
        <main className="main h-[calc[100vh-103.4px]] tablet:h-[calc(100vh-122.6px)] overflow-hidden relative">
          <div className="content text-white w-full">
            <img
              src={welcome}
              alt="main"
              className="home__img relative h-screen w-screen object-cover"
            />
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
              <img src={down_arrow} alt="down-arrow" />
            </div>
          </div>
        </main>
        <section className="categories gap-4 mobile:gap-7 flex flex-wrap justify-center items-center px-[var(--mobile-x-padding)] tablet:px-[var(--laptop-x-padding)] laptop:px-[var(--desktop-x-padding)] mt-[50px] tablet:mt-[70px]">
          <div className="flex flex-row gap-4 mobile:gap-7">
            <Card title="MEN'S" image={category_women} />
            <Card title="WOMEN'S" image={category_men} />
          </div>
          <div className="flex flex-row gap-4 mobile:gap-7">
            <Card title="BOOTS" image={category_boots} />
            <Card title="DEALS" image={category_deals} />
          </div>
        </section>
        <section className="catalogs flex flex-col px-[var(--mobile-x-padding)] tablet:px-[var(--laptop-x-padding)] laptop:px-[var(--desktop-x-padding)] mt-[90px] mobile:mt-[120px] gap-12 mobile:gap-[68px] tablet:gap-[86px]">
          <Catalog
            title="HIKING PANTS"
            p="BUILD TO HANDLE EVERYTHING"
            cards={[
              {
                img: product_sample,
                title: "Men's Quandary Joggers".toUpperCase(),
                price: "$119",
              },
              {
                img: product_sample,
                title: "Men's Quandary Joggers".toUpperCase(),
                price: "$119",
              },
              {
                img: product_sample,
                title: "Men's Quandary Joggers".toUpperCase(),
                price: "$119",
              },
              {
                img: product_sample,
                title: "Men's Quandary Joggers".toUpperCase(),
                price: "$119",
              },
              {
                img: product_sample,
                title: "Men's Quandary Joggers".toUpperCase(),
                price: "$119",
              },
            ]}
          />
          <Catalog
            title="HIKING TOPS"
            p="DON'T GET COLD"
            cards={[
              {
                img: product_sample,
                title: "Men's Quandary Joggers".toUpperCase(),
                price: "$119",
              },
              {
                img: product_sample,
                title: "Men's Quandary Joggers".toUpperCase(),
                price: "$119",
              },
              {
                img: product_sample,
                title: "Men's Quandary Joggers".toUpperCase(),
                price: "$119",
              },
              {
                img: product_sample,
                title: "Men's Quandary Joggers".toUpperCase(),
                price: "$119",
              },
              {
                img: product_sample,
                title: "Men's Quandary Joggers".toUpperCase(),
                price: "$119",
              },
            ]}
          />
          <Catalog
            title="HIKING BOOTS"
            p="BUILT TO TAME ANY TRAIL"
            cards={[
              {
                img: product_sample,
                title: "Men's Quandary Joggers".toUpperCase(),
                price: "$119",
              },
              {
                img: product_sample,
                title: "Men's Quandary Joggers".toUpperCase(),
                price: "$119",
              },
              {
                img: product_sample,
                title: "Men's Quandary Joggers".toUpperCase(),
                price: "$119",
              },
              {
                img: product_sample,
                title: "Men's Quandary Joggers".toUpperCase(),
                price: "$119",
              },
              {
                img: product_sample,
                title: "Men's Quandary Joggers".toUpperCase(),
                price: "$119",
              },
            ]}
          />
        </section>
        <section className="signup-hike w-full mt-[100px] mobile:mt-[70px] relative">
          <video
            src={signup_hikes_bg}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover -z-10"
          />
          <div className="absolute inset-0 bg-black opacity-50 -z-10"></div>
          <div className="signup-hike__block w-full py-12 flex flex-col tablet:flex-row justify-center gap-[100px] laptop:gap-[160px] flex-wrap items-center relative z-10 px-[var(--mobile-x-padding)] tablet:px-[var(--laptop-x-padding)] laptop:px-[var(--desktop-x-padding)]">
            <div className="view-all flex flex-col items-center text-white">
              <img
                src={logo}
                alt="logo"
                className="w-[50px] h-[50px] mobile:w-[80px] mobile:h-[80px] mb-3"
              />
              <p className="text-sm mobile:text-xl font-medium mb-3 mobile:mb-5">
                DIVE INTO PARADISE
              </p>
              <h2 className="signup-hike-section__title text-center text-[22px] leading-normal mobile:text-[30px] tablet:text-[36px] laptop:text-4xl font-extrabold mb-6 underline underline-offset-1 decoration-[var(--secondary-color)]">
                EXPERICENSE THE MOST
                <br />
                BEAUTIFUL VIEWS WITH US
              </h2>
              <div className="availability_button relative text-black">
                <a
                  className="home__button bg-[var(--secondary-color)] py-[9px] px-[24px] mobile:py-[11px] mobile:px-[45px] w-fit flex flex-row content-center"
                  href="/"
                >
                  <span className="text-black font-bold text-sm mobile:text-xl content-center">
                    VIEW AVAILABLE HIKES
                  </span>
                  <img
                    src={right_arrow}
                    alt="right-arrow"
                    className="ml-[13px] w-[10px] h-[22px] mobile:w-fit mobile:h-fit content-center"
                  />
                </a>
              </div>
            </div>
            <form
              action="/"
              className="text-white py-[34px] px-[10px] mobile:px-[20px] table:px-[50px] relative flex flex-col bg-[var(--primary-gray)]"
            >
              <h2 className="text-[22px] mobile:text-[26px] tablet:text-[30px] font-semibold text-center z-11 mb-[42px]">
                SIGN UP FOR THE HIKE
              </h2>
              <div className="input-section flex flex-col gap-5 z-10">
                <div className="name-section flex flex-col w-full tablet:flex-row gap-5 ta:gap-[11px]">
                  <div className="input-name flex flex-col">
                    <label htmlFor="name text-base">First Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="mt-2 py-[5px] w-full text-black pl-[10px]"
                    />
                  </div>
                  <div className="input-surname flex flex-col">
                    <label htmlFor="surname text-base">Surname</label>
                    <input
                      type="text"
                      name="surname"
                      id="surname"
                      required
                      className="mt-2 py-[5px] w-full text-black pl-[10px]"
                    />
                  </div>
                </div>
                <div className="input-email flex flex-col">
                  <label htmlFor="email text-base">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="mt-2 py-[5px] text-black pl-[10px]"
                  />
                </div>
                <div className="input-available-hikes flex flex-col">
                  <label htmlFor="available-hikes text-base">
                    Available hikes
                  </label>
                  <div className="input-available-hikes__field relative">
                    <select
                      name="available-hikes"
                      id="available-hikes"
                      required
                      className="mt-2 py-[5px] bg-white w-full text-black pl-[10px]"
                    >
                      <option value="">Choose hike</option>
                      <option value="1">Mountains</option>
                      <option value="2">Rivers</option>
                      <option value="3">Lakes</option>
                      <option value="4">Beaches</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-[14px] mobile:text-[20px] font-bold bg-black py-[10px]"
                >
                  BOOK MY PLACE
                </button>
              </div>
            </form>
          </div>
        </section>
        <Benefits />
      </div>
    </>
  );
};

export default Home;
