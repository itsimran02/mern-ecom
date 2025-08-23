import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ui/ProductCard";
import { getProducts } from "../../store/product-slice/getProducts";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCardSkeleton from "../ui/ProductSkeleton";

const TopSelling = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      <div
        id="topSelling"
        className=" max-w-[1620px] mx-auto lg:py-[55px] py-[35px] "
      >
        <div>
          <h2 className="heading-secondary font-main">
            TOP SELLING
          </h2>
        </div>
      </div>
      {data && data.length > 0 ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-4 max-w-[1620px] mx-auto lg:py-[55px] py-[35px] px-3 md:px-6">
          {data.slice(-6).map((product, i) => {
            return (
              <Link
                to={`/shop/products/${product?._id}`}
                className="cursor-pointer"
                key={i}
              >
                <ProductCard
                  image={product.images[0]}
                  title={product.name}
                  price={product.price}
                  rating={product.rating}
                  id={product.id}
                />
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mx-auto max-w-[1620px] w-full lg:py-[55px] py-[35px] px-3 md:px-6">
          <div className="gap-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-4  ">
            {[...Array(6)].map((_, i) => {
              return (
                <div key={i} className="">
                  <ProductCardSkeleton />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default TopSelling;
