import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import Card from "../components/card/UI/Card";
import Benefits from "../../../shared/benefits/UI/Benefits";
import MainProductCard from "../../../shared/components/product-card/UI/MainProductCard";
import { IoIosArrowForward } from "react-icons/io";
import ProductInterface from "../../../shared/components/product-card/interface/ProductInterface.js";
import { IoArrowForwardOutline } from "react-icons/io5";
import CardInterface from "../components/card/interface/CardInterface";
import { Trail } from "../../Trails/interfaces/TrailInterface.js";
import api from "../../../axios.ts";
import TrailCard from "../../Trails/components/TrailCard.js";
import TrailCardSkeleton from "../../../shared/loading/TrailCardSkeleton.js";
import CardSkeleton from "../../../shared/loading/CardSkeleton.js";
import toast from "react-hot-toast";
import MainProductCardSkeleton from "../../../shared/loading/MainProductCardSkeleton.js";
import { geocode } from "../../../shared/services/geocodeRequest.js";
import { getHikingRoutes } from "../../../shared/services/overpassHikingRoutes.js";
import { trailsSearch } from "../../../shared/services/trailsSearch.js";
const trail_v =
  "https://res.cloudinary.com/dlrft9pjb/video/upload/hiking_video-2.mp4";
const hiking_signup_v =
  "https://res.cloudinary.com/dlrft9pjb/video/upload/hiking_video.mp4";

