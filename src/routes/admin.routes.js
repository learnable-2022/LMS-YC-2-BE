const { Router } = require('express')
const { validateAdminInputs } = require('../utils/validation')
const adminRouter = Router()
const passport = require('../middleware/authenticate')

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
adminRouter.post('/admin/logout', loggedout)
adminRouter.get('/admin', getAdmins)
adminRouter.get('/admin/:id', getOneAdmin)
adminRouter.patch('/admin/:id', updateAdmin)
adminRouter.delete('/admin/:id', deleteOne)


module.exports = adminRouter