import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
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

  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <header className={`header z-50 w-full relative `}>
        <div
          className={`fixed top-0 left-0 right-0 ${isHome ? "text-white bg-opacity-0 bg-black absolute" : "text-black bg-white bg-opacity-100 border-b "}`}
        >
          <div className="upper-header w-full flex flex-row flex-wrap items-center justify-between py-[var(--y-padding)] px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)]">
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
            <section className="user-account flex flex-row gap-4 items-center">
              <Link to={authLogin ? "/profile" : "/login"}>
                {authLogin ? (
                  <CgProfile className="w-[22px] h-[20px]" />
                ) : (
                  <p className="text-base border rounded-full px-4 py-1">
                    Log in
                  </p>
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
          <div className="search-section py-3 tablet:py-4 flex justify-center px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)]">
            {/* TODO: for mobile should not be visible */}
            <form action="/" className="w-full tablet:w-auto flex flex-row">
              <div className="input-container w-full tablet:w-auto relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="search-section__input border focus:outline-none focus:ring-0 text-base py-3 pl-10 w-full tablet:w-auto tablet:pl-12 tablet:pr-[209px] pr-4 border-[var(--primary-border-color)] rounded-full"
                />
                <IoIosSearch className="search-section__icon text-[var(--light-gray)] absolute top-1/2 left-3 mobile:left-4 w-[20px] h-[20px] tablet:w-auto transform -translate-y-1/2" />
              </div>
            </form>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
