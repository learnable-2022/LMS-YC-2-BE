const bcrypt = require('bcryptjs')
const rounds = (process.env.ROUNDS )


// Masks the passsword with random characters to protect user data
const hashPassword = async (password) => {
    const salt = await bcrypt.genSaltSync(rounds)
    const pass = await bcrypt.hashSync(password, salt)
    return pass
}

// Confirms the input password is the same password that was masked when the user signed up
const verifyPassword = async (adminPassword, hashedAdminPassword) => {
    const isValid = await bcrypt.compareSync(adminPassword, hashedAdminPassword)
    return isValid
}
const verifyUserPassword = async (userPassword, hashedUserPassword) => {
    const isValid = await bcrypt.compareSync(userPassword, hashedUserPassword)
    return isValid
}

module.exports = { hashPassword, verifyPassword, verifyUserPassword }