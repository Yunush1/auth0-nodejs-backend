const errorHandler = (err, req, res, next) => {

    if (err.name === "UnauthorizedError") {
        // Handle invalid or missing token
        return res.status(401).json({ error: "Unauthorized - Invalid or missing token" });
    }
    if (err.name === "UnauthorizedError") {
        return res.status(401).json({ error: "Unauthorized - Invalid or missing token" });
    }

    if (err.name === "BadRequestError") {
        // Handle bad request errors
        return res.status(400).json({ error: "Bad Request - Invalid input" });
    }

    // General error handling
    return res.status(500).json({
        error: "Internal Server Error",
        message: err.message || "Something went wrong",
    });
};

module.exports = {errorHandler};
