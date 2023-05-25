const {Router} = require('express')
const {validateAdminInputs} = require('../utils/validation')
const adminRouter = Router()

const  {
    registerAdmin,
    loginAdmin,
    getOneAdmin,
    getAdmins,
    updateAdmin,
    deleteOne,
    

} = adminController = require('../controller/admincontroller')

adminRouter.post('/admin/register', validateAdminInputs, registerAdmin)
adminRouter.post('/admin/login', validateAdminInputs, loginAdmin)
adminRouter.get('/admin', getAdmins)
adminRouter.get('/admin/:id', getOneAdmin)
adminRouter.patch('/admin/:id', updateAdmin)
adminRouter.delete('/admin/:id', deleteOne)


module.exports = adminRouter