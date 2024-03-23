const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET_KEY;
const authenticate = (req, res, next) => {
    console.log('authenticate middleware');
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        console.log('token', token);
        console.log('secretKey', secretKey)
        const parsedToken = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(parsedToken, secretKey,{ ignoreExpiration: false });
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error('catch here',error.name, error.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authenticate;