import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const getOrders = createAsyncThunk(
  "admin/orders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_API_URL}/admin/getorders`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        return res.data.data;
      }
    } catch (error) {
      rejectWithValue(
        error.response.data.message ||
          error.message ||
          "Failed to get orders"
      );
    }
  }
);

const getOrdersSlice = createSlice({
  name: "admin/orders",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export { getOrders };

export default getOrdersSlice.reducer;
