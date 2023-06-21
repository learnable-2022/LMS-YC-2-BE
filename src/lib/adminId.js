const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// a function to get the adminId that will be called in the course controller
const getAdminId = async (req, res, next) => {
    try{
        const authorizationHeader = req.headers.authorization;
        const bearToken = authorizationHeader.split(' ')[1];
        const adminId = jwt.verify(bearToken, process.env.SECRET_KEY)
        return adminId
    }catch(error){
        return null
    }

}
module.exports = getAdminId