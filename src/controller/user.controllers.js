const checkValidId = require('../utils/validateID')
const { MESSAGES } = require('../config/constant.config')
const usersServices = require('../services/user.services')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/user.model')

const {
    createUser,
    getAUserById,
    deleteUser,
    updateUser,
    getAllUsers,
    getAUserByEmail
} = usersServices
const rounds = parseInt(process.env.ROUNDS)


class userControllers {
    async signUp(req, res) {
        try {
            const { password, email } = req.body;
            const data = req.body
            const findUserEmail = await getAUserByEmail({ email: email });
            if (!email) {
                return res.status(404).send({
                    message: 'Enter email address',
                    success: false
                })
            }
            if (findUserEmail) {
                return res.status(400).send({
                    success: false,
                    message: MESSAGES.USER.DUPLICATE_EMAIL
                });
            }
            if (!password) {
                return res.status(400).send({
                    success: false,
                    message: MESSAGES.USER.INCORRECT_DETAILS
                });
            }
            const user = await createUser(data);
            return user
                ? res.status(201).send({
                    message: 'User created successfully',
                    success: true,
                })
                : res.status(400).send({
                    message: 'user not created',
                    success: false
                });

        }
        catch (error) {
            return {
                success: false,
                message: MESSAGES.USER.ERROR || error
            };
        }
    }

    //loginIn user
    async loginUser(req, res, next) {
        try {
            let { email } = req.body
            const enteredPassord = req.body.password
            let user = await getAUserByEmail({ email: email })
            if (!user) {
                return res.status(404).send({
                    message: MESSAGES.USER.INCORRECT_DETAILS,
                    success: false
                });
            }
            const check = await bcrypt.compare(enteredPassord, user.password)
            if (!check) {
                return res.status(403).send({
                    message: "wrong password",
                    success: false
                });
            }
            const token = jwt.sign(user.id, process.env.SECRET_KEY)
            const { password, ...data } = user.toJSON()
            return res.status(200).send({
                message: 'Login Successful',
                success: true,
                user: data,
                token
            });
        } catch (err) {
            return res.status(500).send({
                message: 'Internal Server Error' + err,
                success: false
            });
        }
    };


    //logout user
    async loggedOut(req, res, next) {
        try {
            const token = '';
            await res.cookie("token", token, { httpOnly: true })
            return res.status(200).send({
                message: "User logged out successfully",
                token: token,
                success: true
            })
        } catch {
            return res.status(500).send({
                message: 'Internal Server Error' + err,
                success: false
            })
        }
    };


    //delete user
    async removeUser(req, res) {
        try {
            const { id } = req.params
            //check if the user exists
            const check = checkValidId(id)
            if (check) {
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
                return res.status(409).send({
                    success: false,
                    message: MESSAGES.USER.INVALID_ID
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
            const data = req.body
            //check  if valid id
            const check = checkValidId(id)
            if (check) {
                const findUser = await getAUserById(id)
                if (findUser) {
                    const updated = await updateUser(id, req.body)
                    if (updated) {
                        return res.status(200).send({
                            success: true,
                            message: MESSAGES.USER.ACCOUNT_UPDATED,
                            updated
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
                        message: MESSAGES.USER.ACCOUNT_NOT_REGISTERED
                    })
                }
            } else {
                return res.status(400).send({
                    success: false,
                    message: MESSAGES.USER.INCORRECT_DETAILS
                })
            }
        } catch (error) {
            return {
                message: MESSAGES.USER.ERROR + error.message,
                success: false,
            };
        }
    }


    async recoverPassword(req, res) {
        try {
            let { email } = req.body
            let newPassword = req.body.password
            if (!email) {
                return res.status(404).send({
                    message: 'Enter email address',
                    success: false
                })
            }
            if (!newPassword) {
                return res.status(404).send({
                    message: 'Enter new password',
                    success: false
                })
            }
            const user = await getAUserByEmail({ email: email });
            if (!user) {
                return res.status(404).send({
                    message: 'Email is not registered',
                    success: false
                })
            }
            const id = user._id;
            const updated = await User.findByIdAndUpdate(
                id,
                { password: newPassword },
            );
            console.log(updated)
            const { password, ...data } = user.toJSON()
            return res.status(200).send({
                message: 'Password changed',
                success: true,
                data: data
            })

        } catch (error) {
            return {
                message: MESSAGES.USER.ERROR + error.message,
                success: false,
            };
        }
    }


    //get a user
    async findAUser(req, res) {
        try {
            const { id } = req.params
            //check  if valid id
            const check = checkValidId(id)
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
                message: MESSAGES.USER.ERROR + error.message,
                success: false,
            };
        }
    }
}
module.exports = new userControllers()