import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartRedux';
import axios from 'axios';

//import cartRedux from '../redux/cartRedux';


const Success = () => {
  const location = useLocation();


  const [orderId, setOrderId] = useState(null);
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {


    const createOrder = async () => {

      try {

        const orderURL = axios.create({
          baseURL: 'http://localhost:5000/api/',
          headers: { 'token': `Bearer ${currentUser.accessToken}` }
        });


        const res = await orderURL.post('/orders', {

          userId: currentUser._id,
          recipient: data.billing_details.name,
          products: cart.products.map((each) => (
            {
              productId: each._id,
              title: each.title,
              quantity: each.quantity,
              color: each.color,
              size: each.size,
              price: each.price,
              img: each.img,
              
            }

          )),
          amount: cart.totalAmount,
          address: data.billing_details.address,
          payment: data.payment_method_details.card.brand
        });


        // write into DB and we get one _id from DB 
        setOrderId(res.data._id);
        dispatch(clearCart());


      } catch (err) {
        console.log(err);
      }

    };

    data && createOrder();

  }, [currentUser, cart, data, dispatch]);

  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}>


      {orderId
        ? `Order has been confirmed!! Your order number is ${orderId}`
        : `Successfull, your order is being prepared!`}

      <button
        onClick={() => navigate('/')}
        style={{ padding: 10, marginTop: 20, }}>Back to homepage</button>


    </div>
  );
};

export default Success;