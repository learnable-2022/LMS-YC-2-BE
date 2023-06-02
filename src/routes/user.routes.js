const { Router } = require('express')
const { validateUserInputs, validateUserLoginInputs } = require('../utils/validation')
const userRouter = Router()
const checkStudentAuth = require('../middleware/authorizeStudent')

const {
    signUp,
    login,
    findAUser,
    fetchAllUsers,
    updateAUser,
    removeUser,
    loggedout
} = userController = require('../controller/user.controllers')

userRouter.post('/user/register', validateUserInputs, signUp)
userRouter.post('/user/login', validateUserLoginInputs, login)
userRouter.post('/user/logout', checkStudentAuth, loggedout)
userRouter.get('/user', checkStudentAuth, fetchAllUsers)
userRouter.get('/user/:id', checkStudentAuth, findAUser)
userRouter.patch('/user/:id', checkStudentAuth, updateAUser)
userRouter.delete('/user/:id', checkStudentAuth, removeUser)

module.exports = userRouter