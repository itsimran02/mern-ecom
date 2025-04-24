import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  setPage,
} from "../../store/product-slice";
import { useEffect } from "react";
import ProductCard from "../../components/ui/ProductCard";
import { useSearchParams } from "react-router-dom";

const ProductPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data,
    pagination,
    pagination: { page, limit },
    status,
    error,
    filters,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
    setSearchParams({ page: page, brand: "nike" });
  }, [dispatch, page, limit, filters, setSearchParams]);

  return (
    <section className="w-full max-w-[1620px] mx-auto px-3 py-4 md:px-6">
      <div className="flex min-h-screen">
        <aside className="w-60  border-r">sidebar</aside>
        <div className="flex-1 px-2 py-4 ">
          <div>
            {data && (
              <div className="grid grid-cols-3 gap-4">
                {data.map((product, i) => {
                  return (
                    <ProductCard
                      key={`${i}-a`}
                      image={
                        product.images[0]
                          ? product.images[0]
                          : "https://cdn.vectorstock.com/i/500p/46/50/missing-picture-page-for-website-design-or-mobile-vector-27814650.jpg"
                      }
                      price={product.price}
                      title={product.name}
                      id={product.id}
                    />
                  );
                })}
                <div className="flex gap-6 ">
                  <button
                    disabled={
                      pagination.hasPrev ? false : true
                    }
                    className="disabled:bg-red-300 py-3 px-6 bg-red-500 cursor-pointer"
                    onClick={() => {
                      pagination.hasPrev
                        ? dispatch(setPage(-1))
                        : "";
                    }}
                  >
                    prevpage
                  </button>
                  <button
                    disabled={
                      pagination.hasNext ? false : true
                    }
                    className="disabled:bg-red-300 py-3 px-6 bg-red-500 cursor-pointer"
                    onClick={() => {
                      pagination.hasNext
                        ? dispatch(setPage(1))
                        : "";
                    }}
                  >
                    nextpage
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>pagination</div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
