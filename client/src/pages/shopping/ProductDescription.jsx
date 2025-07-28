import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../store/product-slice/getProduct";
import toast from "react-hot-toast";
import renderStars from "../../utils/renderStars";
import {
  ShoppingCart,
  Loader2,
  Heart,
  Share2,
  ArrowLeft,
} from "lucide-react";

import {
  addToCart,
  resetAddToCart,
} from "../../store/product-slice/addToCart.js";

const ProductDescription = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [imageLoading, setImageLoading] = useState(true);

  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    message: cartMessage,
    isError: cartError,
    status,
  } = useSelector((state) => state.addToCart);
  const { isLoading, data, isError } = useSelector(
    (state) => state.product
  );
  const user = useSelector((state) => state.auth.user);

  const noImage =
    "https://cdn.vectorstock.com/i/500p/46/50/missing-picture-page-for-website-design-or-mobile-vector-27814650.jpg";

  useEffect(() => {
    dispatch(getProduct(id));

    return () => {
      dispatch(resetAddToCart());
    };
  }, [id, dispatch]);

  useEffect(() => {
    setSelectedImage(data?.images[0] || noImage);
    if (isError) {
      return toast.error("Something went wrong");
    }
  }, [isError, data?.images]);

  if (cartError) {
    toast.error(cartError);
    dispatch(resetAddToCart());
  }
  if (status === "success") {
    toast.success(cartMessage);
    dispatch(resetAddToCart());
  }

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }
    dispatch(
      addToCart({ userId: user?.id, productId: data._id })
    ).then(() => {
      return dispatch(resetAddToCart());
    });
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-[1620px] mx-auto px-6 py-12 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-3 text-gray-600">
          <Loader2 className="animate-spin" size={24} />
          <span className="text-lg font-medium">
            Loading product...
          </span>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full max-w-[1620px] mx-auto px-6 py-8 lg:py-12">
      <div className="mb-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-medium">
            Back to products
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square lg:aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-50 shadow-sm group">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <Loader2
                  className="animate-spin text-gray-400"
                  size={32}
                />
              </div>
            )}
            <img
              src={selectedImage}
              alt="product image"
              onLoad={handleImageLoad}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200">
                <Heart
                  size={16}
                  className="text-gray-600 hover:text-red-500 transition-colors"
                />
              </button>
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200">
                <Share2
                  size={16}
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                />
              </button>
            </div>
          </div>

          {data?.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {data.images.map((image, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 overflow-hidden rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedImage === image
                      ? "border-blue-500 shadow-lg scale-105 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-102"
                  }`}
                  onClick={() => {
                    setSelectedImage(image);
                    setImageLoading(true);
                  }}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={image}
                    alt={`product thumbnail ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-8 lg:py-8">
          {/* Product Title */}
          <div className="space-y-3">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              {data?.name}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {data?.description}
            </p>
          </div>

          {/* Product Meta Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-medium">
                Brand:
              </span>
              <span className="text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium">
                {data?.brand}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 font-medium">
                  Category:
                </span>
                <span className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-100">
                  {data?.category}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-700 font-medium">
                  Type:
                </span>
                <span className="text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full text-sm font-medium border border-purple-100">
                  {data?.subCategory}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 py-3">
            <div className="flex items-center">
              {renderStars(data?.rating, data?._id || "id")}
            </div>
            <span className="text-gray-600 font-medium">
              ({data?.rating?.toFixed(1)})
            </span>
            <span className="text-gray-400 text-sm">
              • Based on customer reviews
            </span>
          </div>

          <div className="py-4 border-t border-b border-gray-200">
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold text-gray-900">
                ${data?.price}
              </span>
              <span className="text-gray-500 text-lg">
                USD
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Free shipping on orders over $50
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={status === "loading"}
              className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 ease-out hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-3 group"
            >
              {status === "loading" ? (
                <Loader2
                  className="animate-spin"
                  size={20}
                />
              ) : (
                <ShoppingCart
                  size={20}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
              )}
              <span>
                {status === "loading"
                  ? "Adding to cart..."
                  : "Add To Cart"}
              </span>
            </button>

            <p className="text-center text-sm text-gray-500">
              30-day return policy • Secure checkout
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
