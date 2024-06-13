const express = require('express');
const router = express.Router();
const cors = require('cors');
const { 
    registerUser,
    loginUser,
    getProfile, 
    logoutUser,
    requestPasswordReset,
    resetPassword 
} = require('../controllers/authControllers')

//middleware

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/profile',getProfile);
router.post('/logout',logoutUser)
router.post('/requestPasswordReset', requestPasswordReset);
router.post('/resetPassword', resetPassword);

module.exports = router;