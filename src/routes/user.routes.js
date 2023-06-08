const { Router } = require('express')
const { validateUserInputs, validateUserLoginInputs } = require('../utils/validation')
const userRouter = Router()
const checkStudentAuth = require('../middleware/authorizeStudent')

// The routes contains CRUD operations for users and their abilities to fetch a single or all courses depending on what they want to watch.

const {
    signUp,
    login,
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
userRouter.post('/user/login', validateUserLoginInputs, login)
userRouter.post('/user/logout', checkStudentAuth, loggedout)
userRouter.get('/user/courses', checkStudentAuth, fetchAllCourses)
userRouter.get('/user/courses/:id', checkStudentAuth, getSingleCourse)
userRouter.get('/user', checkStudentAuth, fetchAllUsers)
userRouter.get('/user/:id', checkStudentAuth, findAUser)
userRouter.patch('/user/:id', updateAUser)
userRouter.delete('/user/:id', checkStudentAuth, removeUser)

module.exports = userRouter