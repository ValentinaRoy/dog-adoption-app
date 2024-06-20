const mongoose = require('mongoose');
const {Schema} = mongoose;

const dogSchema = new Schema({
    name:String,
    email:{ type:String, required: true },
    age:{type:String, required:true},
    breed : {type:String, required:true},
    vaccinated: Boolean,
    date: Date,
    location: {type:String, required:true},
    contact: {type: Number,required:true},
    description : {type: String},
    images: { type: [String], required: true },
    userId: String

})

const DogModel = mongoose.model('Dog',dogSchema);
module.exports = DogModel;