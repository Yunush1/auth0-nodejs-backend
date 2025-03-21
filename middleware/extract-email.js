
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const axios = require('axios')
// Middleware to verify JWT and extract email


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
    
    try {
        const decoded = jwt.verify(token, AUTH0_CLIENT_SECRET); // Verify and decode token
        req.user = decoded; // Attach decoded token data to request
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
module.exports = { authenticateToken };


// Compare this snippet from alpha-service/service/email.service.js: