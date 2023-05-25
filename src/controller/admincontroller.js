const adminService = require('../services/admin.services')
const hashPassword = require('../utils/bcrypt')
const verifyPassword = require('../utils/bcrypt')

class AdminController{
    //create an user     
        async registerAdmin(req, res)  {
            const { email_address, password } = req.body
            try{
                // check if admin exist 
                const existingAdmin = await adminService.getAdmin({
                    email_address: email_address
                })
                if (existingAdmin){
                    return res.status(404).send({message: 'Admin already exist' || err.message, success: false})
                } 
                const safePassword = await hashPassword(password)

                const admin = await adminService.createAdmin({
                    email_address: email_address,
                    // we will change this to the encrypted password later
                    password: safePassword,
                })
                return res.status(200).send({message: 'Admin registered in successfully', admin, success: true })
            }catch(error){
                console.error(error)
            }
        } 
        async loginAdmin(req, res){
                const {username, password} = req.body 
                try{
                    // check if the admin exist
                    const admin = await adminService.getAdmin({
                        name: username
                    })
                    if (!admin){
                        return res.status(404).send({message: 'Please register your details before logging in' || err.message, success: false})          
                    }

                    if (!password) {
                        return res.status(404).send({message: 'Please input your password to continue'})   
                    }
                    const isValid = await verifyPassword(password, admin.password)
                    if (!isValid) {
                        return res.status(404).send({
                            message: 'Incorrect password, please retype your password',
                            status: 'failed'
                        })
                    }

                    
                }catch(error){
                    console.error(error)
    
                }
            }
            
    // get all admin
    async getAdmins(req,res){
        try{
            const admins = await adminService.getAllAdmin({})
            if(!admins){
                return res.status(404).send({message: 'Admins not found' || err.message, success: false})
            }else{
                return res.status(200).send({message: 'Admins found successfully', admins})
            }
            
        }catch(error){
            console.error(error)
        }

    }
    // get a single admin
    async getOneAdmin(req, res){
        const adminId = req.params.id
        // check if the admin exists
        try{
            const existingAdmin = await adminService.getAdmin({
                _id: adminId
            })
            if (!existingAdmin){
                return res.status(404).send({message: 'Admin does not exist' , success: false})

            }else{
                // returns true if the admin exist
                return res.status(200).send({message: 'Admin fetched successfully', success: true , data:existingAdmin});
            }
            
        }catch(error){
            console.error(error)
        }

    }
    // edit an admin
    async updateAdmin(req, res){
        const adminId = req.params.id
        const {email_address, password} = req.body
        // check by id if an admin exists
        try{
            
            const existingAdmin = await adminService.getAdmin({
                _id: adminId
            })
            if (!existingAdmin){
                return res.status(404).send({message:'Admin does not exist' , success: false})

            }
            // update the user details to the current one
            const updatedAdmin = await adminService.editAdminById({
                email_address: email_address,
                password: password,
                
            })
               return res.status(200).send({message: 'Admin updated successfully', success: true, data:updatedAdmin});      
            
        }catch(error){
            console.error(error)
        }
        
    }
    // delete an admin
    async  deleteOne (req,res) {
        const AdminId = req.params.id
        // check if an admin exist before deleting
        try{
            const existingAdmin = await adminService.getAdmin({
                _Id: userId
            })
            if (!existingAdmin){
                return res.status(404).send({message: 'Invalid Admin' , success: false})
    
            }
            // delete user if the above condition was met
            const deletedAdmin = await adminService.deleteAdminById(adminId)
            return res.status(200).send({message: 'Admin deleted', success: true, data:deletedAdmin})
        }catch(error){
            console.error(error)
        }
    }

}
module.exports= new AdminController()