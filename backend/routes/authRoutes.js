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
    getCities,
    getDogs,
    getDogDetails
} = require('../controllers/authControllers');
const { get } = require('mongoose');

const storage = multer.memoryStorage();
const upload = multer({ storage });
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
router.get('/dogs', getDogs);
router.get('/dogs/:id', getDogDetails);

module.exports = router;