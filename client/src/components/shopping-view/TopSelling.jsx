import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ui/ProductCard";
import { getProducts } from "../../store/product-slice/getProducts";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const TopSelling = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      <div className="max-w-[1620px] mx-auto lg:py-[55px] py-[35px] ">
        <div>
          <h2 className="heading-secondary font-main">
            TOP SELLING
          </h2>
        </div>
      </div>
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-4">
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
        <p>Loading....</p>
      )}
    </>
  );
};

export default TopSelling;
