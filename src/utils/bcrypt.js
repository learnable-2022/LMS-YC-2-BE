const bcrypt = require('bcrypt')
const rounds = parseInt(process.env.ROUNDS)





// Confirms the input password is the same password that was masked when the user signed up
const verifyPassword = async (adminPassword, hashedAdminPassword) => {
    const check = await bcrypt.compare(userPassword, hashedAdminPassword)
    if (match) {
        return true
    }
    else {
        return false
    }
}

const verifyUserPassword = async (userPassword, hashedUserPassword) => {
    const check = await bcrypt.compare(userPassword, hashedUserPassword)
    if (match) {
        return true
    }
    else {
        return false
    }
}

module.exports = { verifyPassword, verifyUserPassword }