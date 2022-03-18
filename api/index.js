// protect env information 
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
let port = process.env.PORT || 5000;
const mongoose = require('mongoose');

const cors = require("cors");



//import router
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const favoriteRoute = require('./routes/favorite');
const orderRoute = require('./routes/order');
const shippingRoute = require('./routes/shipping');
const stripeRoute = require("./routes/stripe");





mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB connection successful!'))
    .catch((err) => {
        console.log(err);
    })


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/favorites', favoriteRoute);
app.use('/api/orders', orderRoute);
app.use('/api/shipping', shippingRoute);
app.use('/api/checkout', stripeRoute);






app.listen(port, () => {
    console.log(`listening on port ${port}!`);
})