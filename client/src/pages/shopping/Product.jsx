import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  setPage,
} from "../../store/product-slice";
import { useEffect } from "react";
import ProductCard from "../../components/ui/ProductCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsData, setProductsData] = useState([])
  const navigate = useNavigate()
  const {
    data,
    pagination,
    pagination: { page, limit },
    status,
    error,
    filters,
  } = useSelector((state) => state.products);

  // useEffect(() => {
  //   dispatch(getProducts());
  //   setSearchParams({ page: page, brand: "nike" });
  // }, [dispatch, page, limit, filters, setSearchParams]);

  console.log(searchParams.get('page'))


  // MADE THIS USE EFFECT TO FETCH DATA DEPENDING UPON THE SEARCHPARAMS PAGE NUMBER VALUE (pagination, filter)
  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const response = await axios.get(`https://5000-itsimran02-mernecom-dgaz9no1p78.ws-us118.gitpod.io/api/products?page=${searchParams.get('page')}`, {
          signal: controller.signal,
        });
        setProductsData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else if (error.name === 'CanceledError') {
          console.log('Request canceled by AbortController');
        } else {
          console.error('Axios error:', error);
        }
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [searchParams.get('page')])

  console.log(productsData)


  return (
    <section className="w-full max-w-[1620px] mx-auto px-3 py-4 md:px-6">
      <div className="flex min-h-screen">
        <aside className="w-60  border-r">sidebar</aside>
        <div className="flex-1 px-2 py-4 ">
          <div>
            {data && (
              <div className="grid grid-cols-3 gap-4">
                {/* YOU CAN USE INITIAL LOADING STATE OR SPINNER HERE FOR BETTER UI EXPERIENCE */}
                {productsData?.products ? productsData.products.map((product, i) => {
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
                }) : null}
                <div className="flex gap-6 ">
                  <button
                    disabled={
                      searchParams.get('page') === '1' ? true: false
                    }
                    className="disabled:bg-red-300 py-3 px-6 bg-red-500 cursor-pointer"
                    onClick={() => {
                      const currentPage = Number(searchParams.get('page')) || 1;
                      const prevPage = currentPage -1;

                      navigate(`/shop/products?page=${prevPage}`);
                      // pagination.hasPrev
                      //   ? dispatch(setPage(-1))
                      //   : "";
                    }}
                  >
                    prevpage
                  </button>
                  <button
                    // disabled={
                    //   pagination.hasNext ? false : true
                    // }
                    className="disabled:bg-red-300 py-3 px-6 bg-red-500 cursor-pointer"
                    onClick={() => {
                      const currentPage = Number(searchParams.get('page')) || 1;
                      const nextPage = currentPage + 1;

                      navigate(`/shop/products?page=${nextPage}`);
                      // pagination.hasNext
                      //   ? dispatch(setPage(1))
                      //   : "";
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
