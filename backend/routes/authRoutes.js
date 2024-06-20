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
    getDogs,
    getDogDetails,
    deleteDog
} = require('../controllers/authControllers');
const { get } = require('mongoose');
const authenticateJWT = require('../middleware/authMiddleware');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/profile',authenticateJWT,getProfile);
router.post('/logout',logoutUser)
router.post('/requestPasswordReset', requestPasswordReset);
router.post('/resetPassword', resetPassword);
router.post('/postDog', upload.array('images', 10), authenticateJWT,postDog);
router.get('/breeds',getBreeds);
router.get('/dogs', getDogs);
router.get('/dogs/:id',getDogDetails);
router.delete('/dogs/:id',authenticateJWT,deleteDog)

module.exports = router;