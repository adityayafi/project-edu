import { createSlice } from "@reduxjs/toolkit";

const currCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : false;

const initialState = {
    products: currCart.products || [],
    totalItem: currCart.totalItem || 0,
    totalPrice: currCart.totalPrice || 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addProdToCart:(state, action)=> {
            const newItem = {...action.payload, qty: 1, totalPrice: action.payload.price};
            const existItem = state.products.find((item) => item._id === newItem._id);

            if(existItem){
                const index = state.products.findIndex((item) => item._id === newItem._id);
                state.totalItem += 1;
                state.totalPrice += newItem.qty * newItem.price;
                state.products[index].totalPrice += newItem.qty * newItem.price;
                state.products[index].qty++;
                return;
            }

            state.products.push(newItem);
            state.totalItem+=1 ;
            state.totalPrice+=newItem.price;

            localStorage.removeItem('cart');
            localStorage.setItem('cart', JSON.stringify(state))
        },
        incrementProd: (state, action) => {
            const currProdIndex = state.products.findIndex((item) => item._id === action.payload);
            
            state.products[currProdIndex].totalPrice += state.products[currProdIndex].price;
            state.products[currProdIndex].qty += 1;
            
            state.totalItem += 1;
            state.totalPrice += state.products[currProdIndex].price;

            localStorage.removeItem('cart');
            localStorage.setItem('cart',JSON.stringify(state));
        },
        decrementProd: (state, action) => {
            const currProdIndex = state.products.findIndex((item) => item._id === action.payload);
            const currProdIndexcopy = {...state.products[currProdIndex]};

            if(state.products[currProdIndex].qty <= 1){
                state.products.splice(currProdIndex, 1);
            }else{
                state.products[currProdIndex].totalPrice -= state.products[currProdIndex].price;
                state.products[currProdIndex].qty -= 1;
            }

            state.totalItem -= 1;
            state.totalPrice -= state.products[currProdIndexcopy].price;

            localStorage.removeItem('cart');
            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearProd: (state, action) => {
            state.products = [];
            state.totalItem = 0;
            state.totalPrice = 0;
        }
    }
})  

export const {addProdToCart, incrementProd, decrementProd, clearProd} = cartSlice.actions;

export default cartSlice.reducer;