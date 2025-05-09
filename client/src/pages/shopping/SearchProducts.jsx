import { useDispatch, useSelector } from "react-redux";
import {
  setPage,
  setCategory,
  setBrand,
  setMaxPrice,
  setMinPrice,
  searchProducts,
  setSearchKeyword,
} from "../../store/product-slice/searchProducts";
import { useEffect } from "react";
import ProductCard from "../../components/ui/ProductCard";
import { noImage } from "../../assets/asset";
import { Link, useLocation } from "react-router-dom";

const SearchProducts = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    data,
    pagination,
    filters,
    searchKeyword,
    isLoading,
    isError,
  } = useSelector((state) => state.searchProducts);
  console.log("serach data");
  // Get categories and brands from available products
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

  // Extract search keyword from URL if available
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

  // Handle filter changes
  useEffect(() => {
    // Only dispatch search if we have a keyword
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

  return (
    <section className="w-full max-w-[1620px] mx-auto px-3 py-4 md:px-6">
      <div className="flex min-h-screen">
        <aside className="w-60 border-r text-start">
          <div>
            <p className="font-medium md:text-xl">
              Filters
            </p>

            {/* Categories filter */}
            <p className="">Categories</p>
            {categories.map((category, i) => (
              <div key={`category-${i}`}>
                <label>
                  <input
                    type="radio"
                    value={category}
                    name="category"
                    checked={filters.category === category}
                    onChange={handleCategoryChange}
                  />{" "}
                  {category}
                </label>
              </div>
            ))}

            {/* Brands filter */}
            <p className="">Brands</p>
            {brands.map((brand, i) => (
              <div key={`brand-${i}`}>
                <label>
                  <input
                    type="radio"
                    value={brand}
                    name="brand"
                    checked={filters.brand === brand}
                    onChange={handleBrandChange}
                  />{" "}
                  {brand}
                </label>
              </div>
            ))}

            {/* Price filters */}
            <div className="mt-2 md:pr-1">
              <div className="flex flex-col gap-1">
                <label htmlFor="minPrice">Min Price</label>
                <input
                  className="border-4 border-[#9a9699] focus:border-[#545053] rounded-sm outline-none py-1"
                  type="number"
                  id="minPrice"
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

              <div className="flex flex-col gap-1 mt-2">
                <label htmlFor="maxPrice">Max Price</label>
                <input
                  className="border-4 border-[#9a9699] focus:border-[#545053] rounded-sm outline-none py-1"
                  id="maxPrice"
                  type="number"
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
          <div>
            <button
              className="mt-6 hover:text-[#9a9699] text-[#545053] cursor-pointer"
              onClick={handleClearFilters}
            >
              Clear filters
            </button>
          </div>
        </aside>

        {/* Products display */}
        <div className="flex-1 px-2 py-4 min-h-screen">
          {/* Loading state */}
          {isLoading && <p>Loading products...</p>}

          {/* Error state */}
          {isError && (
            <p className="text-red-500">{isError}</p>
          )}

          {/* Search keyword display */}
          {searchKeyword && (
            <p className="mb-4">
              Search results for: "{searchKeyword}"
            </p>
          )}

          {/* Products grid */}
          <div>
            {data && data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((product, i) => (
                  <Link
                    key={`product-${i}`}
                    to={`/shop/products/${product._id.trim()}`}
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
              !isLoading && (
                <p>
                  No products found. Try changing your
                  search criteria.
                </p>
              )
            )}
          </div>

          {/* Pagination */}
          {data && data.length > 0 && (
            <div className="flex gap-6 items-center justify-center mt-6">
              <button
                disabled={!pagination.hasPrev}
                className="disabled:bg-[#efefef] disabled:text-[#9a9699] rounded-2xl py-3 px-6 md:px-10
                      bg-[#676265] cursor-pointer text-white hover:bg-[#545053] transition-all ease-in"
                onClick={() => {
                  dispatch(setPage(-1));
                }}
              >
                Prev
              </button>
              <p>
                Page {pagination.page} of{" "}
                {pagination.totalPages}
              </p>
              <button
                disabled={!pagination.hasNext}
                className="disabled:bg-[#efefef] disabled:text-[#9a9699] rounded-2xl py-3 px-6 md:px-10 bg-[#676265] hover:bg-[#545053] transition-all ease-in text-white cursor-pointer"
                onClick={() => {
                  dispatch(setPage(1));
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchProducts;
