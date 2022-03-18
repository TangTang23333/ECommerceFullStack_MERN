
import { useSelector } from 'react-redux';
import { publicRequest, userRequest } from '../requestMethod';
import {
    getProductFailure, getProductSuccess, getProductStart,
    addProductFailure, addProductSuccess, addProductStart,
    updateProductFailure, updateProductSuccess, updateProductStart,
    deleteProductFailure, deleteProductSuccess, deleteProductStart
} from './productSlice';

import {
    loginStart, loginSuccess, loginFailure,
    getUserFailure, getUserSuccess, getUserStart,
    addUserFailure, addUserSuccess, addUserStart,
    updateUserFailure, updateUserSuccess, updateUserStart,
    deleteUserFailure, deleteUserSuccess, deleteUserStart
} from './userSlice';


import {
    getOrderFailure, getOrderSuccess, getOrderStart,
    addOrderFailure, addOrderSuccess, addOrderStart,
    updateOrderFailure, updateOrderSuccess, updateOrderStart,
    deleteOrderFailure, deleteOrderSuccess, deleteOrderStart
} from './orderSlice';

import {
    getShippingFailure, getShippingSuccess, getShippingStart,
    addShippingFailure, addShippingSuccess, addShippingStart,
    updateShippingFailure, updateShippingSuccess, updateShippingStart,
    deleteShippingFailure, deleteShippingSuccess, deleteShippingStart
} from './shippingSlice';



// ======================LogIn =================================================================
export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await publicRequest.post('/auth/login', user);
        dispatch(loginSuccess(res.data));

    } catch (err) {
        dispatch(loginFailure(err));
    }
};


// ====================== User =================================================================

// get all users
export const getUsers = async (dispatch) => {
    dispatch(getUserStart());

    try {
        const res = await userRequest.get('/users');
        dispatch(getUserSuccess(res.data));
        return res.data;

    } catch (err) {
        dispatch(getUserFailure(err));
    }
};



// delete user 
export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());

    try {
        // commnet in case change database just for test purpose 
        const res = await userRequest.delete(`/users/${id}`);
        dispatch(deleteUserSuccess(id));

    } catch (err) {
        dispatch(deleteUserFailure(err));
    }
};


// add new user
export const addUser = async (dispatch, user) => {
    dispatch(addUserStart());

    try {
        const res = await userRequest.post('/users', user);
        dispatch(addUserSuccess(res.data));

    } catch (err) {
        dispatch(addUserFailure(err));
    }
};


//update user
export const updateUser = async (dispatch, id, user) => {
    dispatch(updateUserStart());

    try {

        const res = await userRequest.put(`/users/${id}`, user);
        dispatch(updateUserSuccess({ id, user }));


    } catch (err) {
        dispatch(updateUserFailure(err));
    }
};

// ======================Product =================================================================

// get all products
export const getProducts = async (dispatch) => {
    dispatch(getProductStart());

    try {
        const res = await userRequest.get('/products');
        dispatch(getProductSuccess(res.data));

    } catch (err) {
        dispatch(getProductFailure(err));
    }
};



// delete product 
export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());

    try {
        const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));

    } catch (err) {
        dispatch(deleteProductFailure(err));
    }
};


// add new product 
export const addProduct = async (dispatch, product) => {
    dispatch(addProductStart());

    try {
        const res = await userRequest.post('/products', product);
        dispatch(addProductSuccess(res.data));

    } catch (err) {
        dispatch(addProductFailure(err));
    }
};


//update product 
export const updateProduct = async (dispatch, id, product) => {
    dispatch(updateProductStart());

    try {

        const res = await userRequest.put(`/products/${id}`, product);
        dispatch(updateProductSuccess({ id, product }));


    } catch (err) {
        dispatch(updateProductFailure(err));
    }
};

// ======================Order =================================================================
// get all orders
export const getOrders = async (dispatch, users) => {
    dispatch(getOrderStart());

    try {
        const res = await userRequest.get('/orders');

        const orders = await Promise.all(res.data.map(async (each) => {
            const user_res = await userRequest.get(`users/find/${each.userId}`);
            const customer = user_res.data;

            return {
                ...each,
                profileImg: customer.img,
                username: customer.name,
                email: customer.email,
                phone: customer.phone

            };
        }));

        dispatch(getOrderSuccess(orders));

    } catch (err) {
        dispatch(getOrderFailure(err));
    }
};



// delete order 
export const deleteOrder = async (id, dispatch) => {
    dispatch(deleteOrderStart());

    try {
        const res = await userRequest.delete(`/orders/${id}`);
        dispatch(deleteOrderSuccess(id));

    } catch (err) {
        dispatch(deleteOrderFailure(err));
    }
};


// add new order 
export const addOrder = async (dispatch, order) => {
    dispatch(addOrderStart());

    try {
        const res = await userRequest.post('/orders', order);
        dispatch(addOrderSuccess(res.data));

    } catch (err) {
        dispatch(addOrderFailure(err));
    }
};


//update order 
export const updateOrder = async (dispatch, id, order) => {
    dispatch(updateOrderStart());

    try {

        const res = await userRequest.put(`/orders/${id}`, order);
        dispatch(updateOrderSuccess({ id, order }));


    } catch (err) {
        dispatch(updateOrderFailure(err));
    }
};



// ======================Shipping =================================================================


// get all shippings
export const getShippings = async (dispatch) => {
    dispatch(getShippingStart());

    try {
        const res = await userRequest.get('/shipping');
        dispatch(getShippingSuccess(res.data));

    } catch (err) {
        dispatch(getShippingFailure(err));
    }
};



// delete shipping 
export const deleteShipping = async (id, dispatch) => {
    dispatch(deleteShippingStart());

    try {
        const res = await userRequest.delete(`/shipping/${id}`);
        dispatch(deleteShippingSuccess(id));

    } catch (err) {
        dispatch(deleteShippingFailure(err));
    }
};


// add new shipping 
export const addShipping = async (dispatch, shipping) => {
    dispatch(addShippingStart());

    try {
        const res = await userRequest.post('/shipping', shipping);
        dispatch(addShippingSuccess(res.data));

    } catch (err) {
        dispatch(addShippingFailure(err));
    }
};


//update shipping 
export const updateShipping = async (dispatch, id, shipping) => {
    dispatch(updateShippingStart());

    try {

        const res = await userRequest.put(`/shipping/${id}`, shipping);
        dispatch(updateShippingSuccess({ id, shipping }));


    } catch (err) {
        dispatch(updateShippingFailure(err));
    }
};



