const adminService = require('../services/admin.services')
const checkValidId = require('../utils/validateID')
const { MESSAGES } = require('../config/constant.config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Admin = require('../model/admin.model')


class AdminController {
    //create an user     
    async registerAdmin(req, res) {
        const { email, password } = req.body
        const data = req.body

        try {
            // check if admin exist 
            const existingAdmin = await adminService.getAdmin({
                email: email
            })

            if (existingAdmin) {
                return res.status(404).send({
                    message: 'Admin already exist',
                    success: false
                })
            }

            if (!email || !password)
                return res.status(400).send({
                    message: 'Email address and password are required',
                    success: false
                });

            const admin = await adminService.createAdmin(data)
            return admin
                ? res.status(201).send({
                    message: 'Admin created successfully',
                    success: true,
                })
                : res.status(400).send({
                    message: 'Admin not created',
                    success: false
                });

        } catch (error) {
            return res.status(500).send({
                message: 'An Error: ' + error.message,
                success: false
            })
        }
    }

    //loginIn user
    async loginAdmin(req, res, next) {
        try {
            const { email } = req.body
            let enteredPassword = req.body.password
            let user = await adminService.getAdmin({ email: email })
            if (!user) {
                return res.status(404).send({
                    message: MESSAGES.USER.INCORRECT_DETAILS,
                    success: false
                });
            }
            const check = await bcrypt.compare(enteredPassword, user.password)
            if (!check) {
                return res.status(403).send({
                    message: "wrong password",
                    success: false
                });
            }
            let { password, ...data } = user.toJSON()
            const token = jwt.sign(user.id, process.env.SECRET_KEY)
            return res.status(200).send({
                message: 'Login Successful',
                success: true,
                user: data,
                token
            });
        } catch (err) {
            return res.status(500).send({
                message: 'Internal Server Error' + err,
                success: false
            });
        }
    };


    //logout admin
    async loggedOut(req, res, next) {
        try {
            const token = '';
            await res.cookie("token", token, { httpOnly: true })
            console.log("Admin logged out successfully")

            return res.status(200).send({
                message: "Admin logged out successfully",
                token: token,
                success: true
            })
        } catch {
            return res.status(500).send({
                message: 'Internal Server Error' + err,
                success: false
            })
        }
    };



    // get all admin
    async getAdmins(req, res) {
        try {
            const admins = await adminService.getAllAdmin({})
            if (!admins) {
                return res.status(404).send({
                    message: 'Admins not found' || err.message,
                    success: false
                })
            } else {
                return res.status(200).send({
                    message: 'Admins found successfully',
                    data: admins
                })
            }

        } catch (error) {
            return res.status(500).send({
                message: 'Error: ' + error.message,
                success: false
            })
        }

    }
    // get a single admin
    async getOneAdmin(req, res) {
        // check if the admin exists
        try {
            const { id } = req.params
            const check = checkValidId(id)
            if (check) {
                const existingAdmin = await adminService.getAdmin({
                    _id: id
                })
                if (!existingAdmin) {
                    return res.status(404).send({
                        message: 'Admin does not exist',
                        success: false
                    })
                } else {
                    // returns true if the admin exist
                    let { password, ...data } = existingAdmin.toJSON()
                    return res.status(200).send({
                        message: 'Admin fetched successfully',
                        success: true,
                        data: data
                    });
                }
            } else {
                //if inputted id is invalid
                return res.status(400).send({
                    message: 'Invalid id',
                    success: false
                })
            }
        } catch (error) {
            return res.status(500).send({
                message: 'Error: ' + error.message,
                success: false
            })
        }

    }


    // recover password
    async recoverPassword(req, res) {
        try {
            let { email } = req.body
            let newPassword = req.body.password
            if (!email) {
                return res.status(404).send({
                    message: 'Enter email address',
                    success: false
                })
            }
            if (!newPassword) {
                return res.status(404).send({
                    message: 'Enter new password',
                    success: false
                })
            }
            const admin = await adminService.getAdmin({ email: email });
            if (!admin) {
                return res.status(404).send({
                    message: 'Email is not registered',
                    success: false
                })
            }
            const id = admin._id;
            let updated = await Admin.findByIdAndUpdate(
                id,
                { password: newPassword },
                { new: true }
            );
            const { password, ...data } = updated.toJSON()
            return res.status(200).send({
                message: 'Password changed',
                success: true,
                data: data
            })

        } catch (error) {
            return res.status(500).send({
                message: 'Error: ' + error.message,
                success: false
            })
        }
    }


    // delete an admin
    async deleteOne(req, res) {
        // check if an admin exist before deleting
        try {
            const { id } = req.params
            const check = checkValidId(id)
            if (check) {
                const existingAdmin = await adminService.getAdmin({
                    _Id: id
                })
                if (!existingAdmin) {
                    return res.status(404).send({
                        message: 'Invalid Admin',
                        success: false
                    })
                }
                // delete user if the admin was found
                await adminService.deleteAdminById(id)
                return res.status(200).send({
                    message: 'Admin deleted',
                    success: true,
                })
            } else {
                //if inputted id is invalid
                return res.status(400).send({
                    message: 'Invalid id',
                    success: false
                })
            }
        } catch (error) {
            return res.status(500).send({
                message: 'Error: ' + error.message,
                success: false
            })
        }
    }

}
module.exports = new AdminController()