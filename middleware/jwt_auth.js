const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/auth.jwt');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'failed',
            data: 'Access token not found'
        });
    }

    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(403).json({
            message: 'failed',
            data: 'Invalid token'
        });
    }
};

module.exports = verifyJWT;
