import React, { useEffect, useState } from "react";
import { IoLogoAppleAr } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import IUser from "../interface/RegisterInterface.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InputField from "../../../shared/components/UI/InputField";

const Register = () => {
  const card = "https://res.cloudinary.com/dlrft9pjb/image/upload/auth-2.jpg";
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!user.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!user.password) {
      newErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!user.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (user.confirmPassword !== user.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) return;

    const response = await axios
      .post("http://localhost:4996/api/user/register", {
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
      })
      .then((res) => {
        toast.success(
          <div>
            <p className="font-semibold">Welcome, {user.email}!</p>
            <p>Check your inbox to verify your account.</p>
          </div>,
          { duration: 6000 },
        );
        navigate("/login");
      })
      .catch((err) => {
        if (err.response && err.response.data?.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors({
            general: err.response?.data?.message || "Registration failed",
          });
        }
      });
  };

  return (
    <div className="Register flex flex-row flex-wrap justify-center gap-[100px] laptop:gap-[300px] mt-[100px] items-center overflow-hidden relative py-[36px] mobile:py-[37px] tablet:py-[68px] px-0 laptop:px-[var(--desktop-x-padding)]">
      <div className="content z-20 w-[250px] tablet:w-[400px]">
        <IoLogoAppleAr className="w-[30px] h-[30px] mobile:w-[50px] mobile:h-[50px]" />
        <h1 className="text-[26px] mobile:text-[36px] font-semibold mt-[17px]">
          REGISTER
        </h1>
        <form onSubmit={handleSubmit} action="/login" className="flex flex-col">
          <div className="input-email mt-[8px] mobile:mt-[42px]">
            <InputField
              id="email"
              name="email"
              label="Email"
              placeholder="EMAIL"
              type="email"
              value={user.email}
              onChange={handleChange}
              error={errors.email}
              labelClassName="hidden"
            />
          </div>
          <div className="input-password mt-[16px] mobile:mt-[32px]">
            <InputField
              id="password"
              name="password"
              label="Password"
              placeholder="PASSWORD"
              type="password"
              value={user.password}
              onChange={handleChange}
              error={errors.password}
              labelClassName="hidden"
            />
          </div>
          <div className="input-confirm-password mt-[16px] mobile:mt-[32px]">
            <InputField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="CONFIRM PASSWORD"
              type="password"
              value={user.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              labelClassName="hidden"
            />
          </div>
          {errors.general && (
            <p className="flex flex-row bg-[#fdf3f2] text-red-500 text-sm p-3 mt-5 gap-2 rounded-md">
              <IoIosCloseCircle className="text-red-500 text-base" />{" "}
              {errors.general}
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
      <div className="card relative flex justify-center w-screen overflow-hidden laptop:w-fit laptop:py-[237px] py-[80px] px-[20px] mobile:px-[60px] tablet:px-[54px] laptop:px-[52px]">
        <div
          className="absolute inset-0 -z-10 w-full h-full bg-cover rounded-none laptop:rounded-[8px]"
          style={{ backgroundImage: `url(${card})` }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50 -z-9 rounded-none laptop:rounded-[8px]"></div>
        <div className="card__content relative z-10 flex flex-col h-fit justify-center items-center mobile:text-start ">
          <h2 className="text-[28px] mobile:leading-snug mobile:text-[30px] tablet:text-[36px] font-bold text-white">
            Save up to 20%
          </h2>
          <p className="text-sm mobile:text-base font-medium text-white mt-[2px] mobile:mt-[4px]">
            CHECK FOR DISCOUNTS
          </p>
          <Link
            to="/category/deals"
            className="card__button font-bold text-base mobile:text-[20px] inline-block mt-[15px] mobile:mt-[18px] py-2 px-[38px] mobile:py-3 mobile:px-12 w-fit text-black bg-white"
          >
            SHOP SALE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
