function checkAdminAuth(req, res, next) {
    if (req.isAuthenticated() && req.session.passport.user.type) {
        const userType = req.session.passport.user.type;
        if (userType === "admin") {
            //checks if the logged in user is an admin and has a type of admin
            return next();
        } else {
            return res.status(403).send({
                success: false,
                message: "Unauthorized access"
            });
        }
    } else {
        return res.status(403).send({
            success: false,
            message: "Unauthorized access"
        });
    }
}

module.exports = checkAdminAuth;
