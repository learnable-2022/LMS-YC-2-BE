const { Router } = require('express')
const { validateAdminInputs } = require('../utils/validation')
const { validateCourseInputs } = require('../utils/validation')
const adminRouter = Router()
const passport = require('../middleware/authenticate')
const checkAdminAuth = require('../middleware/authorizeAdmin')

// The routes contains CRUD operations for Admin and their unique abilities to create, update and delete courses.
const {
    registerAdmin,
    login,
    loggedout,
    getOneAdmin,
    getAdmins,
    updateAdmin,
    deleteOne,
} = adminController = require('../controller/admincontroller')

const {
    createCourses,
    getSingleCourse,
    fetchAllCourses,
    editCourse,
    deleteCourse,
} = courseController = require('../controller/course.controller')

adminRouter.post('/admin/register', validateAdminInputs, registerAdmin)
adminRouter.post('/admin/login', validateAdminInputs, login)
adminRouter.post('/admin/courses', validateCourseInputs, checkAdminAuth, createCourses)
adminRouter.post('/admin/logout', checkAdminAuth, loggedout)
adminRouter.get('/admin/courses', checkAdminAuth, fetchAllCourses)
adminRouter.get('/admin/courses/:id',checkAdminAuth, getSingleCourse)
adminRouter.patch('/admin/courses/:id', checkAdminAuth, editCourse)
adminRouter.delete('/admin/courses/:id', checkAdminAuth, deleteCourse)
adminRouter.get('/admin', checkAdminAuth, getAdmins)
adminRouter.get('/admin/:id', checkAdminAuth, getOneAdmin)
adminRouter.patch('/admin/:id', checkAdminAuth, updateAdmin)
adminRouter.delete('/admin/:id', checkAdminAuth, deleteOne)


module.exports = adminRouter
