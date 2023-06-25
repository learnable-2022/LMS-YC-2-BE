const Admin = require('../model/admin.model');

class adminService {

    async createAdmin(newAdmin) {
        // create an admin
        await Admin.create(newAdmin)
        return await Admin.find(newAdmin, { _id: 1, password: 0 })
    }

    // get all Admin
    async getAllAdmin(filter) {
        return await Admin.find(filter, { _id: 1, password: 0 })
    }

    // get a single admin
    async getAdmin(filter) {
        return await Admin.findOne(filter);
    }

    // edit an admin by id
    async editAdminById(id, data) {
        return await Admin.findByIdAndUpdate({ _id: id }, data);
    }

    // delete an admin by id
    async deleteAdminById(id) {
        return await Admin.findByIdAndDelete({ _id: id });
    }
}
module.exports = new adminService();
