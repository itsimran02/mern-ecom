import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../../config/apiConfig";

const initialState = {
  status: "idle",
  message: "",
};

const deleteCustomer = createAsyncThunk(
  "customer/delete",
  async (customerId, { rejectWithValue }) => {
    try {
      if (!customerId)
        return rejectWithValue(
          "please provide customer id"
        );

      const res = await axios.delete(
        `${BASE_API_URL}/admin/customers/deletecustomer/${customerId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        return res.data.message;
      }

      return rejectWithValue("something went wrong");
    } catch (error) {
      return rejectWithValue(
        error.response.data.message ||
          error.message ||
          "something went wrong"
      );
    }
  }
);

const deleteCustomerSlice = createSlice({
  name: "customer/delete",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteCustomer.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.message = action.payload;
        }
      )
      .addCase(deleteCustomer.rejected, (state, action) => {
        (state.status = "error"),
          (state.message = action.payload);
      });
  },
});

export { deleteCustomer };

export default deleteCustomerSlice.reducer;
