const User = require('../modules/user');
const Dog = require('../modules/dog');
const {hashPassword,comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cloudinary = require('../config/cloudinaryConfig');
const axios = require('axios');
//register endpoint
const registerUser = async (req,res) =>{
    try {
        const {name,email,password} = req.body;
        //check is name was entered
        if(!name){
            return res.json({
                error: "Name is required"
            })
        };

        //check is passwrd is valid
        if(!password){
            return res.json({
                error: "Password is required "
            })
        };

        if(password){
            if(password.length < 8){
                return res.json({
                    error:'Password should be atlest 8 characters long'
                })
            }
            const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
            const uppercaseRegex = /[A-Z]/;
            
            if (!specialCharRegex.test(password)) {
                return res.json({
                    error: 'Password should contain at least one special character'
                });
            }
        
            if (!uppercaseRegex.test(password)) {
                return res.json({
                    error: 'Password should contain at least one uppercase letter'
                });
            }
        }

        //check email

        const exist = await User.findOne({email});

        if(exist){
            return res.json({
                error:'Email already exists'
            })
        };

        const hashedPassword = await hashPassword(password)
        const user  = await User.create({
            name,
            email,
            password: hashedPassword
        })


        return res.json(user);
    } catch (error) {
        console.log(error);
    }
}

//login endpoint 
const loginUser = async (req,res) =>{
    try {
        const {email,password} = req.body;

        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                 error:'User does not exist'
            })
           
        }

        const match = await comparePassword(password, user.password)
        if(match){
            jwt.sign({email: user.email, id: user._id, name: user.name},process.env.JWT_SECRET, {},(err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json(user);

            })
        }
        if(!match){
            res.json({
                error: 'Incorrect Password'
            })
        }
    } catch (error) {
        console.log("login error",error)
    }
}

// logout endpoint
const logoutUser = (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out successfully' });
};
  
//get profile details
const getProfile = (req,res) =>{
   
    if (req.user) {
        res.json(req.user);
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }

}

// Configure nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io', 
    port: 2525,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
    },
});

// Function to send OTP
const sendOTP = async (email, otp) => {
    const mailOptions = {
        from: 'test@example.com',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`,
    };
    await transporter.sendMail(mailOptions);
};

// Request OTP for password reset
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: 'User does not exist' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    user.resetOTP = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendOTP(email, otp);
    res.json({ message: 'OTP sent to email' });
};

// Verify OTP and reset password
const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: 'User does not exist' });
    }

    if (user.resetOTP !== otp || Date.now() > user.otpExpiry) {
        return res.json({ error: 'Invalid or expired OTP' });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.resetOTP = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
};

//post dog endpoint

const postDog = async (req,res) =>{
    try {
        const { name, email, age, breed, vaccinated, location, contact, description } = req.body;
        const files = req.files;
        //check email is registered
    
        const exist = await User.findOne({email});
    
        if(!exist){
            return res.json({
                error:'Please enter registered email'
            })
        };
    
        if(contact && contact.length !== 10){
            return res.json({
                error:'Please enter valid 10-digit number'
            })
        }
        const imageUploadPromises = files.map(file => 
            new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
              }).end(file.buffer);
            })
          );
          
          const date = new Date().toISOString();
          const imageUrls = await Promise.all(imageUploadPromises);
          
          const dog = await Dog.create({
            name,
            email,
            age,
            breed,
            vaccinated,
            location,
            contact,
            description,
            images: imageUrls,
            userId:req.user.id,
            date: date
          });
      

        return res.json(dog);
    } catch (error) {
        console.log(error);
    }
    
}

const deleteDog = async (req, res) => {
   
    try {
    
      const dog = await Dog.findById(req.params.id);
      if (!dog) {
        return res.status(404).json({ error: 'Dog not found' });
      }
      if (dog.userId !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized action' });
      }
  
      await dog.deleteOne();
      return res.status(200).json({ message: 'Dog deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const getBreeds = async(req,res) =>{
    try {
        const response = await axios.get('https://dog.ceo/api/breeds/list/all');
        
        const breeds = Object.keys(response.data.message).map(breed => ({
            value: breed,
            label: breed.charAt(0).toUpperCase() + breed.slice(1)
        }));
        res.json(breeds);
    } catch (error) {
        console.error('Error fetching breeds:', error);
        res.status(500).json({ error: 'Failed to fetch breeds' });
    }
}

const getDogs = async (req, res) => {
    
    try {

        const { page = 1 } = req.query;
        const perPage = 12; 

        const skip = (parseInt(page) - 1) * perPage;

        const dogs = await Dog.find()
            .sort({ date: 1 }) // Sorting by date 
            .skip(skip)
            .limit(perPage)
            .exec();
        const totalCount = await Dog.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);

        res.json({
            dogs,
            currentPage: parseInt(page),
            totalPages
        });
        } catch (error) {
        console.error('Error fetching dogs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getDogDetails = async (req, res) => {
    try {
      const dogId = req.params.id;
      const dog = await Dog.findById(dogId);
  
      if (!dog) {
        return res.status(404).json({ error: 'Dog not found' });
      }
  
      res.json(dog);
    } catch (error) {
      console.error('Error fetching dog details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const editName = async (req,res) =>{
    const name = req.body.userName;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.name = name;
        await user.save();

        res.status(200).json({ success: true, user });

    } catch (error) {
        console.error('Error updating user name:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const changePassword = async (req,res) =>{
    const user = await User.findById(req.user.id);
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
   
    try {
        
        const match = await comparePassword(oldPassword, user.password)

        if(match){
           
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            const hashedPassword = await hashPassword(newPassword)
            user.password = hashedPassword;
            await user.save();
    
            res.status(200).json({ success: true, user });
        }
        else{
            res.json({
                error: 'Incorrect Password'
            })
        }
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

const userDogs = async(req,res) =>{
    const userId = req.query.userId;
  try {
    const dogs = await Dog.find({ userId: userId });
    res.status(200).json({ dogs });
  } catch (error) {
    console.error('Error fetching user dogs:', error);
    res.status(500).json({ message: 'Error fetching user dogs' });
  }
}

module.exports={
   
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    sendOTP,
    resetPassword,
    requestPasswordReset,
    postDog,
    getBreeds,
    getDogDetails,
    getDogs,
    deleteDog,
    editName,
    changePassword,
    userDogs
}