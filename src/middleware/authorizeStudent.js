function checkStudentAuth(req, res, next) {
    if (req.isAuthenticated()) {
        // User is authenticated, proceed to the next middleware/route handler
        return next();
    } else {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access"
        });
    }
}

module.exports = checkStudentAuth;

