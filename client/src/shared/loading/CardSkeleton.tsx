import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <div className="card relative flex-shrink-0 w-full tablet:w-full laptop:w-[300px]">
      <div className="rounded-[8px] overflow-hidden">
        <Skeleton height={200} className="laptop:h-[500px]" />
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-black/20 rounded-[8px]" />

      <div className="absolute top-1/2 left-5 w-[70%]">
        <Skeleton
          height={28}
          width="80%"
          baseColor="#ddd"
          highlightColor="#eee"
        />
      </div>

      <div className="absolute bottom-4 laptop:bottom-10 left-5">
        <Skeleton height={34} width={90} borderRadius={999} />
      </div>
    </div>
  );
};

export default CardSkeleton;
