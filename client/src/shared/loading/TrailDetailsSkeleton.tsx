import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TrailDetailsSkeleton = () => {
  return (
    <div className="max-w-[800px] mx-auto mt-[150px] px-5">
      <Skeleton width={200} height={25} />
      <Skeleton width={120} height={15} className="mt-2" />

      <div className="mt-5">
        <Skeleton height={250} />
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Skeleton height={150} />
          <Skeleton height={150} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} height={60} />
        ))}
      </div>
      <div className="mt-5">
        <Skeleton height={250} />
      </div>

      <div className="mt-5">
        <Skeleton height={100} />
      </div>
    </div>
  );
};

export default TrailDetailsSkeleton;
