const jwt = require('jsonwebtoken')
const adminModel = require('../model/admin.model')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

// a middleware to autheticate admin 

const authAdmin = async (req, res, next) => {
    try {
        console.log('first one')
        let token = ''
        //Gets token from client header (like a cookie stored or attached to a user's unique id from the client side after they sign up or sign in)
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            // This is an alternate method of getting it from previously set cookies for the purpose of testing
            token = req.cookies.token
        }
        if (!token) {
            return res.status(401).send({
                message: 'Please sign in',
                success: false
            })
        }
        console.log('second one')
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        if (!verified) {
            return res.status(401).send({
                message: 'Admin Verification failed',
                success: false
            })
        }
        const admin = await adminModel.findOne({
            _id: verified._id,
            'tokens.token': token
        })
        if (!admin) {
            return res.status(401).send({
                message: 'You are not verified',
                success: false
            })
        }
        console.log('Admin Authentication successful')

        req.token = token
        req.user = admin
        next()

    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error' + err,
            success: false
        })

    }
}
module.exports = authAdmin
