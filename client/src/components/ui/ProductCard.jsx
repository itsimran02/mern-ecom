import renderStars from "../../utils/renderStars";

// Product Card Component
const ProductCard = ({
  image,
  title,
  price,
  rating = 4,
  discountPrice = null,
  id,
  onAddToCart = () => {},
}) => {
  //   Function to render stars based on rating
  //   const renderStars = (rating) => {
  //     const stars = [];
  //     const fullStars = Math.floor(rating);
  //     const hasHalfStar = rating % 1 !== 0;

  //     // Add full stars
  //     for (let i = 0; i < fullStars; i++) {
  //       stars.push(
  //         <Star
  //           key={`star-${i}`}
  //           size={16}
  //           className="fill-yellow-400 text-yellow-400"
  //         />
  //       );
  //     }

  //     // Add half star if needed
  //     if (hasHalfStar) {
  //       stars.push(
  //         <StarHalf
  //           key="half-star"
  //           size={16}
  //           className="fill-yellow-400 text-yellow-400"
  //         />
  //       );
  //     }

  //     // Add empty stars
  //     const emptyStars = 5 - Math.ceil(rating);
  //     for (let i = 0; i < emptyStars; i++) {
  //       stars.push(
  //         <Star
  //           key={`empty-star-${i}`}
  //           size={16}
  //           className="text-gray-300"
  //         />
  //       );
  //     }

  //     return stars;
  //   };

  return (
    <div className=" group  min-w-[80%] relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative  h-85 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-black/60 bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onAddToCart}
            className="bg-black cursor-pointer active:scale-95 transition-all ease-in text-white text-sm py-2 px-4 rounded-full hover:bg-gray-800 "
          >
            Add to Cart
          </button>
        </div>

        {/* Discount tag if available */}
        {discountPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            {Math.round(
              ((price - discountPrice) / price) * 100
            )}
            % OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 truncate">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex mr-1">
            {renderStars(rating, id)}
          </div>
          <span className="text-xs text-gray-500">
            ({rating?.toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center">
          {discountPrice ? (
            <>
              <span className="text-gray-900 font-medium">
                ${discountPrice.toFixed(2)}
              </span>
              <span className="ml-2 text-gray-500 text-sm line-through">
                ${price?.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-gray-900 font-medium">
              ${price?.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
