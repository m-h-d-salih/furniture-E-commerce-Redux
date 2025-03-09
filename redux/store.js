import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice'
import productSlice from './productSlice'
import cartSlice from './cartSlice'
import wishlistSlice from './wishlistSlice'
export const store = configureStore({
    reducer: {
      user:userSlice,
      product:productSlice,
      cart:cartSlice,
      wishlist:wishlistSlice
    },
  });
