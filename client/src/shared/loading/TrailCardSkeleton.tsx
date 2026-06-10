import Skeleton from "react-loading-skeleton";

const TrailCardSkeleton = () => {
  return (
    <div className="flex flex-col w-[280px] rounded-[10px] shadow-lg overflow-hidden bg-white flex-shrink-0">
      <Skeleton height={190} />

      <div className="p-3">
        <Skeleton height={20} width="80%" />
        <Skeleton height={20} width="60%" className="mt-2" />

        <div className="flex justify-between mt-4">
          <Skeleton width={80} />
          <Skeleton width={60} />
        </div>

        <Skeleton width={100} className="mt-3" />
      </div>
    </div>
  );
};

export default TrailCardSkeleton;
