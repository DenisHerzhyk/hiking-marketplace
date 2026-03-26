import avatar from "/images/avatar.webp";
import email_logo from "/images/email.svg";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../pages/login/context/authContext.tsx";

const Profile = () => {
  const ctxt = useContext(AuthContext);
  if (!ctxt) throw new Error("AuthProvider missing");

  const { setAuthLogin, setEmail, email } = ctxt;
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:4996/api/user/logout",
        {},
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(`User ${email} was successfully logged out`);
        setAuthLogin(false);
        setEmail("");
        navigate("/login");
      })
      .catch((err) => {
        console.log("Logout error: ", err);
      });
  };

  return (
    <>
      <div className="Profile flex flex-col mx-auto max-w-[1282px] px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mt-[63px] mobile:mt-[96px]">
        <div>
          <div className="welcome">
            <h1 className="text-[var(--purple-color)] font-medium text-2xl">
              Welcome, hhhh
            </h1>
            <p className="font-light text-base mt-[13px] text-[#ADA7A7]">
              Tue, 07 June 2022
            </p>
          </div>
          <div className="profile-container mt-[33px]">
            <div className="h-[60px] bg-gradient-to-r from-[#b9d4f2] to-[#fdf6e3] rounded-tl-[8px] rounded-tr-[8px]"></div>
            <div className="content py-[31px] px-[20px] mobile:px-[32px] mobile:py-[30px]">
              <div className="upper__content flex flex-wrap justify-between gap-[20px] mb-[31px]">
                <div className="flex flex-row flex-wrap gap-[23px] items-center">
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-[70px] h-[70px] mobile:w-[100px] mobile:h-[100px] rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h2 className="font-medium text-[18px] mobile:text-[20px]">
                      Alexa Rawler
                    </h2>
                    <p className="text-[var(--light-gray)] text-sm mobile:text-base">
                      alexarawles@gmail.com
                    </p>
                  </div>
                </div>
                <div className="buttons flex flex-row items-center gap-[20px]">
                  <button
                    onClick={handleLogout}
                    className="font-bold text-sm mobile:text-base bg-[var(--primary-red)] rounded-[8px] px-[13.5px] py-[6px] mobile:px-[17px] mobile:py-[8px] text-white"
                  >
                    Logout
                  </button>
                  <button className="font-bold text-sm mobile:text-base bg-[var(--primary-blue)] rounded-[8px] px-[15px] py-[6px] mobile:px-[20px] mobile:py-[8px] text-white">
                    Edit
                  </button>
                </div>
              </div>
              <form
                action="/"
                className="grid grid-cols-1 tablet:grid-cols-2 gap-[22px] mobile:gap-[27px] tablet:gap-[34px]"
              >
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-base font-normal text-[var(--purple-color)]"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your First Name"
                    className="bg-[var(--primary-gray)] text-base w-full py-[10.5px] px-[22px] mobile:py-[14px] rounded-[8px] mt-[13px]"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-base font-normal text-[var(--purple-color)]"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your First Name"
                    className="bg-[var(--primary-gray)] text-base w-full py-[10.5px] px-[22px] mobile:py-[14px] rounded-[8px] mt-[13px]"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-base font-normal text-[var(--purple-color)]"
                  >
                    Gender
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your First Name"
                    className="bg-[var(--primary-gray)] text-base w-full py-[10.5px] px-[22px] mobile:py-[14px] rounded-[8px] mt-[13px]"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-base font-normal text-[var(--purple-color)]"
                  >
                    Language
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your First Name"
                    className="bg-[var(--primary-gray)] text-base w-full py-[10.5px] px-[22px] mobile:py-[14px] rounded-[8px] mt-[13px]"
                  />
                </div>
              </form>
              <div className="email-panel mt-[33px]">
                <h2 className="font-medium text-lg">My email Address</h2>
                <div className="flex flex-row flex-wrap items-center gap-[21px] mt-[19px]">
                  <img src={email_logo} alt="email_logo" />
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-base">alexarawles@gmail.com</p>
                    <p className="text-base text-[var(--light-gray)]">
                      1 month ago
                    </p>
                  </div>
                </div>
                <button className="text-base px-[24.5px] py-[10px] text-[var(--primary-blue)] bg-blue-100/50 rounded-[8px] mt-[32px]">
                  +Add Email Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
