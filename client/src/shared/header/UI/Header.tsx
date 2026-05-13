import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoLogoAppleAr } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { IoCart } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "../../../pages/login/context/authContext";
import ProductInterface from "../../components/product-card/interface/ProductInterface";
import axios from "axios";

const NAV_LINKS = [
  { to: "/category/all", label: "NEW" },
  { to: "/category/men", label: "MENS" },
  { to: "/category/women", label: "WOMENS" },
  { to: "/category/shoes", label: "SHOES" },
  { to: "/category/deals", label: "DEALS" },
];

const Header = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [searchbarValue, setSearchbarValue] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [scrolled, setScrolled] = useState(false);

  const ctxt = useContext(AuthContext);
  if (!ctxt) throw new Error("AuthProvider missing");
  const { authLogin } = ctxt;

  const location = useLocation();
  const isHome = location.pathname === "/";

  const isTransparent = isHome && !isOpenMenu && !searchbarValue && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!searchbarValue) {
      setProducts([]);
      return;
    }
    axios.get("http://localhost:4996/api/products").then((res) => {
      setProducts(
        res.data.data.filter((item: ProductInterface) =>
          item.title.toLowerCase().includes(searchbarValue.toLowerCase()),
        ),
      );
    });
  }, [searchbarValue]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchbarValue(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearSearch = () => {
    setSearchbarValue(null);
    setProducts([]);
  };

  return (
    <header className="header z-50 w-full relative">
      <div
        className={`
          fixed top-0 left-0 right-0
          transition-all duration-300 ease-in-out
          ${
            isTransparent
              ? "text-white bg-transparent border-transparent"
              : "text-black bg-white border-b border-gray-200 shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          }
          ${isOpenMenu ? "laptop:text-white laptop:bg-transparent laptop:border-transparent laptop:shadow-none" : ""}
        `}
      >
        <div
          className={`
            upper-header gap-2 w-full flex flex-row flex-wrap items-center justify-between
            transition-all duration-300
            ${scrolled ? "py-[10px]" : "py-[var(--y-padding)]"}
            px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)]
          `}
        >
          <section className="logo flex flex-1 flex-row items-center gap-[15px]">
            <div className="block laptop:hidden focus:outline-none">
              <IoMenuOutline
                className="text-2xl cursor-pointer"
                onClick={() => setIsOpenMenu((prev) => !prev)}
              />
              <nav
                className={`
                  navigation z-10 menu fixed top-[55px] laptop:top-[71.5px] w-full left-0 bg-white
                  transition-all duration-200 ease-out
                  ${isOpenMenu ? "flex flex-1 opacity-100 translate-y-0" : "hidden opacity-0 -translate-y-1"}
                `}
                id="menu"
              >
                <ul className="flex flex-col flex-wrap font-semibold text-lg w-full text-black">
                  {NAV_LINKS.map(({ to, label }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setIsOpenMenu(false)}
                      className="center__nav-item flex flex-row items-center justify-between gap-2 py-[var(--y-padding)] px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)] w-full border-b border-gray-100"
                    >
                      {label}
                      <IoIosArrowForward />
                    </Link>
                  ))}
                </ul>
              </nav>
            </div>
            <Link
              to="/"
              className="focus:outline-none hover:opacity-75 transition-opacity duration-150"
            >
              <IoLogoAppleAr className="text-2xl" />
            </Link>
          </section>
          <nav className="navigation flex flex-1 justify-center">
            <ul className="hidden laptop:flex flex-row flex-wrap gap-6 font-semibold text-sm tracking-wider">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to} className="relative group">
                  <Link
                    to={to}
                    className={`pb-1 ${location.pathname === to ? "opacity-100" : "opacity-80 hover:opacity-100"} transition-opacity duration-150`}
                  >
                    {label}
                  </Link>
                  <span
                    className={`
                      absolute -bottom-[2px] left-0 h-[1.5px] bg-current
                      transition-all duration-200
                      ${location.pathname === to ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* User Actions */}
          <section className="user-account flex flex-1 flex-row gap-4 justify-end items-center">
            {/* Desktop searchbar */}
            <div
              ref={searchRef}
              className="searchbar relative items-center hidden laptop:flex"
            >
              <input
                type="text"
                id="searchbar"
                value={searchbarValue ?? ""}
                onChange={(e) => setSearchbarValue(e.target.value || null)}
                className={`
                  font-light bg-transparent border-b-[0.5px]
                  w-[130px] focus:w-[210px]
                  transition-all duration-300 ease-in-out
                  ${
                    isTransparent
                      ? "placeholder:text-white text-white border-white"
                      : "placeholder:text-black text-black border-black"
                  }
                  focus:outline-none pl-3 py-2 pr-7
                `}
                placeholder="Search"
              />
              <IoIosSearch className="absolute right-0 text-xl pointer-events-none" />

              {searchbarValue && (
                <div className="search-results overflow-y-auto absolute max-h-[420px] top-full mt-[6px] right-0 w-[420px] bg-white border-t-2 border-t-black shadow-[0_8px_32px_rgba(0,0,0,0.14)] z-50 flex flex-col">
                  <p className="px-5 py-3 text-[10px] font-medium tracking-widest text-gray-400 uppercase border-b border-gray-100">
                    {products.length} product{products.length !== 1 ? "s" : ""}{" "}
                    found
                  </p>

                  {products.length === 0 && (
                    <p className="px-5 py-6 text-sm text-gray-400 text-center">
                      No results for "{searchbarValue}"
                    </p>
                  )}

                  {products.map((item: ProductInterface) => {
                    const discountedPrice = item.discount
                      ? item.price * (1 - item.discount / 100)
                      : null;
                    return (
                      <Link
                        to={`/product/${item.id}`}
                        key={item.id}
                        onClick={clearSearch}
                        className="flex flex-row gap-[16px] items-center px-5 py-[14px] border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors duration-150"
                      >
                        <img
                          src={item.productImages[0]}
                          alt={item.title}
                          className="w-[60px] h-[76px] object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold tracking-wide uppercase truncate text-black">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-[2px] mb-[6px] capitalize">
                            {item.category} · {item.gender}
                          </p>
                          <div className="flex flex-wrap gap-[4px]">
                            {item.availableSizes.slice(0, 4).map((size) => (
                              <span
                                key={size}
                                className="text-[10px] font-medium border border-gray-300 px-[6px] py-[1px] text-gray-500"
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-[2px] ml-auto flex-shrink-0">
                          {discountedPrice ? (
                            <>
                              <span className="text-[11px] text-gray-400 line-through">
                                €{item.price.toFixed(2)}
                              </span>
                              <span className="text-[13px] font-semibold text-red-700">
                                €{discountedPrice.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="text-[14px] font-semibold text-black">
                              €{item.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}

                  <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                    <Link
                      to="/category/all"
                      onClick={clearSearch}
                      className="text-[11px] font-semibold tracking-widest uppercase underline text-black hover:text-gray-600 transition-colors"
                    >
                      View all results →
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="flex laptop:hidden hover:opacity-60 transition-opacity duration-150 cursor-pointer">
              <IoIosSearch className="text-2xl" />
            </div>
            <Link
              to={authLogin ? "/profile" : "/login"}
              className="hover:opacity-60 transition-opacity duration-150"
            >
              {authLogin ? (
                <CgProfile className="text-2xl" />
              ) : (
                <div>
                  <p className="hidden laptop:flex text-sm font-medium border border-current rounded-full px-4 py-1 hover:bg-black hover:text-white transition-colors duration-200">
                    Log in
                  </p>
                  <CiLogin className="flex laptop:hidden text-2xl" />
                </div>
              )}
            </Link>
            <Link
              to="/cart"
              className="hover:opacity-60 transition-opacity duration-150"
            >
              <IoCart className="text-2xl" />
            </Link>
            <Link
              to="/cart#favorite"
              className="hover:opacity-60 transition-opacity duration-150"
            >
              <FaHeart className="text-2xl" />
            </Link>
          </section>
        </div>
      </div>
    </header>
  );
};

export default Header;
