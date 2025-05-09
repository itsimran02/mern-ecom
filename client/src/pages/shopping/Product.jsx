import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  setPage,
  setCategory,
  setBrand,
  setMaxPrice,
  setMinPrice,
} from "../../store/product-slice/getProducts";
import { useCallback, useEffect } from "react";
import ProductCard from "../../components/ui/ProductCard";
import { noImage } from "../../assets/asset";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { data, pagination, filters } = useSelector(
    (state) => state.products
  );

  const categories = [
    ...new Set(data.map((product) => product.category)),
  ];

  const brands = [
    ...new Set(data.map((product) => product.brand)),
  ];

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

  const updateURL = useCallback(
    (filters) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });
      params.set("page", pagination.page);
      window.history.pushState(
        {},
        "",
        `?${params.toString()}`
      );
    },
    [pagination.page]
  );

  useEffect(() => {
    console.log("effect ran");

    const handlePopState = () => {
      console.log("Back or forward button clicked!");
      dispatch(getProducts());
    };
    window.addEventListener("popstate", handlePopState);

    dispatch(getProducts()).then(() =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
    updateURL(filters);

    return window.removeEventListener(
      "popstate",
      handlePopState
    );
  }, [
    dispatch,
    pagination.page,
    filters.brand,
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters,
    updateURL,
  ]);

  return (
    <section className="w-full max-w-[1620px] mx-auto px-3 py-4 md:px-6">
      <div className="flex min-h-screen">
        <aside className="w-60 border-r text-start">
          <div>
            <p className="font-medium md:text-xl  ">
              Filters
            </p>

            <p className=" ">Categories</p>
            {categories.map((category, i) => (
              <div key={`a+${i}`}>
                <label>
                  <input
                    type="radio"
                    value={category}
                    name="category"
                    checked={filters.category === category}
                    onChange={handleCategoryChange}
                  />

                  {category}
                </label>
              </div>
            ))}
            <p className=" ">Brands</p>
            {brands.map((brand, i) => (
              <div key={`1+${i}`}>
                <label>
                  <input
                    type="radio"
                    value={brand}
                    name="brand"
                    checked={filters.brand === brand}
                    onChange={handleBrandChange}
                  />

                  {brand}
                </label>
              </div>
            ))}
            <div className="mt-2 md:pr-1">
              <div className="flex flex-col gap-1">
                <label htmlFor="minPrice"> minPrice</label>
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
                <label htmlFor="maxPrice"> maxPrice</label>
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
        <div className="flex-1 px-2 py-4 min-h-screen">
          <div>
            {data && data.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {data.map((product, i) => {
                  console.log(product);
                  return (
                    <Link
                      key={`${i}-a`}
                      to={`${product._id.trim()}`}
                    >
                      <ProductCard
                        image={product.images[0] || noImage}
                        price={product.price}
                        title={product.name}
                        id={product.id}
                      />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex gap-6 items-center justify-center mt-6">
            <button
              disabled={!pagination.hasPrev}
              className="disabled:bg-[#efefef] disabled:text-[#9a9699] rounded-2xl py-3 px-6  md:px-10
                    bg-[#676265] cursor-pointer  text-white hover:bg-[#545053] transition-all ease-in"
              onClick={() => {
                dispatch(setPage(-1));
              }}
            >
              {" "}
              prev
            </button>
            <p>Total Pages {pagination.totalPages}</p>
            <button
              disabled={!pagination.hasNext}
              className="disabled:bg-[#efefef]   disabled:text-[#9a9699] rounded-2xl py-3 px-6 md:px-10 bg-[#676265] hover:bg-[#545053] transition-all ease-in text-white cursor-pointer"
              onClick={() => {
                dispatch(setPage(1));
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
