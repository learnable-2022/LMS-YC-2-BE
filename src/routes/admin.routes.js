const {Router} = require('express')

const adminRouter = Router()

const  {
    registerAdmin,
    loginAdmin,
    getOneAdmin,
    getAdmins,
    updateAdmin,
    deleteOne,
    

} = adminController = require('../controller/admincontroller')

adminRouter.post('/admin/register',  registerAdmin)
adminRouter.post('/admin/login' ,loginAdmin)
adminRouter.get('/admin', getAdmins)
adminRouter.get('/admin/:id', getOneAdmin)
adminRouter.patch('/admin/:id', updateAdmin)
adminRouter.delete('/admin/:id', deleteOne)


module.exports = adminRouter