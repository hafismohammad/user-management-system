import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";

export const adminLogin = createAsyncThunk(
  "admin/login",
  async (admin, thunkAPI) => {
    try {
      return await adminService.adminLogin(admin);
    } catch (error) {
      console.log(error);
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "admin/getUserDetails",
  async (_, thunkAPI) => {
    try {
      return await adminService.getUser();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// View user details
export const viewData = createAsyncThunk(
  "admin/getViewDetails",
  async (getUser, thunkAPI) => {
    try {
      return await adminService.viewData(getUser);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Edit user data
export const getEditUser = createAsyncThunk(
  "admin/getEditUserDetails",
  async ({formData,userId}, thunkAPI) => {
    try {
      return await adminService.getEditUser({formData, userId});
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create user
export const createUser = createAsyncThunk(
  "admin/createUser",
  async (userData, thunkAPI) => {
    console.log("this thunk api admin slice", userData);
    try {
      return await adminService.createUser(userData);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const admin = JSON.parse(localStorage.getItem("admin"));

// Logout admin
export const adminLogout = createAsyncThunk("admin/logout", async () => {
  await adminService.logout();
});

// Delete user
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, thunkAPI) => {
    try {
      console.log("hit adminslice", deleteUser, id);
      const response = await adminService.deleteUser(id);
      thunkAPI.dispatch(getUserDetails());
      return response.data;
    } catch (error) {
      // Extract the error message
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: admin ? admin : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    userData: [],
  },
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.admin = null;
      })
      
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        // console.log('this is payload',action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.admin = null;
      })

      .addCase(getEditUser.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getEditUser.fulfilled, (state, action) => {
        // console.log('this is payload',action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload;
      })
      .addCase(getEditUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.admin = null;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        // console.log('this is payload',action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.admin = null;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        // console.log('this is payload',action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        console.log('action.payload',action.payload);
        state.userData = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.admin = null;
      })
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
