import React, { useContext, useState } from "react";
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

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const ctxt = useContext(AuthContext);
  if (!ctxt) throw new Error("AuthProvider missing");
  const { authLogin } = ctxt;

  const location = useLocation();
  const isHome = location.pathname === "/";

  const openMenu = () => {
    const menu = document.getElementById("menu");

    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <>
      <header className="header z-50 w-full relative">
        <div
          className={`fixed top-0 left-0 right-0 ${!isHome || isOpenMenu ? "text-black bg-white bg-opacity-100 border-b border-gray" : "text-white bg-opacity-0 bg-black absolute"} ${isOpenMenu && "laptop:text-white laptop:bg-opacity-0 laptop:bg-black laptop:absolute laptop:border-none"}`}
        >
          <div className="upper-header gap-2 w-full flex flex-row flex-wrap items-center justify-between py-[var(--y-padding)] px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)]">
            <section className="logo flex flex-1 flex-row items-center gap-[15px]">
              <div className="block laptop:hidden focus:outline-none">
                <IoMenuOutline className="text-2xl" onClick={openMenu} />
                <nav
                  className={`navigation ${isOpenMenu ? "flex flex-1" : "hidden"} justify-center z-10 menu fixed top-[55px] laptop:top-[71.5px] w-full left-0 bg-white`}
                  id="menu"
                >
                  <ul className="flex flex-col flex-wrap font-semibold text-lg w-full">
                    <Link
                      to="/category/all"
                      className="center__nav-item flex flex-row items-center justify-between gap-2 py-[var(--y-padding)] px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)] w-full border-b border-gray justify-left"
                    >
                      NEW
                      <IoIosArrowForward />
                    </Link>
                    <Link
                      to="/category/men"
                      className="center__nav-item flex flex-row items-center justify-between gap-2 py-[var(--y-padding)] px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)] w-full border-b border-gray justify-left"
                    >
                      MENS
                      <IoIosArrowForward />
                    </Link>
                    <Link
                      to="/category/women"
                      className="center__nav-item flex flex-row items-center justify-between gap-2 py-[var(--y-padding)] px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)] w-full border-b border-gray justify-left"
                    >
                      WOMENS
                      <IoIosArrowForward />
                    </Link>
                    <Link
                      to="/category/shoes"
                      className="center__nav-item flex flex-row items-center justify-between gap-2 py-[var(--y-padding)] px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)] w-full border-b border-gray justify-left"
                    >
                      SHOES
                      <IoIosArrowForward />
                    </Link>
                    <Link
                      to="/category/deals"
                      className="center__nav-item flex flex-row items-center justify-between gap-2 py-[var(--y-padding)] px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)] w-full border-b border-gray justify-left"
                    >
                      DEALS
                      <IoIosArrowForward />
                    </Link>
                  </ul>
                </nav>
              </div>
              <Link to="/" className="focus:outline-none">
                <IoLogoAppleAr className="text-2xl" />
              </Link>
            </section>
            <nav className="navigation flex flex-1 justify-center">
              <ul className="hidden laptop:flex flex-row flex-wrap gap-6 font-semibold text-base">
                <li className="center__nav-item">
                  <Link to="/category/all">NEW</Link>
                </li>
                <li className="center__nav-item">
                  <Link to="/category/men">MENS</Link>
                </li>
                <li className="center__nav-item">
                  <Link to="/category/women">WOMENS</Link>
                </li>
                <li className="center__nav-item">
                  <Link to="/category/shoes">SHOES</Link>
                </li>
                <li className="center__nav-item">
                  <Link to="/category/deals">DEALS</Link>
                </li>
              </ul>
            </nav>
            <section className="user-account flex flex-1 flex-row gap-4 justify-end items-center">
              <div className="search-bar relative items-center hidden laptop:flex">
                <input
                  type="text"
                  className={`bg-white font-light bg-opacity-0 border-b-[0.5px] ${isHome ? "placeholder:text-white text-white border-white" : "placeholder:text-black text-black border-black"} focus:outline-none pl-3 py-2 pr-7`}
                  placeholder="Search"
                />
                <IoIosSearch className="absolute right-0 text-2xl" />
              </div>
              <div className="flex laptop:hidden">
                <IoIosSearch className="text-2xl" />
              </div>
              <Link to={authLogin ? "/profile" : "/login"}>
                {authLogin ? (
                  <CgProfile className="text-2xl" />
                ) : (
                  <div>
                    <p className="hidden laptop:flex text-base border rounded-full px-4 py-1">
                      Log in
                    </p>
                    <CiLogin className="flex laptop:hidden text-2xl" />
                  </div>
                )}
              </Link>
              <Link to="/cart">
                <IoCart className="text-2xl" />
              </Link>
              <Link to="/cart#favorite">
                <FaHeart className="text-2xl" />
              </Link>
            </section>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
