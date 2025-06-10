import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
import axios from "axios";
import getFiltersFromUrl from "../../utils/getFiltersFromUrl";

const initialState = {
  data: [],
  pagination: {
    total: 0,
    page:
      new URLSearchParams(window.location.search).get(
        "page"
      ) || 1,
    limit: 12,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  },
  // filters: {
  //   category: "",
  //   brand: "",
  //   minPrice: null,
  //   maxPrice: null,
  // },

  filters: getFiltersFromUrl(),
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
        `${BASE_API_URL}/products?${params}`
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

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.filters.category = action.payload;
      state.pagination.page = 1;
    },
    setColors: (state, action) => {
      state.filters.colors = action.payload;
      state.pagination.page = 1;
    },
    setBrand: (state, action) => {
      state.filters.brand = action.payload;
      state.pagination.page = 1;
    },
    setMinPrice: (state, action) => {
      state.filters.minPrice = action.payload;
      state.pagination.page = 1;
    },
    setMaxPrice: (state, action) => {
      state.filters.maxPrice = action.payload;
      state.pagination.page = 1;
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
  setCategory,
  setMinPrice,
  setMaxPrice,
  setColors,
  setBrand,
  setPage,
} = productsSlice.actions;

export default productsSlice.reducer;
