const {
    createUser,
    getAllUsers,
    getAUser, deleteUser
} = require('../services/user.services')

class userControllers {
    async signUp(req, res) {
        try {
            // const {email} = req.body;
            const findAUser = await getAUserByEmail({ email: req.body.email });

        } catch (err) {
            return {
                message: err.message,
                success: false,
            };
        }
    }

    //loginIn user
    async login(req, res, next) {
        try {
            const { email, password } = req.body
        } catch (err) {

        }
    }

    //get all user
    async fetchUser(req, res, next) {
        try {

        } catch {
            return {
                message: err.message,
                success: false,
            };
        }
    }
}