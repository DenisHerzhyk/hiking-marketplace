import CardInterface from "../interface/CardInterface";
import { Link } from "react-router-dom";

const Card = ({ title, image, link }: CardInterface) => {
  return (
    <>
      <div className="card relative flex-shrink-0 w-full tablet:flex-1 tablet:min-w-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
        <div className="overflow absolute inset-0 bg-black/30 -z-8 rounded-[10px] transition-opacity duration-300 group-hover:opacity-20"></div>
        <div className="image">
          <img
            src={image}
            alt={title}
            className="block w-full h-[220px] tablet:h-[380px] laptop:h-[450px] object-cover object-center rounded-[10px] -z-9"
          />
        </div>
        <div className="content flex flex-col items-start z-10">
          <h1 className="card__title text-[22px] tablet:text-[26px] text-white font-bold absolute top-1/2 -translate-y-1/2 left-6 leading-tight max-w-[200px]">
            {title}
          </h1>
          <Link
            to={link}
            className="card__button absolute bottom-5 laptop:bottom-8 left-6 text-sm w-fit text-stone-700 bg-white border border-stone-300 px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            SHOP
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
