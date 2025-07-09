import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  setPage,
} from "../../store/product-slice/getProducts.js";
import PopUp from "../common/PopUp";
import { deleteProduct } from "../../store/admin/product-slice/deleteProduct.js";
import {
  searchProducts,
  setSearchPage,
} from "../../store/product-slice/searchProducts.js";
import { Link } from "react-router-dom";

const Products = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [productId, setProductId] = useState(null);

  const dispatch = useDispatch();
  const {
    data: searchedProducts,
    pagination: searchPagination,
  } = useSelector((state) => state.searchProducts);
  const { data: products, pagination } = useSelector(
    (state) => state.products
  );

  const displayProducts =
    searchedProducts?.length > 0
      ? searchedProducts
      : products;
  const displayPagination =
    searchedProducts.length > 0
      ? searchPagination
      : pagination;

  const handleNext = () => {
    console.log("next is clicked");
    dispatch(
      searchedProducts.length > 0
        ? setSearchPage(1)
        : setPage(1)
    );
    if (searchedProducts.length > 1) {
      dispatch(searchProducts());
    } else {
      dispatch(getProducts());
    }
  };

  const handlePrev = () => {
    dispatch(
      searchedProducts.length > 0
        ? setSearchPage(-1)
        : setPage(-1)
    );
    if (searchedProducts.length > 1) {
      dispatch(searchProducts());
    } else {
      dispatch(getProducts());
    }
  };

  const onCancel = () => {
    setIsDeleting(false);
  };

  const onConfirm = () => {
    dispatch(deleteProduct(productId)).then(() =>
      dispatch(
        searchedProducts.length > 0
          ? searchProducts()
          : getProducts()
      )
    );
    setIsDeleting(false);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section className=" min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {isDeleting && (
        <>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10"></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <PopUp
              onCancel={onCancel}
              onConfirm={onConfirm}
            />
          </div>
        </>
      )}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of
            premium products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayProducts.map((product, i) => {
            return (
              <div
                key={product.id || i}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-blue-600">
                      ${product.price}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {product.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      to={`updateproduct/${product?._id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => {
                        setIsDeleting((state) => !state);
                        setProductId(product?._id);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {(pagination || searchPagination) && (
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={handlePrev}
              disabled={!displayPagination.hasPrev}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                displayPagination.hasPrev
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <svg
                className="w-5 h-5 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Page</span>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-medium">
                {displayPagination.page || 1}
              </span>
              <span className="text-gray-600">
                of {displayPagination.totalPages || 1}
              </span>
            </div>

            <button
              onClick={handleNext}
              disabled={!displayPagination.hasNext}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                pagination.hasNext
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Next
              <svg
                className="w-5 h-5 inline ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!products ||
          (products.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                Check back later for new products!
              </p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Products;
