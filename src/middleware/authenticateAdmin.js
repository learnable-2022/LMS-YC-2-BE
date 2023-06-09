const jwt = require('jsonwebtoken')
const adminModel = require('../model/admin.model')
const { MESSAGES } = require('../config/constant.config')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

// a middleware to autheticate admin 

const authAdmin = async (req, res, next) => {
    const bearHeader = req.headers['authorization']
    if (typeof bearHeader !== 'undefined') {
        const bearToken = bearHeader.split(' ')[1]
        req.token = bearToken
        next()
    } else {
        res.status(403)
            .send({ message: err.message || MESSAGES.USER.UNAUTHORIZED, success: false }); // Restricting access if authorization fails 
    }
}
module.exports = authAdmin
