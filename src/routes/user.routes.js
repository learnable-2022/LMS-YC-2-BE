const { Router } = require('express')
const { validateUserInputs, validateUserLoginInputs } = require('../utils/validation')
const userRouter = Router()

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
userRouter.post('/user/logout', loggedout)
userRouter.get('/user', fetchAllUsers)
userRouter.get('/user/:id', findAUser)
userRouter.patch('/user/:id', updateAUser)
userRouter.delete('/user/:id', removeUser)

module.exports = userRouter