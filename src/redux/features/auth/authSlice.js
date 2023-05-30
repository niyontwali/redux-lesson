import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./authServices";

const currentToken = localStorage.getItem("test-token");

const initialState = {
  token: currentToken ? currentToken : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};

const resetToInititalState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};

// create slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => resetToInititalState
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.token = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      });

  }
});

// function to leverage the endpoint services
export const login = createAsyncThunk("login-thunk", async (data, thunkAPI) => {
  try {
    return await authServices.login(data);
  } catch (error) {
    console.log(error);
    let message;
    if (error.code === "ERR_NETWORK") {
      message = "Network error, please connect your computer to internet";
    } else if (error.response) {
      message = error.response.data.message;
    }
    return thunkAPI.rejectWithValue(message);
  }
});



// export auth slice
export const { reset } = authSlice.actions;
export default authSlice.reducer

