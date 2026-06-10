import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CartItemSkeleton = () => {
  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="flex gap-4">
        <div className="w-24 h-32 sm:w-32 sm:h-40 md:w-36 md:h-44 flex-shrink-0">
          <Skeleton height="100%" />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between mb-2">
            <div className="flex-1">
              <Skeleton height={20} width="80%" />
              <Skeleton height={20} width="50%" className="mt-1" />
            </div>

            <div className="text-right">
              <Skeleton width={50} height={14} />
              <Skeleton width={70} height={22} />
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            <Skeleton width={80} height={22} borderRadius={999} />
            <Skeleton width={90} height={22} borderRadius={999} />
          </div>

          <Skeleton width="60%" height={16} />

          <div className="mt-auto pt-4 flex justify-between items-center">
            <Skeleton width={90} height={36} />

            <div className="flex gap-3">
              <Skeleton width={70} height={20} />
              <Skeleton width={80} height={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;
