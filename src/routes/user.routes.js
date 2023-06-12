const { Router } = require('express')
const { validateUserInputs, validateUserLoginInputs } = require('../utils/validation')
const userRouter = Router()
const auth = require('../middleware/authenticate')

// The routes contains CRUD operations for users and their abilities to fetch a single or all courses depending on what they want to watch.

const {
    signUp,
    loginUser,
    findAUser,
    fetchAllUsers,
    updateAUser,
    removeUser,
    recoverPassword,
    loggedOut
} = userController = require('../controller/user.controllers')

const { fetchAllCourses,
    getSingleCourse
} = courseController = require('../controller/course.controller')


userRouter.post('/user/register', validateUserInputs, signUp)
userRouter.post('/user/login', validateUserLoginInputs, loginUser)
userRouter.post('/user/logout', auth, loggedOut)
userRouter.get('/user/courses', auth, fetchAllCourses)
userRouter.get('/user/courses/:id', auth, getSingleCourse)
userRouter.get('/user', auth, fetchAllUsers)
userRouter.get('/user/:id', auth, findAUser)
userRouter.patch('/user/recover', recoverPassword)
userRouter.patch('/user/:id', auth, updateAUser)
userRouter.delete('/user/:id', auth, removeUser)

module.exports = userRouter