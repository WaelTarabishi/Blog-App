import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./Slices/authSlice";
import { apiSlice } from "./Slices/apiSlice";
import themeReducers from "./Slices/themeSlice";

const store = configureStore({
  reducer: {
    auth: authReducers,
    theme: themeReducers,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export default store;
