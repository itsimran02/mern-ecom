import { useDispatch, useSelector } from "react-redux";
import {
  setSearchPage,
  setCategory,
  setBrand,
  setMaxPrice,
  setMinPrice,
  searchProducts,
  setSearchKeyword,
} from "../../store/product-slice/searchProducts.js";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ui/ProductCard";
import { noImage } from "../../assets/asset";
import { Link, useLocation } from "react-router-dom";
import {
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  Search,
} from "lucide-react";

const SearchProducts = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showFilters, setShowFilters] = useState(false);

  const {
    data,
    pagination,
    filters,
    searchKeyword,
    isLoading,
    isError,
  } = useSelector((state) => state.searchProducts);

  const categories =
    data?.length > 0
      ? [
          ...new Set(
            data.map((product) => product?.category)
          ),
        ]
      : [];

  const brands =
    data?.length > 0
      ? [...new Set(data.map((product) => product?.brand))]
      : [];

  useEffect(() => {
    const queryParams = new URLSearchParams(
      location.search
    );
    const keyword = queryParams.get("keyword");

    if (keyword && keyword !== searchKeyword) {
      dispatch(setSearchKeyword(keyword));
    }

    if (keyword) {
      dispatch(searchProducts());
    }
  }, [location.search, dispatch, searchKeyword]);

  useEffect(() => {
    if (searchKeyword) {
      dispatch(searchProducts());
    }
  }, [filters, pagination.page, dispatch, searchKeyword]);

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  const handleBrandChange = (e) => {
    dispatch(setBrand(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(setCategory(null));
    dispatch(setMinPrice(null));
    dispatch(setMaxPrice(null));
    dispatch(setBrand(null));
  };

  const FilterSidebar = ({ className = "" }) => (
    <aside
      className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-6 ${className}`}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Filters
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            {(filters.category ||
              filters.brand ||
              filters.minPrice ||
              filters.maxPrice) && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setShowFilters(false)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {categories.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900">
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category, i) => (
                <label
                  key={`category-${i}`}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    value={category}
                    name="category"
                    checked={filters.category === category}
                    onChange={handleCategoryChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {brands.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900">
              Brands
            </h3>
            <div className="space-y-2">
              {brands.map((brand, i) => (
                <label
                  key={`brand-${i}`}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    value={brand}
                    name="brand"
                    checked={filters.brand === brand}
                    onChange={handleBrandChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Price Range
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label
                htmlFor="minPrice"
                className="text-sm font-medium text-gray-700"
              >
                Min Price
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                type="number"
                id="minPrice"
                placeholder="$0"
                value={filters.minPrice || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch(
                    setMinPrice(
                      value === "" ? null : Number(value)
                    )
                  );
                }}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="maxPrice"
                className="text-sm font-medium text-gray-700"
              >
                Max Price
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                id="maxPrice"
                type="number"
                placeholder="$999"
                value={filters.maxPrice || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch(
                    setMaxPrice(
                      value === "" ? null : Number(value)
                    )
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <section className="w-full max-w-[1620px] mx-auto px-4 sm:px-6 py-8 relative">
      {searchKeyword && (
        <div className="mb-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
          <div className="flex items-center space-x-2">
            <Search size={20} className="text-gray-600" />
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Search results for:{" "}
              <span className="text-blue-600">
                "{searchKeyword}"
              </span>
            </h1>
          </div>
        </div>
      )}

      <div className="lg:hidden mb-6">
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-all duration-200"
        >
          <Menu size={20} />
          <span>Filters</span>
        </button>
      </div>

      {showFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] overflow-y-auto">
            <FilterSidebar className="h-full rounded-none" />
          </div>
        </div>
      )}

      <div className="flex gap-8 min-h-screen">
        <FilterSidebar className="hidden lg:block w-80 flex-shrink-0 h-fit sticky top-8" />

        <div className="flex-1 space-y-8">
          {isLoading && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <span className="ml-3 text-gray-600">
                  Loading products...
                </span>
              </div>
            </div>
          )}

          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-center">
                <div className="text-red-400">
                  <X size={20} />
                </div>
                <p className="ml-3 text-red-700">
                  {isError}
                </p>
              </div>
            </div>
          )}

          {!isLoading && !isError && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
              {data && data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {data.map((product, i) => (
                    <Link
                      key={`product-${i}`}
                      to={`/shop/products/${product._id.trim()}`}
                      className="group"
                    >
                      <ProductCard
                        image={product.images[0] || noImage}
                        price={product.price}
                        title={product.name}
                        id={product._id}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600">
                    Try changing your search criteria or
                    adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          )}

          {data && data.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  disabled={!pagination.hasPrev}
                  className="flex items-center space-x-2 px-4 sm:px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300 w-full sm:w-auto justify-center"
                  onClick={() =>
                    dispatch(setSearchPage(-1))
                  }
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 text-sm sm:text-base">
                    Page {pagination.page} of{" "}
                    {pagination.totalPages}
                  </span>
                </div>

                <button
                  disabled={!pagination.hasNext}
                  className="flex items-center space-x-2 px-4 sm:px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300 w-full sm:w-auto justify-center"
                  onClick={() => dispatch(setSearchPage(1))}
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchProducts;
