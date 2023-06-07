const checkValidId = require('../utils/validateID')
const { MESSAGES } = require('../config/constant.config')
const usersServices = require('../services/user.services')
const bcrypt = require('bcrypt')
const passport = require('passport')
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
            const findUserEmail = await getAUserByEmail({ email: email });
            if (!email) {
                return res.status(404).send({
                    message: 'Enter email address',
                    success: false
                })
            }
            if (findUserEmail) {
                return res.status(400).send({ success: false, message: MESSAGES.USER.DUPLICATE_EMAIL });
            }
            if (!password) {
                return res.status(400).send({ success: false, message: MESSAGES.USER.INCORRECT_DETAILS });
            }

            const salt = await bcrypt.genSalt(rounds);
            const hidden_Password = await bcrypt.hash(password, salt);
            const user = await createUser({
                ...req.body,
                password: hidden_Password,
            });
            return user
                ? res.status(201).send({
                    message: 'User created successfully',
                    success: true,
                    user
                })
                : res.status(400).send({
                    message: 'user not created',
                    success: false
                });

        }
        catch (error) {
            return {
                success: false,
                message: MESSAGES.USER.ERROR + Error.message
            };
        }
    }

    //loginIn user
    async login(req, res, next) {
        passport.authenticate('local', function (err, user) {

            if (err) {
                return res.status(500).send({
                    message: 'Internal Server Error' + err, success: false
                });
            }
            if (!user) {
                return res.status(404).send({
                    message: MESSAGES.USER.INCORRECT_DETAILS,
                    success: false
                });
            }
            return req.login(user, async function (err) {
                if (err) {
                    return res.status(500).send({
                        message: 'Internal Server Error', success: false
                    });
                }
                const { id } = user
                const loggedin = await getAUserById(id)
                
                return res.status(200).send({
                    message: 'Login Successful',
                    loggedin,
                    success: true
                });
            });
        })(req, res, next);
    };


    //logout user
    async loggedout(req, res, next) {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            return res.status(200).send({
                message: 'Loggedout Successful',
                success: true
            });
        });
    };



    //delete user
    async removeUser(req, res) {
        try {
            const { id } = req.params
            console.log(req.params);
            //check if the user exists
            const check = checkValidId(id)
            console.log(check);
            if (check) {
                const findUser = await getAUserById(id)
                console.log(findUser);
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
            //check  if valid id
            const check = checkValidId(id)
            if (check) {
                const findUser = await getAUserById(id)
                if (findUser) {
                    const updated = await updateUser(id, req.body)
                    if (updated) {
                        return res.status(200).send({
                            success: true,
                            user: updated,
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