import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        userData
      );
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "something went wrong"
      );
    }
  }
);

const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        userData
      );

      if (!res?.data?.success) {
        return rejectWithValue("something went wrong");
      }

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message ||
          "something went wrong"
      );
    }
  }
);

const checkAuth = createAsyncThunk(
  "auth/check-auth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/check-auth",
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );

      console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "something went wrong"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action) => {
        state.isLoading = false;

        state.isAuthenticated = true;
        state.user = action.payload.data.user;
      }
    );
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
    });
    // login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action) => {
        state.isLoading = false;

        state.user = action.payload.user;
        state.isAuthenticated = action.payload?.success
          ? true
          : false;
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;

      state.isAuthenticated = false;
    });
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      checkAuth.fulfilled,
      (state, action) => {
        state.isLoading = false;

        state.user = action.payload.user;
        state.isAuthenticated = action.payload?.success
          ? true
          : false;
      }
    );
    builder.addCase(checkAuth.rejected, (state) => {
      state.isLoading = false;

      state.isAuthenticated = false;
    });
  },
});

export const { setUser } = authSlice.actions;
export { registerUser, loginUser, checkAuth };
export default authSlice.reducer;
