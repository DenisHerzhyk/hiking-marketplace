import React from "react";
import ex_logo from "../../../assets/ex-logo.png";
import login_icon from "../../../assets/icons/login.svg";
import cart_icon from "../../../assets/icons/cart.svg";
import heart_icon from "../../../assets/icons/heart.svg";

const Header = () => {
  return (
    <>
      <div className="Header">
        <div className="left-section">
          <img src={ex_logo} alt="logo" />
        </div>
        <div className="center-section">
          <nav>
            <ul>
              <li>HOME</li>
              <li>MENS</li>
              <li>WOMENS</li>
              <li>BOOTS</li>
              <li>DEALS</li>
            </ul>
          </nav>
        </div>
        <div className="right-section">
          <img src={login_icon} alt="login" />
          <img src={cart_icon} alt="cart" />
          <img src={heart_icon} alt="heart" />
        </div>
      </div>
    </>
  );
};

export default Header;
