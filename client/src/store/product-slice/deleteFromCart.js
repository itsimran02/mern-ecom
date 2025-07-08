import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { setCartItems } from "./getCartItems.js";
import axios from "axios";
import { BASE_API_URL } from "../../config/apiConfig.js";

const initialState = {
  message: "",
  error: null,
  status: "idle",
};

const deleteItemFromCart = createAsyncThunk(
  "products/deleteItemFromCart",
  async (
    { userId, productId },

    { dispatch, rejectWithValue }
  ) => {
    try {
      console.log(userId, productId);
      if (!productId || !userId)
        return rejectWithValue("something went wrong");
      const res = await axios.patch(
        `${BASE_API_URL}/products/deletecartItem`,
        {
          userId,
          productId,
        }
      );
      if (res.success) {
        dispatch(setCartItems(res.data.updatedCart));
      }
      return res.data;
    } catch (error) {
      rejectWithValue(
        error.message || "something went wrong"
      );
    }
  }
);

const deleteItemFromCartSlice = createSlice({
  name: "products/deleteItem",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteItemFromCart.pending, (state) => {
        state.error = null;

        state.status = "loading";
      })
      .addCase(deleteItemFromCart.fulfilled, (state) => {
        state.error = null;

        state.status = "success";
      })
      .addCase(
        deleteItemFromCart.rejected,
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export { deleteItemFromCart };

export default deleteItemFromCartSlice.reducer;
