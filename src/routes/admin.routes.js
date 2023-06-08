const { Router } = require('express')
const { validateAdminInputs } = require('../utils/validation')
const { validateCourseInputs } = require('../utils/validation')
const adminRouter = Router()

const storage = require('../lib/multer')

// The routes contains CRUD operations for Admin and their unique abilities to create, update and delete courses.
const {
    registerAdmin,
    // login,
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
// adminRouter.post('/admin/login', validateAdminInputs, login)
adminRouter.post('/admin/courses', storage.single('file'), validateCourseInputs, createCourses)
adminRouter.post('/admin/logout', loggedout)
adminRouter.get('/admin/courses', fetchAllCourses)
adminRouter.get('/admin/courses/:id', getSingleCourse)
adminRouter.patch('/admin/courses/:id', editCourse)
adminRouter.delete('/admin/courses/:id', deleteCourse)
adminRouter.get('/admin', getAdmins)
adminRouter.get('/admin/:id', getOneAdmin)
adminRouter.patch('/admin/:id', updateAdmin)
adminRouter.delete('/admin/:id', deleteOne)




module.exports = adminRouter
