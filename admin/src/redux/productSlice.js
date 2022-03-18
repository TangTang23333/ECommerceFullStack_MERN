import { createSlice } from '@reduxjs/toolkit';


const productSlice = createSlice({
    name: 'product',

    initialState: {
        products: [],
        isFetching: false,
        error: false
    },

    reducers: {
        getProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },

        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products = action.payload;
        },

        getProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },


        // delete product
        deleteProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },


        deleteProductSuccess: (state, action) => {
            state.isFetching = false;
            const itemIndex = state.products.findIndex((item) => item._id === action.payload.id);
            state.products.splice(itemIndex, 1);
        },

        deleteProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // add new product  
        addProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },


        addProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products.push(action.payload);
        },

        addProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // update new product  
        updateProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },


        updateProductSuccess: (state, action) => {
            state.isFetching = false;
            const itemIndex = state.products.findIndex((item) => item._id === action.payload.id);
            state.products[itemIndex] = action.payload.product;
        },

        updateProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }







    }
});

export default productSlice.reducer;
export const
    {   getProductFailure, getProductSuccess, getProductStart,
        addProductFailure, addProductSuccess, addProductStart,
        updateProductFailure, updateProductSuccess, updateProductStart,
        deleteProductFailure, deleteProductSuccess, deleteProductStart } = productSlice.actions; 
