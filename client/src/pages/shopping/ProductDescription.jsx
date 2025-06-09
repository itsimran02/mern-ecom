import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../store/product-slice/getProduct";
import toast, { Toaster } from "react-hot-toast";
import renderStars from "../../utils/renderStars";

import {
  addToCart,
  resetAddToCart,
} from "../../store/product-slice/addToCart.js";

const ProductDescription = () => {
  const [selectedImage, setSelectedImage] = useState("");

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
  const { _id: userId } = useSelector(
    (state) => state.auth.user
  );
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
      return toast.error("something went wrong");
    }
  }, [isError, data?.images]);

  useEffect(() => {
    if (cartError) {
      toast.error(cartError);
    }
    if (status === "success") {
      toast.success(cartMessage);
    }
  }, [cartError, status, cartMessage]);
  console.log(userId);
  const handleAddToCart = () => {
    dispatch(addToCart({ userId, productId: data._id }));
  };

  return (
    <section className="w-full max-w-[1620px] mx-auto px-3 py-4 md:px-6">
      <Toaster />
      {isLoading && <p>Loading....</p>}
      <div className="flex flex-col lg:flex-row lg:gap-3 gap-3.5">
        {/* left div  */}
        <div className="flex flex-col lg:w-1/2 justify-center items-center gap-2 lg:gap-3">
          <div className="w-full lg:h-[500px] overflow-hidden ">
            <img
              src={selectedImage}
              alt="product image"
              className="w-full h-full transition all ease-in b  object-cover"
            />
          </div>

          <div className="flex gap-2 ">
            {data?.images.length > 1 &&
              data?.images.map((image, id) => {
                return (
                  <div
                    className="w-full lg:h-[200px] overflow-hidden border-2 border-gray-400 transition-all ease-in hover:shadow-md hover:scale-105"
                    key={id}
                  >
                    <img
                      onClick={() => {
                        setSelectedImage(image);
                      }}
                      className="object-cover cursor-pointer"
                      src={image}
                      alt={`product image ${id + 1}`}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        {/* ri div  */}
        <div className="lg:w-1/2 flex flex-col justify-center items-start">
          <h1 className="text-4xl lg:text-6xl">
            {data?.name}
          </h1>
          <p className="mt-6">{data?.description}</p>
          <p>
            Brand
            <span className="text-gray-400">
              ({data?.brand})
            </span>{" "}
          </p>
          <div className="flex items-center gap-4">
            <p className="font-medium ">
              Category ({data?.category})
            </p>

            <p className="font-medium ">
              Subcategory ({data?.subCategory})
            </p>
          </div>
          <div className="mt-3">
            <div className="flex items-center">
              {renderStars(data?.rating, data?._id || "id")}
              <p className="ml-1">({data?.rating})</p>
            </div>
          </div>
          <p className="text-2xl font-bold mt-3">
            Price {data?.price}$
          </p>
          <button
            onClick={handleAddToCart}
            className="mt-2 bg-[#545053] hover:bg-[#676265] text-white py-2 px-4 rounded-md cursor-pointer active:bg-[#858083]"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
