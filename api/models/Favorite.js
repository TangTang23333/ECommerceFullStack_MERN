const mongoose = require('mongoose');


const FavoriteSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true}, 
        products: [{
            productId: {type: String},
            color: {type: String},
            size: {type: String},
            price:{type: Number},
            title:{type: String},
            img:{type:String},
            sizes: {type: Array}, 
            colors: {type: Array},
            index:{type: Number}
        }]
    }, 
    {timestamps: true}
);


module.exports = mongoose.model('Favorite',FavoriteSchema)