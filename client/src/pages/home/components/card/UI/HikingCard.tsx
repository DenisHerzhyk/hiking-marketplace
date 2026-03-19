import HikingCardInterface from "../interface/HikingCardInterface";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const HikingCard = ({
  img,
  title,
  level,
  length,
  rate,
}: HikingCardInterface) => {
  return (
    <>
      <div className="flex flex-col min-w-[250px] max-w-[300px] shadow-lg overflow-hidden rounded-[10px]">
        <img
          src={img}
          alt="img"
          className="w-full h-[180px] object-cover object-center"
        />
        <div className="flex flex-col px-[20px] py-[12px] gap-[2px] rounded-b-2xl">
          <div className="flex flex-row flex-wrap justify-between gap-[5px]">
            <h2 className="text-base font-semibold">{title}</h2>
            <p className="text-sm font-light text-[var(--light-gray)]">
              Length: {length} mi
            </p>
          </div>
          <div className="flex flex-row justify-between gap-[5px]">
            <p className="text-sm font-semibold text-white bg-[var(--moderate-level-cl)] py-[2px] px-[12px] rounded-[5px]">
              {level}
            </p>
            <div className="flex flex-row gap-[6px]">
              {[...Array(Math.round(rate))].map((_, i) => (
                <FaStar
                  className="text-[var(--star-rate)] text-base"
                  key={`full-${i}`}
                />
              ))}
              {[...Array(5 - Math.round(rate))].map((_, i) => (
                <CiStar key={`empty-${i}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HikingCard;
