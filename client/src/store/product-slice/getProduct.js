import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  isError: false,
  isLoading: false,
};
const URL = "http://localhost:5000/api/products/";

const getProduct = createAsyncThunk(
  "products/fetchId",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${URL}/${id}`);
      if (!res.data.success)
        throw new Error("failed data fetching");
      console.log(res);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.message || "something went wrong"
      );
    }
  }
);

const productSlice = createSlice({
  name: "productData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getProduct.rejected, (state) => {
        state.isError = false;
      });
  },
});

export { getProduct };

export default productSlice.reducer;
