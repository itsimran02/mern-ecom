import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../config/apiConfig";

const initialState = {
  data: [],
  isLoading: false,
  isError: null,
  searchKeyword: "",
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
  filters: {
    category: null,
    brand: null,
    minPrice: null,
    maxPrice: null,
  },
  status: "idle",
};

export const searchProducts = createAsyncThunk(
  "products/search",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { searchProducts } = getState();
      const { searchKeyword, filters, pagination } =
        searchProducts;

      if (!searchKeyword) {
        return rejectWithValue("Please add search keyword");
      }

      const params = new URLSearchParams();
      params.append("keyword", searchKeyword);
      params.append("page", pagination.page);

      if (filters.category)
        params.append("category", filters.category);
      if (filters.brand)
        params.append("brand", filters.brand);
      if (filters.minPrice)
        params.append("minPrice", filters.minPrice);
      if (filters.maxPrice)
        params.append("maxPrice", filters.maxPrice);

      const res = await axios.get(
        `${BASE_API_URL}/products/search?${params.toString()}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Something went wrong"
      );
    }
  }
);

const searchProductsSlice = createSlice({
  name: "searchProducts",
  initialState,
  reducers: {
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setSearchPage: (state, action) => {
      console.log("setSearchPageClicked");
      const newPage =
        Number(state.pagination.page) + action.payload;
      state.pagination.page = newPage;
    },
    setCategory: (state, action) => {
      state.filters.category = action.payload;
    },
    setBrand: (state, action) => {
      state.filters.brand = action.payload;
    },
    setMinPrice: (state, action) => {
      state.filters.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.filters.maxPrice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(
        searchProducts.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.data = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const {
  setSearchKeyword,
  setSearchPage,
  setCategory,
  setBrand,
  setMinPrice,
  setMaxPrice,
} = searchProductsSlice.actions;

export default searchProductsSlice.reducer;
