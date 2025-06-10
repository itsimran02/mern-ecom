import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  userCartItems: [],
};
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const getCartItems = createAsyncThunk(
  "getCartItems",
  async (cartItems, { rejectWithValue }) => {
    try {
      if (!Array.isArray(cartItems) || !cartItems)
        return rejectWithValue("no items in the cart");

      const res = await axios.post(
        `${BASE_API_URL}/products/getcartitems`,
        {
          cartItems,
        }
      );
      if (res.data.success === "false") {
        return rejectWithValue(
          res.data.message || "something went wrong"
        );
      }

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.message || "something went wrong"
      );
    }
  }
);

const getCartItemsSlice = createSlice({
  name: "getCartItems",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.status = "idle";
        state.userCartItems = action.payload?.cartItems;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.status = "error";
      });
  },
});

export { getCartItems };

export default getCartItemsSlice.reducer;

export const { setCartItems } = getCartItemsSlice.actions;
