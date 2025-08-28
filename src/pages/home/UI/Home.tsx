import React from "react";
import main_img from "../../../assets/ex-main.png";
import Card from "../../components/card/Card";
const Home = () => {
  return (
    <>
      <div className="Home">
        <div className="main-section">
          <div className="search-section">
            <form action="/">
              <input type="text" placeholder="Search for products..." />
              <button type="submit">GO</button>
            </form>
          </div>
          <div className="content">
            <img src={main_img} alt="main" />
            <div className="text-section">
              <h1>
                30-60% OFF
                <br />
                MID SEASON SALE
                <br />
                FOR MEMBERS
              </h1>
              <p>embrace the elements</p>
              <p>
                For the mountains, the rain,
                <br />
                {"& everything in between"}
              </p>
              <button>SHOP NOW</button>
              <div className="shop-stick">
                <p>SHOW NOW</p>
              </div>
            </div>
          </div>
        </div>
        <div className="categories-section">
          <Card title="MEN'S" image={main_img} />
          <Card title="WOMEN'S" image={main_img} />
          <Card title="BOOTS" image={main_img} />
          <Card title="DEALS" image={main_img} />
        </div>
      </div>
    </>
  );
};

export default Home;
