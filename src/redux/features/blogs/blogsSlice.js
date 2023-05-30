import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogsServices from "./blogsServices";


const initialState = {
  blogs: [],
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
export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    reset: () => resetToInititalState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.blogs = []
      })
      .addCase(getBlogs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogs = payload;
        state.message = "";
      })
      .addCase(getBlogs.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload;
        state.blogs = []
      });

  }
});

// function to leverage the endpoint services
export const getBlogs = createAsyncThunk("getblogs-thunk", async (_, thunkAPI) => {
  try {
    return await blogsServices.getBlogs();
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
export const { reset } = blogsSlice.actions;
export default blogsSlice.reducer

