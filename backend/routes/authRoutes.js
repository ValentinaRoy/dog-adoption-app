const express = require('express');
const router = express.Router();
const cors = require('cors');
const multer = require('multer');
const { 
    registerUser,
    loginUser,
    getProfile, 
    logoutUser,
    requestPasswordReset,
    resetPassword, 
    postDog,
    getBreeds,
    getCities
} = require('../controllers/authControllers');
const { get } = require('mongoose');

const upload = multer({ dest: 'uploads/' });
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
router.post('/postDog', upload.array('images', 10), postDog);
router.get('/breeds',getBreeds);

module.exports = router;