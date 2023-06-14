const { Router } = require('express')
const { validateAdminInputs } = require('../utils/validation')
const { validateCourseInputs } = require('../utils/validation')
const adminRouter = Router()
const authAdmin = require('../middleware/authenticateAdmin') 

const storage = require('../lib/multer')

// The routes contains CRUD operations for Admin and their unique abilities to create, update and delete courses.
const {
    registerAdmin,
    loginAdmin,
    loggedOut,
    getOneAdmin,
    getAdmins,
    updateAdmin,
    recoverPassword,
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
adminRouter.post('/admin/login', validateAdminInputs, loginAdmin)
adminRouter.post('/admin/courses', authAdmin, storage.single('file'),  createCourses)
adminRouter.post('/admin/logout', authAdmin, loggedOut)
adminRouter.get('/admin/courses', authAdmin, fetchAllCourses)
adminRouter.get('/admin/courses/:id', authAdmin, getSingleCourse)
adminRouter.patch('/admin/courses/:id', authAdmin, editCourse)
adminRouter.delete('/admin/courses/:id', authAdmin, deleteCourse)
adminRouter.get('/admin', authAdmin, getAdmins)
adminRouter.get('/admin/:id', authAdmin, getOneAdmin)
adminRouter.patch('/admin/recover', recoverPassword)
adminRouter.patch('/admin/:id', authAdmin, updateAdmin)
adminRouter.delete('/admin/:id', authAdmin, deleteOne)




module.exports = adminRouter
