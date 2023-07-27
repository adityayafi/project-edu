import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    q: '',
    categories: '',
}

export const querySlice = createSlice({
    name: 'query',
    initialState,
    reducers: {
        setQuery: (state, action) => {
            if(action.payload.categories){
                state.categories = action.payload.categories;
            }else{
                state.q = action.payload.q;
            }
        }
    }
    
});

export const {setQuery} = querySlice.actions;

export default querySlice.reducer;