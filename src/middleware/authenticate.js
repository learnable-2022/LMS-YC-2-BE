const jwt = require('jsonwebtoken')
const { MESSAGES } = require('../config/constant.config')
const userModel = require('../model/user.model')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

// a middleware to autheticate users 

const auth = async (req, res, next) => {
    const bearHeader = req.headers['authorization']
    if (typeof bearHeader !== 'undefined') {
        const bearToken = bearHeader.split(' ')[1]
        req.token = bearToken
        next()
    } else {
        res.status(403)
            .send({ message:MESSAGES.USER.UNAUTHORIZED, success: false }); // Restricting access if authorization fails 
    }
}
module.exports = auth
