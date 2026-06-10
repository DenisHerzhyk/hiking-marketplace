import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductPageSkeleton = () => {
  return (
    <div
      className="
        px-[20px]
        mobile:px-[60px]
        tablet:px-[80px]
        laptop:px-[200px]
        mt-[150px]
      "
    >
      <div className="flex flex-col tablet:flex-row gap-[40px]">
        <div className="grid grid-cols-1 laptop:grid-cols-2 gap-[10px] tablet:w-[60%]">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height={400} />
          ))}
        </div>

        <div className="flex flex-col w-full tablet:w-[40%]">
          <Skeleton width={180} height={15} />

          <div className="mt-4">
            <Skeleton width="80%" height={35} />
          </div>

          <div className="mt-3">
            <Skeleton width={120} height={28} />
          </div>

          <div className="grid grid-cols-4 gap-2 mt-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} height={42} />
            ))}
          </div>

          <div className="flex gap-2 mt-8">
            <Skeleton circle width={36} height={36} />
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Skeleton height={55} />
            <Skeleton height={44} />
            <Skeleton height={44} />
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <Skeleton height={30} />
            <Skeleton height={30} />
            <Skeleton height={30} />
            <Skeleton height={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
