import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../config/apiConfig";

const initialState = {
  message: "",
  isError: false,
  status: "idle",
  updatedCartData: null,
};

const addToCart = createAsyncThunk(
  "products/addToCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    console.log(userId, productId);
    try {
      if (
        typeof userId !== "string" ||
        !userId ||
        typeof productId !== "string" ||
        !productId
      )
        return rejectWithValue("cant add the product");
      const res = await axios.patch(
        `${BASE_API_URL}/products/addtocart`,
        {
          userId,
          productId,
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "failed to add the product"
      );
    }
  }
);

const addToCartSlice = createSlice({
  name: "addToCart",
  initialState,

  reducers: {
    resetAddToCart(state) {
      state.message = "";
      state.isError = false;
      state.status = "idle";
    },
    setUpdatedCartData(state, action) {
      state.updatedCartData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "laoding";
        state.isError = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.message = action.payload?.message;
        state.isError = false;
        state.status = "success";
        state.updatedCartData = action.payload?.updatedCart;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isError = action.payload;
      });
  },
});

export { addToCart };
export const { resetAddToCart, setUpdatedCartData } =
  addToCartSlice.actions;

export default addToCartSlice.reducer;
