import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";

export const store = configureStore({
    reducer: {
        userAuth:userReducer,
        admin:adminReducer
    }
})
