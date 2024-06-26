const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:String,
    email:{
        type:String,
        unique: true,
        required: true,
    },
    
    password: {
        type: String,
        required: true,
    },
    resetOTP: String,
    otpExpiry: Date,

})

const UserModel = mongoose.model('User',userSchema);
module.exports = UserModel;