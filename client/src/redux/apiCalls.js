

import { loginStart, loginSuccess, loginFailure  } from './userRedux';
import { updateCart  } from './cartRedux';
import {updateFavorite} from './favoriteRedux';
import { publicRequest} from '../requestMethod';
import axios from 'axios';


export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await publicRequest.post('/auth/login', user);
        dispatch(loginSuccess(res.data)); 


        let userId = res.data._id;

        let baseUrl = axios.create({
            baseURL: 'http://localhost:5000/api/',
            headers: { 'token': `Bearer ${res.data.accessToken}` },
        });


        const userCart = await baseUrl.get(`/carts/find/${userId}`);
        

        
        if (userCart.data.length > 0) {
        const products = userCart.data[0].products;
        const totalAmount = userCart.data[0].totalAmount;
        const totalQuantity = userCart.data[0].totalQuantity;
        dispatch(updateCart({products, totalAmount, totalQuantity})) ;}

        

        const userFavorite = await baseUrl.get(`/favorites/find/${userId}`);
        
        if (userFavorite.data.length > 0) {
            const products = userFavorite.data[0].products;

            dispatch(updateFavorite({products})) ;}



    } catch (err) {
        dispatch(loginFailure(err));
    }
}; 




//   /find/:userId




