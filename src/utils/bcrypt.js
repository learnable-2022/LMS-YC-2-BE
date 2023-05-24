const bcryptjs = require('bcryptjs')
const rounds = (process.env.ROUNDS )


// Masks the passsword with random characters to protect user data
const hashPassword = async (password) => {
    const salt = await bcryptjs.genSalt(rounds)
    password = await bcryptjs.hash(password, salt)
    return password
}

// Confirms the input password is the same password that was masked when the user signed up
const verifyPassword = async (adminPassword, hashedAdminPassword) => {
    const isValid = await bcryptjs.compare(adminPassword, hashedAdminPassword)
    return isValid
}

module.exports = { hashPassword, verifyPassword }