const express = require('express');
const dotenv =require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');



const app = express();
//databse connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log("connected database"))
.catch((e)=>console.log("databse not connected",e))



//middleware
app.use(express.json()) // parses the data 
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use('/',require('./routes/authRoutes'))



const port = process.env.PORT;
app.listen(port , ()=>{console.log(`server is running on port ${port}`)})