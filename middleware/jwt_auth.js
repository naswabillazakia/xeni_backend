const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/auth.jwt");

module.exports = {
    verifyToken: (req, res, next) => {
        let token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).json({
                status: 403,
                message: "No token provided"
            });
        }
        jwt.verify(token, jwtConfig.Secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    status: 401,
                    message: "Unauthorized"
                });
            }
            req.userId = decoded.id;
            next();
        });
    },
};

