const { Router } = require('express')
const { validateAdminInputs } = require('../utils/validation')
const adminRouter = Router()
const passport = require('../middleware/authenticate')
const checkAdminAuth = require('../middleware/authorizeAdmin')

const {
    registerAdmin,
    login,
    loggedout,
    getOneAdmin,
    getAdmins,
    updateAdmin,
    deleteOne,
} = adminController = require('../controller/admincontroller')

adminRouter.post('/admin/register', validateAdminInputs, registerAdmin)
adminRouter.post('/admin/login', validateAdminInputs, login)
adminRouter.post('/admin/logout', checkAdminAuth, loggedout)
adminRouter.get('/admin', checkAdminAuth, getAdmins)
adminRouter.get('/admin/:id', checkAdminAuth, getOneAdmin)
adminRouter.patch('/admin/:id', checkAdminAuth, updateAdmin)
adminRouter.delete('/admin/:id', checkAdminAuth, deleteOne)


module.exports = adminRouter