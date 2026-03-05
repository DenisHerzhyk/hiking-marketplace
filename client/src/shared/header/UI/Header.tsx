import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoLogoAppleAr } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { IoCart } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";
import "../../../styles/main.scss";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "../../../pages/login/context/authContext";

const Header = () => {
  const ctxt = useContext(AuthContext);
  if (!ctxt) throw new Error("AuthProvider missing");
  const { authLogin } = ctxt;
  return (
    <>
      <header className="header">
        <div className="upper-header text-white bg-black flex flex-row flex-wrap justify-between py-[var(--y-padding)] px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)]">
          <section className="logo flex flex-row items-center gap-[15px]">
            <div className="block tablet:hidden">
              <IoMenuOutline className="w-[20px] h-[20px]" />
            </div>
            <Link to="/">
              <IoLogoAppleAr className="w-[20px] h-[20px]" />
            </Link>
          </section>
          <section className="navigation">
            <nav>
              <ul className="hidden tablet:flex flex-row flex-wrap gap-8 font-semibold text-sm">
                <li className="center__nav-item">
                  <Link to="/">HOME</Link>
                </li>
                <li className="center__nav-item">
                  <Link to="/category">MENS</Link>
                </li>
                <li className="center__nav-item">
                  <Link to="/category">WOMENS</Link>
                </li>
                <li className="center__nav-item">
                  <Link to="/category">BOOTS</Link>
                </li>
                <li className="center__nav-item">
                  <Link to="/category">DEALS</Link>
                </li>
              </ul>
            </nav>
          </section>
          <section className="user-account flex flex-row gap-4">
            <Link to={authLogin ? "/profile" : "/login"}>
              {authLogin ? (
                <CgProfile className="w-[22px] h-[20px]" />
              ) : (
                <CiLogin className="w-[22px] h-[20px]" />
              )}
            </Link>
            <Link to="/cart">
              <IoCart className="w-[22px] h-[20px]" />
            </Link>
            <Link to="/cart">
              <FaHeart className="w-[22px] h-[20px]" />
            </Link>
          </section>
        </div>
        <div className="search-section border-b py-3 tablet:py-4 flex justify-center px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)]">
          {/* TODO: for mobile should not be visible */}
          <form action="/" className="w-full tablet:w-auto flex flex-row">
            <div className="input-container w-full tablet:w-auto relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="search-section__input text-sm tablet:text-base py-2 tablet:py-3 pl-10 w-full tablet:w-auto tablet:pl-12 tablet:pr-[209px] pr-4 border border-[var(--primary-border-color)] rounded-l-full"
              />
              <IoIosSearch className="search-section__icon text-[var(--light-gray)] absolute top-1/2 left-3 mobile:left-4 w-[20px] h-[20px] tablet:w-auto transform -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="search-section__button text-sm tablet:text-base font-bold px-5 tablet:px-8 py-2 tablet:py-3 bg-[var(--secondary-color)] rounded-r-full"
            >
              GO
            </button>
          </form>
        </div>
      </header>
    </>
  );
};

export default Header;
