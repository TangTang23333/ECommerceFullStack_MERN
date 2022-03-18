const mongoose = require('mongoose');


const ShippingSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        username: { type: String, required: true },
        userImg: { type: String, required: true },
        recipient:{ type: String, required: true },
        products: [{
            productId: { type: String },
            quantity: { type: Number, default: 1 },
            img: { type: String, required: true},
            title: { type: String, required: true },
            color: { type: String, required: true },
            size: { type: String, required: true },
            price: { type: Number, required: true }

        }],
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        tracking: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        status: { type: String, default: 'Pending'},
    },

    { timestamps: true }
);


module.exports = mongoose.model('Shipping', ShippingSchema)