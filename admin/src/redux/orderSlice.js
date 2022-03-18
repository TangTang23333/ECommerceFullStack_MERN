import { createSlice } from '@reduxjs/toolkit';
import { userRequest } from '../requestMethod';

const orderSlice = createSlice({
    name: 'order',

    initialState: {
        orders: [],
        isFetching: false,
        error: false
    },

    reducers: {
        getOrderStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },

        getOrderSuccess: (state, action) => {
            state.isFetching = false;
            state.orders = action.payload;
        },

        getOrderFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },


        // delete product
        deleteOrderStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },


        deleteOrderSuccess: (state, action) => {
            state.isFetching = false;
            const itemIndex = state.orders.findIndex((item) => item._id === action.payload.id);
            state.orders.splice(itemIndex, 1);
        },

        deleteOrderFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // add new product  
        addOrderStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },


        addOrderSuccess: (state, action) => {
            state.isFetching = false;
            state.orders.push(action.payload);
        },

        addOrderFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // update new product  
        updateOrderStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },


        updateOrderSuccess: (state, action) => {
            state.isFetching = false;
            const itemIndex = state.orders.findIndex((item) => item._id === action.payload.id);
            state.orders[itemIndex] = action.payload.order;
        },

        updateOrderFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }







    }
});

export default orderSlice.reducer;
export const
    {   getOrderFailure, getOrderSuccess, getOrderStart,
        addOrderFailure, addOrderSuccess, addOrderStart,
        updateOrderFailure, updateOrderSuccess, updateOrderStart,
        deleteOrderFailure, deleteOrderSuccess, deleteOrderStart } = orderSlice.actions; 
