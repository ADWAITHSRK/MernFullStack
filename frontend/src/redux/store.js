import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from '../redux/featurtes/apiSlice.js';
import cartSliceReducer from '../redux/featurtes/cartSlice.js'
 
export const  store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart:cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: window.location.hostname === "localhost",
});

