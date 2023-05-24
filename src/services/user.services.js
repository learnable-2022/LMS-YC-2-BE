const { users } = require("../model/user.model");

class userService {
    async createUser(data) {
        //to create a user
        return await users.create(data);
    }

    async getAllUsers() {
        //fetch all users
        return await users.find(
            { _id: 1, password: 0 }
        )
    }

    async getAUserById(id) {
        //get a single user by id
        return await users.findById(id, { _id: 1, password: 0 });
    }

    async deleteUser(id) {
        // delete a user
        return await users.findByIdAndDelete(id)
    }

    async getAUserByEmail(data) {
        //get a single user by id
        return await users.findOne(data, { _id: 1, password: 0 });
    }

    async updateUser(id, data) {
        // delete a user
        return await users.findByIdAndUpdate(id, data)
    }
}
module.exports = new userService();