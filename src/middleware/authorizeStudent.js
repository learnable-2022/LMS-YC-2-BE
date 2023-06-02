function checkStudentAuth(req, res, next) {
    if (req.isAuthenticated()) {
        //check if the logged in user is an admin
        return next();;
    } else {
        return res.status(403).send({
            success: false,
            message: "Unauthorized access"
        });
    }
}

module.exports = checkStudentAuth;
