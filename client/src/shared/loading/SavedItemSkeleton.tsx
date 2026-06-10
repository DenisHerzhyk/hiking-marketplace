import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WishlistItemSkeleton = () => {
  return (
    <div className="bg-white border-b border-gray-200 py-5">
      <div className="flex gap-4">
        <div className="w-[100px] flex-shrink-0 flex flex-col gap-2.5">
          <Skeleton height={130} />

          <Skeleton height={32} borderRadius={999} />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between gap-3">
            <div className="flex-1">
              <Skeleton height={18} width="90%" />
              <Skeleton height={18} width="70%" className="mt-1" />
            </div>

            <div>
              <Skeleton width={45} height={14} />
              <Skeleton width={60} height={18} />
            </div>
          </div>

          <div className="mt-2">
            <Skeleton width="50%" height={14} />
          </div>

          <div className="mt-2">
            <Skeleton width={100} height={22} borderRadius={999} />
          </div>

          <div className="mt-auto pt-3">
            <Skeleton width={80} height={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistItemSkeleton;
