import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../../config/apiConfig";

const initialState = {
  status: "idle",
  error: null,
  customers: [],
};

const getCustomers = createAsyncThunk(
  "admin/getCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_API_URL}/admin/getcustomers`,
        {},
        {
          withCredentials: true,
        }
      );
      if (!res.success) {
        rejectWithValue(
          res.data.messasge || "error fetching data"
        );
      }

      return res.data.data;
    } catch (error) {
      rejectWithValue(
        error?.resposnse?.data?.message ||
          error.message ||
          "erro fetching customers"
      );
    }
  }
);

const getcustomersSlice = createSlice({
  name: "getCustomers",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.status = "idle";
        state.error = null;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        (state.status = "error"),
          (state.error = action.payload);
      });
  },
});

export { getCustomers };

export default getcustomersSlice.reducer;
