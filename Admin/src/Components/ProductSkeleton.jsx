const ProductSkeleton = ({ rows }) => {
  return (
    <div
      role="status"
      className="p-4 space-y-4 border border-gray-200 rounded shadow animate-pulse bg-white"
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-md" />
            <div>
              <div className="h-3 bg-gray-300 rounded w-40 mb-2" />
              <div className="h-2.5 bg-gray-200 rounded w-28" />
            </div>
          </div>
          <div className="h-3 w-10 bg-gray-300 rounded" />
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
