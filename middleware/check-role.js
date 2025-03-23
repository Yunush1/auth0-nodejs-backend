const { auth } = require("express-oauth2-jwt-bearer");

// Auth0 JWT Validation Middleware
const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
    tokenSigningAlg: "RS256",
});

// Middleware to Check User Roles 
// Name space should be, what was configured in post login 
const checkRole = (requiredRole) => {
    return (req, res, next) => {
        const namespace = process.env.AUTH0_NAMESPACE;
        const userRoles = req.auth?.payload?.[`${namespace}roles`] || []; // ✅ Correctly fetch roles
            if (!userRoles.includes(requiredRole)) {
            return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
        }

        next();
    };
};

module.exports = checkRole;

module.exports = { jwtCheck, checkRole };
