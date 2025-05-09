import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import productsReducer from "./product-slice/getProducts.js";
import productReducer from "./product-slice/getProduct.js";
import searchProductsReducer from "./product-slice/searchProducts.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    product: productReducer,
    searchProducts: searchProductsReducer,
  },
});

export default store;
