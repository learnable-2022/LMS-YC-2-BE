function checkStudentAuth(req, res, next) {
    if (req.isAuthenticated()) {
        //check if user is logged in
        return next();
    } else {
        return res.status(403).send({
            success: false,
            message: "Unauthorized access"
        });
    }
}

module.exports = checkStudentAuth;
