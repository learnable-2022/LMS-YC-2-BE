const bcrypt = require('bcryptjs')
const rounds = (process.env.ROUNDS )


// Masks the passsword with random characters to protect user data
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(rounds)
    password = await bcrypt.hash(password, salt)
    return password
}

// Confirms the input password is the same password that was masked when the user signed up
const verifyPassword = async (adminPassword, hashedAdminPassword) => {
    const isValid = await bcrypt.compare(adminPassword, hashedAdminPassword)
    return isValid
}
const verifyUserPassword = async (userPassword, hashedUserPassword) => {
    const isValid = await bcrypt.compare(userPassword, hashedUserPassword)
    return isValid
}

module.exports = { hashPassword, verifyPassword, verifyUserPassword }