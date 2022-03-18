const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema(
    {  
        userId: {type: String, required: true}, 
        products: [{
            productId: {type: String},
            quantity: {type: Number, default: 1},
            color: {type: String},
            size: {type: String},
            price:{type: Number},
            title:{type: String},
            img:{type:String},
            sizes: {type: Array}, 
            colors: {type: Array},
            index:{type: Number}
        
        }], 
        totalAmount: {type: Number},
        totalQuantity: {type: Number}
    }, 
    {timestamps: true}
);


module.exports = mongoose.model('Cart', CartSchema)