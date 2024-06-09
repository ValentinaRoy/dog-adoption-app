const User = require('../modules/user');
const {hashPassword,comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req,res) =>{
    res.json('test is working');
}

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
        console.log(error)
    }
}

const getProfile = (req,res) =>{
    const {token} = req.cookies
    if(token) {
        jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
            if(err) throw err
            res.json(user)
        })
    }
    else{
        res.json(null)
    }

}

module.exports={
    test,
    registerUser,
    loginUser,
    getProfile
}