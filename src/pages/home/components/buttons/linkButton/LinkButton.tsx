import React from "react";
import ButtonInterface from "./LinkButtonInterface";

const LinkButton = ({ content, link }: ButtonInterface) => {
  return (
    <>
      <a
        className="home__button text-black font-bold text-base mobile:text-xl bg-[var(--secondary-color)] py-3 px-11 w-fit"
        href={link}
      >
        {content}
      </a>
    </>
  );
};

export default LinkButton;
