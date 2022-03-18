const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        recipient: { type: String, required: true},
        products: [{
            productId: { type: String },
            img: {type: String, required: true},
            quantity: { type: Number, default: 1 },
            title: { type: String, required: true},
            color: { type: String, required: true},
            size: { type: String, required: true},
            price: { type: Number, required: true},
            status: { type: String, default: 'Pending'}

        }],
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        status: { type: String, default: 'Pending' },
        payment: { type: String, default: 'Visa'}
        

    },
    
    { timestamps: true }
);


module.exports = mongoose.model('Order', OrderSchema)