import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MainProductCardSkeleton = () => {
  return (
    <div className="MainProductCard relative flex-shrink-0 min-w-[270px] laptop:flex-1">
      <div className="w-full h-[280px] tablet:h-[350px]">
        <Skeleton height="100%" />
      </div>
      <div className="mt-[15px] flex flex-col gap-3">
        <div className="flex gap-2">
          <Skeleton circle width={25} height={25} />
          <Skeleton circle width={25} height={25} />
          <Skeleton circle width={25} height={25} />
        </div>
        <Skeleton height={18} width={`80%`} />
        <Skeleton height={18} width={`40%`} />
        <Skeleton height={35} width={120} borderRadius={20} />
      </div>
    </div>
  );
};

export default MainProductCardSkeleton;
