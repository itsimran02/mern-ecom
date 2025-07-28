import {
  Trash2,
  ShoppingBag,
  CreditCard,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartItems } from "../../store/product-slice/getCartItems";
import { deleteItemFromCart } from "../../store/product-slice/deleteFromCart.js";
import { setUpdatedCartData } from "../../store/product-slice/addToCart.js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {
  BASE_API_URL,
  STRIPE_KEY,
} from "../../config/apiConfig.js";

const ShoppingCart = () => {
  const { user } = useSelector((state) => state.auth);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [removingItems, setRemovingItems] = useState(
    new Set()
  );

  const dispatch = useDispatch();
  const { cartItems: userCartItems, id: userId } =
    useSelector((state) => state.auth.user);
  const { updatedCartData } = useSelector(
    (state) => state.addToCart
  );

  const cartItems = useSelector(
    (state) => state.cartItems.userCartItems
  );

  const currentCartItems =
    updatedCartData || cartItems || [];

  useEffect(() => {
    if (userCartItems) {
      dispatch(getCartItems(userCartItems));
    }
  }, [dispatch, userCartItems]);

  const handleRemoveElement = async (productId) => {
    setRemovingItems((prev) =>
      new Set(prev).add(productId)
    );
    try {
      const res = await dispatch(
        deleteItemFromCart({ userId, productId })
      );
      dispatch(setUpdatedCartData(res.payload.updatedCart));
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error(error.message || "Failed to remove item");
    } finally {
      setRemovingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleCheckout = async () => {
    if (currentCartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsCheckingOut(true);
    try {
      const stripe = await loadStripe(STRIPE_KEY);
      const res = await axios.post(
        `${BASE_API_URL}/stripe-checkout`,
        {
          products: currentCartItems,
          userId: user?.id,
          userEmail: user?.email,
          userName: user?.userName,
        }
      );

      const result = await stripe.redirectToCheckout({
        sessionId: res?.data?.id,
      });

      if (result.error) {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      toast.error(
        error.message ||
          "Checkout failed. Please try again."
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  const totalAmount = currentCartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <section className="w-full max-w-[1620px] mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Shopping Cart
        </h1>
        <p className="text-gray-600">
          {currentCartItems.length}{" "}
          {currentCartItems.length === 1 ? "item" : "items"}{" "}
          in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items - Left Side */}
        <div className="lg:col-span-2 space-y-4">
          {currentCartItems.length > 0 ? (
            currentCartItems.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="flex gap-4 p-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-24 h-24 lg:w-32 lg:h-32 overflow-hidden rounded-xl bg-gray-50">
                    <img
                      src={item?.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium">
                            {item.category}
                          </span>
                          {item.rating && (
                            <span className="text-gray-500">
                              ⭐ {item.rating}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() =>
                          handleRemoveElement(item._id)
                        }
                        disabled={removingItems.has(
                          item._id
                        )}
                        className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {removingItems.has(item._id) ? (
                          <Loader2
                            className="animate-spin"
                            size={16}
                          />
                        ) : (
                          <Trash2 size={16} />
                        )}
                        <span className="text-sm font-medium">
                          {removingItems.has(item._id)
                            ? "Removing..."
                            : "Remove"}
                        </span>
                      </button>
                    </div>

                    {/* Price */}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <span className="text-2xl font-bold text-gray-900">
                        ${item.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Empty Cart State
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
              <div className="text-gray-400 mb-4">
                <ShoppingBag
                  size={64}
                  className="mx-auto"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Looks like you haven&apos;t added any items
                to your cart yet.
              </p>
              <Link
                to="/shop/products"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                <ShoppingBag size={16} />
                <span>Continue Shopping</span>
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary - Right Side */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">
                  Total Items
                </span>
                <span className="font-medium text-gray-900">
                  {currentCartItems.length}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">
                  Subtotal
                </span>
                <span className="font-medium text-gray-900">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">
                  Shipping
                </span>
                <span className="font-medium text-green-600">
                  Free
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={
                currentCartItems.length === 0 ||
                isCheckingOut
              }
              className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 group"
            >
              {isCheckingOut ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={20}
                  />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard
                    size={20}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                  <span>Proceed to Checkout</span>
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
