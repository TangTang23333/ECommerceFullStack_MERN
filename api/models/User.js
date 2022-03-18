const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true}, 
        email: {type: String, required: true, unique: true},
        password:{type: String, required: true},
        isAdmin:{type: Boolean, default: false},
        new: {type: Boolean, default: true},
        img:{type: String, required: false},
        phone: {type:String, required: false}, 
        name: {type: String, required: true}, 
        address:{type: String }, 
        dob: {type: String, required: true},
        gender: {type: String}


    }, 
    {timestamps: true}
);


module.exports = mongoose.model('User', UserSchema);