import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adminService from './adminService'

export const adminLogin  = createAsyncThunk('admin/login', async (admin, thunkAPI) => {
    try {
        return await adminService.adminLogin(admin)
    } catch (error) {
        console.log(error);
        const message =   error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const getUserDetails = createAsyncThunk('admin/getUserDetails', async (_, thunkAPI) => {
    try {
        return await adminService.getUser();
    } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Logout admin
export const adminLogout = createAsyncThunk('admin/logout', async () => {
    await adminService.logout();
});

const admin =  JSON.parse(localStorage.getItem('admin'))

export const adminSlice = createSlice({
    name:'admin',
    initialState: {
        admin: admin ? admin : null,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
        userData:[]
    },
    reducers: {
        reset: (state) => {
            state.isError =false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = ''
        }
    },
    extraReducers: (builder) => {
       builder
       .addCase(adminLogin.pending, (state) => {
        state.isLoading = false
       })
       .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.admin = action.payload
        })
        .addCase(adminLogin.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.admin = null
        })
           .addCase(getUserDetails.pending, (state) => {
            state.isLoading = false
           })
           .addCase(getUserDetails.fulfilled, (state, action) => {
            // console.log('this is payload',action.payload);
            state.isLoading = false
            state.isSuccess = true
            state.userData = action.payload
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.admin = null
            })
        }
})

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;