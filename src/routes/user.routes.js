const { Router } = require('express')
const { validateUserInputs, validateUserLoginInputs } = require('../utils/validation')
const userRouter = Router()

// The routes contains CRUD operations for users and their abilities to fetch a single or all courses depending on what they want to watch.

const {
    signUp,
    loginUser,
    findAUser,
    fetchAllUsers,
    updateAUser,
    removeUser,
    loggedout
} = userController = require('../controller/user.controllers')

const { fetchAllCourses,
    getSingleCourse
} = courseController = require('../controller/course.controller')


userRouter.post('/user/register', validateUserInputs, signUp)
userRouter.post('/user/login', validateUserLoginInputs, loginUser)
userRouter.post('/user/logout', loggedout)
userRouter.get('/user/courses', fetchAllCourses)
userRouter.get('/user/courses/:id', getSingleCourse)
userRouter.get('/user', fetchAllUsers)
userRouter.get('/user/:id', findAUser)
userRouter.patch('/user/:id', updateAUser)
userRouter.delete('/user/:id', removeUser)

module.exports = userRouter