import React, { useContext, useState } from "react";
import { CiInstagram } from "react-icons/ci";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoLogoAppleAr } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import api from "../../../axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../pages/login/context/authContext";
import toast from "react-hot-toast";

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/denger_it/",
    icon: <CiInstagram className="w-[22px] h-[22px]" />,
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/in/denys-herzhyk-03280a274/",
    icon: <FaLinkedin className="w-[20px] h-[20px]" />,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/DenisHerzhyk",
    icon: <FaGithub className="w-[20px] h-[20px]" />,
    label: "GitHub",
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const ctxt = useContext(AuthContext);
  const { authLogin } = ctxt || { authLogin: false };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      await api.post("/api/newsletter/subscribe", {
        email,
      });
      toast.success("Thank you for subscribing!");
      setEmail("");
    } catch (err) {
      setError("Failed to subscribe. Please try again later.");
    }
  };

  return (
    <footer className="footer w-full border-t border-stone-200 mt-[80px] mobile:mt-[100px]">
      <div className="flex flex-row flex-wrap justify-between items-start gap-[60px] mobile:gap-[72px] w-full py-[80px] mobile:py-[120px] px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)]">
        <div className="contact flex flex-col">
          <h2 className="font-semibold text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-[18px]">
            Contact
          </h2>
          <p className="text-xs mobile:text-sm text-gray-500 mb-[20px] leading-relaxed max-w-[200px]">
            Got an idea for a design?
            <br />
            Let's chat.
          </p>
          <a
            href="tel:+380930819527"
            className="font-semibold text-sm mobile:text-base hover:opacity-60 transition-opacity duration-150 mb-[6px]"
          >
            +359506203109
          </a>
          <a
            href="mailto:denis.herzhyk@gmail.com"
            className="font-semibold text-sm mobile:text-base hover:opacity-60 transition-opacity duration-150"
          >
            denis.herzhyk@gmail.com
          </a>
          <p className="text-[10px] mobile:text-xs text-gray-400 mt-[20px] transition-colors duration-150 tracking-wider uppercase">
            Privacy Policy
          </p>
          <Link
            to={authLogin ? "/profile" : "/register"}
            className="text-sm font-medium mt-4 bg-white border border-stone-300 text-stone-700 w-fit px-5 py-2 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            {authLogin ? "My Account" : "Create Account"}
          </Link>
        </div>
        <div className="flex flex-col gap-[40px]">
          <div>
            <h2 className="font-semibold text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-[18px]">
              University
            </h2>
            <p className="text-xs mobile:text-sm text-gray-500 leading-relaxed">
              Ruse University
              <br />
              Ruse, Bulgaria
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-[16px]">
              Follow
            </h2>
            <div className="flex flex-row gap-[14px]">
              {SOCIAL_LINKS.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-50 transition-opacity duration-150"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[280px] tablet:w-[360px]">
          <IoLogoAppleAr className="w-[28px] h-[28px] mobile:w-[40px] mobile:h-[40px] mb-[20px]" />
          <h2 className="font-semibold text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-[16px]">
            Newsletter
          </h2>
          <p className="text-xs mobile:text-sm text-gray-500 leading-relaxed mb-[20px]">
            Stay updated with new arrivals and exclusive offers.
          </p>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-sm mobile:text-sm border-b border-black bg-transparent focus:outline-none placeholder:text-gray-400 py-[10px] w-full transition-colors duration-150"
              />
              {error && (
                <span className="text-red-500 text-[10px] mt-1 font-medium absolute -bottom-[18px] left-0">
                  {error}
                </span>
              )}
            </div>
            <p className="text-[10px] mobile:text-[11px] text-gray-400 leading-[1.7] mt-[14px]">
              By subscribing you agree to receive email marketing communications
              from time to time.
            </p>
            <button
              type="submit"
              className="group flex flex-row items-center gap-[8px] mt-[24px] w-fit text-stone-700 font-semibold bg-white border border-stone-300 px-6 py-2.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="text-sm mobile:text-base font-semibold tracking-widest uppercase">
                Submit
              </span>
              <IoIosArrowForward className="w-[16px] h-[16px] transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-100 px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mobile:px-[var(--tablet-x-padding)] py-[20px] flex flex-row flex-wrap justify-between items-center gap-[10px]">
        <p className="text-[11px] text-gray-400 tracking-wide">
          © {new Date().getFullYear()} Think3. All rights reserved.
        </p>
        <p className="text-[11px] text-gray-400 tracking-wide">
          Made with care.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
