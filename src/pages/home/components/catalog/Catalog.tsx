import React from "react";
import CatalogInterface from "./CatalogInterface";
import ProductCard from "../product-card/ProductCard";

const Catalog = ({ title, p, cards }: CatalogInterface) => {
  return (
    <>
      {/* TODO: adapt for mobile and tablet using sliders */}
      <section className="catalog">
        <h1 className="catalog__title text-2xl mobile:text-[30px] tablet:text-3xl laptop:text-4xl font-extrabold">
          {title}
        </h1>
        <p className="catalog__description text-sm mobile:text-lg mt-1">{p}</p>
        <div className="cards-set flex flex-nowrap overflow-x-auto gap-5 mobile:gap-10 laptop:gap-14 justify-start mt-6">
          {cards.map((card) => {
            return (
              <ProductCard
                img={card.img}
                title={card.title}
                price={card.price}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Catalog;
