import React from "react";
import { CiInstagram } from "react-icons/ci";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoLogoAppleAr } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="footer flex flex-row flex-wrap justify-start tablet:justify-center laptop:justify-between gap-[71px] mobile:gap-[79px] py-[144px] mobile:py-[196px] px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)]">
      <div className="contact flex flex-col">
        <h1 className="contact-section__title font-bold text-base mobile:text-[20px]">
          CONTACT
        </h1>
        <p className="contact-section__description text-xs mobile:text-base mt-[11px] mobile:mt-[16px]">
          GOT AN IDEA OF A DESIGN? LET’S CHAT...
        </p>
        <h2 className="contact-section__phone font-bold text-base mobile:text-[20px] mt-[15px] mobile:mt-[22px]">
          +380930819527
        </h2>
        <h2 className="contact-section__email font-bold text-base mobile:text-[20px] mt-[8px] mobile:mt-[11px]">
          denis.herzhyk@gmail.com
        </h2>
        <p className="contact-section__privacy text-[10px] mobile:text-sm mt-[11px] mobile:mt-[17px]">
          PRIVACY POLICY
        </p>
      </div>
      <div className="socials flex flex-col gap-[39px]">
        <div className="uni-content">
          <h2 className="uni-content__title font-bold text-base mobile:text-[20px]">
            UNIVERSITY
          </h2>
          <p className="uni-content__description text-xs mobile:text-base mt-[11px] mobile:mt-[16px]">
            RUSE UNIVERSITY, RUSE, BULGARIA
          </p>
        </div>
        <div className="social-content flex flex-col">
          <h2 className="social-content__title font-bold text-base mobile:text-[20px]">
            FOLLOW ME
          </h2>
          <div className="social-content__links flex flex-row gap-[18px] mt-[11px] mobile:mt-[16px]">
            <a href="/">
              <CiInstagram className="w-[25px] h-[25px]" />
            </a>
            <a href="/">
              <FaLinkedin className="w-[25px] h-[25px]" />
            </a>
            <a href="/">
              <FaGithub className="w-[25px] h-[25px]" />
            </a>
          </div>
        </div>
      </div>
      <div className="subscribe flex flex-col w-[280px] tablet:w-[394px]">
        <IoLogoAppleAr className="w-[30px] h-[30px] mobile:w-[50px] mobile:h-[50px]" />
        <form action="" className="flex flex-col">
          <label
            htmlFor="email"
            className="subscribe__label text-sm mobile:text-base mt-[9px]"
          >
            SUBSCRIBE TO OUR NEWSLETTER
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Enter Email"
            className="subscribe__input text-sm mobile:text-base border border-black text-black px-[27px] py-[10px] mt-[18px]"
          />
          <p className="subscribe__description text-[10px] mobile:text-xs font-normal text-[var(--dark-gray)] mobile:leading-5 mt-[17px]">
            BY CLICKING THE SUBMIT BUTTON BELOW, YOU ARE AGREEING TO RECEIVE
            EMAIL MARKETING COMMUNICATIONS FROM THINK3 FROM TIME TO TIME
          </p>
          <button
            type="submit"
            className="subscribe__button flex flex-row gap-[10px] justify-start mt-[25px] mobile:mt-[35px]"
          >
            <span className="text-sm mobile:text-base">SUBMIT</span>
            <IoIosArrowForward className="w-[18px] h-[18px] mobile:w-[24px] mobile:h-[24px]" />
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
