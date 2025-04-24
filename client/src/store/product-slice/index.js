import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  data: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  },
  filters: {
    category: "",
    brand: "",
    minPrice: null,
    maxPrice: null,
    colors: [],
    sort: "createdAt_desc",
  },
  error: null,
  status: "idle",
};

const getProducts = createAsyncThunk(
  "shop/products",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters, pagination } = getState().products;

      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        ...(filters.category && {
          category: filters.category,
        }),
        ...(filters.minPrice && {
          minPrice: filters.minPrice,
        }),
        ...(filters.maxPrice && {
          maxPrice: filters.maxPrice,
        }),
        ...(filters.colors && {
          colors: filters.colors.join(","),
        }),
        ...(filters.brand && { brand: filters.brand }),
      });

      const res = await axios.get(
        `http://localhost:5000/api/products?${params}`
      );

      return {
        data: res.data.products,
        pagination: res.data.pagination,
      };
    } catch (error) {
      return rejectWithValue(
        error || "something went wrong"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.filters.category = action.payload;
    },
    setColors: (state, action) => {
      state.filters.colors = action.payload;
    },
    setBrand: (state, action) => {
      state.filters.brand = action.payload.split(",");
    },
    setMinPrice: (state, action) => {
      state.filters.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.filters.maxPrice = action.payload;
    },
    setPage: (state, action) => {
      state.pagination.page += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
        state.status = "success";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export { getProducts };

export const {
  getCategory,
  minPrice,
  maxPrice,
  colors,
  brand,
  setPage,
} = productSlice.actions;

export default productSlice.reducer;
