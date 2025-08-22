const ProductCardSkeleton = () => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="relative h-[200px] md:h-[400px] bg-gray-200"></div>

      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>

        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-4 bg-gray-300 rounded"
              ></div>
            ))}
          </div>
          <div className="h-4 w-8 bg-gray-300 rounded"></div>
        </div>

        <div className="flex items-baseline space-x-2 pt-1">
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
