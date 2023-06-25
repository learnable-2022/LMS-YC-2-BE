const users = require("../model/user.model");
const mongoose = require('mongoose')

class userService {
    async createUser(data) {
        //to create a user
        await users.create(data);
        return await users.find(data, { _id: 1, password: 0 })
    }

    async getAUserById(id) {
        //get a single user by id
        return await users.findById(id, { _id: 1, password: 0 });
    }

    async getAllUsers() {
        //get all users
        return await users.find({}, { _id: 1, password: 0 })
    }

    async deleteUser(id) {
        // delete a user
        return await users.findByIdAndDelete(id)
    }

    async getAUserByEmail(data) {
        //get a single user by id
        return await users.findOne(data);
    }

    async updateUser(id, data) {
        // delete a user
        await users.findByIdAndUpdate(id, data)
        return await users.find(data, { _id: 1, password: 0 })

    }
}
module.exports = new userService();