import React from "react";
import logo from "../../../assets/images/icons/logo-apple-ar.svg";
import login_icon from "../../../assets/images/icons/login.svg";
import cart_icon from "../../../assets/images/icons/cart.svg";
import heart_icon from "../../../assets/images/icons/heart.svg";
import search from "../../../assets/images/icons/search.svg";

import "../../../styles/main.scss";

const Header = () => {
  return (
    <>
      {/* TODO: adapt for mobile */}
      <header className="header">
        <div className="upper-header text-white bg-[var(--primary-color)] flex flex-row flex-wrap justify-between py-[var(--y-padding)] px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)]">
          <section className="logo">
            <img src={logo} alt="logo" />
          </section>
          <section className="navigation">
            <nav>
              <ul className="flex flex-row flex-wrap gap-8 font-semibold text-sm">
                <li className="center__nav-item">HOME</li>
                <li className="center__nav-item">MENS</li>
                <li className="center__nav-item">WOMENS</li>
                <li className="center__nav-item">BOOTS</li>
                <li className="center__nav-item">DEALS</li>
              </ul>
            </nav>
          </section>
          <section className="user-account flex flex-row gap-4">
            <img src={login_icon} alt="login" />
            <img src={cart_icon} alt="cart" />
            <img src={heart_icon} alt="heart" />
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
              <img
                src={search}
                alt="search"
                className="search-section__icon absolute top-1/2 left-3 mobile:left-4 size-[16px] tablet:size-auto transform -translate-y-1/2"
              />
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
