import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({

    name: 'favorite',

    initialState: {
        products: []

    },

    reducers: {
        addFavorite: (state, action) => {

            
            const itemIndex = state.products.findIndex(
                (product) => product._id === action.payload._id &&
                    product.color === action.payload.color &&
                    product.size === action.payload.size

            );

            if (itemIndex === -1) {
                // if not exists in favorite, assign a new index == current length 
                state.products.push({ ...action.payload, index: state.products.length });
                localStorage.setItem("products", JSON.stringify(state.products));
            }
            
        },

        removeFavorite: (state, action) => {

            const itemIndex = state.products.findIndex(
                (product) => product._id === action.payload._id &&
                    product.color === action.payload.color &&
                    product.size === action.payload.size

            );

            state.products.splice(itemIndex, 1);
            // index management, since itemIndex, every index -= 1 
            state.products.map((each, index) => {
                if (index >= itemIndex) {
                    each.index -= 1;
                }
            });
            localStorage.setItem("products", JSON.stringify(state.products));

        },

        updateFavorite: (state, action) => {
            state._id = action.payload._id;
            state.products = action.payload.products;

        },


        updateProductColor: (state, action) => {


            // item to change index: action.payload.index


            const newArray = [...state.products];
            newArray[action.payload.index].color = action.payload.color;

            state.products = [...newArray];

        },

        updateProductSize: (state, action) => {

            // item to change index: action.payload.index


            const newArray = [...state.products]; //making a new array
            newArray[action.payload.index].size = action.payload.size;

            state.products = [...newArray];

        }, 

        clearFavorite: (state, action) => {
            state.products = [];
            localStorage.setItem("products", JSON.stringify(state.products));

        }
    }



});


export const { addFavorite, removeFavorite, updateFavorite, updateProductSize, updateProductColor } = favoriteSlice.actions;

export default favoriteSlice.reducer;
