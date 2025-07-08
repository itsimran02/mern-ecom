import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../../config/apiConfig";

const initialState = {
  status: "idle",
  error: null,
  message: "",
};

const deleteProduct = createAsyncThunk(
  "product/delete",
  async (productId, { rejectWithValue }) => {
    console.log(productId);
    try {
      const res = await axios.delete(
        `${BASE_API_URL}/admin/deleteproduct`,
        {
          data: { productId },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        return res.data.message;
      }
    } catch (error) {
      rejectWithValue(
        error.res.data.message ||
          error.message ||
          "cant delete product at the moment"
      );
    }
  }
);

const deleteProductSlice = createSlice({
  name: "product/delete",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.message = action.payload;
        state.status = "idle";
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = true;
        state.message = action.payload;
      });
  },
});

export { deleteProduct };

export default deleteProductSlice.reducer;
