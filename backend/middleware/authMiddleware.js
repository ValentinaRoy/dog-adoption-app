const jwt = require('jsonwebtoken');
const User = require('../modules/user'); 

const authenticateJWT = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        return res.status(401).json({ error: 'Token is not valid' });
    }

    req.user = decoded;  
    next();
});
};

module.exports = authenticateJWT;
