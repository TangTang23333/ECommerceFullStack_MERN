import { createSlice } from '@reduxjs/toolkit';


const shippingSlice = createSlice({
    name: 'shipping',

    initialState: {
        shippings: [],
        isFetching: false,
        error: false
    },

    reducers: {
        getShippingStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },

        getShippingSuccess: (state, action) => {
            state.isFetching = false;
            state.shippings = action.payload;
        },

        getShippingFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },


        // delete product
        deleteShippingStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },


        deleteShippingSuccess: (state, action) => {
            state.isFetching = false;
            const itemIndex = state.shippings.findIndex((item) => item._id === action.payload);
            state.shippings.splice(itemIndex, 1);
        },

        deleteShippingFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // add new product  
        addShippingStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },


        addShippingSuccess: (state, action) => {
            state.isFetching = false;
            state.shippings.push(action.payload);
        },

        addShippingFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // update new product  
        updateShippingStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },


        updateShippingSuccess: (state, action) => {
            state.isFetching = false;
            const itemIndex = state.shippings.findIndex((item) => item._id === action.payload.id);
            state.shippings[itemIndex] = action.payload.shipping;
        },

        updateShippingFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }

    }
});

export default shippingSlice.reducer;
export const
    {   getShippingFailure, getShippingSuccess, getShippingStart,
        addShippingFailure, addShippingSuccess, addShippingStart,
        updateShippingFailure, updateShippingSuccess, updateShippingStart,
        deleteShippingFailure, deleteShippingSuccess, deleteShippingStart } = shippingSlice.actions; 
