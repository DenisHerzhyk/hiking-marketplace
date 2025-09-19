import React from "react";
import logo from "../../../assets/images/icons/logo-apple-arr-footer.svg";
import card from "../../../assets/images/login-card.png";
import "../../../styles/main.scss";

const Login = () => {
  return (
    <div className="Login relative h-[calc(100vh-104.4px)] tablet:h-[calc(100vh-123.6px)] flex flex-row flex-wrap justify-center gap-[34px] tablet:gap-[50px] laptop:gap-[261px] items-center px-0 laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)]">
      <div className="content relative z-20 w-[250px] tablet:w-[400px]">
        <img
          src={logo}
          alt="logo"
          className="w-[30px] h-[30px] mobile:w-[50px] mobile:h-[50px]"
        />
        <h1 className="text-[26px] mobile:text-[36px] font-semibold mt-[17px]">
          LOGIN
        </h1>
        <form action="/" className="flex flex-col">
          <div className="input-email mt-[8px] mobile:mt-[42px]">
            <label htmlFor="email" hidden>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="EMAIL"
              className="border-b text-sm tablet:text-base font-light border-[var(--light-gray)] py-[8px] w-full"
            />
          </div>
          <div className="input-password mt-[16px] mobile:mt-[32px]">
            <label htmlFor="password" hidden>
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="PASSWORD"
              className="border-b text-sm tablet:text-base font-light border-[var(--light-gray)] py-[8px] w-full"
            />
          </div>
          <button className="text-black font-bold text-base mobile:text-xl bg-[var(--secondary-color)] py-2 mobile:py-3 px-11 mt-[30px] mobile:mt-[60px]">
            SIGN IN
          </button>
        </form>
        <a className="content__register-reference flex flex-row flex-wrap tablet:flex-nowrap gap-[9px] mt-[15px]">
          <span className="text-sm mobile:text-base font-light text-[var(--light-gray)]">
            Haven't registered yet?
          </span>
          <span className="text-sm mobile:text-base font-medium underline">
            Sign Up
          </span>
        </a>
      </div>
      <div className="card relative w-screen tablet:w-fit">
        <img
          src={card}
          alt="card"
          className="rounded-none tablet:rounded-[10px] object-cover w-screen h-[246px] mobile:h-[289px] tablet:w-[750px] tablet:h-[500px] laptop:w-[1000px] laptop:h-[667px]"
        />
        <div className="absolute inset-0 bg-black opacity-50 -z-10 rounded-none tablet:rounded-[10px]"></div>
        <div className="card__content absolute top-0 left-0 z-10 flex flex-col h-full justify-center items-center text-center mobile:text-start mobile:items-start p-[20px] mobile:pl-[60px] tablet:pl-[56px]">
          <h2 className="text-[28px] mobile:text-[32px] tablet:text-[36px] font-extrabold text-white">
            30-60% OFF MID SEASON SALE
            <br />
            FOR MEMBERS
          </h2>
          <p className="text-sm mobile:text-base font-medium text-white mt-[2px] mobile:mt-[4px]">
            CHECK FOR DISCOUNTS
          </p>
          <a
            href="/"
            className="card__button font-bold text-base mobile:text-[20px] inline-block mt-[15px] mobile:mt-[18px] py-2 px-[38px] mobile:py-3 mobile:px-12 w-fit text-white bg-black rounded-full"
          >
            SHOP SALE
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