const Home = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [mainCategories, setMainCategories] = useState<CardInterface[]>([]);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [searchTrails, setSearchTrails] = useState<Trail[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [trailsLoading, setTrailsLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);
  const [cardLoading, setCardLoading] = useState(true);
  const lastOverpassRequest = useRef(0);
  const searchCache = useRef<Map<string, Trail[]>>(new Map());
  const OVERPASS_COOLDOWN = 3000;

  const getCachedOrFetch = async (query: string) => {
    const cached = searchCache.current.get(query.toLowerCase());
    if (cached) return cached;

    const now = Date.now();
    const elapsed = now - lastOverpassRequest.current;
    if (elapsed < OVERPASS_COOLDOWN) {
      await new Promise((resolve) =>
        setTimeout(resolve, OVERPASS_COOLDOWN - elapsed),
      );
    }

    lastOverpassRequest.current = Date.now();
    const { lat, lon } = await geocode(query);
    const routes = await getHikingRoutes(lat, lon, 10);
    const trails = await trailsSearch({ routes, place: query });
    searchCache.current.set(query.toLowerCase(), trails);
    return trails;
  };

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => setProducts(res.data.data))
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => setProductLoading(false));

    fetch("/json/main-categories.json")
      .then((res) => res.json())
      .then((data) => setMainCategories(data.mainCategories))
      .catch((err) => toast.error(err))
      .finally(() => setCardLoading(false));
  }, []);

  useEffect(() => {
    setTrailsLoading(true);

    const fetchTrails = async () => {
      try {
        const { lat, lon } = await geocode("Zurich, Switzerland");
        const routes = await getHikingRoutes(lat, lon, 7);
        const trails = await trailsSearch({
          routes,
          place: "Zurich, Switzerland",
        });
        setTrails(trails);
      } catch (err) {
        toast.error(`Error during location searching: ${err}`);
      } finally {
        setTrailsLoading(false);
      }
    };
    fetchTrails();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 3) {
      setSearchTrails([]);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const trails = await getCachedOrFetch(searchQuery);
        setSearchTrails(trails);
      } catch (err) {
        console.log(`Error during search: ${err}`);
      } finally {
        setSearchLoading(false);
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
      setSearchLoading(false);
    };
  }, [searchQuery]);

  return (
    <>
      <div className="home">
        <main
          className={`main h-[100dvh] overflow-hidden relative flex items-center animate-fade-in`}
        >
          <div className="content relative text-white w-full h-full flex items-center">
            <video
              src={trail_v}
              preload="none"
              autoPlay
              loop
              muted
              playsInline
              className="inset-0 relative h-full w-full object-cover -z-20"
            />
            <div className="absolute inset-0 bg-black opacity-30 -z-10"></div>
            <div className="main__content absolute top-1/2 -translate-y-1/2 z-10 flex flex-col px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)]">
              <h1 className="home__title font-extrabold text-2xl leading-tight text-left max-w-full break-words mobile:text-4xl tablet:text-6xl">
                30–60% OFF
                <br />
                MID SEASON SALE
                <br />
                FOR MEMBERS
              </h1>
              <p className="home__description-mini text-sm mobile:text-lg font-bold mt-6">
                EMRACE THE ELEMENTS
              </p>
              <p className="home__description text-[10px] mobile:text-base mt-4 leading-5 font-medium mb-6">
                FOR THE MOUNTAINS, THE RAIN
                <br />& EVERYTHING IN BETWEEN
              </p>
              <Link
                className="home__button text-stone-800 font-bold text-base mobile:text-xl bg-white border-2 border-stone-300 py-3.5 px-12 w-fit rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                to="/category/men"
              >
                SHOP NOW
              </Link>
            </div>
            <div className="main-section__shop-stick absolute bottom-0 left-[calc(100vw/2-34px)] mobile:left-[calc(100vw/2-42.5px)] flex flex-col items-center justify-center gap-2 bg-white border border-stone-300 p-2.5 rounded-tl-[10px] rounded-tr-[10px] shadow-sm hover:shadow-md transition-shadow duration-300">
              <Link
                to="#showmore"
                className="flex flex-col items-center justify-center gap-2 text-stone-700"
              >
                <p className="main-section__shop-stick__content text-[9px] mobile:text-xs font-semibold tracking-wider">
                  SHOW MORE
                </p>
                <IoIosArrowDown className="animate-bounce" />
              </Link>
            </div>
          </div>
        </main>
        <section
          id="showmore"
          className="categories justify-start laptop:justify-center flex flex-col laptop:flex-row flex-wrap laptop:flex-nowrap gap-[10px] items-center px-[var(--mobile-x-padding)] tablet:px-[var(--laptop-x-padding)] laptop:px-[var(--desktop-x-padding)] mt-[70px] animate-fade-in-up"
        >
          {cardLoading
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : mainCategories.map((item) => (
                <Card
                  key={item.image}
                  title={item.title}
                  image={item.image}
                  link={item.link}
                />
              ))}
        </section>
        <section className="catalogs flex flex-col justify-center gap-[53px] mobile:gap-[95px] px-[var(--mobile-x-padding)] tablet:px-[var(--laptop-x-padding)] laptop:px-[var(--desktop-x-padding)] mt-[118px] animate-fade-in-up">
          <div className="catalog flex flex-col justify-center">
            <div className="flex flex-row items-start flex-wrap gap-6">
              <div className="flex flex-col text-left">
                <h1 className="font-extrabold leading-none text-[24px] mobile:text-[30px] laptop:text-[36px] mb-[1px] text-stone-800">
                  HIKING TOPS
                </h1>
                <p className="text-sm mobile:text-lg text-[var(--purple-color)] font-medium tracking-wide">
                  BUILT TO HANDLE EVERYTHING
                </p>
              </div>
              <div>
                <Link
                  to="/category/men"
                  className="group text-stone-700 w-fit flex flex-row items-center px-5 py-2.5 gap-2 text-sm mobile:text-base font-semibold bg-white border border-stone-300 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  Find more tops
                  <IoIosArrowForward className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            <div className="carousel carousel-box flex flex-row overflow-x-auto desktop:overflow-x-visible flex-nowrap justify-between items-start mt-[21px] gap-[30px] scroll-smooth snap-x snap-mandatory">
              {productLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <MainProductCardSkeleton key={i} />
                  ))
                : products
                    .filter((item) =>
                      ["jacket", "sweater", "hoodie"].includes(item.category),
                    )
                    .slice(0, 5)
                    .map((item) => (
                      <div className="carousel-item snap-start" key={item.id}>
                        <MainProductCard
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
                      </div>
                    ))}
            </div>
          </div>
          <div className="catalog flex flex-col justify-center">
            <div className="flex flex-row items-start flex-wrap gap-6">
              <div className="flex flex-col text-left">
                <h1 className="font-extrabold leading-none text-[24px] mobile:text-[30px] laptop:text-[36px] mb-[1px] text-stone-800">
                  HIKING PANTS
                </h1>
                <p className="text-sm mobile:text-lg text-[var(--purple-color)] font-medium tracking-wide">
                  BUILT TO HANDLE EVERYTHING
                </p>
              </div>
              <div>
                <Link
                  to="/category/men"
                  className="group text-stone-700 w-fit flex flex-row items-center px-5 py-2.5 gap-2 text-sm mobile:text-base font-semibold bg-white border border-stone-300 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  Find more pants
                  <IoIosArrowForward className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            <div className="carousel carousel-box flex flex-row overflow-x-auto desktop:overflow-x-visible flex-nowrap justify-between items-start mt-[21px] gap-[30px] scroll-smooth snap-x snap-mandatory">
              {productLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <MainProductCardSkeleton key={i} />
                  ))
                : products
                    .filter((item) => ["pants"].includes(item.category))
                    .slice(0, 5)
                    .map((item) => (
                      <div className="carousel-item snap-start" key={item.id}>
                        <MainProductCard
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
                      </div>
                    ))}
            </div>
          </div>
          <div className="catalog flex flex-col justify-center">
            <div className="flex flex-row items-start flex-wrap gap-6">
              <div className="flex flex-col text-left">
                <h1 className="font-extrabold leading-none text-[24px] mobile:text-[30px] laptop:text-[36px] mb-[1px] text-stone-800">
                  HIKING BOOTS
                </h1>
                <p className="text-sm mobile:text-lg text-[var(--purple-color)] font-medium tracking-wide">
                  BUILT TO HANDLE EVERYTHING
                </p>
              </div>
              <div>
                <Link
                  to="/category/shoes"
                  className="group text-stone-700 w-fit flex flex-row items-center px-5 py-2.5 gap-2 text-sm mobile:text-base font-semibold bg-white border border-stone-300 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  Find more boots
                  <IoIosArrowForward className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            <div className="carousel carousel-box flex flex-row overflow-x-auto desktop:overflow-x-visible flex-nowrap justify-between items-start mt-[21px] gap-[30px] scroll-smooth snap-x snap-mandatory">
              {productLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <MainProductCardSkeleton key={i} />
                  ))
                : products
                    .filter((item) => ["shoes"].includes(item.category))
                    .slice(0, 5)
                    .map((item) => (
                      <div className="carousel-item snap-start" key={item.id}>
                        <MainProductCard
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
                      </div>
                    ))}
            </div>
          </div>
        </section>
        <section className="signup-hike relative h-[600px] flex flex-col items-center justify-center px-[var(--mobile-x-padding)] tablet:px-[var(--laptop-x-padding)] laptop:px-[var(--desktop-x-padding)] mt-[76px] mobile:mt-[100px]">
          <h2 className="font-semibold text-center text-white text-[26px] mobile:text-[36px] tablet:text-[60px] mb-[12px] mobile:mb-[16px] animate-fade-in-up">
            Find your outside
          </h2>
          <div className="flex flex-col items-center w-full max-w-[500px] relative">
            <div className="flex flex-row rounded-full relative overflow-hidden w-full">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                className="border-2 border-white/40 focus:border-white focus:outline-none focus:ring-0 text-[14px] w-full mobile:text-[16px] tablet:text-[20px] pl-[36px] mobile:pl-[42px] tablet:pl-[47px] py-[10px] mobile:py-[12px] tablet:py-[17px] bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 rounded-full focus:bg-white/15 transition-all duration-300"
                placeholder="Search by city, park or trail name"
              />

              <IoIosSearch className="search-section__icon text-[12px] mobile:text-[16px] tablet:text-[20px] text-white/60 absolute top-1/2 left-3 mobile:left-4 w-[16px] h-[16px] tablet:w-auto transform -translate-y-1/2" />
            </div>
            {searchTrails.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white rounded-b-xl shadow-lg border border-gray-200 mt-1 max-h-[280px] overflow-y-auto z-10">
                {searchTrails.map((trail, i) => (
                  <li
                    key={trail.id}
                    style={{ animationDelay: `${i * 50}ms` }}
                    className="animate-slide-in-right"
                  >
                    <Link
                      to={`/trails/${trail.id}`}
                      state={{ trail }}
                      className="block px-5 py-3 text-sm mobile:text-base text-gray-700 hover:bg-gray-100 hover:text-black transition-all duration-150 hover:pl-7"
                    >
                      {trail.tags.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {searchLoading && (
              <ul className="absolute top-full left-0 right-0 bg-white rounded-b-xl shadow-lg border border-gray-200 mt-1 z-10">
                {[1, 2, 3].map((i) => (
                  <li key={i}>
                    <div className="px-5 py-3 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link
            to="/trails"
            className="group text-stone-700 text-lg mt-6 inline-flex items-center gap-2 font-semibold bg-white border border-stone-300 px-6 py-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            Explore nearby trails
            <IoIosArrowForward className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <video
            src={hiking_signup_v}
            preload="none"
            autoPlay
            loop
            muted
            playsInline
            className="inset-0 absolute h-full w-screen object-cover -z-20"
          />
          <div className="absolute inset-0 bg-black opacity-20 -z-10"></div>
        </section>
        <section className="hiking-suggestions mt-[50px] flex flex-col justify-center px-[var(--mobile-x-padding)] tablet:px-[var(--laptop-x-padding)] laptop:px-[var(--desktop-x-padding)] animate-fade-in-up">
          <h2 className="text-[30px] mobile:text-[32px] font-semibold text-center">
            Local favorites near Zurich
          </h2>
          <div className="flex justify-center w-full">
            <div className="hiking-selection flex flex-row overflow-x-auto justify-start gap-[23px] mt-[21px] scroll-smooth snap-x snap-mandatory">
              {trailsLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="min-w-[280px] w-[280px] flex-shrink-0"
                    >
                      <TrailCardSkeleton />
                    </div>
                  ))
                : trails.map((trail) => (
                    <div
                      key={trail.id}
                      className="min-w-[280px] w-[280px] flex-shrink-0"
                    >
                      <TrailCard trail={trail} />
                    </div>
                  ))}
              <Link
                to="/trails"
                className="group flex flex-row min-w-[250px] max-w-[300px] overflow-hidden items-center rounded-[10px] gap-[10px] bg-white border border-stone-300 text-stone-700 justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <p className="font-semibold tracking-wide">Show more</p>
                <IoArrowForwardOutline className="text-[22px] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
        <Benefits />
      </div>
    </>
  );
};

export default Home;
