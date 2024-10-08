import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Register user
export const register = createAsyncThunk('userAuth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Login user
export const login = createAsyncThunk('userAuth/login', async (formData, thunkAPI) => {
    try {
        return await authService.login(formData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    } 
})

// Update user profile
export const updateProfile = createAsyncThunk('userAuth/updateProfile', async ({formData, token}, thunkAPI) => {
    try {
        return await authService.updateProfile({formData, token});
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


// Logout user
export const logout = createAsyncThunk('userAuth/logout', async () => {
    await authService.logout();
});

export const userSlice = createSlice({
    name: 'userAuth',
    initialState: {
      user: user ? user : null,
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: '',
    },
    reducers: {
      reset: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = '';
      }
    },
    extraReducers: (builder) => {
      builder
        // Register
        .addCase(register.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = null;
        })
        
        // Login
        .addCase(login.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = null;
        })
        
        // Logout
        .addCase(logout.fulfilled, (state) => {
          state.user = null;  
          state.isSuccess = false;
        })
        
        // Update Profile
        .addCase(updateProfile.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(updateProfile.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
    },
  });
  

export const { reset } = userSlice.actions;
export default userSlice.reducer;
