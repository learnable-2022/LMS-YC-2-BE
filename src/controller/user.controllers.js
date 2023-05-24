const hashPassword = require('../utils/bcrypt')
const { isValidId } = require('../utils/validateID')
const {
    createUser,
    getAUserById,
    deleteUser,
    updateUser,
    getAllUsers,
    getAUserByEmail
} = require('../services/user.services')

class userControllers {
    async signUp(req, res) {
        try {
            const { password } = req.body;
            const findUserEmail = await getAUserByEmail({ email: req.body.email });
            if (findUserEmail) {
                return res.status(400).send({
                    success: false,
                    message: 'User already exists'
                })
            } else {
                const encrypted_Password = await hashPassword(password)
                await createUser({
                    password: encrypted_Password,
                    ...req.body
                })
                return res.status(200).send({
                    success: true,
                    message: 'User created'
                })
            }
        } catch (err) {
            return {
                success: false,
                message: err.message
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

    //delete user
    async removeUser(req, res) {
        try {
            const { id } = req.params
            const check = isValidId(id)
            if (check) {
                //check if the user exists
                const findUser = await getAUserById(id)
                if (findUser) {
                    const deleted = await deleteUser(id)
                    if (deleted) {
                        return res.status(200).send({
                            success: true,
                            message: "user deleted successfully"
                        })
                    } else {
                        return res.status(409).send({
                            success: false,
                            message: "user deletion unsuccessfully"
                        })
                    }
                } else {
                    return res.status(200).send({
                        success: false,
                        message: "user does not exist"
                    })
                }
            } else {
                return res.status(404).send({
                    success: false,
                    message: "Invalid id inputted"
                })
            }
        } catch (err) {
            return {
                message: err.message,
                success: false,
            };
        }
    }

    //update a user 
    async updateAUser(req, res) {
        try {
            const { id } = req.params
            //check  if valid id
            const check = isValidId(id)
            if (check) {
                const findUser = await getAUserById(id)
                if (findUser) {
                    const updated = await updateUser(id, req.body)
                    if (updated) {
                        return res.status(200).send({
                            success: true,
                            message: "user updated successfully"
                        })
                    } else {
                        return res.status(409).send({
                            success: true,
                            message: "user update failed"
                        })
                    }
                } else {
                    return res.status(400).send({
                        success: true,
                        message: "user does not exist"
                    })
                }
            }
        } catch (error) {
            return {
                message: err.message,
                success: false,
            };
        }
    }


    //get a user
    async findAUser(req, res) {
        try {
            const { id } = req.params
            //check  if valid id
            const check = isValidId(id)
            if (check) {
                const findUser = await getAUserById(id)
                if (findUser) {
                    return res.status(200).send({
                        success: true,
                        message: "user found successfully",
                        data: findUser
                    })
                }
                return res.status(400).send({
                    success: false,
                    message: "user not found"
                })
            }
        } catch (error) {
            return {
                message: err.message,
                success: false,
            };
        }
    }


    //get all users
    async fetchAllUsers(req, res) {
        try {
            const getUsers = await getAllUsers()
            if (getUsers) {
                return res.status(200).send({
                    success: true,
                    message: "all users found",
                    data: getAllUsers
                })
            }
            return res.status(400).send({
                success: false,
                message: "no users found"
            })
        }
        catch (error) {
            return {
                message: err.message,
                success: false,
            };
        }
    }
}
module.exports = new userControllers()