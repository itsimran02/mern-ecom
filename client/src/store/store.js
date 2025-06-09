import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import productsReducer from "./product-slice/getProducts.js";
import productReducer from "./product-slice/getProduct.js";
import searchProductsReducer from "./product-slice/searchProducts.js";
import addToCartReducer from "./product-slice/addToCart.js";
import getCartItems from "./product-slice/getCartItems.js";
import deleteCartItem from "./product-slice/deleteFromCart.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    product: productReducer,
    addToCart: addToCartReducer,
    searchProducts: searchProductsReducer,
    cartItems: getCartItems,
    deletItem: deleteCartItem,
  },
});

export default store;
