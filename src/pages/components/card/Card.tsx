import React from "react";
import CardType from "./CardInterface";

const Card = ({ title, image }: CardType) => {
  return (
    <>
      <div className="Card">
        <div className="image-section">
          <img src={image} alt="image" />
        </div>
        <div className="content-section">
          <h1>{title}</h1>
          <button>SHOP</button>
        </div>
      </div>
    </>
  );
};

export default Card;
