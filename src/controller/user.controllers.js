const hashPassword = require('../utils/bcrypt')
const { isValidId } = require('../utils/validateID')
const { MESSAGES } = require('../config/constant.config')
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
                    message: MESSAGES.USER.DUPLICATE_EMAIL
                })
            } else {
                const encrypted_Password = await hashPassword(password)
                await createUser({
                    password: encrypted_Password,
                    ...req.body
                })
                return res.status(200).send({
                    success: true,
                    message: MESSAGES.USER.CREATED
                })
            }
        } catch (err) {
            return {
                success: false,
                message: MESSAGES.USER.ERROR + err.message
            };
        }
    }

    //loginIn user
    async login(req, res, next) {
        try {
            const { email, password } = req.body


        } catch (err) {
            return {
                success: false,
                message: MESSAGES.USER.ERROR + err.message
            };
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
                            message: MESSAGES.USER.ACCOUNT_DELETED
                        })
                    } else {
                        return res.status(409).send({
                            success: false,
                            message: MESSAGES.USER.NOT_ACCOUNT_DELETED
                        })
                    }
                } else {
                    return res.status(200).send({
                        success: false,
                        message: MESSAGES.USER.ACCOUNT_NOT_REGISTERED
                    })
                }
            } else {
                return res.status(404).send({
                    success: false,
                    message: MESSAGES.USER.INCORRECT_DETAILS
                })
            }
        } catch (err) {
            return {
                message: MESSAGES.USER.ERROR + err.message,
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
                            message: MESSAGES.USER.ACCOUNT_UPDATED
                        })
                    } else {
                        return res.status(409).send({
                            success: false,
                            message: MESSAGES.USER.NOT_UPDATED
                        })
                    }
                } else {
                    return res.status(400).send({
                        success: false,
                        message: MESSAGES.USER.INCORRECT_DETAILS
                    })
                }
            }
        } catch (error) {
            return {
                message: MESSAGES.USER.ERROR + err.message,
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
                        message: MESSAGES.USER.USER_FOUND,
                        data: findUser
                    })
                }
                return res.status(400).send({
                    success: false,
                    message: MESSAGES.USER.USER_NOT_FOUND
                })
            }
        } catch (error) {
            return {
                message: MESSAGES.USER.ERROR + err.message,
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
                    message: MESSAGES.USER.USER_FOUND,
                    data: getUsers
                })
            }
            return res.status(400).send({
                success: false,
                message: MESSAGES.USER.USER_NOT_FOUND
            })
        }
        catch (error) {
            return {
                message: MESSAGES.USER.ERROR + err.message,
                success: false,
            };
        }
    }
}
module.exports = new userControllers()