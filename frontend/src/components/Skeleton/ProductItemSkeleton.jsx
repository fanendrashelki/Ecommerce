import { Skeleton } from "@mui/material";

const ProductItemSkeleton = () => {
  return (
    <div className="flex flex-col h-full shadow-lg rounded-lg border border-gray-200 transition-all duration-300 bg-white">
      <div className="w-full max-w-[300px] mx-auto">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          className="rounded-lg"
        />
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-grow space-y-2">
        <Skeleton variant="text" height={20} width="60%" />
        <Skeleton variant="text" height={24} width="100%" />
        <Skeleton variant="text" height={20} width="40%" />
        <div className="flex gap-2">
          <Skeleton variant="text" width={50} />
          <Skeleton variant="text" width={80} />
        </div>
        <div className="mt-auto">
          <Skeleton
            variant="rectangular"
            height={36}
            width="100%"
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductItemSkeleton;
