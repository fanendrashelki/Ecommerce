const ProductDetailsSkeleton = () => {
  return (
    <main className=" container p-4 sm:p-6 md:p-10 lg:p-15 mt-5">
      <ul className="space-y-10">
        <li className="flex flex-col md:flex-row gap-6">
          {/* Image Skeleton */}
          <div className="flex-shrink-0 w-full md:w-[350px] h-[500px] md:h-[400px] bg-gray-300 animate-pulse rounded"></div>

          {/* Content Skeleton */}
          <div className="flex-1 space-y-4">
            {/* Title */}
            <h3>
              <div className="bg-gray-300 animate-pulse h-6 w-[60%] rounded"></div>
            </h3>

            {/* Meta (price/rating/etc.) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 mt-4 mb-3">
                <div className="bg-gray-300 animate-pulse h-4 w-[20%] p-2 rounded"></div>
                <div className="bg-gray-300 animate-pulse h-4 w-[20%] p-2 rounded"></div>
              </div>

              {/* Description lines */}
              <div className="bg-gray-300 animate-pulse h-4 w-[10%] rounded"></div>
              <div className="bg-gray-300 animate-pulse h-4 w-[60%] rounded"></div>
              <div className="bg-gray-300 animate-pulse h-4 w-[90%] rounded"></div>
              <div className="bg-gray-300 animate-pulse h-4 w-[85%] rounded"></div>
              <div className="bg-gray-300 animate-pulse h-4 w-[80%] rounded"></div>
              <div className="bg-gray-300 animate-pulse h-4 w-[60%] rounded"></div>

              {/* Category or tag */}
              <div className="mt-4">
                <div className="bg-gray-300 animate-pulse h-4 w-[70px] rounded"></div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-between mt-6 gap-2">
                <div className="bg-gray-300 animate-pulse h-10 w-[45%] rounded"></div>
                <div className="bg-gray-300 animate-pulse h-10 w-[45%] rounded"></div>
              </div>
            </div>

            {/* Additional Info lines */}
            <div className="bg-gray-300 animate-pulse h-4 w-[40%] rounded"></div>
            <div className="bg-gray-300 animate-pulse h-4 w-[40%] rounded"></div>
            <div className="bg-gray-300 animate-pulse h-4 w-[40%] rounded"></div>
          </div>
        </li>
      </ul>
    </main>
  );
};

export default ProductDetailsSkeleton;
