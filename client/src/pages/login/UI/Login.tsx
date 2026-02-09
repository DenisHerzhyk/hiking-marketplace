import React, { useState } from "react";
import { IoLogoAppleAr } from "react-icons/io5";
import card from "../../../assets/images/login-card.png";
import "../../../styles/main.scss";
import { Link } from "react-router-dom";
import { ILoginUser, LoginInterface } from "../interface/LoginInterface.ts";

const Login = ({ setEmail }: LoginInterface) => {
  const [user, setUser] = useState<ILoginUser>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("User: ", user);
      const response = await fetch("http://localhost:4996/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = response.json();
      const email = { email: user.email };
      console.log(email.email);
      setEmail(user.email);
    } catch (err) {
      console.log(`The error happend while login from client: ${err}`);
    }
  };
  return (
    <div className="Login flex flex-row flex-wrap justify-center tablet:justify-between gap-[70px] mobile:gap-[44px] min-h-[calc[100vh-103.4px]] tablet:min-h-[calc(100vh-122.6px)] overflow-hidden relative items-center py-[36px] mobile:py-[68px] tablet:py-[68px] px-0 laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)]">
      <div className="content z-20 w-[250px] tablet:w-[400px]">
        <IoLogoAppleAr className="w-[30px] h-[30px] mobile:w-[50px] mobile:h-[50px]" />
        <h1 className="text-[26px] mobile:text-[36px] font-semibold mt-[17px]">
          LOGIN
        </h1>
        <form onSubmit={handleSubmit} action="/" className="flex flex-col">
          <div className="input-email mt-[8px] mobile:mt-[42px]">
            <label htmlFor="email" className="uppercase" hidden>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="EMAIL"
              value={user.email}
              onChange={handleChange}
              className="border-b text-sm tablet:text-base font-light border-[var(--light-gray)] py-[8px] w-full"
            />
          </div>
          <div className="input-password mt-[16px] mobile:mt-[32px]">
            <label htmlFor="password" className="uppercase" hidden>
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="PASSWORD"
              value={user.password}
              onChange={handleChange}
              className="border-b text-sm tablet:text-base font-light border-[var(--light-gray)] py-[8px] w-full"
            />
          </div>
          <button className="text-black uppercase font-bold text-base mobile:text-xl bg-[var(--secondary-color)] py-2 mobile:py-3 px-11 mt-[30px] mobile:mt-[60px]">
            Sign in
          </button>
        </form>
        <Link
          to="/register"
          className="content__register-reference flex flex-row flex-wrap tablet:flex-nowrap gap-[9px] mt-[15px]"
        >
          <span className="text-sm mobile:text-base font-light text-[var(--light-gray)]">
            Haven't registered yet?
          </span>
          <span className="text-sm mobile:text-base font-medium underline">
            Sign Up
          </span>
        </Link>
      </div>
      <div
        className="card relative w-screen tablet:w-fit bg-cover bg-center rounded-none tablet:rounded-[10px] tablet:py-[153px] laptop:py-[237px] p-[20px] mobile:px-[60px] tablet:px-[54px] laptop:px-[52px]"
        style={{ backgroundImage: `url(${card})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50 -z-10 rounded-none tablet:rounded-[10px]"></div>
        <div className="card__content relative z-10 flex flex-col h-fit justify-center items-center text-center mobile:text-start mobile:items-start ">
          <h2 className="text-[28px] mobile:leading-snug mobile:text-[30px] tablet:text-[36px] font-extrabold text-white">
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
