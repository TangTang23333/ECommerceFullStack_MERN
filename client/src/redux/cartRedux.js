import { createSlice, current } from '@reduxjs/toolkit';




const cartSlice = createSlice({

    name: 'cart',

    initialState:
    {
        products: [],
        totalQuantity: 0,
        totalAmount: 0
    },

    reducers: {

        removeProduct: (state, action) => {
            state.totalQuantity -= action.payload.quantity;
            state.totalAmount -= action.payload.price * action.payload.quantity;

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

        decreaseProduct: (state, action) => {


            state.totalAmount -= action.payload.price;
            state.totalQuantity -= 1;


            const itemIndex = state.products.findIndex(
                (product) => product._id === action.payload._id &&
                    product.color === action.payload.color &&
                    product.size === action.payload.size

            );



            if (state.products[itemIndex].quantity > 1) {

                state.products[itemIndex].quantity -= 1;


            } else if (state.products[itemIndex].quantity === 1) {
                console.log('last one, should be removed');
                state.products.splice(itemIndex, 1);

                // index management, since itemIndex, every index -= 1 
                state.products.map((each, index) => {
                    if (index >= itemIndex) {
                        each.index -= 1;
                    }
                });


            }

        },

        increaseProduct: (state, action) => {

            const itemIndex = state.products.findIndex(
                (product) => product._id === action.payload._id &&
                    product.color === action.payload.color &&
                    product.size === action.payload.size

            );


            state.totalQuantity += action.payload.quantity;
            state.totalAmount += action.payload.price * action.payload.quantity;

            // found item in cart, just increase number 
            if (itemIndex >= 0 && 'quantity' in state.products[itemIndex]) {
                state.products[itemIndex].quantity += action.payload.quantity;
                // if already exists in cart, assign to existing index

                // new item, add new item to list 
            } else {

                // if not exists in cart, assign a new index == current length 
                state.products.push({ ...action.payload, index: state.products.length });
                console.log('newled added product:', current(state.products));

            }
            localStorage.setItem("products", JSON.stringify(state.products));
        },


        clearCart: (state, action) => {
            state.products = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
            localStorage.setItem("products", JSON.stringify(state.products));

        },

        updateCart: (state, action) => {
            state._id = action.payload._id;
            state.products = action.payload.products;
            state.totalAmount = action.payload.totalAmount;
            state.totalQuantity = action.payload.totalQuantity;
            localStorage.setItem("products", JSON.stringify(state.products));
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

        }
    }
});


export const { addProduct, removeProduct, clearCart, decreaseProduct, increaseProduct, updateCart, updateProductSize, updateProductColor } = cartSlice.actions;

export default cartSlice.reducer;
