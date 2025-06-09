import { DollarSignIcon } from "lucide-react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartItems } from "../../store/product-slice/getCartItems";
import { deleteItemFromCart } from "../../store/product-slice/deleteFromCart.js";
import { setUpdatedCartData } from "../../store/product-slice/addToCart.js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const ShopingCart = () => {
  const dispatch = useDispatch();
  const { cartItems: userCartItems, _id: userId } =
    useSelector((state) => state.auth.user);
  const { updatedCartData } = useSelector(
    (state) => state.addToCart
  );

  const cartItems = useSelector(
    (state) => state.cartItems.userCartItems
  );
  useEffect(() => {
    dispatch(getCartItems(userCartItems));
  }, [dispatch, userCartItems]);

  const handleRemoveElement = (productId) => {
    dispatch(
      deleteItemFromCart({ userId, productId })
    ).then((res) =>
      dispatch(setUpdatedCartData(res.payload.updatedCart))
    );
  };

  const handleCheckout = async () => {
    const stripe = await loadStripe(
      "pk_test_51RWbpVRUIlM5wiDnCThP8L254vIBWoJxrMdTDYN2b4fQ8P18nmty6hH2mte316eabC7HwfsOLC3BviCQnNHndQP200sHzmLgmZ"
    );
    const res = await axios.post(
      "http://localhost:5000/api/stripe-checkout",
      {
        products: updatedCartData || cartItems,
      }
    );
    console.log(res.data.id);
    const result = await stripe.redirectToCheckout({
      sessionId: res?.data?.id,
    });

    if (result.error) {
      toast.error("payment failed");
    }
  };
  return (
    <section className="w-full max-w-[1620px] mx-auto px-3 py-4 md:px-6 flex gap-2">
      {/* left-side */}
      <Toaster />
      <div className="w-2/3">
        <div className="flex flex-col gap-4">
          {(!updatedCartData
            ? cartItems
            : updatedCartData) &&
            (updatedCartData
              ? updatedCartData
              : cartItems
            ).map((item, i) => {
              return (
                <div
                  onClick={() => {}}
                  key={i}
                  className="flex gap-2 items-center font-secondary border-[#3d3d3d] rounded-md border-1"
                >
                  <div className="w-1/5  ">
                    <img
                      src={item?.images[0]}
                      className="w-full h-full object-cover  "
                    />
                  </div>
                  <div className="flex justify-between w-4/5 py-4 px-2">
                    <div>
                      {" "}
                      <p className="font-extrabold text-xl font-main">
                        {item.title}
                      </p>
                      <p>{item.description}</p>
                      <p>{item.category}</p>
                      <p>{item.rating}</p>
                      <p className="font-extrabold text-base text-black font-mono ">
                        Price {item.price} Rs
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        handleRemoveElement(item._id);
                      }}
                      className="flex gap-[5px] bg-[#000000] hover:bg-[#3d3d3d] self-center px-3 py-2  active:scale-95 rounded-md text-white cursor-pointer transition-all ease-in"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* right-side */}
      <div className="w-1/3 border-[#3d3d3d] rounded-md border-1 ">
        <div>
          <div className="flex py-4 px-2 flex-col gap-4 items-center">
            <div className="flex justify-between w-full">
              <p>Total Items</p>
              <p>
                {
                  (!updatedCartData
                    ? cartItems
                    : updatedCartData
                  ).length
                }
              </p>
            </div>
            <div className="flex justify-between w-full">
              <p>Total Amount</p>
              <p>
                {Math.floor(
                  (!updatedCartData
                    ? cartItems
                    : updatedCartData
                  ).reduce((a, item) => {
                    return a + item.price;
                  }, 0)
                )}{" "}
                Rs
              </p>
            </div>
            <Link className="mt-6 ">
              <button
                onClick={() => {
                  if (
                    (!updatedCartData
                      ? cartItems
                      : updatedCartData
                    ).length === 0
                  ) {
                    toast.error("cart is empty");
                  }
                  handleCheckout();
                }}
                className="flex gap-[5px] bg-[#000000] hover:bg-[#3d3d3d] px-5 py-4 rounded-md text-white cursor-pointer transition-all ease-in"
              >
                <DollarSignIcon />
                Proceed To Pay
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopingCart;
