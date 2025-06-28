import renderStars from "../../utils/renderStars";

const ProductCard = ({
  image,
  title,
  price,
  rating = 4,
  discountPrice = null,
  id,
  onAddToCart = () => {},
}) => {
  return (
    <div className="group min-w-[80%] relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 ease-out">
      {/* Product Image */}
      <div className="relative h-85 overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Discount tag if available */}
        {discountPrice && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            {Math.round(
              ((price - discountPrice) / price) * 100
            )}
            % OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-gray-900 text-sm leading-relaxed line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {renderStars(rating, id)}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            ({rating?.toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline space-x-2 pt-1">
          {discountPrice ? (
            <>
              <span className="text-lg font-bold text-gray-900">
                ${discountPrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${price?.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ${price?.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
