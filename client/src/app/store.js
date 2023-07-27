import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import querySlice from "../features/query/querySlice";


export const store = configureStore(
    {
        reducer: {
            cart: cartSlice,
            query: querySlice,
        }
    }
)