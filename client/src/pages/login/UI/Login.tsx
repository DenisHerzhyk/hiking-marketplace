import React, { createContext, useContext, useEffect, useState } from "react";
import { IoLogoAppleAr } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";
import { ILoginUser } from "../interface/LoginInterface.ts";
import { IoIosCloseCircle } from "react-icons/io";
import api from "../../../axios.ts";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.tsx";
import toast from "react-hot-toast";
import InputField from "../../../shared/components/UI/InputField";

const Login = () => {
  const [searchParams] = useSearchParams();
  const card = "https://res.cloudinary.com/dlrft9pjb/image/upload/auth.jpg";
  const navigate = useNavigate();
  const ctxt = useContext(AuthContext);
  if (!ctxt) throw new Error("AuthProvider missing");
  const { setAuthLogin } = ctxt;

  const [user, setUser] = useState<ILoginUser>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (searchParams.get("verify") === "true") {
      toast.success("Your email has been verified! You can now log in.");
    }
  }, []);
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
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    await api
      .get("/api/user/verify-email", {
        withCredentials: true,
      })
      .then((res) => {})
      .catch((err) => {});

    if (!validate()) return;

    await api
      .post(
        "/api/user/login",
        {
          email: user.email,
          password: user.password,
        },
        { withCredentials: true },
      )
      .then((res) => {
        toast.success(`Welcome back, ${user.email}!`);
        setAuthLogin(true);
        navigate("/");
      })
      .catch((err) => {
        setAuthLogin(false);

        if (err.response && err.response.data?.errors) {
          setErrors(err.response.data.errors);
        } else if (err.response?.data?.message) {
          setErrors({ general: err.response.data.message });
        } else if (err.request) {
          setErrors({ general: "Server not responding" });
        } else {
          setErrors({ general: err.message });
        }
      });
  };

  return (
    <div className="Login flex flex-row flex-wrap justify-center gap-[100px] laptop:gap-[300px] mt-[70px] items-center overflow-hidden relative py-[36px] mobile:py-[37px] tablet:py-[68px] px-0 laptop:px-[var(--desktop-x-padding)]">
      <div className="content z-20 w-[250px] tablet:w-[400px]">
        <IoLogoAppleAr className="w-[30px] h-[30px] mobile:w-[50px] mobile:h-[50px]" />
        <h1 className="text-[26px] mobile:text-[36px] font-semibold mt-[17px]">
          LOGIN
        </h1>
        <form onSubmit={handleSubmit} action="/" className="flex flex-col">
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
          {errors.general && (
            <p className="flex flex-row bg-[#fdf3f2] text-red-500 text-sm p-3 mt-5 gap-2 rounded-md">
              <IoIosCloseCircle className="text-red-500 text-base" />{" "}
              {errors.general}
            </p>
          )}
          <button className="text-stone-700 uppercase font-bold text-base mobile:text-xl bg-white border border-stone-300 py-2 mobile:py-3 px-11 mt-[30px] mobile:mt-[60px] rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
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

export default Login;
