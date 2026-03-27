import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import trail_v from "../../../assets/videos/trail.mp4";
import hike_signup from "../../../assets/videos/hike-form.mp4";
import Card from "../components/card/UI/Card";
import Benefits from "../../../shared/benefits/UI/Benefits";
import temp_hike_card from "/images/temp-hike-suggestion/1.jpg";
import MainProductCard from "../../../shared/components/product-card/UI/MainProductCard";
import { IoIosArrowForward } from "react-icons/io";
import { ProductInterface } from "../../../shared/components/product-card/interface/ProductInterface";
import { IoArrowForwardOutline } from "react-icons/io5";
import HikingCard from "../components/card/UI/HikingCard";
import CardInterface from "../components/card/interface/CardInterface";

const Home = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [mainCategories, setMainCategories] = useState<CardInterface[]>([]);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    fetch("/json/products-all.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));

    fetch("/json/main-categories.json")
      .then((res) => res.json())
      .then((data) => setMainCategories(data.mainCategories));
  }, []);

  return (
    <>
      <div className="home">
        <main
          className={`main h-[100dvh] overflow-hidden relative flex items-center`}
        >
          <div className="content relative text-white w-full h-full flex items-center">
            <video
              src={trail_v}
              autoPlay
              loop
              muted
              playsInline
              className="inset-0 relative h-full w-full object-cover -z-20"
            />
            <div className="absolute inset-0 bg-black opacity-30 -z-10"></div>
            <div className="main__content absolute top-1/2 -translate-y-1/2 z-10 flex flex-col px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)]">
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
              <Link
                className="home__button text-black font-bold text-base mobile:text-xl bg-white py-3 px-12 w-fit border shadow-[4px_4px_0_#000,5px_5px_0_#fff]"
                to="/"
              >
                SHOP NOW
              </Link>
            </div>
            <div className="main-section__shop-stick absolute bottom-0 left-[calc(100vw/2-34px)] mobile:left-[calc(100vw/2-42.5px)] flex flex-col items-center justify-center gap-2 bg-black p-2 rounded-tl-[8px] rounded-tr-[8px]">
              <Link
                to="/"
                className="flex flex-col items-center justify-center gap-2 text-white"
              >
                <p className="main-section__shop-stick__content text-[9px] mobile:text-xs rounded-t-[8px] rounded-r-[8px]">
                  SHOW MORE
                </p>
                <IoIosArrowDown />
              </Link>
            </div>
          </div>
        </main>
        <section className="categories justify-start laptop:justify-center flex flex-col laptop:flex-row flex-wrap laptop:flex-nowrap gap-[10px] items-center px-[var(--mobile-x-padding)] tablet:px-[var(--laptop-x-padding)] laptop:px-[var(--desktop-x-padding)] mt-[70px]">
          {mainCategories.map((item) => (
            <Card title={item.title} image={item.image} />
          ))}
        </section>
        <section className="catalogs flex flex-col justify-center gap-[53px] mobile:gap-[95px] px-[var(--mobile-x-padding)] tablet:px-[var(--laptop-x-padding)] laptop:px-[var(--desktop-x-padding)] mt-[118px]">
          <div className="catalog flex flex-col justify-center">
            <div className="flex flex-row items-start flex-wrap gap-6">
              <div className="flex flex-col text-left">
                <h1 className="font-extrabold leading-none text-[24px] mobile:text-[30px] laptop:text-[36px] mb-[1px]">
                  HIKING TOPS
                </h1>
                <p className="text-sm mobile:text-lg text-[var(--purple-color)]">
                  BUILT TO HANDLE EVERYTHING
                </p>
              </div>
              <div>
                <Link
                  to="/category/men"
                  className="text-black w-fit flex flex-row items-center px-3 py-2 gap-2 text-base bg-white border border-black shadow-[4px_4px_0_#000,5px_5px_0_#fff]"
                >
                  Find more tops
                  <IoIosArrowForward className="text-xl" />
                </Link>
              </div>
            </div>
            <div className="flex flex-row overflow-x-auto laptop:overflow-x-visible flex-nowrap justify-between items-start mt-[21px] gap-[15px]">
              {products
                .filter((item) =>
                  ["jacket", "sweater", "hoodie"].includes(item.category),
                )
                .slice(0, 5)
                .map((item) => (
                  <MainProductCard
                    key={item.id}
                    id={item.id}
                    img={item.product_images[0]}
                    title={item.title.toUpperCase()}
                    price={item.price}
                  />
                ))}
            </div>
          </div>
          <div className="catalog flex flex-col justify-center">
            <div className="flex flex-row items-start flex-wrap gap-6">
              <div className="flex flex-col text-left">
                <h1 className="font-extrabold leading-none text-[24px] mobile:text-[30px] laptop:text-[36px] mb-[1px]">
                  HIKING PANTS
                </h1>
                <p className="text-sm mobile:text-lg text-[var(--purple-color)]">
                  BUILT TO HANDLE EVERYTHING
                </p>
              </div>
              <div>
                <Link
                  to="/category/men"
                  className="text-black w-fit flex flex-row items-center px-3 py-2 gap-2 text-base bg-white border border-black shadow-[4px_4px_0_#000,5px_5px_0_#fff]"
                >
                  Find more pants
                  <IoIosArrowForward className="text-xl" />
                </Link>
              </div>
            </div>
            <div className="flex flex-row overflow-x-auto laptop:overflow-x-visible flex-nowrap justify-between items-start mt-[21px] gap-[15px]">
              {products
                .filter((item) => item.category === "pants")
                .slice(0, 5)
                .map((item) => (
                  <MainProductCard
                    key={item.id}
                    id={item.id}
                    img={item.product_images[0]}
                    title={item.title.toUpperCase()}
                    price={item.price}
                  />
                ))}
            </div>
          </div>
          <div className="catalog flex flex-col justify-center">
            <div className="flex flex-row items-start flex-wrap gap-6">
              <div className="flex flex-col text-left">
                <h1 className="font-extrabold leading-none text-[24px] mobile:text-[30px] laptop:text-[36px] mb-[1px]">
                  HIKING BOOTS
                </h1>
                <p className="text-sm mobile:text-lg text-[var(--purple-color)]">
                  BUILT TO HANDLE EVERYTHING
                </p>
              </div>
              <div>
                <Link
                  to="/category/shoes"
                  className="text-black w-fit flex flex-row items-center px-3 py-2 gap-2 text-base bg-white border border-black shadow-[4px_4px_0_#000,5px_5px_0_#fff]"
                >
                  Find more boots
                  <IoIosArrowForward className="text-xl" />
                </Link>
              </div>
            </div>
            <div className="flex flex-row overflow-x-auto laptop:overflow-x-visible flex-nowrap justify-between items-start mt-[21px] gap-[15px]">
              {products
                .filter((item) => item.category === "shoes")
                .slice(0, 5)
                .map((item) => (
                  <MainProductCard
                    key={item.id}
                    id={item.id}
                    img={item.product_images[0]}
                    title={item.title.toUpperCase()}
                    price={item.price}
                  />
                ))}
            </div>
          </div>
        </section>
        <section className="signup-hike relative h-[600px] flex flex-col items-center justify-center px-[var(--mobile-x-padding)] tablet:px-[var(--laptop-x-padding)] laptop:px-[var(--desktop-x-padding)] mt-[76px] mobile:mt-[100px]">
          <h2 className="font-semibold text-center text-white text-[36px] mobile:text-[60px] mb-[16px]">
            Find your outside
          </h2>
          <div className="flex flex-row rounded-full relative overflow-hidden w-full max-w-[500px]">
            <input
              type="text"
              className="border border-transparent focus:border-transparent focus:outline-none focus:ring-0 text-[16px] w-full mobile:text-[20px] pl-[40px] mobile:pl-[47px] py-[13.3px] mobile:py-[17px]"
              placeholder="Search by city, park or trail name"
            />
            <IoIosSearch className="search-section__icon text-[14px] mobile:text-[20px] text-[var(--light-gray)] absolute top-1/2 left-3 mobile:left-4 w-[20px] h-[20px] tablet:w-auto transform -translate-y-1/2" />
          </div>
          <Link to="/" className="text-white text-lg underline mt-5">
            Explore nearby trails
          </Link>
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
        <section className="hiking-suggestions mt-[50px] flex flex-col justify-center px-[20px]">
          <h2 className="text-[30px] mobile:text-[32px] font-semibold text-center">
            Local favorites near Berlin
          </h2>
          <div className="hiking-selection flex flex-row overflow-x-auto laptop:overflow-x-visible justify-start laptop:justify-center gap-[23px] mt-[21px]">
            <HikingCard
              img={temp_hike_card}
              title="Snow lake trail"
              level="moderate"
              length={5.4}
              rate={4.5}
            />
            <HikingCard
              img={temp_hike_card}
              title="Snow lake trail"
              level="moderate"
              length={5.4}
              rate={4.5}
            />
            <HikingCard
              img={temp_hike_card}
              title="Snow lake trail"
              level="moderate"
              length={5.4}
              rate={4.5}
            />
            <HikingCard
              img={temp_hike_card}
              title="Snow lake trail"
              level="moderate"
              length={5.4}
              rate={4.5}
            />
            <div className="flex flex-row min-w-[250px] max-w-[300px] shadow-lg overflow-hidden items-center rounded-[10px] gap-[10px] bg-[var(--normal-gray)] justify-center">
              <h2 className="text-[22px]">Show more</h2>
              <IoArrowForwardOutline className="text-[22px]" />
            </div>
          </div>
        </section>
        <Benefits />
      </div>
    </>
  );
};

export default Home;
