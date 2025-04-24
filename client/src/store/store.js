import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import productReducer from "./product-slice/index.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
});

export default store;
