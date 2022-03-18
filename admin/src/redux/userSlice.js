import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'user',

    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        users: []
    },

    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },

        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },

        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },


        getUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },

        getUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users = action.payload;
        },

        getUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },


        // delete user
        deleteUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },


        deleteUserSuccess: (state, action) => {
            state.isFetching = false;
            const itemIndex = state.users.findIndex((item) => item._id === action.payload.id);
            state.users.splice(itemIndex, 1);
        },

        deleteUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // add new user  
        addUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },


        addUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users.push(action.payload);
        },

        addUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // update new user  
        updateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },


        updateUserSuccess: (state, action) => {
            state.isFetching = false;
            const itemIndex = state.users.findIndex((item) => item._id === action.payload.id);
            state.users[itemIndex] = action.payload.user;
        },

        updateUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }


    }
});

export default userSlice.reducer;
export const { loginStart, loginSuccess, loginFailure,
    getUserFailure, getUserSuccess, getUserStart,
    addUserFailure, addUserSuccess, addUserStart,
    updateUserFailure, updateUserSuccess, updateUserStart,
    deleteUserFailure, deleteUserSuccess, deleteUserStart } = userSlice.actions; 
