import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from '../redux/featurtes/apiSlice.js';
 
export const  store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: window.location.hostname === "localhost",
});

