import React, { useEffect, useState } from "react";
import { IoLogoAppleAr } from "react-icons/io5";
import card from "../../../assets/images/register-card.png";
import "../../../styles/main.scss";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import IUser from "../interface/RegisterInterface.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await axios
      .post("http://localhost:4996/api/user/register", {
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
      })
      .then((res) => {
        alert(`User ${user.email} was successfully registered`);
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Registration failed");
      });
  };

  return (
    <div className="Register flex flex-row flex-wrap justify-center tablet:justify-between gap-[70px] mobile:gap-[44px] min-h-[calc[100vh]] tablet:min-h-[calc(100vh)] overflow-hidden relative items-center py-[36px] mobile:py-[37px] tablet:py-[68px] px-0 laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)]">
      <div className="content z-20 w-[250px] tablet:w-[400px]">
        <IoLogoAppleAr className="w-[30px] h-[30px] mobile:w-[50px] mobile:h-[50px]" />
        <h1 className="text-[26px] mobile:text-[36px] font-semibold mt-[17px]">
          REGISTER
        </h1>
        <form onSubmit={handleSubmit} action="/login" className="flex flex-col">
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
          <div className="input-confirm-password mt-[16px] mobile:mt-[32px]">
            <label htmlFor="confirmPassword" className="uppercase" hidden>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              placeholder="CONFIRM PASSWORD"
              value={user.confirmPassword}
              onChange={handleChange}
              className="border-b text-sm tablet:text-base font-light border-[var(--light-gray)] py-[8px] w-full"
            />
          </div>
          {error && (
            <p className="flex flex-row bg-[#fdf3f2] text-red-500 text-sm p-3 mt-5 gap-2 rounded-md">
              <IoIosCloseCircle className="text-red-500 text-base" /> {error}
            </p>
          )}
          <button className="text-white uppercase font-bold text-base mobile:text-xl bg-black py-2 mobile:py-3 px-11 mt-[30px] mobile:mt-[60px] border border-black shadow-[4px_4px_0_#fff,5px_5px_0_#000]">
            Register
          </button>
        </form>
        <Link
          to="/login"
          className="content__register-reference flex flex-row flex-wrap tablet:flex-nowrap gap-[9px] mt-[15px]"
        >
          <span className="text-sm mobile:text-base font-light text-[var(--light-gray)]">
            Already have an account?
          </span>
          <span className="text-sm mobile:text-base font-medium underline">
            Login
          </span>
        </Link>
      </div>
      <div className="card relative w-screen tablet:w-fit rounded-[8px] tablet:py-[153px] laptop:py-[237px] p-[20px] mobile:px-[60px] tablet:px-[54px] laptop:px-[52px]">
        <div
          className="absolute inset-0 -z-10 w-full h-full bg-cover rounded-[8px]"
          style={{ backgroundImage: `url(${card})` }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-20 -z-9 rounded-[8px]"></div>
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
            className="card__button font-bold text-base mobile:text-[20px] inline-block mt-[15px] mobile:mt-[18px] py-2 px-[38px] mobile:py-3 mobile:px-12 w-fit text-black bg-white rounded-full"
          >
            SHOP SALE
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
